/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
 import {
   TextInput,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Alert,
 } from 'react-native';
 import NotifService from '../../../NotifService';
 
 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {};
 
     this.notif = new NotifService(
       this.onRegister.bind(this),
       this.onNotif.bind(this),
     );
   }
 
   render() {
     return (
       <View style={styles.container}>
         <View style={styles.spacer}></View>
         <TouchableOpacity
           style={styles.button}
           onPress={() => {
             this.notif.localNotif();
           }}>
           <Text style={styles.notif}></Text>
         </TouchableOpacity>

         <View style={styles.spacer}></View>
 
         {this.state.fcmRegistered && <Text>Developer: https://ekosetiaji.my.id</Text>}
 
         <View style={styles.spacer}></View>
       </View>
     );
   }
 
   onRegister(token) {
     this.setState({registerToken: token.token, fcmRegistered: true});
   }
 
   onNotif(notif) {
     Alert.alert(notif.title, notif.message);
   }
 
   handlePerm(perms) {
     Alert.alert('Permissions', JSON.stringify(perms));
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#2772E7',
     borderRadius: 10,
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   button: {
     borderWidth: 1,
     borderColor: '#2772E7',
     margin: 5,
     padding: 5,
     width: '100%',
     backgroundColor: '#2772E7',
     borderRadius: 5,
   },
   textField: {
     borderWidth: 1,
     borderColor: '#2772E7',
     margin: 5,
     padding: 5,
     width: '70%',
   },
   spacer: {
     height: 10,
   },
   title: {
     fontWeight: 'bold',
     fontSize: 20,
     textAlign: 'center',
   },
   notif: {
    textAlign: 'center',
   }
 });