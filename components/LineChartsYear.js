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

export default class LineCharts extends Component {

    render() {

        return (
            <View style={styles.wrapper}>
                <Text>Thống kê theo năm</Text>
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
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#0531F5",
                        backgroundGradientTo: "#3D8AEB",
                        decimalPlaces: 2, // optional, defaults to 2dp
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