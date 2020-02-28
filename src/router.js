import React from 'react'
import { Platform, StyleSheet } from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Icon } from 'react-native-elements'
import { BorderlessButton } from 'react-native-gesture-handler'

// IMPORT SCENES
import DashBoardScreen from './screen/dashboard/DashBoard'
import ArticlesScreen from './screen/dashboard/Articles'
import ArticleScreen from './screen/dashboard/Article'
import SearchScreen from './screen/dashboard/Search'

// ROUTES CONFIG ====================================================

const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
const size = Platform.OS === 'ios' ? 24 : 25
const titleColor = '#363434'
const iconColor = '#808689'

// Nav Header Styles
const headerStyle = { backgroundColor: '#fff' }
const headerTitleStyle = { fontWeight: 'bold', fontSize: 17, fontFamily: font, color: titleColor }

// Nav Buttons
const SearchBtn = (props) => (
  <BorderlessButton {...props} style={styles.wrapper}>
    <Icon type='ionicon' name='md-search' size={size} color={iconColor} />
  </BorderlessButton>
)

// ROUTES STACK ====================================================

const DashboardStack = createStackNavigator(
  {
    DashBoard: DashBoardScreen,
    Articles: ArticlesScreen,
    Article: ArticleScreen,
    Search: SearchScreen
  },
  {
    initialRouteName: 'DashBoard',
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitleStyle,
      headerRight: (<SearchBtn onPress={() => navigation.navigate('Search')} />)
    })
  }
)

// ROUTER ====================================================
const Router = createAppContainer(DashboardStack)
export default Router

const styles = StyleSheet.create({
  wrapper: {
    height: 44,
    width: 44 + 6,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
