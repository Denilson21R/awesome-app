import { View, Text, TextInput, Dimensions, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import colors from '../misc/colors';
import RoundIconButton from '../components/RoundIconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function intro({onFinish}) {
    const [name, setname] = React.useState('');
    const handleOnChangeText = text => setname(text);
    const handleSubmit = async () => {
        const user = {name: name.trim()};
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if(onFinish) onFinish(user);
    }
    
    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text>Enter your name to continue</Text>
                <TextInput value={name} onChangeText={handleOnChangeText} placeholder="Name" style={styles.textInput} />
                {name.trim().length >= 3 ? (
                    <RoundIconButton antIconName='arrowright' onPress={handleSubmit}/>
                ): null}
            </View>
        </>
    )
};

const width = Dimensions.get('window').width -50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        width: width,
        height: 40,
        borderRadius: 20,
        paddingLeft: 10,
        fontSize: 25,
        marginBottom: 15,
    }
});