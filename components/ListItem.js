import React from 'react';
import { View, Text, Platform, StyleSheet, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import LineCharts from './LineCharts';
import LineChartsMonth from './LineChartsMonth';
import LineChartsYear from './LineChartsYear';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            mode: 'date',
            show: true,
            data: null,
            val: null,
            label: null,
        }
    }

    onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        show = (Platform.OS === 'ios');
        date = currentDate;
        this.setState({
            show: show,
            date: date,
        })
    }
    showMode(currentMode) {
        this.setState({
            show: true,
            mode: currentMode
        })
    }
    render() {

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
                        {this.state.show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode={this.state.mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange.bind(this)}
                                style={styles.cal}
                            />
                        )}
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <Button onPress={this.fetchData} title="Fetch Data!" />
                    </View>
                    <LineCharts />
                    <LineChartsMonth />
                    <LineChartsYear />
                </ScrollView>
            </View>
        );
    }
}


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