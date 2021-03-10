import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform, AsyncStorage } from "react-native";
import { Timer } from "./src/features/timer/Timer";
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";
const STATUSES = {
  COMPLETE:1,
  CANCELLED: 2
}
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);


  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error)
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadFocusHistory();
  })

  useEffect(()=>{
    saveFocusHistory();
  }, [focusHistory])
  addFocusHistorySubjectWithState = (focusSubject, status) => {
    setFocusHistory([...focusHistory, { focusSubject, status }]);
  };

  const onClear =() => {
    //TODO: 
    setFocusHistory([])
  }

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null)}}
        />
      ) : (
        <>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} setFocusHistory={setFocusHistory}></FocusHistory>
        </>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
  },
});
