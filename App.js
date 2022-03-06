// App.js
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import {LogBox} from 'react-native';
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#621FF7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{title: 'Users List'}}
      />
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{title: 'Add User'}}
      />

      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{title: 'User Detail'}}
      />
    </Stack.Navigator>
  );
}
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
