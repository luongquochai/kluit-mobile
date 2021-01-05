import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Category from './screen/Category';
import Categories from './screen/Categories';
import ListItem from './components/ListItem';
import LineCharts from './components/LineCharts';
import FAQ from '././screen/FAQ';
import Settings from './screen/Settings';
import Controller from './screen/Controller';
import Icon from 'react-native-vector-icons/Ionicons';

const color = {
    ACTIVE: '#147efb',
    INACTIVE: '#ccc'
}

const CategoryStack = createStackNavigator({
    Categories: {
        screen: Categories
    },
    Category: {
        screen: Category
    },
    ListItem: {
        screen: ListItem
    },
    LineCharts: {
        screen: LineCharts
    }
});

CategoryStack.navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ focused }) => {
        return <Icon name="bar-chart"
            size={36}
            color={focused ? color.ACTIVE : color.INACTIVE}
        />
    }
}

const ControllerStack = createStackNavigator({
    Controller: {
        screen: Controller
    }
})

ControllerStack.navigationOptions = {
    tabBarLabel: 'Controller',
    tabBarIcon: ({ focused }) => {
        return <Icon name="build"
            size={36}
            color={focused ? color.ACTIVE : color.INACTIVE}
        />
    }
}

const FAQStack = createStackNavigator({
    FAQ: {
        screen: FAQ
    }
})

FAQStack.navigationOptions = {
    tabBarLabel: 'FAQ',
    tabBarIcon: ({ focused }) => {
        return <Icon name="help-circle"
            size={36}
            color={focused ? color.ACTIVE : color.INACTIVE}
        />
    }
}

const SettingsStack = createStackNavigator({
    Settings: {
        screen: Settings
    }
})

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => {
        return <Icon name="settings"
            size={36}
            color={focused ? color.ACTIVE : color.INACTIVE}
        />
    }
}

const AppNavigator = createBottomTabNavigator({
    CategoryStack,
    ControllerStack,
    FAQStack,
    SettingsStack
})

export default AppNavigator;