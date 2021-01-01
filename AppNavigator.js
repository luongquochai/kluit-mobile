import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Category from './screen/Category';
import Categories from './screen/Categories';
import ListItem from './components/ListItem';
import LineCharts from './components/LineCharts';

const AppNavigator = createStackNavigator({
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

export default AppNavigator;