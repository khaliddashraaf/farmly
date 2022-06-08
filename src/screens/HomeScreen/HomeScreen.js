import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import ProgressCircle from "../../components/ProgressCricle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function HomeScreen(props) {
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState({});

  const realtime = firebase.database().ref();

  useEffect(() => {
    setLoading(true);

    realtime.once("value", (snap) => {
      setSensorData(snap.val());
      setLoading(false);
    });
  }, []);

  return (
    !loading && (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/background.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          {sensorData && (
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <ProgressCircle
                  style={styles.circular}
                  value={sensorData["Temp"] / 100}
                  size={120}
                  thickness={9}
                  color="#A6BF8E"
                  unfilledColor="#f2f2f2"
                  animationMethod="spring"
                  animationConfig={{ speed: 1 }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.circularText}>
                      {sensorData["Temp"]}
                    </Text>
                    <Icon name="temperature-celsius" size={25} />
                  </View>
                </ProgressCircle>
                <Text style={{}}>Temperature</Text>
              </View>
              <View style={styles.listItem}>
                <ProgressCircle
                  style={styles.circular}
                  value={sensorData["Humid"] / 100}
                  size={120}
                  thickness={9}
                  color="#A6BF8E"
                  unfilledColor="#f2f2f2"
                  animationMethod="spring"
                  animationConfig={{ speed: 1 }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.circularText}>
                      {sensorData["Humid"]}
                    </Text>
                    <Icon name="water-percent" size={30} />
                  </View>
                </ProgressCircle>
                <Text style={{}}>Humidity</Text>
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    )
  );
}
