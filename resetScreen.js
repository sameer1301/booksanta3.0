import React from 'react';
import {View,Text,TextInput,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';
import db from './config';

export default class Reset extends React.Components{
    constructor(){
        super(
            this.state = {
                emailID:"",
                firstName:"",
                lastName:"",
                contact:"",
                address:"",
                docID:"",
            }
        )
    }

    getUserDetails(){
        var user = firebase.auth().currentUser
        var email = user.email
        db.collection("user").where("emailID","==",email).get()
        .then(snapShot => {
            snapShot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    emailID:data.emailID,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address,
                    contact:data.contact
                })
            })
        })
    }

    updateUserDetails=()=>{
        db.collection("user").doc(this.state.docID)
        .update({
            "firstName":this.state.firstName,
            "lastanme":this.state.lastName,
            "contact":this.state.contact,
            "address":this.state.address
        })

        Alert.alert("The profile has been updated")
        
    }

    componentDidMount(){
        this.getUserDetails()

    }

    render(){
        return(
            <View>
                <TextInput
                placeholder = "emailID"
                maxLength = {30}
                onChangeText = {(text)=>{
                    this.setState({
                        emailID:text
                    })
                }}
                value = {this.state.emailID}
                />

                <TextInput
                placeholder = "firstName"
                maxLength = {30}
                onChangeText = {(text)=>{
                    this.setState({
                        firstName:text
                    })
                }}
                value = {this.state.firstName}
                />

                <TextInput
                placeholder = "lastName"
                maxLength = {30}
                onChangeText = {(text)=>{
                    this.setState({
                        lastName:text
                    })
                }}
                value = {this.state.lastName}
                />

                <TextInput
                placeholder = "contact"
                maxLength = {30}
                keyboardType = {numeric}
                onChangeText = {(text)=>{
                    this.setState({
                        contact:text
                    })
                }}
                value = {this.state.contact}
                />

                <TextInput
                placeholder = "address"
                maxLength = {30}
                multiline = {true}
                onChangeText = {(text)=>{
                    this.setState({
                        address:text
                    })
                }}
                value = {this.state.address}
                />

                <TouchableOpacity
                onPress = {()=>{
                    this.updateUserDetails()
                }}
                >
                    <Text>SAVE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}