import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import RdScreen from '../screens/receiverDetailsScreen';

export const AppStackNavigator = createStackNavigator({
    bookDonateList:{
        screen:BookDonateScreen,
        navigationOptions:{
            headershown:false
        }
    },

    recieverDetails:{
        screen:RdScreen,
        navigationOptions:{
            headershown:false
        }
    }
},
{
    initialRouteName:"bookDonateList",
}
)
