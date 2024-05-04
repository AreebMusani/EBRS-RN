import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator 
        screenOptions={{
            tabBarHideOnKeyboard: true, 
            headerShown: false, 
            tabBarStyle: {
                backgroundColor: "#100A1C",
                borderWidth: 0,
                height: 50
            },
        }}
        >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{tabBarIcon: ({ focused, color, size }) => <FontAwesome name="home" color={color} size={size} />}}
        />
      <Tab.Screen 
        name="Search" 
        component={Search} 
        options={{tabBarIcon: ({ focused, color, size }) => <FontAwesome name="search" color={color} size={size} />}}
        />
    </Tab.Navigator>
  );
}

export default MainStack;