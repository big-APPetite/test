import React, {Component} from 'react';
import MapView from 'react-native-maps';

const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
    };
  }
  watchID: ?number = null;
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      // let initialRegion = {
      //     latitude = lat,
      //     longitude = long,
      //     latitudeData: LATITUDE_DELTA,
      //     longitudeDelta: LONGITUDE_DELTA,
    });
  }
}
