import React, {useState} from 'react';
import {View, StyleSheet, Text} from "react-native";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import { CountDown } from "../../components/CountDown";
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import {Timing} from './Timing';

export const Timer = ({focusSubject}) => {
    const [minutes, setMinutes] = useState()
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(0);
    const changeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    }
    const onProgress = (progress) => {
        setProgress(progress)
    }
    return (
        <View style={styles.container}>
            <View style={{paddingTop: spacing.xl}}>
                <View style = {styles.countdown}>

                    <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress}/>
                </View>
                <Text style={styles.title}>Focusing on : </Text>
                <Text style={styles.task}>{focusSubject}</Text>
                <View style={{paddingTop: spacing.sm}}>
                    <ProgressBar progress={progress} color='#5E84E2' style={{height: 10}}/>
                </View>
                <View style={styles.buttonWrapper}>
                        <Timing onChangeTime={changeTime}/>
                </View>
            <View stye={styles.buttonWrapper}>
                    {isStarted ? (
                        <RoundedButton title="pause" size={100} onPress={ () => setIsStarted(false)}/>
                    ) : (

                    <RoundedButton title="start" size={100} onPress={ () => setIsStarted(true)}/>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
     title:{
        color: colors.white,
        textAlign: 'center'
     }, 
     task:{
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
     }, 
     countdown: {
         flex: 0, 
         alignItems: 'center',
         justifyContent: 'center'
     }, 
     buttonWrapper: {
         flexDirection: 'row',
         flex: 0.5, 
         padding: 15,
         justifyContent: 'center',
         alignItems: 'center',
         paddingTop: 50
     }
})