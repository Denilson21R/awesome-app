import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import colors from '../misc/colors'
import SearchBar from '../components/searchBar'
import RoundIconButton from '../components/RoundIconButton'

export default function note({user}) {
  const [greet, setGreet] = useState('Evening')

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

  useEffect(() => {
    findGreet()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
      <SearchBar containerStyle={{ marginVertical: 15}}/>
      <View style={[StyleSheet.absoluteFillObject, styles.emptyHeadingContainer]}>
        <Text style={styles.emptyHeading}>ADD NOTES</Text>
        <RoundIconButton onPress={()=>{console.log('ADD TODO')}} antIconName='plus' style={styles.addBtn} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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