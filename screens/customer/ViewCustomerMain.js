import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/style'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from "../layout/Loading";
const PORT = process.env.EXPO_PUBLIC_API_URL;

const ViewCustomerMain = ({ route }) => {
    const navigation = useNavigation();
    const { id } = route.params;
    const [getContact, setGetContact] = useState([]);
    const [getSale, setGetSale] = useState([]);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    const [editContact, setEditContact] = useState({
        cname: "",
        domain: "",
        mobile_no: "",
        email: "",
    });
    const handleChange = (name, value) => {
        setEditContact((prevProdData) => ({
            ...prevProdData,
            [name]: value,
        }));
    };

    const postdata = async (editId) => {
        setLoading(true);
        try {
            const response = await axios.put(`${PORT}/editcontactdata/${editId}`, editContact);
            if (response.status === 200) {
                window.alert("Customer Edit Succesfully");
                setEdit(false);
                setLoading(false);
                getContactTableDataWithId();
            } else {
                window.alert("Customer Add Failed");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getContactTableDataWithId = async () => {
        setLoading(true);
        await axios
            .get(`${PORT}/getcontactdatViewawithid/${id}`)
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
                setGetSale(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching Contact data:", error);
                setLoading(false);
            });
    };
    const totalAmount = getSale.reduce((sum, sale) => {
        return sum + parseInt(sale.amount);
    }, 0);
    useEffect(() => {
        if (!edit) {
            setEditContact({
                cname: getContact.cname,
                domain: getContact.domain,
                mobile_no: getContact.mobile_no,
                email: getContact.email,
            });
        }
    }, [edit, getContact]);

    useFocusEffect(
        React.useCallback(() => {
            getContactTableDataWithId();
            getContactSaleWithId();
        }, [])
    );
    // useEffect(() => {
    //     getContactTableDataWithId();
    // }, [])

    return (
        <View style={styles.container}>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <View style={styles.mainviewcusomerheader}>
                            <View style={styles.maincustomer}>
                                <View style={styles.backIcon}>
                                    {
                                        edit ? (
                                            <>
                                                <Ionicons
                                                    name="arrow-back-outline"
                                                    onPress={() => {
                                                        navigation.goBack();
                                                    }}
                                                    size={20}
                                                ></Ionicons>
                                            </>
                                        ) : (
                                            <>
                                                <Ionicons
                                                    name="arrow-back-outline"
                                                    onPress={() => {
                                                        navigation.goBack();
                                                    }}
                                                    size={20}
                                                ></Ionicons>
                                            </>
                                        )
                                    }

                                </View>
                                <View style={styles.customerName}>
                                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                        {getContact.cname}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                {
                                    edit ? (
                                        <>
                                            <TouchableOpacity style={styles.addSaleBtn} onPress={() => { postdata(id), setEdit(false) }}>
                                                <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>Save</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <TouchableOpacity style={styles.addSaleBtn} onPress={() => { getContactTableDataWithId(), setEdit(true) }}>
                                                <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>Edit</Text>
                                            </TouchableOpacity>
                                        </>
                                    )
                                }
                                {/* <TouchableOpacity style={styles.addSaleBtn} onPress={() => { getContactTableDataWithId(), setEdit(true) }}>
                        <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>Edit</Text>
                    </TouchableOpacity> */}
                            </View>
                        </View>
                        {
                            edit ? (
                                <>
                                    <View>
                                        <Text style={styles.lable}>Customer Names:- </Text>
                                        <TextInput style={[styles.name, styles.editInput]} onChangeText={(text) => handleChange("cname", text)}>{getContact.cname}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Domain Names:- </Text>
                                        <TextInput style={[styles.name, styles.editInput]} onChangeText={(text) => handleChange("domain", text)}>{getContact.domain}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Mobile Number:- </Text>
                                        <TextInput style={[styles.name, styles.editInput]} onChangeText={(text) => handleChange("mobile_no", text)}>{getContact.mobile_no}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Email Id:- </Text>
                                        <TextInput style={[styles.name, styles.editInput]} onChangeText={(text) => handleChange("email", text)}>{getContact.email}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>All Sales:- </Text>
                                        <TextInput style={styles.name} editable={false}>{getSale.length}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>All Total Amount:- </Text>
                                        <TextInput style={styles.name} editable={false}>{totalAmount.toString()}</TextInput>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View>
                                        <Text style={styles.lable}>Customer Name:- </Text>
                                        <TextInput style={styles.name} editable={false}>{getContact.cname}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Domain Name:- </Text>
                                        <TextInput style={styles.name} editable={false}>{getContact.domain}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Mobile Number:- </Text>
                                        <TextInput style={styles.name} editable={false}>{getContact.mobile_no}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Email Id:- </Text>
                                        <TextInput style={styles.name} editable={false}>{getContact.email}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>All Sales:- </Text>
                                        <TextInput style={styles.name} editable={false}>{getSale.length}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>All Total Amount:- </Text>
                                        <TextInput style={styles.name} editable={false}>{totalAmount.toString()}</TextInput>
                                    </View>
                                </>
                            )
                        }
                    </>
                )
            }
        </View>
    )
}

export default ViewCustomerMain
