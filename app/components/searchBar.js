import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import colors from '../misc/colors'

export default function searchBar({containerStyle}) {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput style={styles.searchBar} placeholder='Search here...'/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        paddingLeft: 15,
        borderRadius: 40,
        fontSize: 20,
    },
})