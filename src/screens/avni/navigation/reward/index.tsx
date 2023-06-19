import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  Platform,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SIZES, FONTS, images, icons } from '../../../../constants';
import { FlatList } from 'react-native-gesture-handler';
import { CommonFlatlist } from '../../../../components/flatlist';
import Svg, { Path } from 'react-native-svg';
import { searchEnum } from '../search/search.enum';
import { useNavigation } from '@react-navigation/native';
import { rewardJson } from '../../data/rewardJson';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';
import QRCode from 'react-native-qrcode-svg';
import { Clipboard } from '@react-native-clipboard/clipboard/dist/Clipboard';
import LottieView from 'lottie-react-native';

//@ts-ignore
import { SERVER_BASE_URL } from '@env';
import axios from 'axios';
import moment from 'moment';
import { useInfiniteQuery } from 'react-query';
import { getRequest, queries } from '../../../../react-query';
import { useAuth } from '../../../../hooks/auth';

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const Reward = () => {
  const navigation = useNavigation();
  const user = useStoreState(store => store.user);
  const [isCopied, setIsCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState(false);
  const {id, token} = useAuth()

  let LIMIT = 20;

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };



  const renderItem = ({ item: data, index }: any) => {
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
                ? '#f0fcfa'
                : '#ffffff',
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
                      uri: data?.brandImage,
                    }}
                    style={{
                      width: 58,
                      height: 58,
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
                ? '#f0fcfa'
                : '#ffffff',
            alignItems: 'center',
            paddingHorizontal: 25,
            height: 40,
          }}>
          <View
            style={{
              borderRadius: 1000,
              position: 'absolute',
              backgroundColor: '#eeeeee',
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
              borderColor: '#eeeeee',
              borderStyle: 'dashed',
            }}
          />
          <View
            style={{
              position: 'absolute',
              borderRadius: 1000,
              backgroundColor: '#eeeeee',
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
                ? '#f0fcfa'
                : '#ffffff',
            // borderBottomLeftRadius: showContent[index] ? 0 : 20,
            //borderBottomRightRadius: showContent[index] ? 0 : 20,
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
                style={{ ...FONTS.h2, color: '#5C595F', letterSpacing: -0.03 }}>
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
                { length: data?.maxOrderRequired },
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
            <View style={{ gap: 2, alignItems:'center' }}>
              <Text
                style={{
                  ...FONTS.size14m,
                  color: '#cccccc',
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
                    color: '#30D792',
                    lineHeight: 20,
                    marginTop: 5,
                  }}>
                  +{data?.rewardedArt}{' '}
                </Text>
                <Image
                  style={{ height: 22, width: 22 }}
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
                  ? '#f0fcfa'
                  : '#ffffff',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,

              paddingHorizontal: wr * 20,
              paddingVertical: hr * 8,
              justifyContent: 'flex-start',
              gap: 9,
              marginTop: hr * -2,
            }}>
            {data.termsAndConditions.map((term: any, index: any) => (
              <Text style={{ color: 'gray' }} key={index}>
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

  const renderFooter = () => (
    <View style={styles.footerText}>{isLoading && <ActivityIndicator />}</View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>Oops!! No Rewards yet </Text>
      {/* <Button onPress={() => requestAPI()} title='Refresh' /> */}
    </View>
  );

  const {
    data = [],
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }: any = useInfiniteQuery(
    queries.mildstone,
    ({ pageParam = 1 }) =>
      getRequest(
        `${SERVER_BASE_URL}/milestone?userId=${id}&page=${pageParam}&pageSize=${LIMIT}`,
        token,
      ),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === LIMIT ? allPages.length + 1 : undefined;
        return nextPage;
      },
    },
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const [showContent, setShowContent] = useState(
    Array(data.length).fill(false),
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: 20,
          alignItems: 'center',
          paddingHorizontal: wr * 20,
          paddingVertical: Platform.OS === 'android' ? hr * 20 : hr * 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}>
            <Image
              source={
                user?.gender === 'Male'
                  ? images.man
                  : user?.gender === 'Female'
                    ? images.woman
                    : icons.avatar
              }
              style={{
                width: wr * 38,
                height: hr * 38,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,

          alignSelf: 'center',
          width: SIZES.width * 0.92,
          height:
            Platform.OS === 'android' ? SIZES.height - 83 : SIZES.height - 110,
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
            Platform.OS === 'android' ? SIZES.height - 95 : SIZES.height - 123,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#eeeeee',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 20,
          paddingBottom: 50,
          gap: 5,
        }}>
        <View
          style={{
            padding: 0,
            gap: 6,
          }}>
          <Text style={{ ...FONTS.heading, color: 'black', marginBottom: 8 }}>
            Milestone Rewards
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Rewardhtml' as never)}
            style={{
              borderRadius: 15,
              padding: 8,
              borderWidth: 1,
              borderColor: '#DBDBDB',
              position: 'absolute',
              flexDirection: 'row',
              zIndex: 50,
              right: 7,
              shadowColor: '##30D792',
              shadowOffset: { width: 10, height: 1 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 5,
              backgroundColor: '#f0fcfa',
            }}>
            <Image
              style={{ height: 12, width: 12 }}
              source={icons.question}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {isSuccess && (
          <View style={{ flex: 1 }}>
            <CommonFlatlist
              data={data.pages.map((page: any) => page).flat()}
              renderItem={renderItem}
              ItemSeparatorComponent={renderSeparator}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmpty}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              keyExtractor={(item: any) => `${item.id}`}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Reward;

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
    marginVertical: hr * 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
