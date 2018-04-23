import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/ui/Home';
import Inventory from './src/ui/Inventory';
import Activities from './src/ui/Activities';
import WoodcuttingActivities from './src/ui/activities/WoodcuttingActivities';
import Skills from './src/ui/Skills';
import Shop from './src/ui/Shop';
import { StackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default App = StackNavigator({
    Home: { screen: Home },
    Inventory: { screen: Inventory },
    Skills: { screen: Skills },
    Shop: { screen: Shop },
    Activities: { screen: Activities },
    WoodcuttingActivities: { screen: WoodcuttingActivities },
}, { headerMode: 'screen' });