import os
import numpy as np
from numpy import newaxis
import cv2
from tensorflow.keras.models import model_from_json
import pickle
from .seg import segTool


class HandGestureClassifier(object):
    def __init__(self, model_path, weight_path):
        """

        :param model_path:
        :param weight_path:
        """
        self.model = self.load_keras_model(model_path, weight_path)
        # self.model = self.load_svm_model(model_path)
        # self.cluster_svm = self.load_svm_model('/server/server/api/models/cluster_svm.pkl')

        self.cell_size = (16, 16)  # h x w in pixels
        self.block_size = (2, 2)  # h x w in cells
        self.nbins = 9  # number of orientation bins
        self.hog = cv2.HOGDescriptor(_winSize=(100 // self.cell_size[1] * self.cell_size[1],
                                          100 // self.cell_size[0] * self.cell_size[0]),
                                _blockSize=(self.block_size[1] * self.cell_size[1],
                                            self.block_size[0] * self.cell_size[0]),
                                _blockStride=(self.cell_size[1], self.cell_size[0]),
                                _cellSize=(self.cell_size[1], self.cell_size[0]),
                                _nbins=self.nbins)
        self.map_characters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K',
                               11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U',
                               21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'}
        self.map_cluster = {0: 'cluster_1', 1: 'cluster_2', 2: 'cluster_3', 3: 'cluster_4', 4: 'cluster_5'}
        self.hello_characters = {0: 'H', 1: 'E', 2: 'L', 3: 'O'}

        """
        cluster_1 = ['A', 'E', 'M', 'N', 'X']
        cluster_2 = ['B', 'D', 'I', 'R', 'U', 'S']
        cluster_3 = ['C', 'O', 'J', 'Q']
        cluster_4 = ['F', 'L', 'Y', 'W', 'V', 'K']
        cluster_5 = ['G', 'H', 'P', 'T', 'Z']
        """

    def get_result(self, bg, frame):
        """

        :param bg:
        :return:
        """
        # im = cv2.cvtColor(bg, cv2.COLOR_GRAY2BGR)
        # im = cv2.resize(im, (100, 100))
        # im = np.expand_dims(im, axis=0)
        # result = self.model.predict(im)
        # result_letter = self.map_characters[np.argmax(result[0])]

        bg_100 = cv2.resize(bg, (100, 100))
        crop_res = cv2.resize(frame, (100, 100))
        segT = segTool(crop_res, bg_100)
        gray_msk, cvx_hulled, cvx_lst = segT.get_seg()
        cvx_area = cv2.contourArea(cvx_lst[0])
        print(cvx_area)
        if cvx_area > 400:
            gray = cv2.cvtColor(crop_res, cv2.COLOR_BGR2GRAY)
            segged = np.zeros_like(gray)
            segged[cvx_hulled == 255] = gray[cvx_hulled == 255]
            im = cv2.resize(segged, (100, 100))
            im = im[:, :, newaxis]
            result = self.model.predict(np.asarray([im]))
            result_letter = self.hello_characters[np.argmax(result[0])]
        else:
            result_letter = 'Please put hand closer to the camera'

        # cluster_bg = cv2.resize(bg, (100, 100))
        # h = self.hog.compute(cluster_bg)
        # cv2.imwrite('bg.jpg', bg)
        # result_cluster = self.map_cluster[self.cluster_svm.predict(np.asarray([h.flatten()]))[0]]
        # if result_cluster == 'cluster_5':
        #     result_cluster = 'H'
        # elif result_cluster == 'cluster_1':
        #     result_cluster = 'E'
        # elif result_cluster == 'cluster_4':
        #     result_cluster = 'L'
        # elif result_cluster == 'cluster_3':
        #     result_cluster = 'O'
        # elif result_cluster == 'cluster_2':
        #     result_cluster = 'U'
        # result_letter = self.map_characters[self.model.predict(np.asarray([h.flatten()]))[0]]
        # return str(result_letter)+'\n'+result_cluster
        return result_letter

    @staticmethod
    def load_keras_model(model_path, weight_path):
        """

        :param model_path:
        :param weight_path:
        :return:
        """
        json_file = open(model_path, 'r')
        rec_model_json = json_file.read()
        json_file.close()
        rec_model = model_from_json(rec_model_json)
        rec_model.load_weights(weight_path)
        return rec_model

    @staticmethod
    def load_svm_model(model_path):
        """

        :param model_path:
        :return:
        """
        return pickle.load(open(model_path, 'rb'))
