import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Navigation';
import {fetchUsers} from '../../Redux/features/users/UserSlice';
import {useAppSelector, useAppDispatch} from '../../Redux/Store/hooks';

type HomecreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation?: HomecreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.loading) {
    return <ActivityIndicator size={40} style={styles.indicator} />;
  }
  if (user.error) {
    return <Text>{user.error}</Text>;
  }

  return (
    <FlatList
      data={user.users}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate('UserDetail', {
              userId: item.id,
            });
          }}>
          <View style={styles.home}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </TouchableOpacity>
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {marginTop: 40},
  home: {
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 16,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 20,
    fontWeight: '100',
    color: '#808080',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;
