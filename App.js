import React, {Component} from 'react';
import{StyleSheet,View,Text,Button} from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

 export default class App extends React.Component{
   state = {
      userLocation : null,
      usersPlaces : []
   }
   getUserPlacesHandler=()=>{
     fetch('https://geolocation-f5869-default-rtdb.firebaseio.com/places.json')
        .then(res => res.json())
        .then(parsedRes => {
          const placesArray = [];
          for(const key in parsedRes){
            placesArray.push({
              latitude: parsedRes[key].latitude,
              longitude: parsedRes[key].longitude,
              id:key
            });
          }
          console.log("Polycarp",placesArray);
          this.setState({
            usersPlaces:placesArray
          })
        })
        .catch(err => console.log(err));
   }
   getUserLocationHandler = () =>{
     navigator?.geolocation?.getCurrentPosition(position => {
       this.setState({
         userLocation:{
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           latitudeDelta: 0.0622,
           longitudeDelta: 0.0421
         }
       });
       fetch('https://geolocation-f5869-default-rtdb.firebaseio.com/places.json',{
         method:'POST',
         body:JSON.stringify({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
          })
       })
        .then(res => console.log(res))
        .catch(err =>  console.log(err));
     },err => console.log(err));
   };
  render(){
     // console.log(navigator.geolocation.getCurrentPosition);
    return(
      <View style={styles.container}>
        <Text>Polycarp</Text>
        <Text>Work hard to enjoy a better life</Text>
        <View style = {{marginBottom:20}}>
          <Button title='Get user Places' onPress={this.getUserPlacesHandler}/>
        </View>
        <Text>Get loved some day</Text>
        <FetchLocation 
          onGetLocation={this.getUserLocationHandler}/>
        <UsersMap 
          userLocation = {this.state.userLocation} 
          userPlaces = {this.state.usersPlaces}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
});

