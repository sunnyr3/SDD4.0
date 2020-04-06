import cv2
import shutil
import numpy as np
import os
import random as rng


class segTool:
    def __init__(self, ori_, msk_):
        self.ori = ori_
        self.msk = msk_

    @staticmethod
    def cvx_hall(src_gray, val):
        threshold = val
        # Detect edges using Canny
        canny_output = cv2.Canny(src_gray, threshold, threshold * 2)
        # Find contours
        _, contours, _ = cv2.findContours(canny_output, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        # Find the convex hull object for each contour
        hull_list = []
        # for i in range(len(contours)):
        #     hull = cv2.convexHull(contours[i])
        #     hull_list.append(hull)
        if len(contours) > 0:
            contours = sorted(contours, key=cv2.contourArea, reverse=True)
            hull = cv2.convexHull(contours[0])
            hull_list.append(hull)
        # Draw contours + hull results
        drawing = np.zeros((canny_output.shape[0], canny_output.shape[1]), dtype=np.uint8)
        if len(contours) > 0:
            hull_list = sorted(hull_list, key=cv2.contourArea, reverse=True)
            drawing = cv2.drawContours(drawing, hull_list, -1, 255, thickness=-1)
        return drawing, hull_list

    def get_seg(self):
        ret, gray_msk = cv2.threshold(self.msk, 127, 255, cv2.THRESH_BINARY_INV)
        kernel = np.ones((5, 5), np.uint8)
        gray_msk = cv2.dilate(gray_msk, kernel, iterations=2)
        cvx_hulled, cvx_lst = self.cvx_hall(gray_msk, 127)
        return gray_msk, cvx_hulled, cvx_lst


