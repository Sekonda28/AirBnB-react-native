import React, { useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [pWordHidden, setPWordHidden] = useState(true);
  const [confirmPWHidden, setConfirmPWHidden] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [error, setError] = useState("");
  console.log(email, password, description, confirmPW, username);

  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      setAnimating(true);
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
          console.log(response.data);
        } else {
          setError("Your passwords do not match - please try again");
        }
      } else {
        setError("Please make sure all the fields are filled in");
      }
      setAnimating(false);
    } catch (error) {
      console.log(error.message);
      setError(error.response.data.error);
      setAnimating(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
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

            <View>
              <View style={styles.inputBorder}>
                <TextInput
                  style={styles.inputLine}
                  placeholder="email"
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputBorder}>
                <TextInput
                  style={styles.inputLine}
                  placeholder="username"
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <View style={styles.inputBorderDesc}>
                <TextInput
                  style={styles.inputDesc}
                  numberOfLines={Platform.OS === "ios"? null:4}
                  minHeight = {Platform.OS === "ios"? 60 : null}
                  placeholder="Describe yourself in a few words"
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                />
              </View>
              <View style={styles.inputBorder}>
                <TextInput
                  style={styles.inputLine}
                  placeholder="password"
                  secureTextEntry={pWordHidden}
                  onChangeText={(text) => setPassword(text)}
                />
                <Text
                  onPress={() => {
                    setPWordHidden(!pWordHidden);
                  }}
                >
                  👁
                </Text>
              </View>
              <View style={styles.inputBorder}>
                <TextInput
                  style={styles.inputLine}
                  placeholder="confirm password"
                  secureTextEntry={confirmPWHidden}
                  onChangeText={(text) => setConfirmPW(text)}
                />
                <Text
                  onPress={() => {
                    setConfirmPWHidden(!confirmPWHidden);
                  }}
                >
                  👁
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{ color: "#FF5A5F", marginTop: 5, textAlign: "center" }}
              >
                {error}
              </Text>

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
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.accountText}>
                Already have an account ? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
    height: 180,
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
  inputBorderDesc: {
    borderColor: "#FF5A5F",
    borderWidth: 1,
    marginBottom: 20,
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
    marginTop: 30,
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
