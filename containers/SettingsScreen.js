import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function SettingsScreen({ setToken, setId }) {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
      console.log(response.data);
      setIsLoading(false);}
      

    catch (error) {
      console.log(error.message);
    }
  },[]);


  return isLoading ? (
    <View><ActivityIndicator size="large" color="#FF5A5F" /></View>
    
  ) :(
    <View>
      <Text>Hello Settings</Text>
      <View style={styles.userImageContainer}>
        
        <Image
          style={styles.userImage}
          source={{ uri: userData.photo.url }}
          resizeMode="contain"
        />
      </View>

      <Text>{userData.email}</Text>
      <Text>{userData.username}</Text>
      <Text>{userData.description}</Text>
      <Button title="Update" />
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
          setId("");
        }}
      />
    </View>)
  
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
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
    flex: 1,
  },

  userImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
});
