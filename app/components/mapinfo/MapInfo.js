import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight
} from 'react-native'
import { styles } from './Style'
import * as Animatable from 'react-native-animatable'
import { Distance, Dice } from '../../assets/DataConverter'
import { connect } from 'react-redux'
import { toilet } from '../../actions/toilet'
import { location } from '../../actions/location'
import { LanguageMapInfo } from '../../assets/language'
import firebase from 'firebase'

class MapInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationIn: true,
      diceValue: 1
    }
  }

  distance = () => {
    return Distance(
      this.props.region.latitude,
      this.props.region.longitude,
      this.props.toilet.latitude,
      this.props.toilet.longitude
    )
  }

  renderInfoContent = () => {
    return Object.keys(this.props.toilet).length !== 0
      ? infoContainer(
          this.props.toilet,
          this.distance(),
          this.state.animationIn,
          this.selectDice,
          this.state.diceValue,
          this.confirm
        )
      : infoContainerWithoutValues(this.state.animationIn)
  }

  selectDice = value => {
    this.setState({ diceValue: value })
  }

  confirm = () => {
    firebase
      .database()
      .ref('score/' + this.props.toilet.id)
      .push({
        diceValue: this.state.diceValue
      })
  }

  render() {
    return (
      <View style={styles.wrapper} pointerEvents={'box-none'}>
        {this.renderInfoContent()}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapInfo)

const infoContainerWithoutValues = animateIn => {
  var fade = animateIn ? 'fadeInUp' : 'fadeOutDown'
  return (
    <Animatable.View
      animation={fade}
      style={styles.infoContainer}
      pointerEvents={'none'}
    >
      <Text style={styles.txtInfo}>{LanguageMapInfo.introText}</Text>
    </Animatable.View>
  )
}

const infoContainer = (
  toilet,
  distance,
  animateIn,
  selectDice,
  diceValue,
  confirm
) => {
  var fade = animateIn ? 'fadeInUp' : 'fadeOutDown'

  return (
    <Animatable.View animation={fade} style={styles.infoContainer}>
      <View style={styles.headerArea}>
        <View style={styles.upper}>
          <Text style={styles.txtBold}>{toilet.plassering}</Text>
          <Text style={styles.txtLocation}>
            {distance} {LanguageMapInfo.distanceAnnotation}
          </Text>
        </View>
        <TouchableHighlight style={styles.okButton} onPress={() => confirm()}>
          <Text style={[styles.txtBold, { color: 'black' }]}>
            {LanguageMapInfo.ok}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.middle}>
        {Dice.map(x => (
          <TouchableHighlight
            key={x.value}
            style={
              diceValue == x.value
                ? styles.diceBoxSelected
                : styles.diceBoxUnSelected
            }
            onPress={() => selectDice(x.value)}
            underlayColor={'transparent'}
          >
            <Image style={styles.img} source={x.image} />
          </TouchableHighlight>
        ))}
      </View>
    </Animatable.View>
  )
}
