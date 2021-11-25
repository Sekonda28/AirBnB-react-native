import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, SafeAreaView, Platform, StyleSheet, Image} from "react-native";
import MapView from "react-native-maps";
import Constants from "expo-constants";
import axios from "axios";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AroundMeScreen() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [locationData, setLocationData] = useState();

  const navigation = useNavigation()

  const handlePress = (roomId) => {
    navigation.navigate("Room", {
      id: roomId,
    });
  };
  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
        try {
            const latitude = 48.856614
            const longitude = 2.3522219
            const response = await axios.get(
                `https://express-airbnb-api.herokuapp.com/rooms/around?longitude=${longitude}&latitude=${latitude}`
              );
              
              setLocationData(response.data)
            console.log(locationData);
          } catch (error) {
              console.log(error.message)
              
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
      <Text>Loading</Text>
    </View>
  ) : error ? (
    <Text>Permission refusée</Text>
  ) : (
    <SafeAreaView style = {styles.safeAreaView}>

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
        latitude:coords.latitude,
        longitude: coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        coordinate={coords}
        showsUserLocation
      >

          {locationData.map((location, index)=>{
              return(       <MapView.Marker key={location._id}
              onPress={()=>handlePress(location._id)}
          coordinate={{
            latitude: location.location[1],
            longitude: location.location[0],
          }}
          title={location.title}  />)})
         
              
          }
                  
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
  //   mainContainer: {
  //     marginLeft: 30,
  //     marginRight: 30,
  //     marginBottom: 10,
  //   },

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

  //   // Flatview Return
  //   flatviewContainer: {
  //     paddingBottom: 10,
  //     paddingTop: 10,
  //   },

  //   roomImage: {
  //     width: width,
  //     height: 230,
  //     position: "relative",
  //   },
  //   price: {
  //     fontSize: 20,
  //     color: "#fff",
  //     backgroundColor: "black",
  //     position: "absolute",
  //     marginTop: 175,
  //     paddingLeft: 20,
  //     paddingRight: 20,
  //     paddingVertical: 10,
  //   },

  //   roomsDescContainer: {
  //     flexDirection: "row",
  //     paddingVertical: 10,
  //   },

  //   textContainer: {
  //     flex: 3,
  //   },

  //   userImageContainer: {
  //     flex: 1,
  //   },
  //   title: {
  //     fontSize: 20,
  //     marginRight: 5,
  //   },

  //   userImage: {
  //     height: 80,
  //     width: 80,
  //     borderRadius: 50,
  //   },
  //   ratingsContainer: {
  //     flexDirection: "row",
  //     marginTop: 10,
  //   },
  //   rating: {
  //     backgroundColor: "green",
  //   },
  //   review: {
  //     color: "#767676",
  //     marginLeft: 10,
  //   },
  //   showMore: {
  //     paddingTop: 10,
  //   },
  //   showMoreTxt: {
  //     color: "#767676",
  //     marginRight: 5,
  //   },
    map: {
      width: width,
      height: height,
    },
});
