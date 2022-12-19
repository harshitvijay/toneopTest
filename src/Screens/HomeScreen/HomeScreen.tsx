import React from 'react';
import {Text, View, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Navigation';

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
      <Text>HomeScreen</Text>
      <Button
        title="Press"
        onPress={() =>
          navigation.navigate('UserDetail', {
            userId: '2',
          })
        }
      />
    </View>
  );
};

export default HomeScreen;
