from __future__ import print_function
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from .Classifier import Classifier
import cv2
import numpy as np
import base64
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Links for each sign language picture to online image server
numbers = {
    '1': 'https://i.ibb.co/R40rKGC/1.jpg',
    '2': 'https://i.ibb.co/HNLRcDw/2.jpg',
    '3': 'https://i.ibb.co/W27Gr39/3.jpg',
    '4': 'https://i.ibb.co/r46sRWV/4.jpg',
    '5': 'https://i.ibb.co/zFknqPd/5.jpg',
    '6': 'https://i.ibb.co/CVpVSPq/6.jpg',
    '7': 'https://i.ibb.co/wC33gFc/7.jpg',
    '8': 'https://i.ibb.co/jv3Lkmp/8.jpg',
    '9': 'https://i.ibb.co/tcGzdYc/9.jpg',
}

alphabets = {
    'a': 'https://i.ibb.co/TLkkghg/A.png',
    'b': 'https://i.ibb.co/BNsLzvS/B.png',
    'c': 'https://i.ibb.co/fGKzr5F/C.png',
    'd': 'https://i.ibb.co/G962j3F/D.png',
    'e': 'https://i.ibb.co/JKbBPSX/E.png',
    'f': 'https://i.ibb.co/ZBCqD8V/F.png',
    'g': 'https://i.ibb.co/9Hjc9yx/G.png',
    'h': 'https://i.ibb.co/CmPHBzP/H.png',
    'i': 'https://i.ibb.co/hK11HvT/I.png',
    'j': 'https://i.ibb.co/nLHs7dt/J.png',
    'k': 'https://i.ibb.co/x2RGWxR/K.png',
    'l': 'https://i.ibb.co/QPR3fD4/L.png',
    'm': 'https://i.ibb.co/Z14MyPC/M.png',
    'n': 'https://i.ibb.co/HYktXw2/N.png',
    'o': 'https://i.ibb.co/2d49M00/O.png',
    'p': 'https://i.ibb.co/dPr2Hf6/P.png',
    'q': 'https://i.ibb.co/RSK3GP9/Q.png',
    'r': 'https://i.ibb.co/VDZpskk/R.png',
    's': 'https://i.ibb.co/C55gkCQ/S.png',
    't': 'https://i.ibb.co/b1pM20F/T.png',
    'u': 'https://i.ibb.co/h2c83Dd/U.png',
    'v': 'https://i.ibb.co/0hMMH4h/V.png',
    'w': 'https://i.ibb.co/2PPf224/W.png',
    'x': 'https://i.ibb.co/dcQ32kj/X.png',
    'y': 'https://i.ibb.co/DC2G3HY/Y.png',
    'z': 'https://i.ibb.co/rxhfVdt/Z.png',
}

classifier = Classifier(
    gesture_classifier_model_path='/server/server/api/models/rec.json',
    gesture_classifier_weight_path='/server/server/api/models/rec_90_epochs.h5',
    detector_ckpt_path='/server/server/api/models/frozen_inference_graph_2.pb',
    inference_model_path='/server/server/api/models/mobnet4f_cmu_adadelta_t1_model.pb'
)


def data_uri_to_cv2_img(uri):
    """
    convert uri to cv2 image
    :param uri: 
    :return: 
    """
    encoded_data = uri.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


@api_view(['GET', 'POST'])
@renderer_classes([JSONRenderer, ])
def get_classification(request):
    if request.method == 'POST':
        img_uri = request.data.get('uri')
        has_multiple = request.data.get('has_multiple')

        if has_multiple == 'true':
            results = []
            for uri in img_uri:
                frame = data_uri_to_cv2_img(uri)
                result = classifier.get_result(frame)
                results.append(result)
            return Response({'content': results})
        else:
            frame = data_uri_to_cv2_img(img_uri)
            result = classifier.get_result(frame)
            return Response({'content': result})
    return Response()


@api_view(['GET'])
@renderer_classes([JSONRenderer, ])
def get_tutorial(request):
    """ API Endpoint for tutorial """
    return Response({
        'numbers': numbers,
        'alphabets': alphabets
    })


@api_view(['POST'])
@renderer_classes([JSONRenderer, ])
def search(request):
    print(request.data)
    searchkey = request.data.get("key")
    searchkey = searchkey.lower()
    res = []
    for c in searchkey:
        if c in numbers:
            res.append(numbers[c])
        elif c in alphabets:
            res.append(alphabets[c])

    return Response(res)