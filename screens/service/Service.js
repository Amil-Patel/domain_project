import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { styles } from '../../styles/style'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Loading from '../layout/Loading';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
const PORT = process.env.EXPO_PUBLIC_API_URL;

const Service = () => {
    const navigation = useNavigation();
    const [getService, setGetService] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const getContactTableData = async () => {
        setLoading(true);
        await axios
            .get(`${PORT}/getservicesdata`)
            .then((response) => {
                setGetService(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching service data:", error);
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
                    <Text style={styles.headingTitle}>Service</Text>
                    <Text style={{ marginBottom: 20 }}>50 Service</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {
                            getService.length > 0 ? (
                                getService.map((service, idx) => (
                                    <TouchableOpacity
                                        style={styles.maincustomer}
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
                                                        {service.service_name.charAt(0)}
                                                    </Text>
                                                </View>
                                                <View style={styles.customerName}>
                                                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                                        {service.service_name}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View>
                                                <TouchableOpacity
                                                    style={{ flex: 1, alignItems: "center", justifyContent: 'space-evenly' }}
                                                >
                                                    <Ionicons name="eye-outline" size={26} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text>Data is Not Avalible</Text>
                            )
                        }

                    </ScrollView>



                    <TouchableOpacity
                        style={styles.addIconMain}
                        onPress={() => navigation.navigate("AddService")}
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
    )
}

export default Service
