import cv2
import shutil
import numpy as np
import os

for filename in os.listdir('ori/test'):
    ori = cv2.imread('ori/test/'+filename)
    msk = cv2.imread('msk/test/'+filename)
    msk = cv2.cvtColor(msk, cv2.COLOR_BGR2GRAY)
    ret, gray_msk = cv2.threshold(msk, 200, 255, cv2.THRESH_BINARY_INV)
    kernel = np.ones((5, 5), np.uint8)
    gray_msk = cv2.erode(gray_msk, kernel, iterations=2)

    cv2.imwrite('gray_msk/'+filename, gray_msk)

    ori_cpy = ori.copy()
    ori_gray = cv2.cvtColor(ori_cpy, cv2.COLOR_BGR2GRAY)
    segged = np.zeros_like(ori_gray)
    print(segged.shape)
    segged[gray_msk == 255] = ori_gray[gray_msk == 255]

    cv2.imwrite('segged/'+filename, segged)

    print('Processed ' + filename)


