import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const handlePress = async () => {
    try {
      if (
        password !== "" ||
        email !== "" ||
        username !== "" ||
        description !== "" ||
        confirmPW !== ""
      ) {
        if (password === confirmPW) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              password: password,
              username: username,
              description: description,
            }
          );
          //setUserId(response.data.username);
          setToken(response.data.token);
        } else {
          Alert.alert("Your passwords do not match - please try again")
        }
      } else {
        Alert.alert("Please make sure all the fields are filled in");
      }
    } catch (error) {
      console.log(error.message);
      {
        Alert.alert("Error - please try again");
      }
    }
  };

  return (
    <View>
      <View>
        <KeyboardAwareScrollView>
          <Text>email: </Text>
          <TextInput placeholder="email" onChangeText = {(text)=>setUsername(text)} />
          <Text>username: </Text>
          <TextInput placeholder="username" onChangeText={(text)=>setUsername(text)}/>
          <Text>description: </Text>
          <TextInput
            numberOfLines={4}
            placeholder="Describe yourself in a few words"
            onChangeText={(text)=>{setDescription(text)}}
          />
          <Text>Password: </Text>
          <TextInput placeholder="password" secureTextEntry={true} onChangeText={(text)=>setPassword(text)}/>
          <Text>Confirm password: </Text>
          <TextInput placeholder="confirm password" secureTextEntry={true} on />
          <Button
            title="Sign up"
            onPress={handlePress}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
