import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import Constants from "expo-constants";
import axios from "axios";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AroundMeScreen() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const navigation = useNavigation();

  const handlePress = (roomId) => {
    navigation.navigate("RoomTab", {
      id: roomId,
    });
  };
  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
        try {
          const latitude = 48.856614; //coords.latitude
          const longitude = 2.3522219; // coords.longitude (left hard coded for testing Paris location)
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?longitude=${longitude}&latitude=${latitude}`
          );

          setLocationData(response.data);
          // console.log(locationData);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setError(true);
      }

      setIsLoading(false);
    };

    askPermission();
  }, []);

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="#FF5A5F"/>
    </View>
  ) : error ? (
    <Text>Permission refusée</Text>
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/airbnb-logo.png")}
          resizeMode="contain"
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          // latitude: 48.856614,
          //     longitude: 2.3522219,
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        coordinate={coords}
        showsUserLocation={true}
        provider = {PROVIDER_GOOGLE}
      >
        {locationData.map((location) => {
          return (
            <MapView.Marker
              key={location._id}
              onPress={() => handlePress(location._id)}
              coordinate={{
                latitude: location.location[1],
                longitude: location.location[0],
              }}
              title={location.title}
            />
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "#fff",
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
  map: {
    width: width,
    height: height,
  },
});
