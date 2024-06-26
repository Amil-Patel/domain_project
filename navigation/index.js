import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoardingPath from "./BoardingPath";
import ViewCustomer from "../screens/customer/ViewCustomer";
import AddCustomer from "../screens/customer/AddCustomer";
import Search from "../screens/search/Search";
import AddSale from "../screens/sale/AddSale";
import ViewCustomerMain from "../screens/customer/ViewCustomerMain";
import ViewSale from "../screens/sale/ViewSale";
import AddService from "../screens/service/AddService";
const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="boardingroute"
        component={BoardingPath}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="searchcustomer"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewCustomer"
        component={ViewCustomer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewSale"
        component={AddSale}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewCustomermain"
        component={ViewCustomerMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="viewSale"
        component={ViewSale}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddService"
        component={AddService}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default index;
