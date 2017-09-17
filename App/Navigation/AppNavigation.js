import { StackNavigator } from 'react-navigation'
import SmokeAlarms from '../Containers/SmokeAlarms'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SmokeAlarms: {
    screen: SmokeAlarms,
  },
}, {
  headerMode: 'float',
  initialRouteName: 'SmokeAlarms',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: {
      color: 'white'
    },
    headerBackTitleStyle: {
      color: 'white'
    }
  }
})

export default PrimaryNav
