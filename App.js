import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/Focus';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  return (
        <View style={styles.container}>
      {focusSubject ? (
        <Text> I have a Subject</Text>
      ) : (
        <Focus addSubject={setFocusSubject}/>
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#355C7D"
  },
});
