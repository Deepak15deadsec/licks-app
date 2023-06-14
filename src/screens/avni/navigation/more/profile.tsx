import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  TYPES,
  images,
} from '../../../../constants';
import Svg, { Path, Circle } from 'react-native-svg';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';
import { useNavigation } from '@react-navigation/native';
import { AvniTextInput } from '../../../../components/inputs';
import DatePicker from '../../../../components/datepicker';
import Picker from '../../../../components/pickers';
import gendersTypes from '../../data/gender-types.json';
//@ts-ignore
import { SERVER_BASE_URL } from '@env';
import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment';

const Profile = () => {
  const removeUser = useStoreActions(store => store.removeUser);
  const setIsProfileComplete = useStoreActions(
    store => store.setIsProfileComplete,
  );
  const user = useStoreState(store => store.user);
  const navigation = useNavigation();
  const addUser = useStoreActions(store => store.addUser);
  const [input, setInput] = useState<any>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    gender: user?.gender,
    dob: user.dob === null ? null : user.dob,
  });


  const onchangeHandler = useCallback((value: any, name: string) => {
    if (name === "dob") {
      setInput((prevState: any) => ({ ...prevState, ["dob"]: moment(value).format('YYYY-MM-DD') }));
    }
    else {
      if (name === "firstName" && error.gender) {
        setError((prevState) => ({
          ...prevState,
          firstName: false,
        }));
      }
      if (name === "gender" && error.gender) {
        setError((prevState) => ({
          ...prevState,
          gender: false,
        }));
      }
      setInput((prevState: any) => ({ ...prevState, [name]: value }));
    }

    setError((prevState) => ({
      ...prevState,
      firstName: false,
      gender: false
    }));

  }, []);

  let wr = SIZES.width / 391;
  let hr = SIZES.height / 812;



  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    dob: false,
  })

  const updateUser = async () => {


    if (input.firstName === "Guest") {
      setError((prevState) => ({
        ...prevState,
        firstName: true,
      }));
      return; // Stop further execution if there is an error
    }

    if (input.gender === "None") {
      setError((prevState) => ({
        ...prevState,
        gender: true,
      }));
      return; // Stop further execution if there is an error
    }

    let responseData;
    try {
      const payload = {
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        dob: input.dob,
      };

      //console.log("payload",payload)

      const { data } = await axios({
        method: 'PUT',
        url: `${SERVER_BASE_URL}/users/${user.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },

        data: payload,
      });

      responseData = data;
      //console.log("response",responseData)
    } catch (error) {
      console.log(error);
      // Handle the error
    } finally {
      if (!!responseData) {
        addUser({
          ...user,
          firstName: responseData?.data?.firstName,
          lastName: responseData?.data?.lastName,
          gender: responseData?.data?.gender,
          dob: responseData?.data?.dob,
        });
        setIsProfileComplete(true);
        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingTop: Platform.OS === 'android' ? hr * 30 : hr * 50,
          paddingBottom: hr * 30,
          paddingLeft: wr * 25,
          paddingRight: wr * 25,
        }}>
        <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <Path
            d="M18.7165 6.95109H4.37986L10.6433 1.80561C11.1439 1.39439 11.1439 0.719571 10.6433 0.308354C10.5246 0.210607 10.3835 0.133058 10.2283 0.0801464C10.073 0.0272349 9.90655 0 9.73845 0C9.57035 0 9.40391 0.0272349 9.24864 0.0801464C9.09337 0.133058 8.95233 0.210607 8.83359 0.308354L0.375351 7.25687C0.256366 7.35442 0.161968 7.47028 0.0975606 7.59784C0.0331529 7.72539 0 7.86213 0 8.00022C0 8.13832 0.0331529 8.27505 0.0975606 8.40261C0.161968 8.53016 0.256366 8.64603 0.375351 8.74358L8.83359 15.6921C8.95242 15.7897 9.09349 15.8671 9.24874 15.92C9.404 15.9728 9.5704 16 9.73845 16C9.9065 16 10.0729 15.9728 10.2282 15.92C10.3834 15.8671 10.5245 15.7897 10.6433 15.6921C10.7621 15.5945 10.8564 15.4786 10.9207 15.351C10.985 15.2235 11.0181 15.0868 11.0181 14.9487C11.0181 14.8107 10.985 14.674 10.9207 14.5464C10.8564 14.4189 10.7621 14.303 10.6433 14.2054L4.37986 9.0599H18.7165C19.4224 9.0599 20 8.58542 20 8.0055C20 7.42557 19.4224 6.95109 18.7165 6.95109Z"
            fill="white"
          />
        </Svg>
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          //top: 58,
          alignSelf: 'center',
          width: SIZES.width * 0.92,
          height:
            Platform.OS === 'android' ? SIZES.height - 70 : SIZES.height - 90,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#ffffff80',
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          //top: 70,
          width: SIZES.width,
          height:
            Platform.OS === 'android' ? SIZES.height - 82 : SIZES.height - 102,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFFFFF',
          paddingLeft: wr * 24,
          paddingRight: wr * 24,
          paddingTop: hr * 20,
          paddingBottom: hr * 50,
        }}>
        <View
          style={{
            padding: 0,
            gap: 6,
          }}>
          <Text style={{ ...FONTS.heading, color: 'black' }}>Profile</Text>
        </View>

        <View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: hr * 10,
              borderWidth: 2,
              borderRadius: 50,
            }}>
            <Image
              source={
                user?.gender === 'Male'
                  ? images.man
                  : user?.gender === 'Female'
                    ? images.woman
                    : icons.avatar
              }
              style={{
                width: wr * 88,
                height: hr * 88,
              }}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginTop: hr * 10,
              flexDirection: 'column',
            }}>
            <Text style={{ ...FONTS.heading, color: 'black' }}>{user.email}</Text>
            <Text style={{ ...FONTS.heading, color: 'black' }}>{user.phone}</Text>
          </View>

          <View style={{ marginTop: hr * 30, gap: 14, marginBottom: hr * 10 }}>
            <AvniTextInput
              label="First Name"
              value={input?.firstName}
              placeholder="Enter First Name"
              placeholderTextColor="gray"
              onChangeText={(value: any) => onchangeHandler(value, 'firstName')}
            />
            {error.firstName && (
              <Text style={{ color: 'red' }}>Please enter a valid first name</Text>
            )}

            <AvniTextInput
              label="Last Name"
              value={input?.lastName}
              placeholderTextColor="gray"
              placeholder="Enter Last Name"
              onChangeText={(value: any) => onchangeHandler(value, 'lastName')}
            />

            <Picker
              label="Gender"
              selectedValue={input.gender}
              onValueChange={(value: any) => onchangeHandler(value, 'gender')}
              gendersTypes={gendersTypes}
            />
            {error.gender && (
              <Text style={{ color: 'red' }}>Please select your gender</Text>
            )}

            <DatePicker
              label="Date of Birth"
              placeholderTextColor="gray"
              placeholder="Enter Date of Birth"
              value={input?.dob}
              onchangeHandler={onchangeHandler}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={updateUser}
          style={{
            backgroundColor: true ? '#30D792' : '#DBDBDB',
            borderRadius: 10,
            justifyContent: 'center',
            height: hr * 52,
            alignItems: 'center',
            marginTop: hr * 10,
          }}>
          <Text
            style={{
              ...FONTS.paragraph,
              color: '#fff',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#30D792',
    height: SIZES.height,
    width: SIZES.width,
  },
});
