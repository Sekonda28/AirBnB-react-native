import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const { params } = useRoute();
  const [userData, setUserData] = useState(null)

  // useEffect(async () => {
  //   const id = params.userId
  //   try {
  //     const response = await axios.get(
  //       `https://express-airbnb-api.herokuapp.com/user/${id}`
  //     );
  //     setUserData(response.data);
  //     console.log(userData)
  //     // setIsLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);
  return (
    <View>
      <Text>user id : {params.userId}</Text>
      <Text>{userData}</Text>
    </View>
  );
}
