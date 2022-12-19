import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Navigation';
import {useAppSelector} from '../../Redux/Store/hooks';

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
type Props = {
  route: UserDetailRouteProp;
};

const UserDetailsScreen = ({route}: Props) => {
  const {userId} = route.params;
  const user = useAppSelector(state => state.user);

  if (user.loading) {
    return <ActivityIndicator size={40} style={styles.indicator} />;
  }
  if (user.error) {
    return <Text>{user.error}</Text>;
  }
  const userInfo = user.users.filter(ele => ele.id === userId);
  const {name, company, email, address, username, website, phone} = userInfo[0];

  const callPhoneNumber = async (number: string) => {
    number = number.replace('-', '');
    const phoneNumber = `${
      Platform.OS !== 'android' ? 'telprompt' : 'tel'
    }:${number}`;
    try {
      Linking.openURL(phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const openMap = async (addr: string, city: string, zipCode: string) => {
    const destination = encodeURIComponent(`${addr} ${zipCode}, ${city}`);
    const provider = Platform.OS === 'ios' ? 'apple' : 'google';
    const link = `http://maps.${provider}.com/?daddr=${destination}`;

    try {
      Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoName}>{name}</Text>
        <Text style={styles.userInfoCompany}>{company.name}</Text>
      </View>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactInfoText}>Contact Information</Text>
        <Text style={[styles.otherText, {marginBottom: 15}]}>{email}</Text>
        <TouchableOpacity
          onPress={() =>
            openMap(
              `${address.street} ${address.suite}`,
              address.city,
              address.zipcode,
            )
          }>
          <Text style={styles.otherText}>{address.street}</Text>
          <Text style={styles.otherText}>{address.suite}</Text>
          <Text style={styles.otherText}>
            {address.city} {address.zipcode}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => callPhoneNumber(phone)}>
          <Text style={styles.otherText}>{phone}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactInfoText}>Other Information</Text>
        <Text style={styles.otherText}>Username: {username}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(`https://${website}`)}>
          <Text style={styles.otherText}>Website: {website}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoName: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfoCompany: {
    fontSize: 20,
    fontWeight: '600',
    color: '#808080',
  },
  contactInfoContainer: {
    marginHorizontal: 20,
  },
  contactInfoText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  otherText: {
    fontSize: 25,
    color: '#000',
    fontWeight: '400',
  },
});

export default UserDetailsScreen;
