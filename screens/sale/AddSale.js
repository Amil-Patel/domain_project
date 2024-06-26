import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../../styles/style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
const PORT = process.env.EXPO_PUBLIC_API_URL;

const AddSale = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [selectedValue, setSelectedValue] = useState("Select Item");
  const [durationTime, setDurationTime] = useState("");
  const [addData, setAddData] = useState({
    service: "",
    quantity: "",
    duration: "",
    amount: "",
    received: "",
    starting_date: new Date(),
    ending_date: "",
    customer_id: id,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setAddData((prevData) => ({
      ...prevData,
      starting_date: date,
    }));
    hideDatePicker();
  };
  const handleChange = (name, value) => {
    setAddData((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
    setEndingDate();
  };
  const setEndingDate = async () => {
    const startingDate = new Date(addData.starting_date);
    const durationInYears = parseInt(addData.duration);

    const endDate = new Date(
      startingDate.getFullYear() + durationInYears,
      startingDate.getMonth(),
      startingDate.getDate()
    );
    setDurationTime(
      `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`
    );
  };
  const postdata = async () => {
    try {
      if (addData.duration === "") {
        window.alert("Duration is Required");
        return false;
      }
      if (addData.amount === "") {
        window.alert("Amount is Required");
        return false;
      }
      addData.received = 0;
      addData.ending_date = durationTime;
      addData.service = selectedValue;
      const response = await axios.post(`${PORT}/addservicedata`, addData);
      if (response.status === 200) {
        navigation.goBack();
      } else {
        window.alert("Sale Add Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addMainHeader}>
        <View style={styles.maincustomer}>
          <View style={styles.backIcon}>
            <Ionicons
              name="arrow-back-outline"
              onPress={() => {
                navigation.goBack();
              }}
              size={25}
              style={{ marginTop: 2 }}
            ></Ionicons>
          </View>
          <View>
            <Text style={{ fontSize: 22, fontWeight: "500", marginLeft: 10 }}>
              Sale
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.addSaleBtn} onPress={postdata}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dropdown}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: "MAIL", value: "mail" },
            { label: "SSL", value: "ssl" },
            { label: "TLS", value: "tls" },
          ]}
          value={selectedValue}
        />
      </View>

      <View style={styles.topTwoInput}>
        <View>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              editable={false}
              placeholder="Select Date"
              value={
                addData.starting_date ? formatDate(addData.starting_date) : ""
              }
              style={styles.yearInput}
              onChangeText={(text) => handleConfirm("starting_date", text)}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={new Date(addData.starting_date)}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter Duration"
            style={styles.yearInput}
            value={addData.duration}
            onChangeText={(text) => handleChange("duration", text)}
          />
        </View>
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter Quantity"
          style={[styles.yearInput, { width: 332 }]}
          onChangeText={(text) => handleChange("quantity", text)}
          value={addData.quantity}
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
            placeholder="₹"
            style={styles.amountInput}
            onChangeText={(text) => handleChange("amount", text)}
            value={addData.amount}
          />
        </View>
      </View>
    </View>
  );
};

export default AddSale;
