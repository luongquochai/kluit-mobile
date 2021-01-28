import React from 'react';
import { Text, View, Button, ScrollView, ImageBackground, Image, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import { Surface, ART } from '@react-native-community/art';
import GradientButton from 'react-native-gradient-buttons';
import SnackBar from 'rn-snackbar-component'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-animated-progress';

const baseURL = 'https://www.kluit-staging.tk:8000';
//var socketConfig = { path: '/socket' };


export default class Controller extends React.Component {
    static navigationOptions = {
        title: 'Controller',
        callback: false,
        open: false,
    };
    constructor(props) {
        super(props);

        this.state = {
            msg: 'null',
            proceed: [
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
        }
    }
    componentWillMount() {
        this.listen_control();
        this.listen_control_amoni();
        //this.callback_pH();
    }
    listen_control() {
        const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
        this.setState({
            state: true,
        })
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
                    timeout: items[0].time,
                    color: colorMap[parseInt(Math.random() * 3, 10)],
                })
                console.log('PROCESSING', items[0], Date()) // this is where your http call/update/etc takes place
                setTimeout(() => throttledProcess(items.slice(1), items[0].time), // wrap in an arrow function to defer evaluation
                    items[0].time)
                if (items[0].name === 'Done') {
                    this.callback_pH();
                    //alert('Updated successfully!')
                }
            }
            throttledProcess(this.state.proceed);
        }
    }
    listen_control_amoni() {
        const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
        this.setState({
            state: true,
        })
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
                    timeout: items[0].time,
                    color: colorMap[parseInt(Math.random() * 3, 10)],
                })
                console.log('PROCESSING', items[0], Date()) // this is where your http call/update/etc takes place
                setTimeout(() => throttledProcess(items.slice(1), items[0].time), // wrap in an arrow function to defer evaluation
                    items[0].time)
                if (items[0].name === 'Done') {
                    this.callback_amoni();
                    //alert('Updated successfully!')
                }
            }
            throttledProcess(this.state.proceed);
        }
    }
    componentDidMount() {
        this.socket = io('https://www.kluit-staging.tk:8000/');
        //this.socket = new SocketIO(`${baseURL}`, '/');
        // this.socket = io(`${baseURL}/`);

    }
    callback_humidity() {
        alert('Update successfully!');
        this.setState({
            msg: 'get_h_0a'
        })
        //this.socket = io(`${baseURL}/`);
        this.socket.emit('callback_humidity', this.state.msg)
        this.setState({
            callback: false,
            open: true,
        })
        this.socket.on('response', response => {
            let msg = null
            msg = response.msg
            console.log(msg)
            if (msg === 'Ok') {
                this.setState({
                    callback: true,
                    open: true,
                })
            } else {
                this.setState({
                    callback: false,
                    open: true,
                })
            }
        })
    }

    callback_brightness() {
        alert('Update successfully!');
        this.socket.emit('callback_brightness', {
            msg: 'get_l_0a'
        })
        this.socket.on('response', response => {
            let msg = null
            msg = response.msg
            console.log(msg)
            if (msg === 'Ok') {
                this.setState({
                    callback: true,
                    open: true,
                })
            } else {
                this.setState({
                    callback: false,
                    open: true,
                })
            }
        })
    }

    callback_pH() {
        //alert('Update successfully!');
        // this.setState({
        //     msg: 'take_pic'
        // })
        //this.socket = io(`${baseURL}/`);
        alert('Updated successfully!\
                    pH: 7\
        ')
        this.socket.emit('callback_data', {
            msg: 'take_pic'
        })
        this.setState({
            callback: false,
            //state: true,
            //color: colorMap[parseInt(Math.random() * 3, 10)],
        })
    }
    callback_amoni() {
        //alert('Update successfully!');
        // this.setState({
        //     msg: 'callback_data'
        // })
        //this.socket = io(`${baseURL}/`);
        alert('Updated successfully!\
                amoniac: 0\
        ')
        this.socket.emit('callback_data', {
            msg: 'callback_data'
        })
        this.setState({
            callback: false,
            open: true,
        })
    }

    handleClose() {
        this.setState({
            open: false,
        })
    }
    render() {
        const { color } = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/after_noon.png')} style={styles.image}>
                    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 24 }}>

                        <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Update Humidity !"
                            textSyle={{ fontSize: 20 }}
                            gradientBegin="#874f00"
                            gradientEnd="#f5ba57"
                            gradientDirection="diagonal"
                            height={60}
                            width={300}
                            radius={15}
                            purpleViolet impact
                            impactStyle='Light'
                            onPressAction={this.callback_humidity.bind(this)}
                        />

                        <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Update Brightness !"
                            textSyle={{ fontSize: 20 }}
                            gradientBegin="#874f00"
                            gradientEnd="#f5ba57"
                            gradientDirection="diagonal"
                            height={60}
                            width={300}
                            radius={15}
                            pinkDarkGreen impact
                            impactStyle='Light'
                            onPressAction={this.callback_brightness.bind(this)}
                        >
                        </GradientButton>
                        <View>
                            <Text style={{ marginBottom: 20 }}>State: {this.state.title} / {this.state.percent}%</Text>
                            <ProgressBar
                                progress={this.state.percent}
                                height={7}
                                backgroundColor={this.state.color}
                                animated={true}
                            />
                        </View>
                        <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Update pH !"
                            textSyle={{ fontSize: 20 }}
                            gradientBegin="#874f00"
                            gradientEnd="#f5ba57"
                            gradientDirection="diagonal"
                            height={60}
                            width={300}
                            radius={15}
                            blueViolet impact
                            impactStyle='Light'
                            onPressAction={this.listen_control.bind(this)}
                        // onPressAction={() => alert('You pressed me!')}
                        />

                        <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Update Amoniac !"
                            textSyle={{ fontSize: 20 }}
                            gradientBegin="#874f00"
                            gradientEnd="#f5ba57"
                            gradientDirection="diagonal"
                            height={60}
                            width={300}
                            radius={15}
                            deepBlue impact
                            impactStyle='Light'
                            onPressAction={this.listen_control_amoni.bind(this)}
                        // onPressAction={() => alert('You pressed me!')}
                        >
                        </GradientButton>
                        {/* <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Update Nitrit !"
                            textSyle={{ fontSize: 20 }}
                            gradientBegin="#874f00"
                            gradientEnd="#f5ba57"
                            gradientDirection="diagonal"
                            height={60}
                            width={300}
                            radius={15}
                            violetPink impact
                            impactStyle='Light'
                        // onPressAction={() => alert('You pressed me!')}
                        >
                        </GradientButton> */}
                        {/* <GradientButton text="Purple Violet" width='90%' purpleViolet impact />
                        <GradientButton text="Violet Pink" width='90%' violetPink impact /> */}
                        {/* <GradientButton text="Pink Dark Green" width='90%' pinkDarkGreen impact />
                        <GradientButton text="Blue Violet" width='90%' blueViolet impact />
                        <GradientButton text="Blue Marine" width='90%' blueMarine impact />
                        <GradientButton text="Deep Blue" width='90%' deepBlue impact /> */}
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
});

