import { StyleSheet, Dimensions, Platform } from 'react-native'
import font from '../../assets/font'
import color from '../../assets/color'
const { height, width } = Dimensions.get('window')

export const styles = {
  wrapper: {
    height: 200,
    width: window.width,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5
  },
  contentBoxMainContent: {
    display: 'flex',
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  leftContent: {
    display: 'flex',
    borderRightWidth: 1,
    borderColor: color.main,
    flex: 1,
    marginVertical: 10,
    marginLeft: 10
  },
  rightContent: {
    display: 'flex',
    flex: 2.5,
    margin: 10
  },
  rightContentLeftBox: {
    flex: 1
  },
  rightContentHeaderBox: {
    flex: 15
  },
  contentBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  contentBoxWithSpacing: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  text: {
    fontFamily: font.primary,
    textAlign: 'left',
    color: 'black'
  },
  stripledLine: {
    flex: 1,
    borderLeftWidth: 4
  }
}

export const rightLowerContentBox = {
  ...styles.contentBox,
  flex: 1.5,
  marginTop: 10,
  flexDirection: 'column'
}

export const txtHeader = {
  ...styles.text
}

export const txtPrimary = {
  ...styles.text,
  fontFamily: font.primary
}

export const seperator = {
  ...styles.contentBox,
  borderBottomWidth: 1,
  borderColor: color.main
}

export const location = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-end'
}
