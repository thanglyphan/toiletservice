import { LanguageToiletTypes } from './language'

export const Distance = (myLat, myLong, lat, long) => {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(myLat - lat) // deg2rad below
  var dLon = deg2rad(myLong - long)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(myLat)) *
      Math.cos(deg2rad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d.toFixed(1) //'Ca. ' + d.toFixed(1) + ' km'
}

const deg2rad = deg => {
  return deg * (Math.PI / 180)
}

var dice1 = require('../assets/images/dice1.png')
var dice2 = require('../assets/images/dice2.png')
var dice3 = require('../assets/images/dice3.png')
var dice4 = require('../assets/images/dice4.png')
var dice5 = require('../assets/images/dice5.png')
var dice6 = require('../assets/images/dice6.png')

export const Dice = [
  {
    image: dice1,
    value: 1
  },
  {
    image: dice2,
    value: 2
  },
  {
    image: dice3,
    value: 3
  },
  {
    image: dice4,
    value: 4
  },
  {
    image: dice5,
    value: 5
  },
  {
    image: dice6,
    value: 6
  }
]

export const ToiletList = toilet => {
  var toiletList = [
    {
      key: LanguageToiletTypes.man,
      value: toilet.herre
    },
    {
      key: LanguageToiletTypes.woman,
      value: toilet.dame
    },
    {
      key: LanguageToiletTypes.pissoir,
      value: toilet.pissoir_only
    },
    {
      key: LanguageToiletTypes.babyroom,
      value: toilet.stellerom
    },
    {
      key: LanguageToiletTypes.wheelchair,
      value: toilet.rullestol
    }
  ]
  return toiletList
}
