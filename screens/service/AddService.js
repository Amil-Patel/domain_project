import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/style'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
const PORT = process.env.EXPO_PUBLIC_API_URL;

const AddService = () => {
    const navigation = useNavigation();
    const [addService, setAddService] = useState({
        service_name: '',
    });
    const handleChange = (name, value) => {
        setAddService((prevProdData) => ({
            ...prevProdData,
            [name]: value,
        }));
    };

    const postdata = async () => {
        try {
            if (addService.service_name === "") {
                window.alert("Service Name is Required");
                return false;
            }
            if (!isNaN(addService.service_name)) {
                window.alert("Do Not Allow Number in Service Name");
                return false;
            }
            const response = await axios.post(`${PORT}/addservice`, addService);
            if (response.status === 200) {
                navigation.navigate("Main");
            } else {
                window.alert("Customer Add Failed");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.mainAddContact}>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View>
                        <Ionicons
                            name="close-outline"
                            size={30}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={{ textAlignVertical: "center" }}
                        />
                    </View>
                    <View>
                        <Text style={styles.customerTitle}>Add Service</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.saveName} onPress={postdata}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.serviceInput}>
                <Text style={styles.lable}>Service :- </Text>
                <TextInput
                    placeholder="Service Name"
                    style={styles.viewSaleData}
                    value={addService.service_name}
                    onChangeText={(text) => handleChange("service_name", text)}
                />
            </View>

        </View>
    )
}

export default AddService
