import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import Intro from './app/screens/intro';
import Note from './app/screens/note';
import NoteDetail from './app/components/NoteDetail';

const stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if(result !== null){
      setUser(JSON.parse(result));
    }
  }

  useEffect(() => {
    findUser();
    //AsyncStorage.clear();
  }, []);

  const RenderNoteScreen = (props) => <Note {...props} user={user} />
  
  if(!user.name) return <Intro onFinish={findUser}/>;
  return <NavigationContainer>
          <stack.Navigator screenOptions={{headerTitle: '', headerTransparent: true}}>
            <stack.Screen name='NoteScreen' component={RenderNoteScreen} />
            <stack.Screen name='NoteDetail' component={NoteDetail} />
          </stack.Navigator>
         </NavigationContainer>
  //return <Note user={user}/>
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
