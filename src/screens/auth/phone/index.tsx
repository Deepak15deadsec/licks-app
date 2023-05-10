import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons, SIZES, FONTS } from '../../../constants'
import { useNavigation } from '@react-navigation/native';
import PhoneInput from './PhoneInput';
import axios from 'axios'
import { enc, AES } from 'react-native-crypto-js';
//@ts-ignore
import { SERVER_BASE_URL, CRYPTO_SECRET_KEY } from '@env';


const Phone = ({ route }: any) => {
  const navigation = useNavigation()
  const user = route?.params?.user


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

  useEffect(() => {
    setDetail({ ...detail, callingCode: user.callingCode, countryCode: user.countryCode })
  }, [user])


  const requestForOtp = async () => {
    let phone = detail.callingCode.concat(detail.phone)
    console.log("phone", phone)
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

    console.log("otp")
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
              height: hr * 620,
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
              height: hr * 610,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#FFFFFF',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 36
            }}
          >

            <View>
              <Text style={{ ...FONTS.heading, color: 'black' }}>Number</Text>
              <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Enter Your Number</Text>
              <PhoneInput
                setDetail={setDetail}
                detail={detail}
                error={error}
              />
            </View>

            <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: 40 }}>
              {/* back */}
              <TouchableOpacity
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

              </TouchableOpacity>

              {/* next */}
              <TouchableOpacity
                style={{
                  backgroundColor: detail.phone.length === 10 ? '#30D792' : "#DBDBDB",
                  padding: 8,
                  borderRadius: 100,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                disabled={detail.phone.length < 10}
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