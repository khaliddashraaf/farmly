import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, PlantScreen, IrrigationScreen } from "./src/screens";
import DrawerItems from "./src/components/DrawerItems";
import { decode, encode } from "base-64";
import { firebase } from "./src/firebase/config";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const realtime = firebase.database();

    setLoading(true);

    realtime.ref().once("value", (snap) => {
      setData(snap.val());
      setLoading(false);
    });
  }, []);

  return (
    !loading && (
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="front"
          initialRouteName="Sensor Data"
          screenOptions={{
            drawerActiveTintColor: "black",
            drawerActiveBackgroundColor: "#D4D9B0",
            itemStyle: { marginVertical: 10 },
          }}
        >
          {DrawerItems.map((drawer) => (
            <Drawer.Screen
              key={drawer.name}
              name={drawer.name}
              component={
                drawer.name === "Irrigation System Control"
                  ? IrrigationScreen
                  : drawer.name === "Plant Disease Detection"
                  ? PlantScreen
                  : HomeScreen
              }
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    )
  );
}
