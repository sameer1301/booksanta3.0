import React, { Component } from 'react';
import {FlatList, Text,View} from 'react-native';

export default class NotificationScreen extends Component{
    constructor(){
        super()
        this.state = {
            userID:firebase.auth().currentUser.email,
            allNotification:[]
        }
    }

    getNotification = () =>{
        this.requestRef = db.collection("all notification").where("notification_status","==","unread")
        .where("targeted_userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var allNotification = []
            snapshot.docs.map((doc)=>{
                var notification = doc.data()
                notification["docID"] = doc.id
                allNotification.push(notification)

            })
            this.setState({
                allNotification:allNotification
            })
        })
    }

    componentDidMount(){
        this.getNotification()
    }

    render(){
        return(
            <View>
                <Text>
                    notification screen.
                </Text>
                    <View>
                        {
                            this.state.allNotification.lenght === 0
                            ? (
                                <View>
                                    <Text>
                                        you have no notifications 
                                    </Text>
                                </View>
                            )
                            :(
                                <FlatList
                                keyExtractor = {this.keyExtractor}
                                data = {this.state.allNotification}
                                renderItem = {this.renderItem}
                                />
                            )
                        }
                    </View>
                </View>
        )
    }
}