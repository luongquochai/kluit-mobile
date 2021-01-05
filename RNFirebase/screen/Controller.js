import React from 'react';
import { Text, View, Button, ScrollView, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import GradientButton from 'react-native-gradient-buttons';
import SnackBar from 'rn-snackbar-component'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Controller extends React.Component {
    static navigationOptions = {
        title: 'Controller',
        callback: false,
        open: false,
    };
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //this.socket = io('https://www.kluit-staging.tk:8000/');
    }
    callback_humidity() {
        alert('Updating...!');
        this.socket.emit('callback_humidity', {
            msg: 'get_h_0a'
        })
        this.setState({
            callback: false,
            open: true,
        })
        // this.socket.on('response', response => {
        //     let msg = null
        //     msg = response.msg
        //     console.log(msg)
        //     if (msg === 'Ok') {
        //         this.setState({
        //             callback: true,
        //             open: true,
        //         })
        //     } else {
        //         this.setState({
        //             callback: false,
        //             open: true,
        //         })
        //     }
        // })
    }

    callback_brightness() {
        alert('Updating...!');
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

    handleClose() {
        this.setState({
            open: false,
        })
    }

    render() {
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
                        // onPressAction={() => alert('You pressed me!')}
                        >
                        </GradientButton>
                        <GradientButton
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
                        </GradientButton>
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

