---
title: "Créez votre premier skill pour Alexa : Partie 1, le fonctionnement"
date: "2017-12-21"
draft: false
path: "/blog/creez-votre-premier-skill-pour-alexa-partie-1"
---
Alexa, si vous l’ignoriez, c’est le joujou high-tech à la mode. C’est l’assistant conversationnel avec lequel vous interagissez par la voix. Vous pouvez lui poser tout un tas de questions, plugger des « skills » et même contrôler vos installations domotiques par la voix. Les « skills », ce sont les applications que l’on appelle et contrôle par la voix.

Alexa, c’est également l’interface au travers de laquelle les marques interagiront avec leurs clients demain. Et si l’on connaît le même engouement que pour le marché des applications mobile, mieux vaut être prêt pour obtenir sa part du gâteau.

Alors qu’un scandale sur les techniques d’espionnage vient d’éclater et qu’une vidéo remettant en question les liens entre Amazon et la CIA est devenue virale, il n’y avait pas de meilleur moment pour écrire cet article.

Si cela n’a pas alerté le Snowden qui sommeille en vous, alors vous pouvez continuer à lire cet article et découvrir comment développer votre premier skill pour Alexa.

## LE FONCTIONNEMENT D’ALEXA

Tout commence au moment où vous aurez dit « Alexa ». Ce petit nom très charmant, c’est le hotword, le mot-déclencheur en français, qui déclenche l’enregistrement de votre requête.

L’enregistrement audio est ensuite envoyé aux serveurs d’Amazon. Amazon utilise du Machine Learning pour l’aider à reconnaître les mots prononcés (pas d’inquiétude vous pouvez dégainer votre meilleur accent, elle a été entraînée avec bien pire) et à comprendre la question, c’est ce qu’on appelle le « Natural Language Processing ». Une fois compris, Amazon interroge le système correspondant pour vous retourner l’information demandée.

### Comment fonctionne un « skill » ?

![alt text](https://i1.wp.com/blog.js-republic.com/wp-content/uploads/2017/03/alexa_schema.png?w=1000 "Schema du fonctionnement d’Alexa")
￼
Contrairement aux smartphones, ici aucune application n’est installée localement. Tous les « skills » sont stockés chez Amazon et l’utilisateur choisit par le biais de son dashboard (ou de l’application Alexa officielle) quels « skills » il souhaite activer.

Les skills sont invoqués grâce à leur nom (« Alexa lance Mon Super Skill »)

Et tout comme pour une API, on peut également ajouter des paramètres à votre requête (« Alexa demande à Mon Super Skill la météo à Londres »). Ici, vous l’aurez deviné, le paramètre est « Londres ».

### Mais comment elle sait, Alexa, quelle requête effectuer et que faire de mon paramètre ?

Un « skill » est composé de trois parties:

Votre programme,

- Un « Intent Schema »,
- Un fichier de « Sample Uterrances »

« Sample Uterrances » c’est un terme vachement compliqué pour désigner un fichier contenant plusieurs façons d’invoquer votre « skill » et quelles requêtes exécuter dans ces cas-là.

```text
GetWeather quelle est la météo à {Location}
GetWeather météo à {Location}
GetWeather va-t-il pleuvoir à {Location}
GetSingles femmes célibataires entre {Age1} et {Age2} à {Location}
```

Et de l’autre côté nous avons le schéma déclaratif des types de variables attendus par la fonction GetWeather

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

Il y a autant de « slots » (les types de variables) déclarés que de variables requises pour votre fonction.

De cette manière, après le Speech-to-Text, l’algorithme de Natural Language Processing fait le rapprochement entre les mots et les types de « slots » annoncés.

Et « Alexa demande à Mon Super Skill de trouver des femmes célibataires entre quarante et cinquante ans à Paris » sera traduit en GetSingles(‘paris’,40,70)

La liste complète des « slots » est disponible à cette adresse: [https://developer.amazon.com/fr/docs/custom-skills/slot-type-reference.html](https://developer.amazon.com/fr/docs/custom-skills/slot-type-reference.html) et si le « slot » dont vous avez besoin n’existe pas, vous pouvez toujours le créer.

## CRÉEZ VOTRE ENVIRONNEMENT DE DÉVELOPPEMENT

Il existe plusieurs façons de tester votre code. Une unique condition préalable, posséder un compte Amazon.

- Echosim.io

![Echosim.io](https://i2.wp.com/blog.js-republic.com/wp-content/uploads/2017/03/alexa_echosim.png?resize=225%2C300 "Echosim.io")

Ce site internet vous propose de tester vos commandes directement dans le navigateur

- Reverb.ai

![Reverb.ai](https://i0.wp.com/blog.js-republic.com/wp-content/uploads/2017/03/alexa_reverb.png?w=300 "Reverb.ai")

Reverb vous propose aussi de tester vos commandes dans le navigateur. Sa plus-value est qu’il est également possible de télécharger l’application directement sur votre Mac, votre iPhone (iOS 10 minimum) ou votre Android (Android 5.0 minimum)

- Alexa-avs-sample-app

![DIY Alexa](https://i2.wp.com/blog.js-republic.com/wp-content/uploads/2017/03/alexa_avs.png?resize=300%2C279 "Alexa AVS")

Vous aimez bricoler et vous cherchez votre prochain projet idéal pour un dimanche pluvieux ? Alors dirigez vous vers le GitHub officiel d’Alexa, régulièrement mis à jour par les développeurs Amazon.

Toutes les instructions y sont détaillées pour créer votre Alexa sur Raspberry Pi, Linux, Mac et Windows.

Vous procurer un Amazon Echo ou Echo Dot : depuis le 13 juin, il est disponible en France.

## ET MAINTENANT COMMENT JE CODE MON « SKILL » ?

Nous verrons ça dans la deuxième partie de cet article, disponible à cette adresse: [https://jzarca01.github.io/blog/creez-votre-premier-skill-pour-alexa-partie-2/](https://jzarca01.github.io/blog/creez-votre-premier-skill-pour-alexa-partie-2/) 😉

Merci de m’avoir lu, et si l’article vous a plu, n’hésitez pas à le partager sur les réseaux sociaux.
