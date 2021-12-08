import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import logo from './assets/logo.png';
import { ThemeProvider } from './theme/ThemeProvider';
import { Screen, Switch, Message } from './components';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {

    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access photo gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log("Here is the picker result", pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't availabe on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Text>
          {"\n"}
        </Text>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button1}>
          <Text style={styles.buttonText1}>Save this book to your shelf </Text>
        </TouchableOpacity>
        <Text>
          {"\n"}
          Click Cancel to pick again
          {"\n"}
        </Text>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button2}>
          <Text style={styles.buttonText2} >Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <AppearanceProvider>
      <ThemeProvider>
        <Screen>
          <View style={styles.container}>
            <Image source={logo} style={{ width: 305, height: 159 }} />
            <Text style={styles.instructions}>
              {"\n"}
              Click the button below to save the image to a file location
              {"\n"}
            </Text>
            <Text></Text>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button3}>
              <Text style={styles.buttonText3} > Pick a Photo </Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
          </View>

          <Switch />
          <Message />
        </Screen>
      </ThemeProvider>
    </AppearanceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button1: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 3,
  },
  button2: {
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 5,
    borderColor: "orange",
    borderWidth: 3,
  },
  button3: {
    backgroundColor: "orange",
    padding: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 3,
  },
  buttonText1: {
    fontSize: 20,
    color: '#fff',
  },
  buttonText2: {
    fontSize: 20,
    color: '#fff',
  },
  buttonText3: {
    fontSize: 20,
    color: 'black',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderColor: "grey",
    borderWidth: 5,
    backgroundColor: "black",
  },
});
