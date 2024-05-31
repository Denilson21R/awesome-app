import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../misc/colors'

export default function NoteCard({item, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text numberOfLines={3}>{item.description}</Text>
        </TouchableOpacity>
    )
}

const width = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: (width/2) - 10,
        padding: 8,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT,
    }
})