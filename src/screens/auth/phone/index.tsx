import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch, Linking, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons, SIZES, FONTS } from '../../../constants'
import { useNavigation } from '@react-navigation/native';
import PhoneInput from './PhoneInput';
import axios from 'axios'
import { enc, AES } from 'react-native-crypto-js';
//@ts-ignore
import { SERVER_BASE_URL, CRYPTO_SECRET_KEY } from '@env';
import Language from '../../../components/language';


const Phone = ({ route }: any) => {
  const navigation = useNavigation()
  const user = route?.params?.user

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp(); // Close the app when swipe back
      return true; // Return true to prevent default back button behavior
    });

    return () => backHandler.remove(); // Clean up the event listener when component unmounts
  }, []);

  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)

  const [detail, setDetail] = useState({
    phone: '',
    callingCode: '',
    countryCode: 'IN'
  })

  const [error, setError] = useState({
    phone: false
  })

  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };
  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://avni.club/terms-and-conditions');
  };

  useEffect(() => {
    setDetail({ ...detail, callingCode: '+91' })
  }, [user])


  const requestForOtp = async () => {
    let phone = detail.callingCode.concat(detail.phone)
    var phoneCode = AES.encrypt(`${phone}`, CRYPTO_SECRET_KEY as string).toString();
    const { data } = await axios({
      url: `${SERVER_BASE_URL}/oauth/requestOtp`,
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({
        phoneCode: phoneCode
      })
    })

    if (data && data.Status === "Success") {
      //@ts-ignore
      navigation.navigate('Verify', {
        user: { ...user, phone: phone }
      })
    } else {
      setError({ ...error, ['phone']: true })
    }

  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: hr * 47 }}>
            <Image
              source={icons.avni_logo}
              style={{
                width: wr * 77,
                height: hr * 105
              }}
            />
          </View>


          <View
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              width: SIZES.width * 0.92,
              height: Platform.OS === 'android' ? (SIZES.height - 168) : (SIZES.height - 192),
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#ffffff80',

            }}
          />


          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: SIZES.width,
              height: Platform.OS === 'android' ? (SIZES.height - 180) : (SIZES.height - 204),
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#FFFFFF',
              paddingLeft: wr * 24,
              paddingRight: wr * 24,
              paddingTop: hr * 36
            }}
          >

            <View >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <View>
                  <Text style={{ ...FONTS.heading, color: 'black' }}>Membership Application</Text>
                  <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>tell us your mobile number</Text>
                </View>

                {/* <Language /> */}

              </View>

              <PhoneInput
                setDetail={setDetail}
                detail={detail}
                error={error}
              />
            </View>

            <View style={{ position: 'absolute', alignSelf: 'center', bottom: hr * 140 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Switch
                  value={checked}
                  onValueChange={handleCheck}
                />
                <Text style={{ marginLeft: 5, color:"gray"  }}>
                  I agree to avni.club {' '}
                  <Text style={{ textDecorationLine: 'underline', color:"gray" }} onPress={handlePrivacyPolicyPress}>
                    T&C and privacy policy
                  </Text>
                </Text>
              </View>

            </View>



            <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: hr * 40 }}>
              {/* back */}
              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#DBDBDB',
                  width: 60,
                  borderRadius: 100,
                  padding: 8,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 40
                }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icons.back}
                  style={{
                    width: 33,
                    height: 22,
                  }}
                  resizeMode="contain"
                />

              </TouchableOpacity> */}

              {/* next */}
              <TouchableOpacity
                style={{
                  backgroundColor: detail.phone.length === 10 && checked ? '#30D792' : "#DBDBDB",
                  padding: 8,
                  borderRadius: 100,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                disabled={detail.phone.length < 10 || !checked}
                //@ts-ignore
                onPress={requestForOtp}
              >
                <Image
                  source={icons.next}
                  style={{
                    width: 33,
                    height: 22,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Phone

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: '#30D792'
  }
})