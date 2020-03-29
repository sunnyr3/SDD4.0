from __future__ import print_function
from common.mva19 import Estimator, preprocess
import numpy as np
import cv2
import time
import argparse
import tensorflow as tf
from utils import detector_utils as detector_utils
from utils import recognizer_utils as recognizer_utils
import os
import numpy as np
from keras.models import *
import time
import shutil


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
map_characters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'}
# map_characters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'L'}

generating_dataset = False

refersh_data = True

letter = 'I'
idx = 0

if generating_dataset:
    if refersh_data:
        if os.path.isdir('cust_data/{}'.format(letter)):
            shutil.rmtree('cust_data/{}'.format(letter))
        os.mkdir('cust_data/{}'.format(letter))


def get_bbox(img_src):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-nhands',
        '--num_hands',
        dest='num_hands',
        type=int,
        default=1,
        help='Max number of hands to detect.')
    args = parser.parse_args()
    if img_src is None:
        print('Load Fail')
    else:
        boxes, scores = detector_utils.detect_objects(
            img_src, detection_graph, sess)
        boxes_to_recog, scores_to_show = detector_utils.draw_box_on_image(
            args.num_hands, score_thresh, scores, boxes,
            img_src.shape[1], img_src.shape[0], img_src)
        boxes_roi = boxes_to_recog
        if len(boxes_roi) > 0:
            return True
        else:
            return False


if __name__ == "__main__":

    model_file = "./models/mobnet4f_cmu_adadelta_t1_model.pb"
    input_layer = "input_1"
    output_layer = "k2tfout_0"

    detection_graph, sess = detector_utils.load_inference_graph()
    sess = tf.Session(graph=detection_graph)
    score_thresh = 0.1

    stride = 4
    boxsize = 224

    estimator = Estimator(model_file, input_layer, output_layer)

    # json_file = open('rec_model.json', 'r')
    json_file = open('rec_model.json', 'r')
    rec_model_json = json_file.read()
    json_file.close()
    rec_model = model_from_json(rec_model_json)
    # rec_model.load_weights("rec_model_4epochs.h5")
    rec_model.load_weights("rec_model_17epochs.h5")
    print("Loaded rec model from disk")

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_BRIGHTNESS, 0.4)

    paused = True
    delay = {False: 1, True: 0}

    k = 0
    while k != ord('q'):
        # ret, frame = cap.read()
        # if not ret:
        #     raise Exception("VideoCapture.read() returned False")
        frame = cv2.imread('img path')
        if frame is None:
            continue
        tic = time.time()
        if get_bbox(frame):

            crop_res = cv2.resize(frame, (boxsize, boxsize))
            img, pad = preprocess(crop_res, boxsize, stride)

            tic = time.time()
            hm = estimator.predict(img)
            dt = time.time() - tic

            hm = cv2.resize(hm, (0, 0), fx=stride, fy=stride)
            bg = cv2.normalize(hm[:, :, -1], None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8UC1)
            viz = cv2.normalize(np.sum(hm[:, :, :-1], axis=2), None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8UC1)

            if generating_dataset:
                cv2.imwrite('cust_data/{}/{}.jpg'.format(letter, idx), bg)
                print(idx)

            cv2.imwrite('msk/test/{}.jpg'.format(idx), bg)
            cv2.imwrite('ori/test/{}.jpg'.format(idx), crop_res)

            im = cv2.cvtColor(bg, cv2.COLOR_GRAY2BGR)
            im = cv2.resize(im, (100, 100))
            im = np.expand_dims(im, axis=0)
            result = rec_model.predict(im)
            result_letter = map_characters[np.argmax(result[0])]
            frame = cv2.putText(frame, str(result_letter) + ' FPS:{}'.format(int(1/dt)), (50, 50), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 255), 1)

            idx += 1
        else:
            bg = np.zeros((224, 224), np.int8)
            viz = np.zeros((224, 224), np.int8)
            viz.fill(255)
            dt = time.time() - tic
            frame = cv2.putText(frame, 'MOVE HAND TO CENTER PLEASE FPS:{}'.format(int(1/dt)), (50, 50), cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 255, 0), 1)

        cv2.imshow("Background", bg)
        cv2.imshow("All joint heatmaps", viz)
        cv2.imshow("Input frame", frame)

        k = cv2.waitKey(delay[paused])

        if k & 0xFF == ord('p'):
            paused = not paused
        elif k & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()