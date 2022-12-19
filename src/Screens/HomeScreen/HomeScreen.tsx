import React from 'react';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Navigation';
import Home from '../../Components/Home/Home';

type HomecreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomecreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <View>
      <Home navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
