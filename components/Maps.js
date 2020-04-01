import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, Platform} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import NativePlatformConstantsAndroid from 'react-native/Libraries/Utilities/NativePlatformConstantsAndroid';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoicGVhcmxvbGl2aWEiLCJhIjoiY2s3eGxlNjZnMDBzeDNmczRyaDQ5MHVlbCJ9.5sA0sPEy94JZ4R1D-Znx-w',
);

const IS_ANDROID = Platform.OS === 'android';
export default class Map extends Component {
  async UNSAFE_componentWillMount() {
    if (IS_ANDROID) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isAndroidPermissionGranted: false,
      isFetchingAndroidPermission: IS_ANDROID,
      coordinates: [-122.08499, 37.426929],
      showUserLocation: true,
      location: [-122.08499, 37.426929],
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <MapboxGL.MapView
            ref={c => (this._map = c)}
            zoomLevel={14}
            centerCoordinate={this.state.coordinates[0]}
            showUserLocation={true}
            style={styles.container}>
            <MapboxGL.Camera
              zoomLevel={16}
              animationMode={'flyTo'}
              animationDuration={0}
              ref={c => (this.camera = c)}
              centerCoordinate={this.state.location}
            />
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    );
  }
}

//userTrackingMode={this.state.userSelectedUserTrackingMode}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
