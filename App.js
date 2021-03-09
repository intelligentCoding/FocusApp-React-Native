import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Timer } from "./src/features/timer/Timer";
import { Focus } from "./src/features/focus/Focus";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject}/>
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
