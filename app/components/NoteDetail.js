import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {useHeaderHeight} from '@react-navigation/native-stack'

const NoteDetail = props => {
    const {note} = props.route.params
    return (
        <View style={styles.container}>
            <Text style={styles.title} >{note.title}</Text>
            <Text style={styles.description}>{note.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        fontSize: 25
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})

export default NoteDetail