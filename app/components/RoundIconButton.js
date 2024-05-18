import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../misc/colors'
import { StyleSheet } from 'react-native';

const RoundIconButton = ({antIconName, size, color, style, onPress}) => {
  return (
    <AntDesign 
        name={antIconName} 
        size={size || 24} 
        color={color || colors.LIGHT}
        style={[styles.icon, {...style}]}
        onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    },
});

export default RoundIconButton;