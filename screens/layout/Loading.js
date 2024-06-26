import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles, primaryColor } from "../../styles/style";

const Loading = () => {
  return (
    <View style={[styles.loading_container, styles.loading_horizontal]}>
      <ActivityIndicator color={primaryColor} size={60} animating={true} />
    </View>
  );
};

export default Loading;
