import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  console.log(email, password);

  const handlePress = async()=>{
    try {
          if(password !== ""|| email !==""){ 
        const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/log_in", {
          "email": email,
          "password": password,
        })
        //setUserId(response.data.username);
        setToken(response.data.token);
        
       
    } else {
      Alert.alert("Please enter an email and a password")
    }
    } catch (error) {
      console.log(error.message)
      {Alert.alert("Username or password incorrect")}
    }

  }
  return (
    <View>
      <View>
      <KeyboardAwareScrollView>
        <Text>Name: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Button
          title="Sign in"
          onPress={handlePress}
        />
        <TouchableOpacity
          onPress={()=>{
            navigation.navigate("SignUp")
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity></KeyboardAwareScrollView>
      </View>
    </View>
  );
}
