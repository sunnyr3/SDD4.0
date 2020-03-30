import numpy as np
import cv2
import tensorflow as tf


class HandInferenceEstimator(object):
    def __init__(self, model_path , input_layer="input_1", output_layer="k2tfout_0"):
        """
        :param model_file: model file
        :param input_layer: input layer
        :param output_layer: output layer
        """
        input_name = "import/" + input_layer
        output_name = "import/" + output_layer

        self.graph = self.load_graph(model_path)
        self.input_operation = self.graph.get_operation_by_name(input_name)
        self.output_operation = self.graph.get_operation_by_name(output_name)
        self.sess = tf.compat.v1.Session(graph=self.graph)
        self.stride = 4
        self.boxsize = 224

    def preprocess(self, oriImg, boxsize=368, stride=8, padValue=128):
        """
        preprocess images, scaling and padding images
        :param oriImg: original image
        :param boxsize: box size
        :param stride: stride, network parameter
        :param padValue: padValue
        :return: processed image and padding
        """
        scale = float(boxsize) / float(oriImg.shape[0])
        imageToTest = cv2.resize(oriImg, (0, 0), fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
        imageToTest_padded, pad = self.padRightDownCorner(imageToTest, stride, padValue)
        input_img = np.transpose(np.float32(imageToTest_padded[:, :, :, np.newaxis]), (3, 0, 1, 2))
        return input_img, pad

    def predict(self, frame):
        """
        get prediction from model
        :param img: image
        :return: prediction result (one hot)
        """

        crop_res = cv2.resize(frame, (self.boxsize, self.boxsize))
        img, pad = self.preprocess(crop_res, self.boxsize, self.stride)
        results = self.sess.run(self.output_operation.outputs[0], feed_dict={self.input_operation.outputs[0]: img})
        return np.squeeze(results)

    def get_bg(self, img):
        hm = self.predict(img)
        hm = cv2.resize(hm, (0, 0), fx=self.stride, fy=self.stride)
        bg = cv2.normalize(hm[:, :, -1], None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8UC1)
        return bg


    @staticmethod
    def padRightDownCorner(img, stride, padValue):
        """
        preprocess image with padding
        :param img: image
        :param stride: stride
        :param padValue: padValue
        :return: padded image and padding
        """
        h = img.shape[0]
        w = img.shape[1]

        pad = 4 * [None]
        pad[0] = 0  # up
        pad[1] = 0  # left
        pad[2] = 0 if (h % stride == 0) else stride - (h % stride)  # down
        pad[3] = 0 if (w % stride == 0) else stride - (w % stride)  # right

        img_padded = img
        pad_up = np.tile(img_padded[0:1, :, :] * 0 + padValue, (pad[0], 1, 1))
        img_padded = np.concatenate((pad_up, img_padded), axis=0)
        pad_left = np.tile(img_padded[:, 0:1, :] * 0 + padValue, (1, pad[1], 1))
        img_padded = np.concatenate((pad_left, img_padded), axis=1)
        pad_down = np.tile(img_padded[-2:-1, :, :] * 0 + padValue, (pad[2], 1, 1))
        img_padded = np.concatenate((img_padded, pad_down), axis=0)
        pad_right = np.tile(img_padded[:, -2:-1, :] * 0 + padValue, (1, pad[3], 1))
        img_padded = np.concatenate((img_padded, pad_right), axis=1)

        return img_padded, pad

    @staticmethod
    def load_graph(model_file):
        """
        load frozen inference graph
        :param model_file:
        :return: graph
        """
        graph = tf.Graph()
        graph_def = tf.compat.v1.GraphDef()

        with open(model_file, "rb") as f:
            graph_def.ParseFromString(f.read())
        with graph.as_default():
            tf.import_graph_def(graph_def)

        return graph