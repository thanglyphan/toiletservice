import { StyleSheet, Dimensions, Platform } from 'react-native'
import { HeaderHeight } from '../../assets/HeaderHeight'
import font from '../../assets/font'
import color from '../../assets/color'

export const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 40,
    marginHorizontal: 10,
    height: HeaderHeight
  },
  headerAndFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  okButton: {
    flex: 0.2,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: color.toiletCard[2],
    paddingHorizontal: 10
  },
  justContainer: {
    flex: 2
  },
  img: {
    height: 30,
    width: 30
  },
  upper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  headerArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  middle: {
    flex: 1,
    flexDirection: 'row'
  },
  diceBoxUnSelected: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.toiletCard[2],
    borderRadius: 5
  },
  diceBoxSelected: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5
  },
  txtBold: {
    fontFamily: font.primaryBold,
    fontSize: 16,
    color: '#FFF'
  },
  txtLocation: {
    fontFamily: font.primary,
    fontSize: 12,
    opacity: 0.8,
    color: '#FFF'
  },
  txtLight: {
    fontFamily: font.primary,
    fontSize: 14,
    color: '#FFF'
  },
  txtInfo: {
    fontFamily: font.primary,
    fontSize: 18,
    color: '#FFF'
  },
  iHaveIconAndText: {
    flex: 1,
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 15,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  icon: {
    height: 15,
    width: 15
  }
}
