import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SettingsScreen({ setToken, setId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({})
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [animating, setAnimating] = useState(false)

  const [image, setImage] = useState(null);
const [uploading, setUploading] = useState(false);

  const navigation = useNavigation()

  useEffect(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token)
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data)
      if(response.data.photo !==null){
        setPhoto(response.data.photo.url)
      }
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handlePress = async () => {
    setAnimating(true)
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token)
      const putEmail = email!==""?email:userData.email
      const putUsername = username!==""?username:userData.username
      const putDescription = description!==""?description:username.description

      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update", {
        
          email: putEmail,
          username: putUsername,
          description: putDescription,
        
        },
        {
        headers: { Authorization: `Bearer ${token}` }
        }
    
      );
      console.log(response.data);
      setAnimating(false)
      navigation.navigate("Home")
    } catch (error) {
      console.log(error.message);
      setAnimating(false)
    }
  };

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="#FF5A5F" />
    </View>
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnb-logo.png")}
            resizeMode="contain"
          />
        </View>

        <View style={styles.userImageContainer}>
        <View style = {styles.userImageBorder}>
        {photo!==""? <Image
            style={styles.userImage}
            source={{uri:photo}}
            resizeMode="contain"
          />:
          <AntDesign name="user" size={120} color="grey" />}
       </View>
          
          <View style={styles.addPhotoIcons}>
          <FontAwesome5 name="images" size={30} color="gray" />
          <FontAwesome name="camera" size={30} color="gray" />
       
          </View>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.inputBorder}>
            <TextInput
              style={styles.inputLine}
              placeholder={userData.email}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputBorder}>
            <TextInput
              style={styles.inputLine}
              placeholder={userData.username}
              value = {username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={styles.inputBorderDesc}>
            <TextInput
              style={styles.inputDesc}
              numberOfLines={Platform.OS === "ios" ? null : 4}
              minHeight={Platform.OS === "ios" ? 60 : null}
              placeholder={userData.description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </View>
          <ActivityIndicator
                size="large"
                color="#FF5A5F"
                animating={animating}
              />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          disabled={animating}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => {
            setToken(null);
            setId("");
          }}
          // disabled={animating}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "#fff",
  },
  mainContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },

  headerContainer: {
    marginTop: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#767676",
    borderBottomWidth: 1,
  },
  logo: {
    height: 40,
    width: 40,
  },

  userImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },

  userImageBorder:{
      borderRadius: 120,
    borderColor: "#FF5A5F",
    borderWidth: 1, padding:20,
  
    marginRight:20
  },

  userImage: {
    height: 120,
    width: 120,
  },

  addPhotoIcons: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  inputLine: {
    paddingBottom: 5,
  },
  inputBorder: {
    borderBottomColor: "#FF5A5F",
    borderBottomWidth: 1,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBorderDesc: {
    borderColor: "#FF5A5F",
    borderWidth: 1,
    marginBottom: 10,
  },
  inputDesc: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: "#fff",
    width: 150,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#FF5A5F",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#767676",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "700",
  },
  logOutButton: {
    backgroundColor: "#DcDcDc",
    width: 150,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#FF5A5F",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
});
