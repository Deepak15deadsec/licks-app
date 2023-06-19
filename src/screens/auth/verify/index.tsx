import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { icons, SIZES, FONTS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import OTP from './OTP';
import ResendOTP from './ResendOTP';
import axios from 'axios';
import { enc, AES } from 'react-native-crypto-js';

//@ts-ignore
import { SERVER_BASE_URL, CRYPTO_SECRET_KEY } from '@env';
import { useStoreActions } from '../../../store/easy-peasy/hooks';
import RingWave from '../../../components/RingWave';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/auth';

const Verify = ({ route }: any) => {
  const navigation = useNavigation();
  const [screen, setScreen] = useState<number>(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState({
    otp: false,
  });
  const user = route?.params?.user;

  let wr = SIZES.width / 391;
  let hr = SIZES.height / 812;

  const addUser = useStoreActions(store => store.addUser);
  const setIsMailAttached = useStoreActions(store => store.setIsMailAttached);
  const setIsInviteAccepted = useStoreActions((store) => store.setIsInviteAccepted)
  const setIsProfileComplete = useStoreActions(
    store => store.setIsProfileComplete,
  );

  const {token , id} = useAuth()

  const resend = () => { };

  const verify = async () => {
    try {
      //api call
      //setScreen(2)

      var phoneCode = AES.encrypt(
        `${user.phone}`,
        CRYPTO_SECRET_KEY as string,
      ).toString();
      var otpCode = AES.encrypt(
        `${otp.join('')}`,
        CRYPTO_SECRET_KEY as string,
      ).toString();

      const { data } = await axios({
        url: `${SERVER_BASE_URL}/oauth/verifyOtp`,
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          phoneCode: phoneCode,
          otpCode: otpCode,
        }),
      });

      //console.log("user",data)
      if (data && data.Status === 'Error') {
        setScreen(1);
        setError({ ...error, ['otp']: true });
      } else {
        if (data && data.status === 200 && data.accessToken) {
          addUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: !!data.phone ? data.phone : '',
            gender: data.gender !== null ? data.gender : null,
            dob: data.dob !== null ? data.dob : null,
            referralCode: data.referralCode,
          });
          setIsMailAttached(data.isMailAttached);
          setIsInviteAccepted(data.isInviteAccepted);
          setIsProfileComplete(data.isProfileComplete);
           //@ts-ignore
          navigation.navigate('Avni', {user});
        }

        if (
          data &&
          data.status === 404 &&
          data.message === 'Credentials not found!'
        ) {
         
          //@ts-ignore
          navigation.navigate('Mailid', { user });
        }
      }
    } catch (error) {
      if (error instanceof TypeError) {
        console.error('A type error occurred:', error);
      } else if (error instanceof RangeError) {
        console.error('A range error occurred:', error);
      } else {
        console.error('An unknown error occurred:', error);
      }
      setScreen(1);
    }
  };

  switch (screen) {
    case 1:
      return (
        <KeyboardAvoidingView
          keyboardVerticalOffset={10}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: hr * 47,
                }}>
                <Image
                  source={icons.avni_logo}
                  style={{
                    width: wr * 77,
                    height: hr * 105,
                  }}
                />
              </View>

              <View
                style={{
                  position: 'absolute',
                  bottom: hr * 0,
                  alignSelf: 'center',
                  width: SIZES.width * 0.92,
                  height: hr * 620,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  backgroundColor: '#ffffff80',
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: hr * 0,
                  width: SIZES.width,
                  height: hr * 610,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  backgroundColor: '#FFFFFF',
                  paddingLeft: wr * 24,
                  paddingRight: wr * 24,
                  paddingTop: hr * 36,
                }}>
                <View>
                  <Text style={{ ...FONTS.heading, color: 'black' }}>
                    Membership Application
                  </Text>
                  <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>
                    {' '}
                    enter the OTP sent to your {user.phone}{' '}
                  </Text>
                  <OTP otp={otp} setOtp={setOtp} error={error} />

                  <ResendOTP onPress={resend} />
                </View>

                <View
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    bottom: hr * 40,
                  }}>
                  {/* back */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#DBDBDB',
                      width: wr * 60,
                      borderRadius: 100,
                      padding: 8,
                      height: hr * 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: wr * 40,
                    }}
                    onPress={() => navigation.goBack()}>
                    <Image
                      source={icons.back}
                      style={{
                        width: wr * 33,
                        height: hr * 22,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* next */}
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        otp?.join('')?.length === 6 ? '#30D792' : '#DBDBDB',
                      padding: 8,
                      borderRadius: 100,
                      width: wr * 60,
                      height: hr * 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    disabled={otp?.join('')?.length < 6}
                    onPress={verify}>
                    <Image
                      source={icons.next}
                      style={{
                        width: wr * 33,
                        height: hr * 22,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    case 2:
      return <Loading />;
    default:
      return <RingWave />;
  }
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: '#30D792',
  },
});
