import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, RefreshControl } from 'react-native'
import { styles } from '../../styles/style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from "react-native-picker-select";
import Loading from '../layout/Loading';
const PORT = process.env.EXPO_PUBLIC_API_URL;

const ViewSale = ({ route }) => {
    const navigation = useNavigation();
    const { id } = route.params;
    const [getSaleViewData, setGetSaleViewData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [forDuration, setForDuration] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [durationTime, setDurationTime] = useState("");
    const [editContactSaleView, setEditContactSaleView] = useState({
        service: "",
        quantity: "",
        duration: "",
        amount: "",
        received: "",
        starting_date: "",
        ending_date: "",
    });
    const [addData, setAddData] = useState({
        service: getSaleViewData.service,
        quantity: getSaleViewData.quantity,
        duration: getSaleViewData.duration,
        amount: getSaleViewData.amount,
        received: getSaleViewData.received,
        starting_date: getSaleViewData.starting_date,
        ending_date: getSaleViewData.ending_date,
        customer_id: getSaleViewData.customer_id,
    });
    const handleChange = (name, value) => {
        setEditContactSaleView(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === "duration") {
            setEndingDate(value);
        }
        if (name === 'amount') {
            var updatedBalance = parseInt(value) - parseInt(editContactSaleView.received);
            setEditContactSaleView(prevData => ({
                ...prevData,
                balance: updatedBalance
            }));
        }
        if (name === 'received') {
            var updatedBalance = parseInt(editContactSaleView.amount) - parseInt(value);
            setEditContactSaleView(prevData => ({
                ...prevData,
                balance: updatedBalance
            }));
        }
    };
    const setEndingDate = (duration, date) => {
        if (date) {
            var startingDate = new Date(date);
        } else {
            var startingDate = new Date(editContactSaleView.starting_date ? editContactSaleView.starting_date : getSaleViewData.starting_date);
        }
        const durationInYears = parseInt(duration);

        const endDate = new Date(
            startingDate.getFullYear() + durationInYears,
            startingDate.getMonth(),
            startingDate.getDate()
        );
        setDurationTime(
            `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`
        );
    };

    // useEffect(() => {
    //     if (durationTime) {
    //         setEditContactSaleView(prevData => ({
    //             ...prevData,
    //             ending_date: durationTime
    //         }));
    //     }
    // }, [durationTime]);

    const postdata = async () => {
        setLoading(true);
        if (durationTime) {
            editContactSaleView.ending_date = durationTime;
        }
        try {
            const response = await axios.put(`${PORT}/editcontactsaleviewdata/${id}`, editContactSaleView);
            if (response.status === 200) {
                window.alert("Sale Edit Succesfully");
                setEdit(false);
                getContactSaleWithId(id);
                setLoading(false);
            } else {
                window.alert("Customer Add Failed");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getContactSaleWithId = async () => {
        setLoading(true)
        await axios
            .get(`${PORT}/getcontactsaleViewDatawithid/${id}`)
            .then((response) => {
                setGetSaleViewData(response.data[0]);
                setAddData(response.data[0]);
                setEditContactSaleView(response.data[0])
                setLoading(false)
            })
            .catch((error) => {
                console.log("Error fetching Sale View data:", error);
                setLoading(false)
            });
    };
    const onRefresh = () => {
        setLoading(true);
        setRefreshing(true);
        getContactSaleWithId();
        setRefreshing(false);
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
    const formatDates = (dateString) => {
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
        return (
            <Text>
                <Text>{day} {monthName} {year}</Text>
            </Text>
        );
    };
    const balance = getSaleViewData.amount - getSaleViewData.received;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setEditContactSaleView((prevData) => ({
            ...prevData,
            starting_date: date,
        }));
        setEndingDate(editContactSaleView.duration, date)
        hideDatePicker();
    };

    const deleteSaleData = () => {
        setLoading(true);
        Alert.alert(
            'Confirm Delete',
            'Do you want to delete this data?',
            [
                {
                    text: 'Cancel',
                    onPress: () => setLoading(false),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await axios.delete(`${PORT}/deletesalecontactdata/${id}`);
                            if (response.status === 200) {
                                navigation.goBack();
                            } else {
                                console.log("Error deleting data from customer-sale");
                            }
                        } catch (error) {
                            console.log("Error deleting data from customer-sale:", error);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const addDuplicate = () => {
        axios.post(`${PORT}/addservicedata`, addData)
            .then(() => {
                navigation.goBack();
            }).catch((err) => {
                console.log(err + "error in added duplicated data")
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getContactSaleWithId();
        }, [])
    );
    useEffect(() => {
        if (!edit) {
            setDatePickerVisibility(false);
        }
    }, [edit]);
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
                                            <Ionicons
                                                name="arrow-back-outline"
                                                onPress={() => {
                                                    setEdit(false)
                                                }}
                                                size={20}
                                            ></Ionicons>
                                        ) : (
                                            <Ionicons
                                                name="arrow-back-outline"
                                                onPress={() => {
                                                    navigation.goBack();
                                                }}
                                                size={20}
                                            ></Ionicons>
                                        )
                                    }
                                </View>
                                <View style={styles.customerName}>
                                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                        Forolly Food
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.addSaleBtn} onPress={addDuplicate} >
                                    <Text style={{ fontSize: 13, fontWeight: "500", color: "white" }}>Duplicate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            edit ? (
                                <>
                                    <View>
                                        <Text style={styles.lable}>Services :- </Text>
                                        <RNPickerSelect
                                            onValueChange={(value) => handleChange("service", value)}
                                            items={[
                                                { label: "MAIL", value: "mail" },
                                                { label: "SSL", value: "ssl" },
                                                { label: "TLS", value: "tls" },
                                            ]}
                                            value={editContactSaleView.service}
                                        />
                                    </View>
                                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={styles.lable}>Starting-Date :- </Text>
                                            <TouchableOpacity onPress={showDatePicker} style={{ padding: 7, paddingHorizontal: 0 }}>
                                                <Text style={[styles.yearInput]} onChangeText={(text) => handleConfirm("starting_date", text)}>
                                                    {editContactSaleView.starting_date ? formatDates(editContactSaleView.starting_date) : ""}
                                                </Text>
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                date={new Date(editContactSaleView.starting_date)}
                                                onConfirm={handleConfirm}
                                                onCancel={hideDatePicker}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.lable}>Durations :- </Text>
                                            <TextInput
                                                keyboardType="numeric"
                                                style={styles.yearInput}
                                                value={editContactSaleView.duration}
                                                onChangeText={(text) => handleChange("duration", text)}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Quantity :- </Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            style={styles.viewSaleData}
                                            value={editContactSaleView.quantity}
                                            onChangeText={(text) => handleChange("quantity", text)}
                                        />
                                    </View>
                                    <View style={styles.amount}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 5 }}>
                                                Total Amount
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                keyboardType="numeric"
                                                style={styles.amountInput}
                                                onChangeText={(text) => handleChange("amount", text)}
                                                value={editContactSaleView.amount}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.amount}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 5 }}>
                                                Received Amount
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                keyboardType="numeric"
                                                style={styles.amountInput}
                                                onChangeText={(text) => handleChange("received", text)}
                                                value={editContactSaleView.received}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.amount}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 5 }}>
                                                Total Balance
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput style={styles.amountInput} editable={false}>{editContactSaleView.balance ? editContactSaleView.balance : editContactSaleView.amount}</TextInput>
                                        </View>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View>
                                        <Text style={styles.lable}>Service :- </Text>
                                        <TextInput style={styles.viewSaleData} editable={false}>{getSaleViewData.service}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Starting-Date :- </Text>
                                        <TextInput style={styles.viewSaleData} editable={false}>{formatDates(getSaleViewData.starting_date)}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Ending-Date :- </Text>
                                        <TextInput style={styles.viewSaleData} editable={false}>{formatDate(getSaleViewData.ending_date)}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Duration :- </Text>
                                        <TextInput style={styles.viewSaleData} editable={false}>{getSaleViewData.duration}</TextInput>
                                    </View>
                                    <View style={styles.mainViewCustomer}>
                                        <Text style={styles.lable}>Quantity :- </Text>
                                        <TextInput style={styles.viewSaleData} editable={false}>{getSaleViewData.quantity}</TextInput>
                                    </View>
                                    <View style={styles.amount}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 5 }}>
                                                Total Amount
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput style={styles.amountInput} editable={false}>{getSaleViewData.amount}</TextInput>
                                        </View>
                                    </View>
                                    <View style={styles.amount}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 5 }}>
                                                Received Amount
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput style={styles.amountInput} editable={false}>{getSaleViewData.received}</TextInput>
                                        </View>
                                    </View>
                                    <View style={styles.amount}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 5 }}>
                                                Total Balance
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput style={styles.amountInput} editable={false}>{balance}</TextInput>
                                        </View>
                                    </View>
                                </>
                            )
                        }
                        <View style={styles.viewSalebtns}>
                            <View style={styles.viewSalebtn}>
                                <TouchableOpacity onPress={() => deleteSaleData()}>
                                    <Text style={{ fontSize: 15, fontWeight: "500", textAlign: 'center' }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.viewSalebtn, styles.btnColor]}>
                                {
                                    edit ? (
                                        <>
                                            <TouchableOpacity onPress={() => { postdata(), setEdit(false) }}>
                                                <Text style={{ fontSize: 17, fontWeight: "500", textAlign: 'center', color: 'white' }}>Save</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <TouchableOpacity onPress={() => { getContactSaleWithId(), setEdit(true) }}>
                                                <Text style={{ fontSize: 17, fontWeight: "500", textAlign: 'center', color: 'white' }}>Edit</Text>
                                            </TouchableOpacity>
                                        </>
                                    )
                                }
                            </View>
                        </View>

                    </>
                )
            }
        </View >
    )
}

export default ViewSale
