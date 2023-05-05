import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native'
import React, { useState } from 'react'
import { icons, SIZES, FONTS } from '../../../constants'
import { useNavigation } from '@react-navigation/native'

//@ts-ignore
import { SERVER_BASE_URL, CRYPTO_SECRET_KEY } from '@env'
import { useStoreActions } from '../../../store/easy-peasy/hooks'
import RingWave from '../../../components/RingWave'
import Loading from '../../../components/Loading'

const Mailid = ({ route }: any) => {
  const navigation = useNavigation()
  const [screen, setScreen] = useState<number>(1)
  const user = route?.params?.user

  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)



  const [text, setText] = useState('');

  const handleInputChange = (value: string) => {
    setText(value);
  };

  const handleInputSubmit = () => {
    setText(text + '@gmail.com');
  };


  const verify = async () => {


          navigation.navigate("avni" as never);

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
                  <Text style={{ ...FONTS.heading, color: 'black' }}>Avni Mail</Text>
                  <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Create your personalized mail</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your id"
                      value={text}
                      onChangeText={handleInputChange}
                      onSubmitEditing={handleInputSubmit}
                    />
                    <Text style={{ marginLeft: 5 }}>@avniclub.com</Text>
                  </View>

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
                      backgroundColor: !text ? "#DBDBDB" : '#30D792' ,
                      padding: 8,
                      borderRadius: 100,
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    disabled={!text}
                    onPress={verify}
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
    case 2:
      return (<Loading />)
    default:
      return (<RingWave />)
  }

}

export default Mailid

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
    marginTop: 10,
    
  },
  input: {
    flex: 1,
    padding: 0,
    marginLeft: 5,
  },
})