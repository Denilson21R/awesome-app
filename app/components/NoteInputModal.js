import { View, Text, Modal, StyleSheet, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {React, useState} from 'react'
import colors from '../misc/colors'
import RoundIconButton from './RoundIconButton'

export default function NoteInputModal({visible, onClose, onSubmit}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleModalClose = () => {
        Keyboard.dismiss()
    }

    const handleOnChangeText = (text, type) => {
        if(type === 'title') setTitle(text)
        if(type === 'description') setDescription(text)
    }

    const handleSubmit = (text, type) => {
        if(!title.trim() || !description.trim()) return onClose()
        onSubmit(title, description)
        closeModal()
    }

    const closeModal = () => {
        setTitle('')
        setDescription('')
        onClose()
    }

    return (
        <>
            <StatusBar hidden/>
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <TextInput value={title} onChangeText={(text) => handleOnChangeText(text, 'title')} placeholder='Title' style={[styles.input, styles.title]}/>
                    <TextInput value={description} onChangeText={(text) => handleOnChangeText(text, 'description')} multiline placeholder='Description' style={[styles.input, styles.description]}/>
                    <View style={styles.btnContainer}>
                        <RoundIconButton size={15} antIconName='check'onPress={handleSubmit}/>
                        {title.trim() || description.trim() ? 
                        <RoundIconButton size={15} style={{marginLeft: 15}} antIconName='close' onPress={closeModal}/> 
                        : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBackground, StyleSheet.absoluteFillObject]}>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    description: {
        height: 100
    },
    modalBackground: {
        flex: 1,
        zIndex: -1
    },
    submit: {
        alignSelf: 'flex-end'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20
    }
})
