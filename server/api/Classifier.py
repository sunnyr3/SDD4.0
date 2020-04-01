from .HandDetectionEstimator import HandDetectionEstimator
from .HandGestureClassifier import HandGestureClassifier
from .HandInferenceEstimator import HandInferenceEstimator


class Classifier(object):
    def __init__(self, gesture_classifier_model_path, gesture_classifier_weight_path, detector_ckpt_path, inference_model_path):
        """

        :param gesture_classifier_model_path:
        :param gesture_classifier_weight_path:
        :param detector_ckpt_path:
        :param inference_model_path:
        """
        self.gesture_classifier = HandGestureClassifier(gesture_classifier_model_path, gesture_classifier_weight_path)
        self.detector = HandDetectionEstimator(detector_ckpt_path)
        self.inferencer = HandInferenceEstimator(inference_model_path)

    def get_result(self, frame):
        """

        :param frame:
        :return:
        """
        if self.detector.check_if_hand_present(frame):
            inference_bg = self.inferencer.get_bg(frame)
            return self.gesture_classifier.get_result(inference_bg)
        else:
            return "Please move hand to the center"
