import React from "react";
import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";

export const FocusHistory = ({ focusHistory, setFocusHistory }) => {
  const clearHistory = () => {
    setFocusHistory([])
  };

  const HistoryItem = ({item, index})=> {
      return (
          <Text style={styles.historyItem(item.status)}>
              {JSON.stringify(item)}
          </Text>
      )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Things we have focused on</Text>
        {!!focusHistory.length && (
          <FlatList
            style={{ width: "100%", height: "100%" }}
            contentContainerStyle={{ flex: 1, alignItems: "center" }}
            data={focusHistory}
            renderItem={({ item, index }) => (
                <Text style={styles.historyItem(item.status)}>
                  {JSON.stringify(item)}
                </Text>
              )}
          />
        )}
      </SafeAreaView>
      <View style={styles.clearContainer}>
        <RoundedButton size={75} title="Clear" onPress={() => clearHistory()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
        historyItem: (status) => ({
            color: status > 1 ? 'red' : 'green',
            fontSize: fontSizes.md,
        }),
        title: {
            color: 'white',
            fontSize: fontSizes.lg
        },
        clearContainer: {
            alignItems: "center",
            padding: spacing.sm,
          },
    })
