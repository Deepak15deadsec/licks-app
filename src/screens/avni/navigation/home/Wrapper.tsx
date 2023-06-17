import {Clipboard} from '@react-native-clipboard/clipboard/dist/Clipboard';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  TYPES,
  images,
} from '../../../../constants';
import Svg, {Path, Circle} from 'react-native-svg';
import {useColorScheme} from 'react-native';
import CoinCard from './CoinCard';
import Categories from './categories';
import Trending from './trending';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';
import Expiring from './expiring';
import {useNavigation} from '@react-navigation/native';
import ProfileCard from './ProfileCard';
import Google from './Google';
import Orbit from '../../../../components/orbit/Orbit';

import QRCode from 'react-native-qrcode-svg';
import {CommonFlatlist} from '../../../../components/flatlist';

//@ts-ignore
import {SERVER_BASE_URL} from '@env';
import axios from 'axios';
import moment from 'moment';
import InviteCard from './InviteCard';

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const Wrapper = () => {
  const navigation = useNavigation();
  const user = useStoreState(store => store.user);
  const [isCopied, setIsCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState(false);

  const isInviteAccepted = useStoreState(state => state.isInviteAccepted);
  const isMailAttached = useStoreState(state => state.isMailAttached);
  const isProfileComplete = useStoreState(state => state.isProfileComplete);

  const [showContent, setShowContent] = useState(
    Array(data.length).fill(false),
  );

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  const fetchData = async (token: any) => {
    setLoading(true);

    try {
      const {data} = await axios({
        url: `${SERVER_BASE_URL}/milestone/offers?trending=true`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        cancelToken: token,
      });
      //console.log("mildsl", data)

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchData(source.token);
    return () => {
      source.cancel('Request canceled');
    };
  }, []);

  const renderItem = ({item: data, index}: any) => {
    // const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;

    const handleCopy = () => {
      const textToCopy = data?.voucherCode;
      copyToClipboard(textToCopy);
      setIsCopied(true);
    };

    const handleTextClick = (index: any) => {
      const updatedShowContent = [...showContent];
      updatedShowContent[index] = !updatedShowContent[index];
      setShowContent(updatedShowContent);
    };

    const inputDate = data?.validUpto;
    // const formattedDate = moment(inputDate).format('DD/MM/YYYY');

    const dateString = data.validUpto;
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return (
      <View>
        <View
          key={index}
          style={{
            backgroundColor:
              data && data?.orderAcheived === data?.maxOrderRequired
                ? '#00d74f'
                : '#e1f1e1',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: 70,
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                gap: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                }}>
                <TouchableOpacity
                //   onPress={() => navigation.navigate('Detail' as never, { id: reward.advertiser_id } as never)}
                >
                  <Image
                    source={{
                      uri: data?.brandImage[0],
                    }}
                    style={{
                      width: wr * 58,
                      height: hr * 58,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    gap: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        ...FONTS.size14b,
                        color: '#5C595F',
                        lineHeight: 16,
                        letterSpacing: -0.03,
                      }}>
                      {data?.brandName}
                    </Text>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                        <Text style={{ ...FONTS.size14b, color: '#30D792', lineHeight: 16, letterSpacing: -0.03 }}>
                                            + {data?.rewardrdArt} </Text>
                                        <Image style={{ height: 16, width: 16 }} source={icons.coin} resizeMode='contain' />
                                    </View> */}
                  </View>

                  <Text
                    style={{
                      ...FONTS.size14m,
                      color: '#5C595F',
                      letterSpacing: -0.03,
                    }}>
                    {data?.offerTitle}{' '}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* dotted line */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor:
              data && data?.orderAcheived === data?.maxOrderRequired
                ? '#00d74f'
                : '#e1f1e1',
            alignItems: 'center',
            paddingHorizontal: 25,
            height: 40,
          }}>
          <View
            style={{
              borderRadius: 1000,
              position: 'absolute',
              backgroundColor: '#ffffff',
              width: 40,
              height: '50%',
              left: -20,
              zIndex: 1000,
            }}
          />
          <View
            style={{
              flex: 1,
              width: '100%',
              borderWidth: 1.5,
              borderColor: '#ffffff',
              borderStyle: 'dashed',
            }}
          />
          <View
            style={{
              position: 'absolute',
              borderRadius: 1000,
              backgroundColor: '#ffffff',
              width: 40,
              height: '50%',
              right: -20,
              zIndex: 1000,
            }}
          />
        </View>
        {/* dotted line */}

        <View
          style={{
            backgroundColor:
              data && data?.orderAcheived === data?.maxOrderRequired
                ? '#00d74f'
                : '#e1f1e1',
            borderBottomLeftRadius: showContent[index] ? 0 : 20,
            borderBottomRightRadius: showContent[index] ? 0 : 20,
            height:
              data && data?.orderAcheived === data?.maxOrderRequired ? 135 : 90,
            paddingHorizontal: 20,
            paddingVertical:
              data && data?.orderAcheived === data?.maxOrderRequired ? 0 : 5,
            justifyContent: 'flex-start',
            gap: 9,
          }}>
          {data && data?.orderAcheived === data?.maxOrderRequired ? (
            <View
              style={{
                flexDirection: 'row',
                gap: 17,
                alignItems: 'center',
                width: '100%',
              }}>
              <QRCode value={`${data?.voucherCode}`} size={52} />

              <Text
                style={{...FONTS.h2, color: '#5C595F', letterSpacing: -0.03}}>
                {data?.voucherCode}
              </Text>

              <TouchableOpacity onPress={handleCopy}>
                <Image
                  source={isCopied ? icons.copyg : icons.copyb}
                  style={{
                    width: wr * 18,
                    height: hr * 18,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
                gap: 5,
              }}>
              {Array.from(
                {length: data?.maxOrderRequired},
                (_, i) => i + 1,
              ).map(x => {
                const fill =
                  x <= data?.orderAcheived ? images.gstar : images.estar;
                return (
                  <Image
                    key={x}
                    source={fill}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                );
              })}
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop:
                data && data?.orderAcheived === data?.maxOrderRequired ? 20 : 0,
            }}>
            <Text
              style={{
                ...FONTS.size14m,
                color: '#5C595F',
                letterSpacing: -0.03,
              }}>
              Valid upto {formattedDate}
            </Text>
            <View style={{gap: 2, alignItems:'center'}}>
              <Text
                style={{
                  ...FONTS.size14m,
                  color:
                    data && data?.orderAcheived === data?.maxOrderRequired
                      ? '#ffffff'
                      : '#333333',
                  lineHeight: 20,
                  marginTop: -5,
                }}>
                Earn{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: -2,
                  marginTop: -4,
                }}>
                <Text
                  style={{
                    ...FONTS.size20s,
                    color:
                      data && data?.orderAcheived === data?.maxOrderRequired
                        ? '#ffffff'
                        : '#333333',
                    lineHeight: 20,
                    marginTop: 5,
                  }}>
                  +{data?.rewardedArt}{' '}
                </Text>
                <Image
                  style={{height: 22, width: 22}}
                  source={icons.coin}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => handleTextClick(index)}>
            <Text
              style={{
                ...FONTS.size14m,
                color: '#5C595F',
                letterSpacing: -0.03,
                marginTop: -20,
                textDecorationLine: 'underline',
              }}>
              Terms & conditions
            </Text>
          </TouchableOpacity>
        </View>

        {showContent[index] && (
          <View
            style={{
              backgroundColor:
                data && data?.orderAcheived === data?.maxOrderRequired
                  ? '#00d74f'
                  : '#fbf5c5',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,

              paddingHorizontal: 20,
              paddingVertical: 8,
              justifyContent: 'flex-start',
              gap: 9,
              marginTop: -2,
            }}>
            {data.termsAndConditions.map((term: any, index: any) => (
              <Text key={index}>
                {index + 1} {term}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderSeparator = () => (
    <View
      style={{
        padding: 8,
      }}
    />
  );

  return (
    
      <CommonFlatlist
        ListHeaderComponent={
          <>
            <CoinCard />
            {(isProfileComplete === false || isMailAttached === false) && (
              <Text
                style={{
                  marginTop: 15,
                  ...FONTS.paragraph,
                  color: '#5C595F',
                }}>
                Action required
              </Text>
            )}
            {isProfileComplete === false && <ProfileCard />}
            {isMailAttached === false && <Google />}
            {isInviteAccepted === false && <InviteCard />}

            <View>
              <Categories />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
                marginBottom: 30,
              }}>
              <Text style={{...FONTS.paragraph, color: '#5C595F'}}>
                Trending milestones
              </Text>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            {/* <Trending />
          <Expiring /> */}
            <Orbit />
          </>
        }
        data={data}
        renderItem={renderItem}
        //ListEmptyComponent={renderEmpty}
        keyExtractor={({mildstoneAdId}: {mildstoneAdId: string}) =>
          mildstoneAdId
        }
        ItemSeparatorComponent={renderSeparator}
      />
    
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});