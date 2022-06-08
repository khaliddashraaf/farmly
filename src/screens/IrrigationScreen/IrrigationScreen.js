import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import { firebase } from "../../firebase/config";
import ProgressCircle from "../../components/ProgressCricle";
import styles from "./styles";

export default function IrrigationScreen({ route }) {
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

  const updateThresh = () => {
    if (sensorData.Min >= sensorData.Max) {
      Alert.alert(
        "Invalid Threshold Values",
        "Minimum value (" +
          sensorData.Min +
          ") can't be greater than or equal the Maximum one (" +
          sensorData.Max +
          ")"
      );
    } else {
      Alert.alert("Update?", "Are you sure you want to update Thresholds?", [
        {
          text: "Yes",
          style: "default",
          onPress: () => {
            realtime.update(
              { Min: sensorData.Min, Max: sensorData.Max },
              () => {
                Alert.alert("Done", "Thresholds Updated Succesfully");
              }
            );
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  const togglePump = () => {
    if (sensorData.Relay) {
      Alert.alert("Update?", "Are you sure you want to Turn Off the Pump?", [
        {
          text: "Yes",
          style: "default",
          onPress: () => {
            sensorData.Relay = false;
            sensorData.RelayUser = true;
            setSensorData({ ...sensorData });
            realtime.update({ Relay: false, RelayUser: true }, () => {
              Alert.alert(
                "Done",
                "Irrigation System Turned OFF \nTurning Pumps OFF"
              );
            });
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert("Update?", "Are you sure you want to Turn the pump On?", [
        {
          text: "Yes",
          style: "default",
          onPress: () => {
            sensorData.Relay = true;
            sensorData.RelayUser = true;
            setSensorData({ ...sensorData });
            realtime.update({ Relay: true, RelayUser: true }, () => {
              Alert.alert(
                "Done",
                "Irrigation System Turned On \nStarting Pumps"
              );
            });
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    !loading && (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/background.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Status Container */}
          <View style={styles.statusContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Soil Moisture Level</Text>
            </View>
            <View style={styles.listItem}>
              <ProgressCircle
                style={styles.circular}
                value={sensorData.Moist / 100}
                size={120}
                thickness={9}
                color="#A6BF8E"
                unfilledColor="#f2f2f2"
                animationMethod="spring"
                animationConfig={{ speed: 1 }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.circularText}>{sensorData["Moist"]}</Text>
                  <Icon name="water-percent" size={30} />
                </View>
              </ProgressCircle>
            </View>
          </View>
          {/* Threshold Container */}
          <View style={styles.threshContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Soil Moisture Thresholds</Text>
            </View>

            <View style={styles.thresh}>
              <View style={styles.slider}>
                <Slider
                  style={{ width: 300 }}
                  value={sensorData.Min}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#A6BF8E"
                  maximumTrackTintColor="#000000"
                  onValueChange={(value) => {
                    sensorData.Min = Math.round(value * 10) / 10;
                    setSensorData({ ...sensorData });
                  }}
                />
                <Text style={styles.texthresh}>
                  Minimum Threshold: {sensorData.Min}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Slider
                  style={{ width: 300 }}
                  value={sensorData.Max}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#A6BF8E"
                  maximumTrackTintColor="#000000"
                  onValueChange={(value) => {
                    sensorData.Max = Math.round(value * 10) / 10;
                    setSensorData({ ...sensorData });
                  }}
                />
                <Text style={styles.texthresh}>
                  Maximum Threshold: {sensorData.Max}
                </Text>
              </View>
            </View>

            <View style={styles.button}>
              <TouchableOpacity onPress={() => updateThresh()}>
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Irrigation Control Container */}
          <View style={styles.buttonContainer}>
            <View style={styles.irrIcon}>
              <Icon
                name={sensorData.Relay ? "water-pump" : "water-pump-off"}
                size={70}
              />
            </View>
            <View style={styles.irr}>
              <Text style={styles.irrText}>
                {sensorData.Relay
                  ? "Irrigation Pump is Currently ON"
                  : "Irrigation Pump is Currently OFF"}
              </Text>
              <View style={styles.irrButton}>
                <TouchableOpacity onPress={() => togglePump()}>
                  <Text>{sensorData.Relay ? "Turn OFF" : "Turn On"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  );
}
