import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native'
import React, { useState } from 'react'
import { icons, SIZES, FONTS } from '../../../constants'
import { useNavigation } from '@react-navigation/native'

//@ts-ignore
import { SERVER_BASE_URL, CRYPTO_SECRET_KEY } from '@env'
import { useStoreActions } from '../../../store/easy-peasy/hooks'
import RingWave from '../../../components/RingWave'
import Loading from '../../../components/Loading'
import axios from 'axios'
import MailPointList from '../../../components/mailpoints'
import { AES, enc } from 'react-native-crypto-js'

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Mail = ({ route }: any) => {
  const navigation = useNavigation()
  const [screen, setScreen] = useState<number>(1)
  const [error, setError] = useState({ email: false });
  const [errorr, setErrorr] = useState('');
  let addUser = useStoreActions((store) => store.addUser)
  const setIsMailAttached = useStoreActions((store) => store.setIsMailAttached)
  const user = route?.params?.user



  const [email, setEmail] = useState('');

  const handleInputChange = (value: string) => {
    setEmail(value);
  };

  const handleInputSubmit = async () => {
    try {
      const { data } = await axios({
        url: `${SERVER_BASE_URL}/users/validate-email/${email.concat('@avniclub.com')}`,
        method: "GET",
        headers: {
          "content-type": "application/json"
        },

      })

      if (data.status == 200 && data.is_exist) {
        setError({ ...error, ["email"]: true });
      }
      else {
        setError({ ...error, ["email"]: false });
      }
    } catch (e) {
      setError({ ...error, ["email"]: true });
    }

  };
  console.log("error", error)


  const lowerCaseText = email.toLowerCase();

  const handleSubmit = async () => {
    const regex = /^[a-zA-Z0-9.]+$/; // Regex pattern to allow letters, numbers, and dot

    if (!regex.test(lowerCaseText)) {
      setErrorr('Special characters are not allowed except for dot (.)');
    } else {


      try {
        setScreen(2)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          "phone": user.phone,
          "email": lowerCaseText.concat('@avniclub.com'),
          "firstName": "Guest",
          "lastName": "",
          "smsAccess": false,
          "locationAccess": false,
          "gender": "None",
          "dob": null
        })

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        let response = await fetch(`${SERVER_BASE_URL}/oauth/signup`, requestOptions)
        let encryptedData = await response.json()

        var databytes = AES.decrypt(
          encryptedData?.data,
          CRYPTO_SECRET_KEY as string,
        );
        var data:any = databytes.toString(enc.Utf8);
        //console.log("signup", data)
        if (encryptedData && encryptedData.status === 200 && data.accessToken) {
          addUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: !!data.phone ? data.phone : "",
            gender: data.gender !== null ? data.gender : null,
            dob: data.dob !== null ? data.dob : null,
            referralCode: data.referralCode
          })
          setIsMailAttached(data.isMailAttached)
        }
      } catch (error) {
        console.log("errorsssss", error)
      }

    }

    //navigation.navigate("Signup" as never, { user: { ...user, email: lowerCaseText.concat('@avniclub.com') } } as never);


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
                  paddingTop: hr * 36
                }}
              >

                <View>
                  <Text style={{ ...FONTS.heading, color: 'black' }}>avni.club mail</Text>
                  <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Create your all in one avni.club shopping mailbox</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="you"
                      placeholderTextColor='gray'
                      value={email}
                      onChangeText={handleInputChange}
                      onSubmitEditing={handleInputSubmit}
                    />
                    <Text style={{ marginLeft: wr * 5, color: "gray" }}>@avniclub.com</Text>
                  </View>
                  {error.email && <Text style={{
                    color: '#F65C65',
                    ...FONTS.size16b,
                    letterSpacing: -1.03,
                    marginTop: hr * 18
                  }}>Username already taken, try another</Text>}
                  {errorr && <Text style={{
                    color: '#F65C65',

                    marginTop: hr * 18
                  }}>{errorr}</Text>}


                  <MailPointList />

                </View>

                <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: 40 }}>
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
                      marginRight: wr * 40
                    }}
                    onPress={() => navigation.goBack()}
                  >
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
                      backgroundColor: error.email ? "#DBDBDB" : '#30D792',
                      padding: 8,
                      borderRadius: 100,
                      width: wr * 60,
                      height: hr * 60,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    disabled={error.email}
                    onPress={handleSubmit}
                  >
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
      )
    case 2:
      return (<Loading />)
    default:
      return (<RingWave />)
  }

}

export default Mail

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: '#30D792'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: hr * 10,

  },
  input: {
    flex: 1,
    padding: 0,
    marginLeft: wr * 5,
    color: 'black'
  },
})