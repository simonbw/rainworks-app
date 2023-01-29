import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import PropTypes from "prop-types";
import React, { useEffect, useCallback, useState } from "react";
import { View } from "react-native";
import { CacheManager } from "react-native-expo-image-cache";
import { showError } from "./toastUtils";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Preloader = () => {
  // static propTypes = {
  //   children: PropTypes.node.isRequired,
  // };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ready: false,
  //   };
  // }

  // render() {
  //   return this.state.ready ? this.props.children : this.renderLoading();
  // }

  // renderLoading() {

  // }

  // const cacheAssets = async () => {
  //   await CacheManager.clearCache(); // TODO: Something better than this
  //   await Promise.all([
  //     Font.loadAsync({
  //       // 'Rainworks': require('../assets/Rainworks.ttf'),
  //       // Roboto: require("native-base/Fonts/Roboto.ttf"),
  //       // Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  //     }),
  //     Asset.loadAsync([
  //       require("../assets/bundled/pin_unfound.png"),
  //       require("../assets/bundled/pin_found.png"),
  //       require("../assets/bundled/header.png"),
  //       // require("react-navigation/src/views/assets/back-icon.png"),
  //       // require("react-navigation/src/views/assets/back-icon-mask.png")
  //     ]),
  //     Asset.loadAsync([
  //       // TODO: Only preload this on first open
  //       require("../assets/bundled/intro.mp4"),
  //     ]),
  //   ]);
  // };

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        await Asset.loadAsync([
          require("../assets/bundled/pin_unfound.png"),
          require("../assets/bundled/pin_found.png"),
          require("../assets/bundled/header.png"),
          // require("react-navigation/src/views/assets/back-icon.png"),
          // require("react-navigation/src/views/assets/back-icon-mask.png")
        ]),
          await Asset.loadAsync([
            // TODO: Only preload this on first open
            require("../assets/bundled/intro.mp4"),
          ]),
          // Artificially delay for two seconds to simulate a slow loading
          // experience. Please remove this if you copy and paste the code!
          await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return <View onLayout={onLayoutRootView} />;
};

export default Preloader;
