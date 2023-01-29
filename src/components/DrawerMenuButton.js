import { Button, Icon, HamburgerIcon } from "native-base";
import React from "react";
import { StatusBar, Platform } from "react-native";
import { WHITE } from "../constants/Colors";

const DrawerMenuButton = ({ navigation, tintColor = WHITE }) => (
  <Button
    transparent
    style={{
      backgroundColor: "transparent",
      height: "100%",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }}
    onPress={() => navigation.openDrawer()}
  >
    <HamburgerIcon style={{ color: tintColor }} size={6} />
  </Button>
);

export default DrawerMenuButton;
