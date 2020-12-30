import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Category from './screen/Category';
import Categories from './screen/Categories';

const AppNavigator = createStackNavigator({
    Categories: {
        screen: Categories
    },
    Category: {
        screen: Category
    }
});

export default AppNavigator;