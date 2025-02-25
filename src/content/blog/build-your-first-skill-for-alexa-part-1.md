---
title: "Build your first skill for Alexa : Part 1, how does it work"
description: 'It all begins when you say "Alexa." This charming little name is the hotword, the trigger word in French, which initiates the recording of your request.'
pubDate: "Dec 21 2017"
heroImage: 'https://circuitdigest.com/sites/default/files/inlineimages/u4/Homemade-Alexa.jpg'
---

# Alexa, if you didn't know, is the trendy high-tech toy. It's the conversational assistant with which you interact by voice. You can ask it all kinds of questions, plug in "skills" and even control your home automation installations by voice. "Skills" are the applications that you call and control by voice.

Alexa is also the interface through which brands will interact with their customers tomorrow. And if we experience the same enthusiasm as for the mobile application market, it's better to be ready to get your piece of the pie.

As a scandal about espionage techniques has just broken out and a video questioning the links between Amazon and the CIA has gone viral, there couldn't be a better time to write this article.

If that hasn't awakened the Snowden sleeping in you, then you can continue reading this article and discover how to develop your first skill for Alexa.

## HOW ALEXA WORKS

It all begins when you say "Alexa." This charming little name is the hotword, the trigger word in French, which initiates the recording of your request.

The audio recording is then sent to Amazon's servers. Amazon uses Machine Learning to help recognize the words spoken (don't worry, you can use your best accent, it has been trained with much worse) and to understand the question, this is what we call "Natural Language Processing." Once understood, Amazon queries the corresponding system to return the requested information.

### How does a "skill" work?

![alt text](https://www.ux-republic.com/wp-content/uploads/2017/03/alexa_schema.png "Schema of how Alexa works")

Unlike smartphones, here no application is installed locally. All "skills" are stored at Amazon and the user chooses through their dashboard (or the official Alexa application) which "skills" they wish to activate.

Skills are invoked by their name ("Alexa launch My Super Skill")

And just like with an API, you can also add parameters to your request ("Alexa ask My Super Skill for the weather in London"). Here, as you've guessed, the parameter is "London."

### But how does Alexa know which request to perform and what to do with my parameter?

A "skill" is composed of three parts:

Your program,

- An "Intent Schema,"
- A "Sample Utterances" file

"Sample Utterances" is a really complicated term to designate a file containing several ways to invoke your "skill" and which requests to execute in these cases.

```text
GetWeather what's the weather in {Location}
GetWeather weather {Location}
GetWeather will it rain in {Location}
GetSingles ladies between {Age1} and {Age2} in {Location}
```

And on the other side, we have the declarative schema of the types of variables expected by the GetWeather function

```json
{
 "intents": [
  {
   "intent": "GetWeather",
   "slots": [
   {
    "name": "Location",
    "type": "AMAZON.EUROPE_CITY"
   }
   ]
  },
  {
  "intent": "GetSingles",
  "slots": [
    {
     "name": "Location",
     "type": "AMAZON.EUROPE_CITY"
    },
    {
     "name": "Age1",
     "type": "AMAZON.NUMBER"
    },
    {
     "name": "Age2",
     "type": "AMAZON.NUMBER"
    }
   ]
  }
 ]
}
```

There are as many "slots" (the variable types) declared as variables required for your function.

In this way, after Speech-to-Text, the Natural Language Processing algorithm makes the connection between the words and the announced types of "slots."

And "Alexa ask My Super Skill to find single women between forty and fifty years old in Paris" will be translated to GetSingles('paris',40,70)

The complete list of "slots" is available at this address: [https://developer.amazon.com/fr/docs/custom-skills/slot-type-reference.html](https://developer.amazon.com/fr/docs/custom-skills/slot-type-reference.html) and if the "slot" you need doesn't exist, you can always create it.

## CREATE YOUR DEVELOPMENT ENVIRONMENT

There are several ways to test your code. One prerequisite condition, have an Amazon account.

- Echosim.io

![Echosim.io](https://m.media-amazon.com/images/G/01/moile-apps/dex/alexa/echosim_4.png "Echosim.io")

This website allows you to test your commands directly in the browser

- Reverb.ai

![Reverb.ai](https://web.archive.org/web/20190409210324im_/https://reverb.ai/img/reverb-macos.jpg "Reverb.ai")

Reverb also allows you to test your commands in the browser. Its added value is that it is also possible to download the application directly on your Mac, your iPhone (iOS 10 minimum) or your Android (Android 5.0 minimum)

- Alexa-avs-sample-app

![DIY Alexa](https://opengraph.githubassets.com/2e0898ac42b27b55be1bd8578bc012b6e200bfe31b30dd02959114fa19b914da/Superdrac/alexa-avs-sample-app "Alexa AVS")

You enjoy tinkering and are looking for your next ideal project for a rainy Sunday? Then head to Alexa's official GitHub, regularly updated by Amazon developers.

All instructions are detailed there to create your Alexa on Raspberry Pi, Linux, Mac and Windows.

You can now purchase an Amazon Echo or Echo Dot: since June 13, it is available in France.

## AND NOW HOW DO I CODE MY "SKILL"?

We'll see that in the second part of this article, available at this address: [https://jzarca01.github.io/blog/build-your-first-skill-for-alexa-part-2/](https://jzarca01.github.io/blog/build-your-first-skill-for-alexa-part-2/) 😉

Thank you for reading me, and if you liked the article, don't hesitate to share it on social networks.