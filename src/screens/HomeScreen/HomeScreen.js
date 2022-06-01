import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { getDatabase, ref, child, get } from "firebase/database";
import CircularProgress from 'react-native-circular-progress-indicator';

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('');
    const [entities, setEntities] = useState([]);
    const [realTimeData, setRealTimeData] = useState({});

    const entityRef = firebase.firestore().collection('entities')
    const real = firebase.database()
    const userID = props.extraData.id


    useEffect(() => {
        real
            .ref()
            .once('value')
            .then(snapshot => {
                setRealTimeData(snapshot.val());
            })
            .catch(error => {
                console.log(error);
            })
        if(realTimeData)
            // console.log(realTimeData)
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onClick = () => {
        props.navigation.navigate('PlantScreen')
    }

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            
            { realTimeData && (
                <View style={styles.listContainer}>
                    <View style={styles.circular}>
                        <CircularProgress
                            value={(realTimeData["Humidity"])}
                            radius={80}
                            duration={500}
                            progressValueColor={'black'}
                            maxValue={100}
                            title={'Humidity'}
                            titleColor={'black'}
                            titleStyle={{fontWeight: '100'}}
                            progressValueStyle={{fontWeight:'100'}}
                        />
                    </View>
                    <View style={styles.circular}>

                        <CircularProgress
                            value={realTimeData["Temperature"]}
                            radius={80}
                            duration={500}
                            progressValueColor={'black'}
                            maxValue={100}
                            title={'Temperature'}
                            titleColor={'black'}
                            titleStyle={{fontSize:15,fontWeight: '100'}}
                            valueSuffix={'˚'}
                            progressValueStyle={{fontWeight:'100'}}
                        />
                    </View>
                    <View style={styles.circular}>
                        <CircularProgress
                            value={realTimeData["Soil Moisture"]}
                            radius={80}
                            duration={500}
                            progressValueColor={'black'}
                            maxValue={100}
                            title={'Soil Moisture'}
                            valueSuffix={"%"}
                            titleColor={'black'}
                            titleStyle={{fontSize:15,fontWeight: '100'}}
                            progressValueStyle={{fontWeight:'100'}}
                        />
                    </View>
                </View>
            )}
            <View style={styles.button}>
                <TouchableOpacity onPress={onClick}>
                    <Text style={styles.buttonText}>View Plant Status</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}