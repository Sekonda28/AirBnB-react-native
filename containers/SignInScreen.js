import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView, Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pWordHidden, setPWordHidden] = useState(true);
  const [animating, setAnimating] = useState(false)
  const navigation = useNavigation();

  const handlePress = async () => {
    try { setAnimating(true)
      if (password !== "" || email !== "") {
       
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        //setUserId(response.data.username);
        
        setToken(response.data.token);
      } else {
        Alert.alert("Please enter an email and a password");
       
      } setAnimating(false)
    } catch (error) {
      console.log(error.message);
      {
        Alert.alert("Username or password incorrect");
        setAnimating(false)
      }
    }
  };
  return (
   <KeyboardAwareScrollView><SafeAreaView style = {styles.safeAreaView}>
    
      <View>
        <View style={styles.pageContainer}>
   

        
          <View style={styles.headerContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/airbnb-logo.png")}
              resizeMode="contain"
            />
            <Text style={styles.headerText}>Sign In</Text>
          </View>

          <View style={styles.inputBorder}>
            <TextInput
              style={styles.inputLine}
              placeholder="email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
          <View style={styles.inputBorder}>
            <TextInput
              style={styles.inputLine}
              placeholder="password"
              secureTextEntry={pWordHidden}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <Text
              onPress={() => {
                setPWordHidden(!pWordHidden);
              }}
            >
              👁
            </Text>
          </View>
     <View>
        <ActivityIndicator size="large" color="#FF5A5F" animating = {animating}/></View> 
          <TouchableOpacity style={styles.button} onPress={handlePress} disabled={animating}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.accountText}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View></SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({

  safeAreaView: {
    flex: 1,
    //marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  pageContainer: {
    marginLeft: 30,
    marginRight: 30,
  },

  headerContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
  headerText: {
    fontSize: 20,
    color: "#767676",
    fontWeight: "700",
    paddingTop: 30,
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
  button: {
    backgroundColor: "#fff",
    width: 150,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#FF5A5F",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 60,
  },
  buttonText: {
    color: "#767676",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "700",
  },
  accountText: {
    color: "#767676",
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },
});
