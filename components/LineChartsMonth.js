import React, {
    Component
} from 'react';
import {
    Platform, Button,
    StyleSheet, ScrollView,
    Text, RefreshControl,
    View, Dimensions
} from 'react-native';

import {
    LineChart,
} from 'react-native-chart-kit'
import DateTimePicker from '@react-native-community/datetimepicker';

const chartConfiguration = {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

};
export default class LineCharts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //date: new Date(),
            // mode: 'date',
            // show: true,
            newDate: this.props.newDate,
            val: [1],
            label: [1],
            apiKey: this.props.typeData,
            refreshing: false,
        }
        this.fetchData = this.fetchData.bind(this);
        //this.changeDate = this.changeDate.bind(this);
    }
    async componentDidMount() {
        //let a = aw    ait AsyncStorage.getItem('datepicked');
        //console.log(this.state.newDate);
        //this.props.changeDate(this.state.newDate);
        if (this.state.newDate) {
            await this.fetchData();
        }


    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            newDate: nextProps.newDate,
        })
        this.fetchData(this.state.newDate);
    }

    async fetchData(dateNew) {
        let selectedMonth = [];
        let value = [];
        let labels = [];
        let monthpicker = null;
        let baseURL = 'https://www.kluit-staging.tk:8000/statistics/';
        let apiURL = new URL(`${this.state.apiKey}_month`, baseURL);
        await fetch(apiURL)
            .then(response => response.json())
            .then(resp => {
                for (var key in resp.data) {
                    dateNew = new Date(this.state.newDate).toLocaleDateString();

                    selectedMonth.push(resp.data[key].month);
                    // value.push(resp.data[key].value);
                    // labels.push(resp.data[key].day);
                }
                monthpicker = new Date(dateNew).getMonth() + 1;
                selectedMonth = selectedMonth.filter(function (e, i, self) {
                    return i === self.indexOf(e);
                })
                for (let i = 0; i < selectedMonth.length; i++) {
                    if (selectedMonth[i] === monthpicker) {
                        for (var key in resp.data) {
                            //console.log(resp.data[key].month);
                            if (resp.data[key].month === selectedMonth[i]) {
                                value.push(resp.data[key].value);
                                labels.push(resp.data[key].day);
                            }
                        }
                    }
                }
                this.setState({
                    //pickedDate: selectedMonth,
                    val: value,
                    label: labels,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        //console.log(this.props.newDate);
        return (
            <ScrollView>
                {/* <View>
                    <Button onPress={this.fetchData} title="Fetch Data!" />
                </View> */}
                <View style={styles.wrapper}>
                    <Text style={styles.tit}>Thống kê theo tháng</Text>
                    <LineChart
                        data={{
                            labels: this.state.label,
                            datasets: [
                                {
                                    data: this.state.val,
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        //yAxisLabel="$"
                        yAxisSuffix="%"
                        yAxisInterval={1} // optional, defaults to 1
                        fromZero={1}
                        segments={3}
                        verticalLabelRotation={280}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#0531F5",
                            backgroundGradientTo: "#3D8AEB",
                            //decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 8,
                            },
                            strokeWidth: "2",
                            propsForDots: {
                                r: "4",
                                strokeWidth: "1",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={styles.container}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderRadius: 4,
        padding: 12,
        shadowColor: '#000',
        shadowRadius: 16,
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 16,

    },
    wrapper: {
        paddingLeft: 4,
        alignItems: 'center',
    },
    containerPicker: {
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

    },
    tit: {

        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    }

})