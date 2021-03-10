import React, { useState } from "react";
import { View, StyleSheet, Text, Platform, Vibration} from "react-native";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import { CountDown } from "../../components/CountDown";
import { RoundedButton } from "../../components/RoundedButton";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";
import { Timing } from "./Timing";
const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject}) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  const onProgress = (progress) => {
    setProgress(progress / 100);
  };
  const vibrate = () => {
      if(Platform.OS === 'ios'){
          const interval = setInterval(()=> Vibration.vibrate(), 1000);
          setTimeout(() =>clearInterval(interval), 1000)
      } else {
          Vibration.vibrate(10000);
      }
  }
  const onEnd = () => {
      vibrate();
      setMinutes(DEFAULT_TIME);
      setProgress(1);
      setIsStarted(false);
      onTimerEnd();

  }
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: spacing.xl }}>
        <View style={styles.countdown}>
          <CountDown
            minutes={minutes}
            isPaused={!isStarted}
            onEnd={onEnd}
            onProgress={onProgress}
          />
        </View>
        <Text style={styles.title}>Focusing on : </Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <View style={{ paddingTop: spacing.sm }}>
          <ProgressBar
            progress={progress}
            color="#5E84E2"
            style={{ height: 10 }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Timing onChangeTime={changeTime} />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            size={200}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={200}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
        <View style={styles.clearSubject}>
        <RoundedButton
            title="Cancel"
            size={50}
            style={{fontSize: 10}}
            onPress={() => clearSubject()}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  countdown: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    flex: 0.5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
  buttonWrapper2: {
    flex: 1,
    //  flexDirection: 'row',
    //  flex: 0.5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  }
});
