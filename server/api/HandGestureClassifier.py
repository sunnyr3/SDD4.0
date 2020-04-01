import os
import numpy as np
import cv2
from tensorflow.keras.models import model_from_json


class HandGestureClassifier(object):
    def __init__(self, model_path, weight_path):
        """

        :param model_path:
        :param weight_path:
        """
        self.model = self.load_model(model_path, weight_path)
        self.map_characters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K',
                               11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U',
                               21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'}

    def get_result(self, bg):
        """

        :param bg:
        :return:
        """
        im = cv2.cvtColor(bg, cv2.COLOR_GRAY2BGR)
        im = cv2.resize(im, (100, 100))
        im = np.expand_dims(im, axis=0)
        result = self.model.predict(im)
        result_letter = self.map_characters[np.argmax(result[0])]
        return str(result_letter)

    @staticmethod
    def load_model(model_path, weight_path):
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
