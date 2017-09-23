import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.silver,
    flexDirection: 'row'
  },
  alarmActiveText: {
    ...Fonts.style.normal,
    flex: 1,
    alignSelf: 'center',
    marginLeft: 5,
  }

})
