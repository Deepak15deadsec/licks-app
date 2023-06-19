import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {getUrl} from '../../hooks/googleUrl';

//@ts-ignore
import {SERVER_BASE_URL, CRYPTO_SECRET_KEY} from '@env';
import {useStoreActions, useStoreState} from '../../store/easy-peasy/hooks';
import { useAuth } from '../../hooks/auth';

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const Proceed = (props: any) => {
  const [data, setData] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const{token, id} = useAuth()

  const openModal = () => {
    setModalVisible(true);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://avni.club/privacy-policy');
  };

  const handleTerms = () => {
    Linking.openURL('https://avni.club/terms-and-conditions');
  };

  const handleClick = async () => {
    const url = getUrl(user?.phone);
    const response = await Linking.openURL(url);
    console.log('resp', response);
  };

  const user = useStoreState(store => store.user);

  useEffect(() => {
    if (modalOpened) {
      openModal();
    }
  }, [modalOpened]);

  const handleNext = () => {
    props.setStep(2);
    const interval = setInterval(async () => {
      try {
        const {data: forward}: any = await axios({
          method: 'GET',
          url: `${SERVER_BASE_URL}/avni-inbox/${id}/get-forward-mail/forwarding-noreply@google.com`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (forward.status === 200) {
          clearInterval(interval); // Stop checking when response is received

          setData(forward.data);
          props.setStep(3);
        }
        if (forward.status === 404) {
          props.setStep(1);
          if (!modalOpened) {
            setModalOpened(true);
          }
        }
      } catch (error: any) {
        props.setStep(1);
      }
    }, 15000); // 30 seconds
  };

  switch (props.step) {
    case 1:
      return (
        <View style={{gap: 10, alignItems: 'center', marginTop: hr * 50}}>
          {/* <Text>{data}</Text> */}
          <View>
            <Text style={{color: 'gray'}}>
              <Text
                style={{textDecorationLine: 'underline', color: 'gray'}}
                onPress={handleTerms}>
                T&C
              </Text>{' '}
              and{' '}
              <Text
                style={{textDecorationLine: 'underline', color: 'gray'}}
                onPress={handlePrivacyPolicyPress}>
                privacy policy
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              width: 160 * wr,
              height: 40 * hr,
              borderWidth: 1,
              borderColor: '#DBDBDB',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#30D792',
            }}
            onPress={() => handleNext()}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.white,
              }}>
              Next
            </Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View style={{backgroundColor: 'white', padding: 20, gap: 8}}>
                <Text style={{...FONTS.size17m, color: 'gray'}}>
                  Please complete the steps above
                </Text>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={{
                      backgroundColor: '#30D792',
                      borderRadius: 5,
                      justifyContent: 'center',
                      height: hr * 38,
                      alignItems: 'center',
                      padding: 8,
                    }}>
                    <Text
                      style={{
                        ...FONTS.paragraph,
                        color: '#fff',
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );

    case 2:
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hr * 50,
          }}>
          <Text style={{color: 'gray'}}>Fetching Confirmation ...</Text>
          {/* <LottieView source={images.loader} autoPlay loop /> */}
        </View>
      );

    case 3:
      return (
        <View style={{gap: 2, alignItems: 'center', marginTop: hr * 50}}>
          <Text style={{bottom: hr * 20}}>confirmation received</Text>
          <View>
            <Text style={{color: 'gray'}}>
              <Text
                style={{textDecorationLine: 'underline', color: 'gray'}}
                onPress={handleTerms}>
                T&C
              </Text>{' '}
              and{' '}
              <Text
                style={{textDecorationLine: 'underline', color: 'gray'}}
                onPress={handlePrivacyPolicyPress}>
                privacy policy
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              padding: 8,
              borderWidth: 1,
              borderColor: '#DBDBDB',
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 5,
              backgroundColor: '#fff',
            }}
            onPress={handleClick}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.darker,
              }}>
              Connect your Gmail
            </Text>
            <Image
              style={{height: hr * 22, width: wr * 22}}
              source={images.gmail}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      );

    default:
      return <View />;
  }
};

export default Proceed;
