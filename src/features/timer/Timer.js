import React from 'react';
import {View, StyleSheet, Text} from "react-native";


export const Timer = ({focusSubject}) => {
    return (
        <View style={styles.container}>
            <Text>Timer Goes here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})