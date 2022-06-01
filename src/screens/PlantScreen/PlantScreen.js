import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function PlantScreen(props) {

    return(
        <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Text>Plant Screen</Text>
        </View>
    )
}