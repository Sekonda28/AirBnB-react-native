import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Rating } from "react-native-ratings";
import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Platform, ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [roomsData, setRoomsData] = useState();
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(async () => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setRoomsData(response.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handlePress = (roomId) => {
    navigation.navigate("Room", {
      id: roomId,
    });
  };

  return isLoading?   ( <View>
  <ActivityIndicator size="large" color="#FF5A5F"/>
</View>) : (
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
              <TouchableOpacity
                style={styles.flatviewContainer}
                onPress={() => handlePress(item._id)}
              >
                <Image
                  style={styles.roomImage}
                  source={{ uri: item.photos[0].url }}
                ></Image>
                <Text style={styles.price}>{item.price} €</Text>
                <View style={styles.roomsDescContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View style={styles.ratingsContainer}>
                      <Rating
                        type="custom"
                        startingValue={item.ratingValue}
                        readonly={true}
                        imageSize={20}
                      />

                      <Text style={styles.review}>{item.reviews} reviews</Text>
                    </View>
                  </View>
                  <View style={styles.userImageContainer}>
                    <Image
                      style={styles.userImage}
                      source={{ uri: item.user.account.photo.url }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  mainContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 40,
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

  // Flatview Return
  flatviewContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },

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
    paddingVertical: 10,
  },

  roomsDescContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "#767676",
    borderBottomWidth: 1,
  },

  textContainer: {
    flex: 3,
  },

  userImageContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginRight: 5,
  },

  userImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  ratingsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  rating: {
    backgroundColor: "green",
  },
  review: {
    color: "#767676",
    marginLeft: 10,
  },
});
