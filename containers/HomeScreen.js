import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [roomsData, setRoomsData] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setRoomsData(response.data);
      console.log(response.data[0].photos[0].url);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <View style={styles.pageContainer}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/airbnb-logo.png")}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          data={roomsData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  style={styles.roomImage}
                  source={{ uri: item.photos[0].url }}
                >
                </Image><Text style={styles.price}>{item.price} €</Text>

                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text>{item.ratingValue}</Text>
                <Text>{item.reviews}</Text>
              </View>
            );
          }}
        />
        <Text>Welcome home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  mainContainer: {
    marginLeft: 30,
    marginRight: 30,
  },

  headerContainer: {
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

  // Flatview Return
  roomImage: {
    width: 430,
    height: 230,
    position: "relative",
  },
  price: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "black",
    position: "absolute",
    marginTop: 175,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: 20,
  },
});
