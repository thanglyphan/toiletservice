import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableHighlight, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { MapStyle } from '../../mockups/MapStyle'
import { styles } from './Style'
import { connect } from 'react-redux'
import content from '../../mockups/toiletService.json'
import Polyline from '@mapbox/polyline'
import MapInfo from '../mapinfo/MapInfo'
import * as Animatable from 'react-native-animatable'
import { toilet } from '../../actions/toilet'
import { location } from '../../actions/location'
class Map extends Component {
  static navigationOptions = {
    gesturesEnabled: false
  }
  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }
    this.goToDestination(props)
  }

  componentWillMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
      this.props.onLocation(region)
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  async componentWillReceiveProps(nextProps) {
    this.goToDestination(nextProps)
  }

  goToDestination = props => {
    try {
      var start = props.region.latitude + ',' + props.region.longitude
      var endLat = props.toilet.latitude + ','
      var endLong = props.toilet.longitude
      var end = endLat + endLong
      this.getDirections(start, end)
    } catch (error) {
      return error
    }
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode='walking'`
      )
      let respJson = await resp.json()
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points)
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
    } catch (error) {
      return error
    }
  }

  goToNextLocation = item => {
    this.props.onToilet(item)
  }

  render() {
    return (
      <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.props.region}
          showsUserLocation={true}
          followUserLocation={true}
          customMapStyle={MapStyle}
        >
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="#FFF"
            lineJoin={'miter'}
          />
          {content.entries.map((item, key) => (
            <Marker
              key={key}
              onPress={() => this.goToNextLocation(item)}
              coordinate={{
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude)
              }}
            />
          ))}
        </MapView>
        <MapInfo />
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    toilet: state.toilet.toilet,
    region: state.location.region
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLocation: region => {
      dispatch(location(region))
    },
    onToilet: data => {
      dispatch(toilet(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
