import React from 'react';

import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {fontSizes, spacing} from "../utils/sizes";
export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
    <View>
      <Text style={[styles(size).text, textStyle]}  onPress={props.onPress}>{props.title}</Text>
    </View>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      // flex: 1,
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 2
    },
    text: {
      color: 'white',
      fontSize: size/3,
    },
  });
