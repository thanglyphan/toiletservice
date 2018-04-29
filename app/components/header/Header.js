import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight
} from 'react-native'
import { maincontrol } from '../../actions/maincontrol'
import color from '../../assets/color'
import { styles } from './Style'
import { LanguageHeader } from '../../assets/language'

class Header extends Component {
  toggleScreen = screenId => {
    var isMain = screenId == 'Main' ? true : false
    this.props.maincontrol(isMain)
    this.props.navigate.navigate(screenId)
  }

  addBorderLine = showLine => {
    return showLine
      ? {
          borderBottomWidth: 5,
          borderColor: color.toiletCard[2]
        }
      : {}
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.lower}>
          <View style={styles.left} />
          <View style={styles.middle}>
            <TouchableHighlight
              underlayColor={'transparent'}
              style={[styles.btn, this.addBorderLine(!this.props.isMain)]}
              onPress={() => this.toggleScreen('Map')}
              disabled={!this.props.isMain}
            >
              <Text style={styles.text}>{LanguageHeader.headerMap}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={'transparent'}
              style={[styles.btn, this.addBorderLine(this.props.isMain)]}
              onPress={() => this.toggleScreen('Main')}
              disabled={this.props.isMain}
            >
              <Text style={styles.text}>{LanguageHeader.headerToilets}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.right} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isMain: state.maincontrol.isMain
  }
}

const mapDispatchToProps = dispatch => {
  return {
    maincontrol: isMain => {
      dispatch(maincontrol(isMain))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
