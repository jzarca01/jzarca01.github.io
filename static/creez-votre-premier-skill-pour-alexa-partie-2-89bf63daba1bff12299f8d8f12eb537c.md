---
title: "Créez votre premier skill pour Alexa : Partie 2, la mise en pratique"
date: "2017-12-22"
draft: false
path: "/blog/creez-votre-premier-skill-pour-alexa-partie-2"
---
Dans cette partie nous allons voir comment créer votre premier skill pour connaître la météo dans n’importe quelle ville d’Europe et à la fin de cet article vous pourrez repartir avec, c’est promis.
​
Maintenant que vous avez assimilé tous les concepts importants associés à la création de skills pour Alexa, nous pouvons enfin rentrer dans le vif du sujet. Si ce n’est pas le cas, n’hésitez surtout pas à relire la première partie de cet article, à cette adresse : [http://localhost:2368/creez-votre-premier-skill-pour-alexa-partie-1/](http://localhost:2368/creez-votre-premier-skill-pour-alexa-partie-1/).
​

### Les pré-requis pour cette partie :

- Un compte sur le portail développeur Amazon (https://developer.amazon.com/edw/home.html#/)
- Votre environnement de test
- Node 6 et npm installés (https://nodejs.org/)
- Les concepts de base de ES6
- Votre éditeur de code favori
​

## L’INSTALLATION DES LIBRAIRIES

​
Ici, on fait au plus simple.

​
![easy gif](https://i2.wp.com/media.giphy.com/media/wVJYDdgvARMJy/giphy.gif?resize=388%2C220&ssl=1)
​

```shell
mkdir MyAwesomeSkill
cd MyAwesomeSkill
npm init

npm install —save alexa-skill-kit yahoo-weather
```

Une petite explication s’impose: Alexa-skill-kit propose une première couche d’abstraction pour la librairie officielle d’Amazon, afin de rendre le développement le plus simple et le plus intuitif possible.
Yahoo-weather, quant à lui, est tout simplement un wrapper pour l’API Météo de Yahoo
​

Pour plus d’informations, vous pouvez consulter les repo [https://github.com/stojanovic/alexa-skill-kit](https://github.com/stojanovic/alexa-skill-kit) et [https://github.com/mamal72/node-yahoo-weather](https://github.com/mamal72/node-yahoo-weather)
​

## LE CODE

​
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
            return `Il fait actuellement ${condition.text} avec ${condition.temp} degrés à ${parsedMessage.intent.slots.Location.value}`
          })
          .catch(() => {
            return `Hum, je ne trouve aucune donnée pour ${parsedMessage.intent.slots.Location.value}.`
          })
}
```
​
Vous vous souvenez du concept d’Intent, de Slots et d’Utterances, n’est-ce pas ? Si ce n’est pas le cas, je vous invite à relire les sections correspondantes dans la [première partie de cet article](http://localhost:2368/creez-votre-premier-skill-pour-alexa-partie-1/).
​

Dans l’Intent Schema, nous avions défini la fonction GetWeather qui prenait comme Slot un objet Location de type AMAZON.EUROPE_CITY

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

Et dans le fichier de Sample Utterances, nous décrivions différentes manières d’appeler cette fonction à partir d’Alexa.

```text
GetWeather quelle est la météo à {Location}
GetWeather météo à {Location}
```


Ainsi, lorsque le skill est appelé par l’utilisateur, il saura quelle fonction exécuter.
Lorsque l’utilisateur dira **« Alexa, demande à Mon Super Skill la météo à Paris »**, notre skill renverra **« Il fait actuellement Sunny avec 20 degrés à Paris »**.

​
![alexa gif](https://media.giphy.com/media/g3MjnaLkNl19C/giphy.gif)
​

Il ne vous reste plus qu’à zipper votre projet pour passer à la suite.
​
Petite astuce pour les utilisateurs de Mac et de Linux: à partir de votre terminal, depuis le répertoire du projet, entrez la commande suivante pour zipper le projet.
​

```shell
zip -r ../MyAwesomeSkill.zip *
```

​
Le code est également disponible à cette adresse : [https://github.com/jzarca01/alexaskill-jsrepublic](https://github.com/jzarca01/alexaskill-jsrepublic)
​

## ENVOYEZ LE SKILL SUR LES SERVEURS AMAZON

Les ressources créées dans Amazon Web Services sont chacune identifiées de façon unique par un Amazon Resource Name (ARN).
Dans cette partie, nous allons créer une fonction Lambda sur les serveurs d’Amazon et y envoyer notre projet compressé.
​
Munissez vous de vos identifiants Amazon Developer et rendez vous à l’adresse suivante : [https://console.aws.amazon.com/?nc2=h_m_mc](https://console.aws.amazon.com/?nc2=h_m_mc)
Puis cliquez en haut à gauche sur « Services » puis « Lambda »

​
￼![alt text](https://i1.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/1.png?w=629 "Alexa AWS Lambda")

​
Il ne vous reste plus qu’a cliquer sur « Créer une fonction Lambda » puis sélectionner « Fonction vide ».
​
Sélectionnez « Kit Alexa Skills » parmi la liste des déclencheurs.

​
![alt text](https://i2.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/2.png?w=912 "Alexa Kit AVS Skill")￼

​
C’est dans l’onglet « Configurer une fonction » que notre code sera chargé sur les serveurs Amazon.
Renseignez un nom et choisissez votre environnement d’exécution. Ici, choisissez « NodeJS 6.10 » puisque notre code utilise la syntaxe ES6.
Le nom n’a pas d’importance, il ne sera pas réutilisé plus tard.
​
Puis dans la section suivante, choisissez dans la liste déroulante « Type d’entrée de code » l’option « Charger un fichier ZIP ».

​
![alt text](https://i2.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/3.png?w=493 "Alexa ZIP")￼

​
![alt text](https://i2.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/4.png?w=933 "Alexa ZIP Recap")

​
￼Enfin, après la page de récapitulatif, il ne vous reste plus qu’a cliquer sur « Créer la fonction » pour passer à l’étape suivante.
​
Oh et une dernière chose, notez l’adresse ARN de votre fonction, vous en aurez besoin pour la prochaine partie de cette article.
​

## ENREGISTREZ VOTRE SKILL AUPRÈS D’AMAZON
​
Munissez vous de vos identifiants Amazon Developer et rendez vous à l’adresse suivante : [https://developer.amazon.com/edw/home.html#/skills](https://developer.amazon.com/edw/home.html#/skills)
Si jusque là vous n’aviez pas crée votre compte, c’est le moment.

​
![alt text](https://i1.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/5.png?w=1202 "Alexa Developer Console")

​
Puis cliquez sur le bouton « Add a New Skill » en haut à droite de l’écran.
​
A partir d’ici, vous êtes guidés tout au long du processus pour fournir toutes les informations nécessaires à la configuration de votre nouveau skill.

​
![alt text](https://i2.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/6.png?w=642 "Alexa Skill Information")￼

​
Dans la section « Interaction Model », vous retrouvez le « Intent Schema » ainsi que les « Sample Utterances » dont nous ne cessons de parler depuis la première partie de cet article.￼

​
![alt text](https://i2.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/8.png?w=830 "Alexa Sample Utterances")

​
Il est tout à fait possible de créer un skill multilingue, mais nous n’en parlerons pas dans cet article. Si toutefois le sujet vous intéresse, voici le lien vers la documentation officielle (https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-skills-in-multiple-languages)
​
Enfin, dans la section « Configuration », il vous est demandé si votre skill est hébergé sur les serveurs Amazon ou bien sur un serveur privé. Ici, nous avons cherché à aller au plus simple, chez Amazon. C’est là que l’adresse ARN que vous avez notée précédemment servira. Elle indique l’adresse où votre skill est exécuté.

​
￼![alt text](https://i1.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/9.png?w=706 "Alexa Global Fields ARN")

​
Si tout s’est bien passé, le résultat du simulateur correspondra à ce que nous attendions.

​
￼![alt text](https://i1.wp.com/blog.js-republic.com/wp-content/uploads/2017/04/10.png?w=817 "Alexa Service Simulator")

​
Une dernière étape pour profiter pleinement de votre skill durement codé, l’activation.
Comme expliqué dans la première partie de cet article, les skills ne sont pas téléchargés sur votre device. Ils sont simplement activés depuis votre dashboard.

Par défaut, votre skill est activé, mais si ce n’était pas le cas, il faudrait vous connecter via l’application mobile Alexa pour l’activer depuis la section ‘Skills’.
​

Et tant qu’ils ne sont pas soumis pour une validation par Amazon, seulement le compte développeur y a accès.
En attendant, libérez votre créativité pour créer des skills toujours plus merveilleux.

​
![alexa gif](https://i1.wp.com/media.giphy.com/media/106holZERgWSFG/giphy.gif?resize=413%2C234&ssl=1)

​
Merci de m’avoir lu, et si l’article vous a plu, n’hésitez pas à le partager sur les réseaux sociaux.
