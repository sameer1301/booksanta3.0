import React, { Component } from 'react';
import {View,Text, TextInput, View , } from 'react-native';
import db from '../config';
import {Cards} from 'react-native-elements';

export default class RdScreen extends Component{
    constructor(){
        super()
        this.state = {
            userID:firebase.auth().currentUser.email,
            recieverID:this.props.navigation.getParam("details")["userID"],
            requestID:this.props.navigation.getParam("details")["requestID"],
            bookName:this.props.navigation.getParam("details")["bookName"],
            reasonForRequesting:this.props.navigation.getParam("details")["reasonForRequesting"],
            recieveName:"",
            recieverContact:"",
            recieverAddress:"",
            recieverRequestDocID:""
        }
    }

    getRecieverDetails(){
        db.collection("users").where("emailID","==",this.state.recieverID).get()
        .then(snapshot =>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieveName:doc.data().firstName,
                    recieverContact:doc.data().contact,
                    recieverAddress:doc.data().address,
                })
            })
        })
    }

    updateBookStatus = ()=>{
        db.collection("allDonations").add({
            bookName:this.state.bookName,
            requestID:this.state.requestID,
            requestedBy:this.state.recieverName,
            donorID:this.state.userID,
            requestStatus:"donor interested"
        })
    }

    componentDidMount(){
        this.getRecieverDetails()
    }

    addNotifications = () => {
        var message = this.state.userName + "has shown interest in donating book";
        db.collection("allNotification").add({
            "targeted_userID":this.state.recieverID,
            "request_ID":this.state.requestID,
            "notification_status":"unread",
            "message":message,
            "donor_ID":this.state.userID,
            "date":firebase.firestore.FieldValue.serverTimestamp(),
            "Book_name":this.state.bookName
        })
    }
    

    render(){
        return(
            <View>
                <Text>reciever details screen</Text>
                <Card>
                    title = {"bookInformation"}
                </Card>
                <Card>
                    <Text>name:{this.state.bookName}</Text>
                </Card>
                <Card>
                    <Text>reason:{this.state.reasonForRequesting}</Text>
                </Card>
                <Card>
                    title = {"reciever Information"}
                </Card>
                <Card>
                    <Text>
                        name:{this.state.recieverName}
                    </Text>
                </Card>
                <Card>
                    <Text>
                        contact:{this.state.recieverContact}
                    </Text>
                </Card>
                <Card>
                    <Text>
                        address:{this.state.recieverAddress}
                    </Text>
                </Card>
                <View>
                    {
                        this.state.recieverID !== this.state.userID
                        ?(
                            <TouchableOpacity
                            onPress = {()=>{
                                this.updateBookStatus()
                                this.props.navigation.navigate("MyDonations")
                                this.addNotifications()
                            }}
                            >
                                
                                <Text>
                                    i want to Donate
                                </Text>
                            </TouchableOpacity>
                        ):
                        null
                        
                    }
                </View>
            </View>
        )
    }
}