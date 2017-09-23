import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    minHeight: 60
  },
  onlineIndicator: {
    margin: 5,
    height: 10,
    width: 10,
    borderRadius: 5
  },
  topContainer: {
    flex: 1,
    marginLeft: 5
  },
  topRow: {
    flexDirection: 'row'
  },
  roomNameText: {
    ...Fonts.style.normal,
    flex: 1,
  },
  batteryContainer: {
    flexDirection: 'row'
  },
  batteryLevelText: {
    ...Fonts.style.tiny,
    textAlign: 'right',
    marginLeft: 5,
    color: 'grey'
  },
  bottomRow: {
    flexDirection: 'row'
  },
  deviceNameText: {
    ...Fonts.style.italicMedium,
    flex: 1,
    color: Colors.charcoal
  },
  alarmState: {
    borderWidth: 1,
    alignSelf: 'center',
    paddingHorizontal: 3
  },
  alarmStateText: {
    ...Fonts.style.description,
  }
})
