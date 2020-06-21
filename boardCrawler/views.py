import codecs, json
import csv, io
import string, random, secrets

from django.http import JsonResponse,HttpResponse
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_POST, require_http_methods
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

import pandas as pd
import numpy as np
import tensorflow as tf
import tensorflow_datasets as tfds

from .forms import SignUpForm

@csrf_exempt
@require_http_methods(['POST', 'GET'])
def analyze(request):
    if request.method == "GET":
        return JsonResponse({
            'No Data': 'Upload a CSV File'
        })

    else:
        csv_file = request.FILES['file']
        # check if it is a csv file
        if not csv_file.name.endswith('.csv'):
            messages.error(request, 'THIS IS NOT A CSV FILE')

        randString1 = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 7))
        randString2 = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 7))
        secureStr = ''.join((secrets.choice(string.ascii_letters) for i in range(6)))

        randomName=  randString1 + randString2 + secureStr  + '.csv'
        print("Single String:  ", randomName)

        fname = csv_file.name
        filepath = r'G:/New folder (3)/sentimentVenv/scrapy-with-django-master/media/' + randomName

        fs = FileSystemStorage()
        fs.save(randomName, csv_file)
        reader = csv.reader(csv_file)
        data_set = csv_file.read().decode('UTF-8')
        print(" :::::::::::::::::::::::::::::::   HELLO       ::::::::::::::::::::::")

        sa_load = tf.keras.models.load_model('G:/New folder (3)/sentimentVenv/scrapy-with-django-master/boardCrawler/sentiment_analysis.hdf5', compile=False)
        encoder = tfds.features.text.TokenTextEncoder.load_from_file('G:/New folder (3)/sentimentVenv/scrapy-with-django-master/boardCrawler/sa_encoder.vocab')

        df = pd.read_csv(filepath,encoding='utf-8')
        df.head()
        df['Rating'].value_counts()

        print(df['Rating'].value_counts())
        print(">>>>>>>>>>>>>>>>>        I am MUHAMMAD SOHAIB RAZA     <<<<<<<<<<<<<<<<<<<<<<<< ")

        rev = df['Reviews']

        def pad_to_size(vec, size):
            zeros = [0] * (size -len(vec))
            vec.extend(zeros)
            return vec

        def predict_fn_one_sentiment(pred_text):
            encoded_pred_text = encoder.encode(pred_text)
            print(encoded_pred_text)
            encoded_pred_text = pad_to_size(encoded_pred_text,100)
            print(encoded_pred_text)
            encoded_pred_text = tf.cast(encoded_pred_text, tf.float32)
            prediction = sa_load.predict(tf.expand_dims(encoded_pred_text, 0))
            if prediction > 1:
                print("Sentiment of this review is positive :)")
                return prediction
            if prediction >= 0 and prediction <= 2:
                print("Sentiment of this review is Netural,just satisfying")
                return prediction
            if prediction < 1:
                print("Sentiment of this product is negetive :(")
                return prediction

        positiveCount=0
        negativeCount=0
        neutralCount=0
        def predict_fn(pred_text):
            nonlocal positiveCount,negativeCount,neutralCount
            for rev in pred_text:
                #print(rev)
                encoded_pred_text = encoder.encode(rev)
                encoded_pred_text = pad_to_size(encoded_pred_text,300)
                #print(encoded_pred_text)
                encoded_pred_text = tf.cast(encoded_pred_text, tf.float32)
                predictions = sa_load.predict(tf.expand_dims(encoded_pred_text, 0))
                print(predictions)

                if predictions > 2:
                    positiveCount += 1
                if predictions >= 0 and predictions <= 2:
                    neutralCount += 1
                if predictions < 0:
                    negativeCount += 1

            return positiveCount,negativeCount,neutralCount

        predictions = predict_fn(rev)
        print("PREDICTION >>>...............:::::  <<<<<<<<<<<<<<<<    ", predictions)

        # pred_text=input("Write sentense to check sentiment: ")
        # prediction=predict_fn_one_sentiment(pred_text)
        # print(prediction)

        print(positiveCount)
        print(negativeCount)
        print(neutralCount)
        sentimentString =""
        sentimentObj={}
        if positiveCount > negativeCount and positiveCount > neutralCount:
            sentimentString = "Most of the users are happy with your product."
            sentimentObj.update({
                    'comment':sentimentString,
                    'flag' : 1
                    })

        print(sentimentObj)
        if negativeCount > positiveCount and negativeCount> neutralCount:
            sentimentString = "Most of the users are unhappy with your product"
            sentimentObj.update({
                    'comment':sentimentString,
                    'flag' : -1
                    })
        if neutralCount > positiveCount and neutralCount> negativeCount:
            sentimentString = "Your product is just satisfactory"
            sentimentObj.update({
                    'comment':sentimentString,
                    'flag' : 0
                    })

        rating = df['Rating'].value_counts().to_json()
        ratingCounts = json.loads(rating)

        totalReviews = len(df.index)

        return JsonResponse({
            'posNegReviews' : {
                'positive':positiveCount,
                'negative': negativeCount,
                'neutral' :neutralCount
            },
            'ratingCounts': ratingCounts,
            'totalReviews' : totalReviews,
            'sentiment': sentimentObj,
        })


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})
