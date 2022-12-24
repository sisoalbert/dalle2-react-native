import React, { useState } from "react";
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

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(
    "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png"
  );

  const handleSubmit = () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `prompt=${prompt}&size=small`,
    };

    fetch("https://dalle2api.onrender.com/openai/generateimage", options)
      .then((response) => response.json())
      .then((result) => {
        const url = result.data;
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>React Native Dalle-E</Text>
        <Text style={styles.subTitleText}>Powered by nodejs</Text>
        <View style={styles.TextInputcontainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setPrompt}
            value={prompt}
            editable
            multiline
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={handleSubmit}>
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
          {imageUrl ? (
            <Image
              style={styles.generatedImage}
              source={{
                uri: imageUrl,
              }}
            />
          ) : (
            <>
              <Image
                style={styles.generatedImage}
                source={{
                  uri: imageUrl,
                }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  subTitleText: {
    fontSize: 10,
    fontWeight: "500",
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
    padding: 20,
    marginTop: 10,
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
    borderRadius: 10,
  },
});

export default App;
