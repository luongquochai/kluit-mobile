import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default function ListItem(props) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const [data, setData] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const URL = 'https://www.kluit-staging.tk:8000/statistics/humidity_date';

    const fetchData = async () => {
        fetch('https://www.kluit-staging.tk:8000/statistics/humidity_date')
            .then(response => response.json())
            .then(resp => {
                for (var key in resp.data) {
                    console.log(resp.data[key].time);
                }

                setData(resp.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <View>
            {/* <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View> */}
            <View style={styles.container}>
                <View style={styles.calendar} >
                    <Text style={styles.title}>
                        Calendar:
                </Text>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={styles.cal}
                        />
                    )}
                </View>
            </View>
            <View>
                <Button
                    onPress={fetchData}
                    title='Press here!'
                >
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
    },
    calendar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        borderRadius: 6,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 16,
    },
    cal: {
        flex: 1,

    },
    title: {
        flex: 1,
        fontSize: 20,
        marginLeft: 60,
        fontStyle: 'italic',
        color: '#0576F5'

    }
});