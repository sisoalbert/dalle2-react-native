import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { API_TOKEN } from "@env";

export default function Home() {
  const [prompt, onChangePrompt] = React.useState(
    "Cthulu, intricate sand sculpture, high detail,UHD"
  );
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imagePlaceholder, setimagePlaceholder] = React.useState(
    "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png"
  );

  const configuration = new Configuration({
    apiKey: API_TOKEN,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      onChangePrompt(`Search ${prompt}..`);
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      setResult(res.data.data[0].url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>React Native Dalle-E</Text>
        <View style={styles.TextInputcontainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePrompt}
            value={prompt}
            editable
            multiline
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={generateImage}>
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
        {loading ? (
          <>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Generating...</Text>
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles.generatedImageContainer}>
          {result.length > 0 ? (
            <Image
              style={styles.generatedImage}
              source={{
                uri: result,
              }}
            />
          ) : (
            <>
              <Image
                style={styles.generatedImage}
                source={{
                  uri: imagePlaceholder,
                }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  loadingContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin",
    textAlign: "center",
  },

  TextInputcontainer: {
    height: 100,
    backgroundColor: "#c7c7c7",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 10,
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  generateButton: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
  },
  generatedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  generatedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
