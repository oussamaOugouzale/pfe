from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
# from .models import Image,offrefield,bangalo,Own_Message,All_fields,Project
from django.contrib.auth.decorators import login_required
import tensorflow as tf
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

import cv2
from django.http import StreamingHttpResponse
from django.views.decorators import gzip
import threading
import joblib
from sklearn.metrics import accuracy_score
from skimage.feature import hog
import os 
import numpy as np
import cv2
import cv2
import numpy as np
from PIL import Image
import dlib

from keras.models import model_from_json

@csrf_exempt
def home(request):
    # if request.method == 'POST':
    #     username = request.POST['id']
    #     password = request.POST['password']
    #     user = authenticate(request, username=username, password=password)
    #     if user is not None:
    #         print(user)
    #         login(request, user)
            return redirect('second')
    #     else:
    #         return render(request, 'login.html')
    # else:
    #     return render(request, 'login.html')

def second(request):
    myCheckboxCNN = False
    myCheckboxKNN = False
    myCheckboxSVM = False
    accuracy = 0.0  # Assuming accuracy is another variable you want to pass to the template

    # Your code to handle form submission and set the value of myCheckboxCNN based on user input
    if request.method == 'POST':
        if 'myCheckboxCNN' in request.POST:
            myCheckboxCNN = True
            myCheckboxKNN = False
            myCheckboxSVM = False
        if 'myCheckboxKNN' in request.POST:
            myCheckboxKNN = True
            myCheckboxCNN = False
            myCheckboxSVM = False
        if 'myCheckboxSVM' in request.POST:
            myCheckboxSVM = True
            myCheckboxCNN = False
            myCheckboxKNN = False
        request.session['myCheckboxCNN'] = myCheckboxCNN
        request.session['myCheckboxkNN'] = myCheckboxKNN
        request.session['myCheckboxSVM'] = myCheckboxSVM
    svm_clf = joblib.load('app/svm_model.pkl')
    features = feat_lab(['app/S138_008_00000008.png'])
    y_pred = svm_clf.predict(features)
    accuracy = accuracy_score(np.array(['contempt']), y_pred)
    return render(request, 'home.html',{ 'accuracy' : accuracy })



class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def __del__(self):
        self.video.release()
    
    def camread(self):
        return self.video.read()

    def get_frame(self):
        image = self.frame
        _, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()
# Define the SVM model outside functions
svm_clf = joblib.load('app/svm_model.pkl')


# Load the face detector
detector = dlib.get_frontal_face_detector()


model = tf.keras.models.load_model("app/emotiondetector.h5")

# Define the predictSVM function with svm_clf as an argument
def predictSVM(im):
    im = resizeImage(im, 64)
    fd1 = hog(im, orientations=7, pixels_per_cell=(8, 8), cells_per_block=(4, 4), block_norm='L2-Hys', transform_sqrt=False)
    fd1_reshaped = fd1.reshape(1, -1)
    prediction = svm_clf.predict(fd1_reshaped)
    return prediction

def predictKNN(im):
    im = resizeImage(im, 64)
    knn_classifier = joblib.load('app/knn_model.pkl')
    fd1 = hog(im, orientations=7, pixels_per_cell=(8, 8), cells_per_block=(4, 4), block_norm='L2-Hys', transform_sqrt=False)
    fd1_reshaped = fd1.reshape(1, -1)  # Reshape to a 2D array
    prediction = knn_classifier.predict(fd1_reshaped)
    return prediction

def predictCNN(im):
    labels = {0: 'angry', 1: 'disgust', 2: 'fear', 3: 'happy', 4: 'neutral', 5: 'sad', 6: 'surprise'}
    prediction = model.predict(im)
    prediction = labels[prediction.argmax()]
    return prediction


def extract_features(image):
    feature = np.array(image)
    feature = feature.reshape(1, 48, 48, 1)
    return feature / 255.0


def ef(img):
    feature = np.array(img)
    feature = feature.reshape(1,48,48,1)
    return feature/255.0

# Modify gen to accept the predictimg function as an argument
# Load the face detector
detector = dlib.get_frontal_face_detector()

# Modify gen to accept the predictimg function as an argument
def gen(camera, predict_func):
    while True:
        if predict_func == predictSVM or predict_func == predictKNN or predict_func == predictCNN:
            frame_bytes = camera.get_frame()  # Get frame as bytes
            frame_array = np.frombuffer(frame_bytes, dtype=np.uint8)  # Convert bytes to numpy array
            frame = cv2.imdecode(frame_array, cv2.IMREAD_COLOR)  # Decode the image


        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            x, y, w, h = face.left(), face.top(), face.width(), face.height()
            
            face_roi = gray[y-10:y+h, x-10:x+w]
            resized_face = cv2.resize(face_roi, (48, 48))
            
            if predict_func == predictSVM:
                    emotion_prediction = predict_func(resized_face)
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 1)
                    cv2.putText(frame, f" {emotion_prediction}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 3)    
                    cv2.putText(frame,"SVM", (10, 50 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 4)
            if predict_func == predictKNN:
                    emotion_prediction = predict_func(resized_face)
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 1)
                    cv2.putText(frame, f" {emotion_prediction}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 3)       
                    cv2.putText(frame,"KNN", (10, 50 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 4)      
            if predict_func == predictCNN:
                    face_image = gray[y:y+h, x:x+w]
                    face_image = cv2.resize(face_image, (48, 48))
                    face_features = extract_features(face_image)
                    emotion_prediction = predict_func(face_features)
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 1)
                    cv2.putText(frame, f" {emotion_prediction}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 3)    

                    cv2.putText(frame,"CNN", (10, 50 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 4) 
        ret, jpeg = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

# Update the video_feed view to pass the predictimg function to gen
@gzip.gzip_page
def video_feed(request):
    try:
        myCheckboxCNN = request.session.get('myCheckboxCNN', False)
        myCheckboxkNN = request.session.get('myCheckboxkNN', False)
        myCheckboxSVM = request.session.get('myCheckboxSVM', False)
        cam = VideoCamera()
        if myCheckboxSVM:
            return StreamingHttpResponse(gen(cam, predictSVM), content_type="multipart/x-mixed-replace;boundary=frame")
        if myCheckboxkNN:
            return StreamingHttpResponse(gen(cam, predictKNN), content_type="multipart/x-mixed-replace;boundary=frame")
        if myCheckboxCNN:
            return StreamingHttpResponse(gen(cam, predictCNN), content_type="multipart/x-mixed-replace;boundary=frame")
        else:
            return render(request, 'login.html')
    except:
        pass
    return render(request, 'login.html')



def feat_lab(imagePaths):

    features = []
    labels = []

    for imagePath in imagePaths:
        im = colortogray(imagePath)
        im = resizeImage(im,64)
        fd1 =  hog(im, orientations=7, pixels_per_cell=(8, 8),cells_per_block=(4, 4),block_norm= 'L2-Hys' ,transform_sqrt = False)

        features.append(fd1)

    features = np.array(features)
    return features

def colortogray(im):
    image = cv2.imread(im)
    imgray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return imgray


def resizeImage(image, size):
    # cv2.imshow('Resized', cv2.resize(image, (size,size), interpolation=cv2.INTER_CUBIC))
    return cv2.resize(image, (size,size))

