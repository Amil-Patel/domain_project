import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { styles } from "../../styles/style";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Loading from "../layout/Loading";
const PORT = process.env.EXPO_PUBLIC_API_URL;

const ViewCustomer = ({ route }) => {
  const [getContact, setGetContact] = useState([]);
  const [getContactSale, setGetContactSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { id } = route.params;
  const getContactTableDataWithId = async () => {
    setLoading(true);
    await axios
      .get(`${PORT}/getcontactdatawithid/${id}`)
      .then((response) => {
        setGetContact(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching Contact data:", error);
        setLoading(false);
      });
  };

  const getContactSaleWithId = async () => {
    setLoading(true);
    await axios
      .get(`${PORT}/getcontactsalewithid/${id}`)
      .then((response) => {
        setGetContactSale(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching Contact data:", error);
        setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthName = months[monthIndex];


    const diffInMs = new Date(dateString) - new Date();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    const textStyle = diffInDays <= 10 ? { color: "red" } : {};
    return (
      <Text>
        <Text style={textStyle}>{day} {monthName} {year}</Text>
      </Text>
    );
  };

  const totalAmount = getContactSale.reduce((sum, sale) => {
    return sum + parseInt(sale.amount);
  }, 0);
  const onRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    getContactTableDataWithId();
    getContactSaleWithId();
    setRefreshing(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getContactTableDataWithId();
      getContactSaleWithId();
    }, [])
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.maincustomer}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 0, flexDirection: 'row' }}>
                <View style={styles.backIcon}>
                  <Ionicons
                    name="arrow-back-outline"
                    onPress={() => {
                      navigation.goBack();
                    }}
                    size={20}
                  ></Ionicons>
                </View>
                <View style={styles.customerName}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    {getContact.cname}
                  </Text>
                </View>
              </View>
              <View >
                <Text style={{ marginTop: 9, fontSize: 18, fontWeight: '500' }}>{totalAmount}</Text>
              </View>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {
              getContactSale.length > 0 ? (
                getContactSale.map((sale, idx) => {
                  const intAmount = parseInt(sale.amount);
                  const intReceived = parseInt(sale.received);
                  const balance = intAmount - intReceived;
                  return (
                    <>
                      <TouchableOpacity
                        key={idx + 1}
                        onPress={() => {
                          navigation.navigate("viewSale", { id: sale.id });
                        }}>
                        <View style={styles.mainSale}>
                          <View style={styles.totalAmountMain}>
                            <View>
                              <View>
                                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                  {getContact.cname}
                                </Text>
                              </View>
                              <View style={{ marginTop: 5 }}>
                                <Text style={styles.saleText}>SALE</Text>
                              </View>
                            </View>
                            <View>
                              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                Total: {sale.amount}
                              </Text>
                            </View>
                          </View>

                          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontWeight: "500",
                                  marginTop: 3,
                                }}
                              >
                                Expires on:{" "}
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    marginTop: 3,
                                  }}
                                >
                                  {formatDate(sale.ending_date)}
                                </Text>
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "500",
                                  marginTop: 3,
                                }}>Balance: <Text>{balance}</Text></Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </>
                  );
                })
              ) : (
                <Text style={styles.notFoundText}>Sale is Not Found!</Text>
              )
            }

          </ScrollView>

          <View style={styles.mainAddBtn}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddNewSale", { id: id });
              }}
            >
              <Text style={styles.goaddSaleBtn}>₹ Add New Sale</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ViewCustomer;
