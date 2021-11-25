import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import Constants from "expo-constants";
import { Dimensions } from 'react-native';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
const width = Dimensions.get("window").width;

export default function RoomScreen() {
  const { params } = useRoute();
  const [roomData, setRoomData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showLines, setShowLines] = useState(3);
  const roomId = params.id;
  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${roomId}`
      );
      setRoomData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading ? (
    <Text>Page Loading...</Text>
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.pageContainer}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnb-logo.png")}
            resizeMode="contain"
          />
        </View>

       
          <View style={styles.flatviewContainer}>
            <View>
              <SwiperFlatList
                autoplay
                autoplayDelay={4}
                autoplayLoop
                index={0}
                showPagination
                paginationStyle={{ bottom: 0 }}
                paginationStyleItem={{ width: 12, height: 12 }}
                paginationDefaultColor="#767676"
                data={roomData.photos}
                renderItem={({ item }) => (
                  
                    <Image
                      style={styles.roomImage}
                      source={{ uri: item.url }}
                    ></Image>
                )}
              />
            </View>
            <Text style={styles.price}>{roomData.price} €</Text>
            <View style={styles.mainContainer}>
            <View style={styles.roomsDescContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {roomData.title}
                </Text>
                <View style={styles.ratingsContainer}>
                  <Rating
                    type="custom"
                    startingValue={roomData.ratingValue}
                    readonly={true}
                    imageSize={20}
                  />

                  <Text style={styles.review}>{roomData.reviews} reviews</Text>
                </View>
              </View>
              <View style={styles.userImageContainer}>
                <Image
                  style={styles.userImage}
                  source={{ uri: roomData.user.account.photo.url }}
                />
              </View>
            </View>
            <Text numberOfLines={showLines}>{roomData.description}</Text>
            <TouchableOpacity
              style={styles.showMore}
              onPress={() => {
                showLines === 3 ? setShowLines(0) : setShowLines(3);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: showLines === 3 ? "center" : "flex-end",
                }}
              >
                <Text style={styles.showMoreTxt}>
                  {showLines === 3 ? "Show more" : "Show less"}
                </Text>
                <AntDesign
                  name={showLines === 3 ? "caretdown" : "caretup"}
                  size={14}
                  color="#767676"
                />
              </View>
            </TouchableOpacity>
          </View></View></View>
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
    width: width,
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
  showMore: {
    paddingTop: 10,
  },
  showMoreTxt: {
    color: "#767676",
    marginRight: 5,
  },
});
