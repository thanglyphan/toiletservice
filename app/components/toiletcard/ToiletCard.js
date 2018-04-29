import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View, TouchableHighlight } from 'react-native'
import {
  styles,
  txtHeader,
  txtPrimary,
  wrapperStyle,
  seperator,
  location,
  rightLowerContentBox,
  textHeaderSidebar
} from './Style'
import color from '../../assets/color'
import content from '../../mockups/toiletService.json'
import { Distance, ToiletList } from '../../assets/DataConverter'
import { toilet } from '../../actions/toilet'
import { maincontrol } from '../../actions/maincontrol'
import { LanguageToiletCard } from '../../assets/language'
import firebase from 'firebase'

class ToiletCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      rating: props.rating,
      onlyAvailableToilets: [],
      rating: {
        count: 0,
        score: 0
      }
    }
  }
  componentDidMount() {
    this.generateToiletList()
    this.getRatingByID(this.props.data.id)
  }

  distance = () => {
    return Distance(
      this.props.lastLat,
      this.props.lastLong,
      this.props.data.latitude,
      this.props.data.longitude
    )
  }

  navigate = () => {
    this.props.onToilet(this.props.data)
    this.props.maincontrol(false)
    this.props.navigate()
  }

  generateToiletList = () => {
    var list = []
    ToiletList(this.state.data).map(x => {
      if (!this.checkTextNULL(x.value)) list.push(x)
    })
    this.setState({ onlyAvailableToilets: list })
  }

  mapTimeText = time => {
    return this.checkTextNULL(time) ? LanguageToiletCard.isClosedText : time
  }

  isFreeToGo = price => {
    return this.checkTextNULL(price) || price == '0'
      ? LanguageToiletCard.isFreeText
      : price
  }

  checkTextNULL = text => {
    return text == 'NULL'
  }

  getRatingByID = id => {
    var database = firebase.database()
    firebase
      .database()
      .ref('/score/' + id)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          var score = 0
          snapshot.forEach(item => {
            score = score + item.val().diceValue
          })
          this.setState({
            rating: {
              count: snapshot.numChildren(),
              score: (score / snapshot.numChildren()).toFixed(2)
            }
          })
        }
      })
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.navigate()}>
        <View style={styles.wrapper}>
          <View style={styles.leftContent}>
            {textAppender(
              styles.text,
              LanguageToiletCard.toiletTypesHeaderText,
              18
            )}
            <View style={{ marginBottom: 20 }} />
            {this.state.onlyAvailableToilets.map(x => (
              <View key={x.key} style={[styles.contentBox]}>
                <View style={[styles.textBox, { flexDirection: 'row' }]}>
                  {textAppender(styles.text, x.key + ' ', 14)}
                  {textAppender(styles.text, '(' + x.value + ')', 14)}
                </View>
              </View>
            ))}
          </View>
          <View style={styles.rightContent}>
            <View style={styles.contentBox}>
              <View style={[styles.rightContentHeaderBox]}>
                <View style={[styles.contentBox, { flexDirection: 'column' }]}>
                  {textAppender(txtPrimary, this.state.data.plassering, 16)}
                  {textAppender(txtPrimary, this.state.data.place, 13)}
                </View>
                <View style={seperator}>
                  <View style={location}>
                    {textAppender(txtPrimary, this.state.data.adresse, 13)}
                  </View>
                </View>
              </View>
            </View>
            <View style={rightLowerContentBox}>
              <View
                style={[
                  styles.contentBox,
                  { flex: 2, flexDirection: 'column' }
                ]}
              >
                {nameAndValue(
                  LanguageToiletCard.amountOfRatingText,
                  this.state.rating.count
                )}
                {nameAndValue(
                  LanguageToiletCard.avgRatingText,
                  this.state.rating.score
                )}
                {nameAndValue(
                  LanguageToiletCard.priceText,
                  this.isFreeToGo(this.state.data.pris) + ',-'
                )}
                {nameAndValue(
                  LanguageToiletCard.normalDaysText,
                  this.mapTimeText(this.state.data.tid_hverdag)
                )}
                {nameAndValue(
                  LanguageToiletCard.saturdayText,
                  this.mapTimeText(this.state.data.tid_lordag)
                )}
                {nameAndValue(
                  LanguageToiletCard.sundayText,
                  this.mapTimeText(this.state.data.tid_sondag)
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const nameAndValue = (timeText, time) => (
  <View style={[styles.textBox]}>
    {textAppender(styles.text, timeText + ': ', 14)}
    {textAppender(styles.text, time, 14)}
  </View>
)

const textAppender = (style, text, size) => {
  return <Text style={[style, { fontSize: size }]}>{text}</Text>
}

const mapStateToProps = (state, ownProps) => {
  return {
    toilet: state.toilet.toilet
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToilet: data => {
      dispatch(toilet(data))
    },
    maincontrol: isMain => {
      dispatch(maincontrol(isMain))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToiletCard)
