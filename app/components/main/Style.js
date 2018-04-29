import { StyleSheet } from 'react-native'
import color from '../../assets/color'
import { HeaderHeight } from '../../assets/HeaderHeight'
export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: HeaderHeight,
    display: 'flex',
    flex: 1,
    backgroundColor: color.headerColor
  }
})
