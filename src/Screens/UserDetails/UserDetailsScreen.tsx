// import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Navigation';

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
type Props = {
  route: UserDetailRouteProp;
};

const UserDetailsScreen = ({route}: Props) => {
  console.log(route);
  const {userId} = route.params;
  return (
    <View>
      <Text>UserDetails</Text>
      <Text>{userId}</Text>
    </View>
  );
};

export default UserDetailsScreen;
