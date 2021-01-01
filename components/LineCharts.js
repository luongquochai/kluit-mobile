import React, {
    Component
} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Dimensions
} from 'react-native';

import {
    LineChart,
} from 'react-native-chart-kit'

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

    render() {
        // const { navigation } = this.props.navigation;
        // const val = navigation.getParam('val');
        // const labels = navigation.getParam('label');
        return (
            <View style={styles.wrapper}>
                <Text>Thống kê theo ngày</Text>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
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
    },

})