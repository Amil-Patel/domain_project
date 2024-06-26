import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/style";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
const PORT = process.env.EXPO_PUBLIC_API_URL;

const Favourite = () => {
  const navigation = useNavigation();
  const [getFavouriteContact, setGetFavouriteContact] = useState([]);
  const getContactTableData = async () => {
    await axios
      .get(`${PORT}/getfavouritecontactdata`)
      .then((response) => {
        setGetFavouriteContact(response.data);
      })
      .catch((error) => {
        console.log("Error fetching Contact data:", error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getContactTableData();
    }, [])
  );
  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          style={styles.serchIcon}
          onPress={() => {
            navigation.navigate("searchcontact");
          }}
          name="search-outline"
          size={24}
        ></Ionicons>
      </View>
      <Text style={styles.headingTitle}>Favourite</Text>
      <Text style={{ marginBottom: 20 }}>
        {getFavouriteContact.length} favourite contact
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {getFavouriteContact.map((contact, index) => (
          <View key={index + 1} style={styles.maincustomer}>
            <View style={styles.customerLogo}>
              <Text style={{ fontSize: 26, textTransform: "uppercase" }}>
                {contact.fname.charAt(0)}
              </Text>
            </View>
            <View style={styles.customerName}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {`${contact.fname} ${contact.lname}`}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Favourite;
