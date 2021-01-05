import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fcmService } from '../src/FCMService';

export default class Settings extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    constructor(props) {
        super(props);
        this.fcmNotification = null
    }

    componentDidMount() {
        this.fcmNotification = fcmService
        this.fcmNotification.register(this.onRegister, this.onNotification, this.onOpenNotification)
    }

    onRegister(token) {
        console.log("[NotificationFCM] onRegister: ", token)
    }

    onNotification(notify) {
        console.log("[NotificationFCM] onNotification", notify)
    }

    onOpenNotification(notify) {
        console.log("[NotificationFCM] onOpenNotification", notify)
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})