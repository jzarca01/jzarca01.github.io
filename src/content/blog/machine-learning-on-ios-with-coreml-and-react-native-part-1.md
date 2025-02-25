---
title: 'Machine Learning on iOS with CoreML and React-Native: Part 1, Creating a Model'
description: 'If you’re like me and have always dreamed of developing an app capable of distinguishing a hotdog from your neighbor’s dachshund, this tutorial is for you.'
pubDate: 'Mar 17 2018'
heroImage: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/8518019/not_hot_dog_app.png?quality=90&strip=all&crop=0,0,100,100'
---

If you’re like me and have always dreamed of developing an app capable of distinguishing a hotdog from your neighbor’s dachshund, this tutorial is for you.

Machine Learning solutions have long been available in the cloud via APIs, but they required an internet connection and their processing time could be long and costly.

With the release of iOS 11, Apple provided developers with its Machine Learning library, CoreML. Now, there is no need for a powerful server to process requests or to rely on a third-party API. CoreML handles everything using the computing power of your smartphone.

Curious about how to integrate it into your applications? It’s simpler than you might think.

Let’s take as an example the famous parody app Not Hotdog, introduced in the Silicon Valley TV series, which instantly tells the user whether the object they point their phone at is a hotdog or not.

![Not hotdog](https://media3.giphy.com/media/l0Iy9iqThC2ueLTkA/200.gif?cid=6c09b9527e9h8mdfldgnnfpn1prr3gb9l4gb5rc7oqepivxs&ep=v1_internal_gif_by_id&rid=200.gif&ct=g)

## What You Will Learn in This Part

- Setting up your environment
- Collecting data
- Creating your image classification model with Turi Create

## Requirements

- macOS 10.12+
- or Linux (with glibc 2.12+)
- or Windows 10 (via WSL)

- Python 2.7, 3.5 or 3.6
- Architecture x86_64

## What is Turi Create ?

It is a tool that “simplifies the development of custom machine learning models” that can later be used in applications leveraging the CoreML library.
Turi Create is based on [MXNet d'Apache](https://mxnet.apache.org/), a deep learning framework.

Turi Create provides developers with a flexible technology for image classification, object detection, recommendation systems, and more.
The tool is extremely easy to use, flexible, and fast.

## Installation

Like many Machine Learning tools, **Python** is the primary language used. But don’t worry, the code is straightforward to understand.

It is recommended to use a virtual environment, **virtualenv**, by running the command:

```shell
pip install virtualenv
```

If you don’t have pip, Python’s package manager, you can install it via [Homebrew](https://brew.sh/) using the command:

```shell
brew install pip
```

Then,

```shell
// Create a Python virtual environment
cd ~
virtualenv venv

// Activate your virtual environment
source ~/venv/bin/activate

// Install Turi Create
pip install -U turicreate
```

## Collecting Data

Before training a model, we need data.

You can find datasets on [Kaggle](www.kaggle.com), which offers over 14 million datasets.

For our project, we need two categories of images: Hotdog and... Not Hotdog, which can be downloaded from: [https://www.kaggle.com/datasets/thedatasith/hotdog-nothotdog](https://www.kaggle.com/datasets/thedatasith/hotdog-nothotdog)

![So many hotdogs](https://i.insider.com/6111769edaba4e0019e59ea1)

You can find helpful scripts in the [turicreate-easy-scripts](https://github.com/jzarca01/turicreate-easy-scripts) repository.

## Training the model

Once the images are downloaded and categorized, the next step is training the classification model.

To do this, use the Python script available in the previously downloaded repository:

```shell
cd train-model
python train-model.py
```

![Turi Create GUI](https://fritz.ai/wp-content/uploads/2023/12/1bNeTPBPT3W9HhuTIV8BCyg.webp)

After about ten minutes (or longer, depending on the number of images), you’ll obtain a Classifier.mlmodel file, which we’ll use in the second part of this tutorial.

Thank you for reading, and if you enjoyed this article, feel free to share it on social media.