import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { styles } from "../../styles/style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Loading from "../layout/Loading";
const PORT = process.env.EXPO_PUBLIC_API_URL;

const Customer = () => {
  const navigation = useNavigation();
  const [getContact, setGetContact] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const getContactTableData = async () => {
    setLoading(true);
    await axios
      .get(`${PORT}/getcontactdata`)
      .then((response) => {
        setGetContact(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching Customer data:", error);
        setLoading(false);
      });
  };
  const onRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    getContactTableData();
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getContactTableData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View>
            <Ionicons
              style={styles.serchIcon}
              onPress={() => {
                navigation.navigate("searchcustomer");
              }}
              name="search-outline"
              size={24}
            />
          </View>
          <Text style={styles.headingTitle}>Customer</Text>
          <Text style={{ marginBottom: 20 }}>{getContact.length} customer</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {
              getContact.length > 0 ? (
                getContact.map((contact, index) => (
                  <TouchableOpacity
                    key={index + 1}
                    style={styles.maincustomer}
                    onPress={() => {
                      navigation.navigate("ViewCustomer", { id: contact.id });
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.customerLogo}>
                          <Text
                            style={{
                              fontSize: 26,
                              textTransform: "uppercase",
                              color: "white",
                            }}
                          >
                            {contact.cname.charAt(0)}
                          </Text>
                        </View>
                        <View style={styles.customerName}>
                          <Text style={{ fontSize: 18, fontWeight: "500" }}>
                            {contact.cname}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={{ flex: 1, alignItems: "center", justifyContent: 'space-evenly' }}
                          onPress={() => {
                            navigation.navigate("ViewCustomermain", { id: contact.id });
                          }}
                        >
                          <Ionicons name="eye-outline" size={26} />
                        </TouchableOpacity>
                      </View>
                    </View>

                  </TouchableOpacity>
                ))
              ) : (
                <Text>Customer Not Found</Text>
              )
            }

          </ScrollView>
          <TouchableOpacity
            style={styles.addIconMain}
            onPress={() => {
              navigation.navigate("AddCustomer");
            }}
          >
            <Ionicons
              name="add-outline"
              size={32}
              style={styles.addIcon}
              color={"white"}
            />
          </TouchableOpacity>
        </>
      )
      }
    </View >
  );
};

export default Customer;
