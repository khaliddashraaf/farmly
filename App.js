import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, PlantScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { firebase } from './src/firebase/config'

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  if (loading) {	
    return (	
      <></>	
    )	
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
          <Stack.Screen name="HomeScreen">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen name="PlantScreen" component={PlantScreen}/>
</>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}