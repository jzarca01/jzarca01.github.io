---
title: "Create Your First Alexa Skill: Part 2, Implementation"
description: 'In this part we will see how to create your first skill to know the weather in any city in Europe and at the end of this article you will be able to take it with you, that's a promise.'
pubDate: "Dec 22 2017"
heroImage: 'https://content.instructables.com/F74/TDYC/K2GAAFQY/F74TDYCK2GAAFQY.jpg'
---

In this part we will see how to create your first skill to know the weather in any city in Europe and at the end of this article you will be able to take it with you, that's a promise.

Now that you have assimilated all the important concepts associated with creating skills for Alexa, we can finally get to the heart of the matter. If not, please don't hesitate to reread the first part of this article, at this address: [http://localhost:2368/creez-votre-premier-skill-pour-alexa-partie-1/](http://localhost:2368/creez-votre-premier-skill-pour-alexa-partie-1/).

### Prerequisites for this part:

- An account on the Amazon developer portal (https://developer.amazon.com/edw/home.html#/)
- Your test environment
- Node 6 and npm installed (https://nodejs.org/)
- Basic ES6 concepts
- Your favorite code editor

## INSTALLING THE LIBRARIES

Here, we keep it simple.

![easy gif](https://i2.wp.com/media.giphy.com/media/wVJYDdgvARMJy/giphy.gif?resize=388%2C220&ssl=1)

```shell
mkdir MyAwesomeSkill
cd MyAwesomeSkill
npm init

npm install —save alexa-skill-kit yahoo-weather
```

A little explanation is in order: Alexa-skill-kit offers a first layer of abstraction for Amazon's official library, to make development as simple and intuitive as possible.
Yahoo-weather, for its part, is simply a wrapper for Yahoo's Weather API

For more information, you can consult the repos [https://github.com/stojanovic/alexa-skill-kit](https://github.com/stojanovic/alexa-skill-kit) and [https://github.com/mamal72/node-yahoo-weather](https://github.com/mamal72/node-yahoo-weather)

## THE CODE

**INDEX.JS**

```javascript
const alexaSkillKit = require('alexa-skill-kit')
const intent = require('./lib/Intents')

exports.handler = function(event, context) {
    alexaSkillKit(event, context, parsedMessage => {
        // console.log(JSON.stringify(parsedMessage))
        return intent(parsedMessage)
    })
}
```

**LIB/INTENTS.JS**

```javascript
const weather = require('yahoo-weather')

module.exports = function(parsedMessage) {
    if (parsedMessage.type === 'IntentRequest' && parsedMessage.intent.name === 'GetWeather') {
        return weather(parsedMessage.intent.slots.Location.value)
          .then(info => info.item)
          .then(item => item.condition)
          .then(condition => {
            //console.log('info', condition)
            return `It's currently ${condition.text} with ${condition.temp} degrees in ${parsedMessage.intent.slots.Location.value}`
          })
          .catch(() => {
            return `Hum, i cannot find any data for ${parsedMessage.intent.slots.Location.value}.`
          })
}
```

You remember the concept of Intent, Slots, and Utterances, don't you? If not, I invite you to reread the corresponding sections in the [first part of this article](http://localhost:2368/creez-votre-premier-skill-pour-alexa-partie-1/).

In the Intent Schema, we had defined the GetWeather function that took as a Slot a Location object of type AMAZON.EUROPE_CITY

```json
{
    "intents": [
        {
            "intent": "GetWeather",
            "slots": [
                {
                    "name: "Location",
                    "type": "AMAZON.EUROPE_CITY"
                }
            ]
        }
    ]
}
```

And in the Sample Utterances file, we described different ways to call this function from Alexa.

```text
GetWeather quelle est la météo à {Location}
GetWeather météo à {Location}
```

Thus, when the skill is called by the user, it will know which function to execute.
When the user says **"Alexa, ask My Super Skill for the weather in Paris"**, our skill will return **"It is currently Sunny with 20 degrees in Paris"**.

![alexa gif](https://media.giphy.com/media/g3MjnaLkNl19C/giphy.gif)

All you have to do now is zip your project to move on to the next step.

Little tip for Mac and Linux users: from your terminal, from the project directory, enter the following command to zip the project.

```shell
zip -r ../MyAwesomeSkill.zip *
```

The code is also available at this address: [https://github.com/jzarca01/alexaskill-jsrepublic](https://github.com/jzarca01/alexaskill-jsrepublic)

## SEND THE SKILL TO AMAZON SERVERS

Resources created in Amazon Web Services are each uniquely identified by an Amazon Resource Name (ARN).
In this part, we will create a Lambda function on Amazon servers and send our compressed project to it.

Equip yourself with your Amazon Developer credentials and go to the following address: [https://console.aws.amazon.com/?nc2=h_m_mc](https://console.aws.amazon.com/?nc2=h_m_mc)
Then click on "Services" at the top left and then "Lambda"

￼![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/1.png "Alexa AWS Lambda")

All you have to do is click on "Create a Lambda function" and then select "Empty function".

Select "Alexa Skills Kit" from the list of triggers.

![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/2.png "Alexa Kit AVS Skill")￼

It is in the "Configure a function" tab that our code will be loaded onto Amazon servers.
Enter a name and choose your execution environment. Here, choose "NodeJS 6.10" since our code uses ES6 syntax.
The name is not important, it will not be reused later.

Then in the next section, choose in the dropdown list "Code entry type" the option "Upload a ZIP file".

![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/3.png "Alexa ZIP")￼

![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/4.png "Alexa ZIP Recap")

Finally, after the summary page, all you have to do is click on "Create function" to move on to the next step.

Oh and one last thing, note the ARN address of your function, you will need it for the next part of this article.

## REGISTER YOUR SKILL WITH AMAZON

Equip yourself with your Amazon Developer credentials and go to the following address: [https://developer.amazon.com/edw/home.html#/skills](https://developer.amazon.com/edw/home.html#/skills)
If you hadn't created your account until now, now's the time.

![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/5.png "Alexa Developer Console")

Then click on the "Add a New Skill" button at the top right of the screen.

From here, you are guided throughout the process to provide all the information necessary for the configuration of your new skill.

![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/6.png "Alexa Skill Information")￼

In the "Interaction Model" section, you will find the "Intent Schema" as well as the "Sample Utterances" that we have been talking about since the first part of this article.￼

![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/7.png "Alexa Sample Utterances")

It is entirely possible to create a multilingual skill, but we will not discuss it in this article. If you are interested in the subject, here is the link to the official documentation (https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-skills-in-multiple-languages)

Finally, in the "Configuration" section, you are asked whether your skill is hosted on Amazon servers or on a private server. Here, we sought to keep it simple, with Amazon. This is where the ARN address you noted previously will be used. It indicates the address where your skill is executed.

￼![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/9.png "Alexa Global Fields ARN")

If everything went well, the result of the simulator will correspond to what we expected.

￼![alt text](https://www.ux-republic.com/wp-content/uploads/2017/04/10.png "Alexa Service Simulator")

One last step to fully enjoy your hard-coded skill, activation.
As explained in the first part of this article, skills are not downloaded to your device. They are simply activated from your dashboard.

By default, your skill is activated, but if it wasn't, you would need to connect via the Alexa mobile app to activate it from the 'Skills' section.

And as long as they are not submitted for validation by Amazon, only the developer account has access to them.
In the meantime, unleash your creativity to create ever more wonderful skills.

![alexa gif](https://i1.wp.com/media.giphy.com/media/106holZERgWSFG/giphy.gif?resize=413%2C234&ssl=1)

Thank you for reading me, and if you liked the article, don't hesitate to share it on social networks.