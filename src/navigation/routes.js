import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "native-base";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AboutStack from "../screens/About";
import GalleryStack from "../screens/Gallery";
import MapStack from "../screens/Map";
import SubmissionsStack from "../screens/Submissions";
import SubmitStack from "../screens/Submit";
import {
  MAP_STACK,
  SUBMIT_STACK,
  SUBMISSIONS_SCREEN,
  ABOUT_STACK,
  GALLERY_STACK,
} from "../constants/ScreenNames";
import {
  BLACK,
  MENU_BG_GRAY,
  MENU_ICON_GRAY,
  RAINWORKS_BLUE,
} from "../constants/Colors";

const Drawer = createDrawerNavigator();

const AppRoutes = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerContentStyle: {
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
        },
        drawerItemStyle: {
          marginHorizontal: 0,
          paddingHorizontal: 10,
        },
        drawerActiveBackgroundColor: MENU_BG_GRAY,
        drawerActiveTintColor: RAINWORKS_BLUE,
      }}
    >
      <Drawer.Screen
        name={MAP_STACK}
        component={MapStack}
        options={{
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                fontWeight: "600",
                color: focused ? RAINWORKS_BLUE : BLACK,
              }}
            >
              Map
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Icon
              as={Ionicons}
              name="map"
              size={6}
              color={focused ? BLACK : MENU_ICON_GRAY}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={GALLERY_STACK}
        component={GalleryStack}
        options={{
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                fontWeight: "600",
                color: focused ? "#1a91ff" : BLACK,
              }}
            >
              Gallery
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Icon
              as={Ionicons}
              name="images"
              size={6}
              color={focused ? BLACK : MENU_ICON_GRAY}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={SUBMIT_STACK}
        component={SubmitStack}
        options={{
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                fontWeight: "600",
                color: focused ? RAINWORKS_BLUE : BLACK,
              }}
            >
              Submit
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Icon
              as={Ionicons}
              name="create"
              size={6}
              color={focused ? BLACK : MENU_ICON_GRAY}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={SUBMISSIONS_SCREEN}
        component={SubmissionsStack}
        options={{
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                fontWeight: "600",
                color: focused ? RAINWORKS_BLUE : BLACK,
              }}
            >
              Submissions
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Icon
              as={Ionicons}
              name="list"
              size={6}
              color={focused ? BLACK : MENU_ICON_GRAY}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={ABOUT_STACK}
        component={AboutStack}
        options={{
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                fontWeight: "600",
                color: focused ? RAINWORKS_BLUE : BLACK,
              }}
            >
              About Rainworks
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Icon
              as={Ionicons}
              name="help"
              size={6}
              color={focused ? BLACK : MENU_ICON_GRAY}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
