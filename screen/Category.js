import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListItem from '../components/ListItem';

export default class Category extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('categoryName'),
        };
    };

    render() {
        //console.log(`${JSON.stringify(this.props.navigation)}`);
        let keyName = this.props.navigation.state.params.keyName;
        console.log(keyName);
        return (
            <View>
                <ListItem typeData={keyName} />
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
});
