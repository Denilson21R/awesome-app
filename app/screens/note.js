import { View, Text, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import colors from '../misc/colors'
import SearchBar from '../components/searchBar'
import RoundIconButton from '../components/RoundIconButton'
import NoteInputModal from '../components/NoteInputModal'
import NoteCard from '../components/NoteCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native'

export default function note({user}) {
  const [greet, setGreet] = useState('Evening')
  const [modalVisible, setModalVisible] = useState(false)
  const [notes, setNotes] = useState([])

  const findGreet = () => {
    const hours = new Date().getHours()
    if (hours < 12) {
      setGreet('Morning')
    } else if (hours >= 12 && hours < 17) {
      setGreet('Afternoon')
    } else {
      setGreet('Evening')
    }
  }

  const findNotes = async () => {
    try{
      const result = await AsyncStorage.getItem('notes')
      if(result !== null) setNotes(JSON.parse(result))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    findNotes()
    findGreet()
  }, [])

  const handleOnSubmit = async (title, description) => {
    
    const note = {
      id: Date.now(),
      title,
      description,
      time: Date.now()
    }

    const updateNotes = [...notes, note];
    setNotes(updateNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updateNotes))
  }
  
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? <SearchBar containerStyle={{ marginVertical: 15}}/> : null}
          
          <FlatList data={notes} numColumns={2} columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}} keyExtractor={item => item.id.toString()} 
            renderItem={
              ({item}) => <NoteCard item={item}/>
            }
          />
          {!notes.length ? <View style={[StyleSheet.absoluteFillObject, styles.emptyHeadingContainer]}>
            <Text style={styles.emptyHeading}>ADD NOTES</Text>
          </View> : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconButton onPress={()=>{setModalVisible(true)}} antIconName='plus' style={styles.addBtn} />
      <NoteInputModal visible={modalVisible} onClose={()=> setModalVisible(false)} onSubmit={handleOnSubmit}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    zIndex: 1
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  emptyHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    opacity: 0.2
  },
  emptyHeadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 1
  }
})