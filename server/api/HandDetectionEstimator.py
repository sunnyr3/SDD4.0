import numpy as np
import cv2
import tensorflow as tf


class HandDetectionEstimator(object):
    def __init__(self, ckpt_path):
        """

        :param ckpt_path:
        """
        self.graph, self.sess = self.load_inference_graph(ckpt_path)

    def check_if_hand_present(self, img_src, score_thresh=0.1):
        """
        get bounding box for the hand, basically checking if there is hand
        :param img_src:
        :param score_thresh:
        :return: True if there is hand, False if not
        """
        if img_src is None:
            print('Load Fail')
        else:
            boxes, scores = self.detect_objects(
                img_src, self.graph, self.sess)
            return any(s > score_thresh for s in scores)

    @staticmethod
    def detect_objects(image_np, detection_graph, sess):
        """

        :param image_np:
        :param detection_graph:
        :param sess:
        :return:
        """
        # Definite input and output Tensors for detection_graph
        image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
        # Each box represents a part of the image
        # where a particular object was detected.
        detection_boxes = detection_graph.get_tensor_by_name(
            'detection_boxes:0')
        # Each score represent how level of confidence for each of the objects.
        # Score is shown on the result image, together with the class label.
        detection_scores = detection_graph.get_tensor_by_name(
            'detection_scores:0')
        detection_classes = detection_graph.get_tensor_by_name(
            'detection_classes:0')
        num_detections = detection_graph.get_tensor_by_name(
            'num_detections:0')

        image_np_expanded = np.expand_dims(image_np, axis=0)

        (boxes, scores, classes, num) = sess.run(
            [detection_boxes, detection_scores,
             detection_classes, num_detections],
            feed_dict={image_tensor: image_np_expanded})
        return np.squeeze(boxes), np.squeeze(scores)

    @staticmethod
    def load_inference_graph(path):
        """

        :param path:
        :return:
        """
        # load frozen tensorflow model into memory
        print("loading HAND frozen graph into memory")
        detection_graph = tf.Graph()
        with detection_graph.as_default():
            od_graph_def = tf.compat.v1.GraphDef()
            with tf.io.gfile.GFile(path, 'rb') as fid:
                serialized_graph = fid.read()
                od_graph_def.ParseFromString(serialized_graph)
                tf.import_graph_def(od_graph_def, name='')
            sess = tf.compat.v1.Session(graph=detection_graph)
        print("Hand Inference graph loaded.")
        return detection_graph, sess