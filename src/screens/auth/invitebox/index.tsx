import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
  Linking,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, TYPES} from '../../../constants';
import Svg, {Path, Circle} from 'react-native-svg';
import {useStoreActions, useStoreState} from '../../../store/easy-peasy/hooks';
import {useNavigation} from '@react-navigation/native';
import {AvniTextInput, InviteInput} from '../../../components/inputs';
import Share from 'react-native-share';
import {Clipboard} from '@react-native-clipboard/clipboard/dist/Clipboard';
//@ts-ignore
import {SERVER_BASE_URL} from '@env';
import axios from 'axios';
import { useAuth } from '../../../hooks/auth';

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
};

const Invitebox = () => {
  const navigation = useNavigation();
  const {token, id} = useAuth()
  const user = useStoreState(store => store.user);
  const setIsInviteAccepted = useStoreActions(
    store => store.setIsInviteAccepted,
  );
  const isInviteAccepted = useStoreState(store => store.isInviteAccepted);
  const [input, setInput] = useState({
    referralCode: '',
  });

  const handleCopy = () => {
    const textToCopy = 'www.avni.club/XUS';
    copyToClipboard(textToCopy);
  };

  const update = async () => {
    let responseData;
    try {
      const {data} = await axios({
        method: 'POST',
        url: `${SERVER_BASE_URL}/oauth/invitation-rewarding`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          referralCode: input.referralCode,
          userId: id,
        },
      });

      responseData = data;
    } catch (error) {
      console.log(error);
    } finally {
      if(responseData === input.referralCode) {
        setIsInviteAccepted(true);
      }else{
        Alert.alert(responseData)
      }
    }
  };

  const onChangeHandler = (value: string, name: string) => {
    setInput({...input, [name]: value});
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

              alignSelf: 'center',
              width: SIZES.width * 0.92,
              height:
                Platform.OS === 'android'
                  ? SIZES.height - 70
                  : SIZES.height - 90,
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
              height:
                Platform.OS === 'android'
                  ? SIZES.height - 82
                  : SIZES.height - 102,
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
              <Text style={{...FONTS.heading, color: 'black'}}>
                Enter Promo Code
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 4,
                borderColor: '#cccccc',
                padding: 12,
                marginTop: hr * 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <View
                  style={{
                    ...FONTS.size14b,
                    width: wr * 40,
                    borderWidth: 1,
                    borderRadius: 100,
                    alignItems: 'center',
                    padding: 8,
                    height: hr * 40,
                    borderColor: '#cccccc',
                  }}>
                  <Text style={{color:'gray'}}>1</Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{...FONTS.size14b, color: '#000000'}}>
                    Your Friends code
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#f0fcfa',
                  marginTop: hr * 30,
                }}>
                <InviteInput
                  onChangeText={(value: string) =>
                    onChangeHandler(value, 'referralCode')
                  }
                  placeholder="Enter Here"
                />
              </View>

              <TouchableOpacity
                onPress={update}
                disabled={isInviteAccepted}
                style={{
                  backgroundColor: isInviteAccepted ? '#DBDBDB' : '#30D792',
                  borderRadius: 20,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: hr * 52,
                  alignItems: 'center',
                  marginTop: hr * 30,
                  paddingLeft: wr * 20,
                  paddingRight: wr * 20,
                }}

                //@ts-ignore
              >
                <Text
                  style={{
                    ...FONTS.paragraph,
                    color: '#fff',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: '#cccccc',
                height: hr * 80,
                marginLeft: wr * 30.5, // To make the line appear seamless
                // To make the line appear seamless
              }}></View>

            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 4,
                borderColor: '#cccccc',
                padding: 12,

                height: hr * 70,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <View
                  style={{
                    ...FONTS.size14b,
                    width: wr * 40,
                    borderWidth: 1,
                    borderRadius: 100,
                    alignItems: 'center',
                    padding: 8,
                    height: hr * 40,
                    borderColor: '#cccccc',
                  }}>
                  <Text style={{color:'gray'}}>2</Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{...FONTS.size14b, color: '#000000'}}>
                    You get 50 ART
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Invitebox;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: '#30D792',
  },
});
