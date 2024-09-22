import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout} from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from 'react';
import axios from "axios";
import { marker } from './helpers/helpers'


export default function App() {

  const [location, setLocation] = useState(null);
  const[errorMsg, setErrorMsg] = useState(null);
  const [state, setState] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async  () => {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if(status !== 'granted') {
        setErrorMsg('Acesso negado');
        return
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      
    })();
  }, []);
  
  let text = 'Waiting...';
  if(errorMsg){
    text = errorMsg;
  } else if(location){
    text = JSON.stringify(location);
  }

  const componentDigMount = async() => {
    await navigator.geolocation.getCurrentPosition(async({coords: {latitude, Longitude}}) => {
      setState({
        region: {
          latitude,
          Longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0000
        }
      });
    }, () =>{},
    {
      timeout: 2000,
      maximumAge: 1000
    }
  
  );
  }

  const mapStyle = [
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on",
          "color": "#9e9e9e"
        }
      ]
    }
  ]

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      customMapStyle={mapStyle}
      showsUserLocation 
      loadingEnabled
      minZoomLevel={1}
      initialRegion={{
        latitude: -4.04165,
        longitude: -38.6338,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0000
      }}>

        <Marker coordinate={{latitude: -4.038179485745739, longitude: -38.6376108629131}} pinColor={'#8C52FF'}>
          <Callout tooltip={true}>
            <View style={[styles.calStyle]}>
              <Text style={[{color: "white"}, {fonWeight: 'bold'}, {margin: "15px"}]}>{marker[0].text}</Text>
            </View>
          </Callout>
        </Marker>

        <Marker coordinate={{latitude: -4.079343, longitude: -38.699902}} pinColor={'#8C52FF'}>
          <Callout tooltip={true}>
            <View style={[styles.calStyle]}>
              <Text style={[{color: "white"}, {fonWeight: 'bold'}, {margin: "15px"}]}>{marker[1].text}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: '114%',
    height: '106%',
  },
  textMarker: {
    color: "white"
  },
  calStyle: {
    maxWidth: 310,
    minHeight: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#110037",
    padding: 15,
    borderRadius: 20,
  }
  

});