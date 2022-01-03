import { Button, Icon } from "native-base";
import React from "react";
import {  StatusBar, Platform } from "react-native";
import { withNavigation } from "react-navigation";
import { WHITE } from "./constants/Colors";

const DrawerMenuButton = ({ navigation, tintColor = WHITE }) => (
  <Button
    transparent
    style={{ 
      height: "100%",
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight:  0
    }}
    onPress={() => navigation.openDrawer()}
  >
    <Icon name="menu" style={{ color: tintColor }} />
  </Button>
);

export default withNavigation(DrawerMenuButton);
