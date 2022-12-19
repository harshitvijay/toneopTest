import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import UserDetailsScreen from '../Screens/UserDetails/UserDetailsScreen';
import {StatusBar} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  UserDetail: {userId: number};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  return (
    <>
      <StatusBar backgroundColor={'#4400ffca'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6F00FF',
            },
            headerTitle: 'My Application',
            headerTintColor: '#fff',
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="UserDetail"
            component={UserDetailsScreen}
            initialParams={{userId: 1}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
