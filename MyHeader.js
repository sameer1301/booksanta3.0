import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import fiebase from 'firebase';
import db from './config'

export default class MyHeader extends Component{
  constructor(){
    super()
    this.state = {
      value:""
    }
  }
  bellIconWithBadge = () => {
    return(
      <View>
        <Icon
        name = "bell" type = "font-awesome" color="orange" onPress={() => this.props.navigation.navigate("notification")}
        />
        <Badge
        value = {this.state.value}
        />
      </View>
    )
  }

  getNumOfUnreadNotification(){
    db.collection("allNotification").where("notificationStatus","==","unread")
    .onSnapshot((snapshot)=>{
      var unReadNotification = snapshot.docs.map((doc)=>{
        doc.data()
      })
      value:unReadNotification.lenght
    })
  }

  componentDidMount(){
    this.getNumOfUnreadNotification()
  }

  render(){
return (
    <Header
      leftComponent={<Icon name = 'bars' type='font-awesome' color='#696969'  onPress={() => props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent={ <this.bellIconWithBadge{...this.props}/>}
      backgroundColor = "#eaf8fe"
    />
  );
}
};

