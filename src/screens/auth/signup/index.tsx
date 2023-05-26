import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useCallback } from 'react'
import { icons, SIZES, FONTS } from '../../../constants'
import { useNavigation } from '@react-navigation/native';
import { AvniTextInput } from '../../../components/inputs';
import Picker from '../../../components/pickers';
import gendersTypes from './gender-types.json'
import DatePicker from '../../../components/datepicker';
import Checkbox from '../../../components/checkbox';
import axios from 'axios'
//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import { useStoreActions } from '../../../store/easy-peasy/hooks';
import RingWave from '../../../components/RingWave';
import Loading from '../../../components/Loading';


const Signup = ({ route }: any) => {
  const navigation = useNavigation()
  const user = route?.params?.user
  const [screen, setScreen] = useState<number>(1)


  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    gender: "MALE",
    dob: "",
    location_access: false,
    sms_access: false
  })

  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)

  let addUser = useStoreActions((store) => store.addUser)

  const onchangeHandler = useCallback((value: any, name: string) => {
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const signup = async () => {

    try {
      setScreen(2)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "phone": user.phone,
        "email": user.email,
        "firstName": input.first_name,
        "lastName": input.last_name,
        "smsAccess": input?.sms_access,
        "locationAccess": input?.location_access,
        "gender": input?.gender,
        "dob": input?.dob
      })
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let response = await fetch(`${SERVER_BASE_URL}/oauth/signup`, requestOptions)
      let data = await response.json()

      console.log("signup", data)
      if (data && data.status === 200 && data.accessToken) {
        addUser({
          id: data.id,
          token: data.accessToken,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: !!data.phone ? data.phone : "",
          gender: !!data.gender ? data.gender : "",
          age: !!data.age ? data.age : ""
        })
      }
    } catch (error) {
      console.log("errorsssss", error)
    }

  }

  switch (screen) {
    case 1:
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
                  <Text style={{ ...FONTS.heading, color: 'black' }}>Let’s Get Started</Text>
                  <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Enter your Details below to continue</Text>

                  <View style={{ marginTop: 30, gap: 10, marginBottom: 10 }}>
                    <AvniTextInput
                      label="First Name"
                      value={input.first_name}
                      onChangeText={(value: any) => onchangeHandler(value, "first_name")}
                      placeholder='Enter Fisrt Name'
                    />
                    <AvniTextInput
                      label="Last Name"
                      value={input.last_name}
                      onChangeText={(value: any) => onchangeHandler(value, "last_name")}
                      placeholder='Enter Last Name'
                    />
                    <Picker
                      label="Gender"
                      placeholder='Select Gender'
                      selectedValue={input.gender}
                      onValueChange={(value: any) => onchangeHandler(value, "gender")}
                      gendersTypes={gendersTypes}
                    />
                    <DatePicker
                      label="Date of Birth"
                      placeholder='Enter Date of Birth'
                      value={input.dob}
                      onchangeHandler={onchangeHandler}
                    />
                    <Checkbox
                      label="Location Access"
                      value={input.location_access}
                      onchangeHandler={() => onchangeHandler(!input.location_access, "location_access")}
                    />
                    <Checkbox
                      label="SMS Access"
                      value={input.sms_access}
                      onchangeHandler={() => onchangeHandler(!input.sms_access, "sms_access")}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: true ? '#30D792' : "#DBDBDB",
                    borderRadius: 10,
                    justifyContent: 'center',
                    height: 52,
                    alignItems: 'center'
                  }}
                  disabled={
                    input.first_name === "" && input.last_name === "" && input.gender === "" && input.dob === ""
                  }
                  //@ts-ignore
                  onPress={signup}
                >
                  <Text style={{
                    ...FONTS.paragraph,
                    color: '#fff'
                  }}>Create Account</Text>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )

    default:
      return <Loading />
  }
}

export default Signup

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: '#30D792'
  }
})