import React from 'react';
import { View, Text } from 'react-native';
import ProgressBar from 'react-native-animated-progress';

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [
                {
                    value: 10,
                    name: 'Ready',
                    time: 2000,
                },
                {
                    value: 20,
                    name: 'Pump',
                    time: 4000,
                },
                {
                    value: 30,
                    name: 'Liquid',
                    time: 12000,
                },
                {
                    value: 40,
                    name: 'Waiting',
                    time: 5000,
                },
                {
                    value: 80,
                    name: 'Get value',
                    time: 3000,
                },
                {
                    value: 85,
                    name: 'Empty water',
                    time: 5000,
                },
                {
                    value: 100,
                    name: 'Done',
                    time: 1000,
                },

            ],
            state: false,
            percent: 0,
            title: '--',
            timeout: 1000,
            color: null,
            done: false,
            open: false,

        };
    }
    componentWillMount() {
        this.listen_control();
    }
    listen_control() {
        const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
        if (this.state.state) {
            //const value = parseInt(Math.random() * 100, 10);

            // console.log(q);
            const throttledProcess = (items) => {
                if (items.length === 0) { // stop when there's no more items to process
                    console.log('ALL DONE')
                    this.setState({
                        done: true,
                        open: true
                    })
                    return
                }
                this.setState({
                    title: items[0].name,
                    percent: items[0].value,
                    timeout: items[0].time
                })
                console.log('PROCESSING', items[0], Date()) // this is where your http call/update/etc takes place
                setTimeout(() => throttledProcess(items.slice(1), items[0].time), // wrap in an arrow function to defer evaluation
                    items[0].time)
            }
            throttledProcess(this.state.response);
        }
    }
    handleClick() {
        this.setState({
            state: true,
            color: colorMap[parseInt(Math.random() * 3, 10)],
        })
    }
    render() {
        const { color } = this.state;

        return (
            <View
            // style={{ flex: 1, justifyContent: "space-evenly", paddingHorizontal: 4 }}
            >
                <View>
                    <Text style={{ marginBottom: 20 }}>State: {this.state.title} - {this.state.percent}</Text>
                    <ProgressBar
                        progress={this.state.percent}
                        height={7}
                        backgroundColor="#4a0072"
                        animated={true}
                    />
                </View>
            </View>
        )
    }

}
