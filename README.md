## Here is a getting started guide for integrating Dalle 2 into a React Native app:
![enter image description here](https://miro.medium.com/max/1400/1*-hUIyOIFG50xnwkJS31-Hg.webp)

## Getting started
Prerequisites Make sure you have the following installed on your machine:

Node.js npm (comes with Node.js)

Git clone the project:

```
git clone https://github.com/sisoalbert/dalle2-react-native.git

```

Install dependencies. Run the following command to install the necessary dependencies:

```
yarn

```

Then follow  **step 7**    below.

**Done 👏🏽**

## The creation process: 
1.  Create a new Expo app using the `npx create-expo-app` my-app command. You can use vanilla react native as well.
2.  Install the `react-native-url-polyfill/auto` package by running `yarn add react-native-url-polyfill/auto`.
3.  Import the package at the entry point of your app, typically `index.js`, using `import "react-native-url-polyfill/auto"`.
4.  Install the `react-native-dotenv` package by running `yarn add react-native-dotenv`. This will allow you to use environment variables in your app, which can be useful for storing sensitive information such as API keys. The installation a bit finicky you have to update the babel.config.js add it has a plugin check my github code below.
5.  Import the necessary components from the `react-native` package at the top of the file where you will be using Dalle 2, including `SafeAreaView`, `StyleSheet`, `Text`, `TextInput`, `TouchableOpacity`, `View`, `Image`, and `ActivityIndicator`.
6.  Import the `Configuration` and `OpenAIApi` classes from the `openai` package.
7.  Define an `API_TOKEN` constant in your environment variables and import it using `import { API_TOKEN } from "@env"`. This will be used to authenticate your API requests to Dalle 2.
8.  Create a new `Configuration` object, passing in your `API_TOKEN` as the `apiKey` option.
9.  Create a new `OpenAIApi` object, passing in your `Configuration` object as an argument.
10.  Create a function to handle generating an image using Dalle 2. This function should use the `createImage` method of the `OpenAIApi` object to send a request to Dalle 2 with the desired prompt and other options, such as the number of images to generate and the size of the images. The function should also handle any errors that may occur and set a loading state while the image is being generated.
11.  In your component’s render method, include a form for entering a prompt and a button for triggering the image generation function. You can also include a loading indicator and display the generated image when it is available.

[Youtube Implementation](https://youtu.be/hstZMAFJVuM)

