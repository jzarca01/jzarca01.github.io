---
title: 'Machine Learning on iOS with CoreML and React-Native: Part 2'
description: 'In this part, we will implement a Machine Learning model in a React-Native application'
pubDate: 'Oct 26 2018'
heroImage: 'https://img-c.udemycdn.com/course/480x270/4351854_ace2_2.jpg'
---

First, you will need to create a new React-Native project.
Open your terminal, navigate to your projects folder, and enter the following command:

```shell
react-native init notHotDog (or any other name)
```

After a few minutes, everything will be installed, and you will be ready to move on.

## Install the CoreML Library

We will use the react-native-core-ml-image library.

```shell
npm install --save react-native-core-ml-image
react-native link
```

Go to your project, then into the "ios" folder, and double-click on the notHotDog.xcodeproj file to open it in Xcode.

## Configure the Project

By default, React-Native projects are configured to primarily use Objective-C. Since the react-native-core-ml-image library is written in Swift, we will need to change some settings in the project.

First, we need to add a Swift file to the project.

![config](https://www.ux-republic.com/wp-content/uploads/2018/04/add_file.png)

![config2](https://www.ux-republic.com/wp-content/uploads/2018/04/swift.png)

The name doesn't matter, as it won't be used anyway. A message will then appear, prompting you to create an "Objective-C Bridging Header": this is the file that serves as the link between Swift and the header files of Objective-C classes.

![bridging_header](https://www.ux-republic.com/wp-content/uploads/2018/04/bridging_header.png)

Finally, since the library is written in Swift 4.0, we need to specify the version of Swift to use (the default is 3.2).
Click on the project root (notHotDog), select the "Build Settings" tab, then at the very bottom, change the Swift language version to use.

![swift_version](https://www.ux-republic.com/wp-content/uploads/2018/04/swift_version.png)

### Import the CoreML Model into the Project

Before moving on to the programming part, all that's left is to import our image classification model into the notHotDog project.
Drag and drop the Classifier.mlmodel file and rename it to notHotDog.mlmodelc (no, that's not a typo).

![mlmodelc](https://www.ux-republic.com/wp-content/uploads/2018/04/mlmodelc.png)

CoreML does not work directly with _.mlmodel files; they need to be translated into _.mlmodelc (c for compiled), but our Python script has already taken care of that. (see the last line of the train_model.py file)

```python
# Export for use in Core ML
model.export_coreml('Classifier.mlmodel')
```

### Allow Camera Access

In the Info.plist file, click on the little plus to the right of each entry and add "Privacy – Camera Usage Description" as shown below.

![camera](https://www.ux-republic.com/wp-content/uploads/2018/04/camera-2048x664.png)

That's it for the configuration! All that's left is to implement everything.

![giphy](https://i0.wp.com/media.giphy.com/media/QHE5gWI0QjqF2/giphy.gif?zoom=2&w=1500&ssl=1)

## Implement the Code

The first thing to do is to import the react-native-core-ml-image library into the project. For this example, all the code will be located in the App.js file.

```javascript
import CoreMLImage from "react-native-core-ml-image"
```

Next, replace the entire render() method with the following:

```javascript
render() {
    let classification = null;

    if (this.state.bestMatch) {
      if (this.state.bestMatch.identifier && this.state.bestMatch.identifier === "hotdog") {
        classification = "Hotdog";
      } else {
        classification = "Not hotdog";
      }
    }

    return (
      <View style={styles.container}>
          <CoreMLImage modelFile="notHotDog" onClassification={(evt) => this.onClassification(evt)}>
              <View style={styles.container}>
                <Text style={styles.info}>{classification}</Text>
              </View>
          </CoreMLImage>
      </View>
    );
  }
```

The onClassification method allows us to receive updates when a new object has been classified. It returns the following data:

```json
[
  {
    "identifier": "hotdog",
    "confidence": 0.87
  },
  {
    "identifier": "not-hotdog",
    "confidence": 0.4
  }
]
```

All that's left is to implement the onClassification method, which is responsible for finding the best classification.

```javascript
const BEST_MATCH_THRESHOLD = 0.5;

/** */

onClassification(classifications) {
    let bestMatch = null;

    if (classifications && classifications.length) {
      classifications.map(classification => {
        if (!bestMatch || classification.confidence > bestMatch.confidence) {
          bestMatch = classification;
        }
      });

      if (bestMatch.confidence >= BEST_MATCH_THRESHOLD) {
        this.setState({
          bestMatch: bestMatch
        });
      }
      else {
        this.setState({
          bestMatch: null
        });
      }
    }

    else {
      this.setState({
        bestMatch: null
      });
    }
  }
```

If we base it on the previous data, then bestMatch will be:

```json
{
  "identifier": "hotdog",
  "confidence": 0.87
}
```

### Here is the complete code:

```javascript
import React, { Component } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import idx from "idx"

const BEST_MATCH_THRESHOLD = 0.5

import CoreMLImage from "react-native-core-ml-image"

export default class App extends Component<{}> {
  constructor() {
    super()
    this.state = {
      bestMatch: null,
    }
  }

  onClassification(classifications) {
    let bestMatch = null

    if (classifications && classifications.length) {
      classifications.map(classification => {
        if (!bestMatch || classification.confidence > bestMatch.confidence) {
          bestMatch = classification
        }
      })

      if (bestMatch.confidence >= BEST_MATCH_THRESHOLD) {
        this.setState({
          bestMatch: bestMatch,
        })
      } else {
        this.setState({
          bestMatch: null,
        })
      }
    } else {
      this.setState({
        bestMatch: null,
      })
    }
  }

  classify() {
    if (idx(this.state, _ => _.bestMatch.identifier)) {
      if (this.state.bestMatch.identifier === "hotdog") {
        return "Hotdog"
      } else {
        return "Not hotdog"
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CoreMLImage
          modelFile="notHotDog"
          onClassification={evt => this.onClassification(evt)}
        >
          <View style={styles.container}>
            <Text style={styles.info}>{classify()}</Text>
          </View>
        </CoreMLImage>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  info: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "900",
    margin: 10,
  },
})
```

All that's left is to run the code on your iPhone (the camera won't work on the simulator).

If you've done everything correctly, the app will ask for permission to access your camera, and you will then be able to distinguish a hotdog from your neighbor's dachshund.

![giphy](https://i1.wp.com/media.giphy.com/media/BdrSy2gqURFEk/giphy.gif?zoom=2&w=1500&ssl=1)

Thank you for reading, and if you enjoyed the article, feel free to share it on social media.