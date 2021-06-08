import React from 'react';
import {Text , View} from 'react-native';

export default class MdScreens extends React.Component{
    constructor(){
        super()
        this.state = {
            userID:firebase.auth().currentUser.email,
            allDonation:[]
        } 
    }

    getAllDonations = ()=>{
        this.requestRef = db.collection("allDonation").where("donorID","==",this.state.userID)
        .onSnapShot((snapshot)=>{
            var allDonation = snapshot.docs.map(document=>document.data())
            this.setState({
                allDonation:allDonation
            })
        })
    }

    sendNotification = (bookDetails,requestStatus) => {
        var requestID = bookDetails.request_ID,
        var donorID = bookDetails.donor_ID
        db.collection("all notification").where("donor_ID","==",donorID).where("request_ID","==",requestID).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = ""
                if(requestStatus === "bookSent"){
                    message = this.state.donorName + "sent you the book"
                }
                else{
                    message = this.state.donorName + "is interested in donating books"
                }
                db.collection("all notification").doc(doc.ID).update({
                    "message":message,
                    "notificationStatus":"unread",
                    "date": firebase.firestore.FieldlValue.serverTimeStamp()
                })
            })
        })
    }

    sendBook = (bookDetails) =>{
        if(bookDetails.requestStatus === "bookSent"){
            var requestStatus = "donor interested"
            db.collection("all donations").doc(bookDetails.docID).update({
                "requestStatus":"donor interested"
            })
            this.sendNotification(bookDetails,requestStatus)
        }
        else{
            var requestStatus = "bookSent"
            db.collection("all donations").doc(bookDetails.docID).update({
                "requestStatus":"book sent"
            })
            this.sendNotification(bookDetails,requestStatus)
        }
    }

    render(){
        return(
            <View>
                <Text>
                    My donation Screen
                </Text>
            </View>
        )
    }
}