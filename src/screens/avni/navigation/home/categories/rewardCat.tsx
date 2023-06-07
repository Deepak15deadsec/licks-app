import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, icons, images, SIZES } from '../../../../../constants'
import QRCode from 'react-native-qrcode-svg'
import { CommonFlatlist } from '../../../../../components/flatlist'
import { useStoreActions, useStoreState } from '../../../../../store/easy-peasy/hooks';
import { useNavigation } from '@react-navigation/native'
import { Clipboard } from '@react-native-clipboard/clipboard/dist/Clipboard';
import LottieView from 'lottie-react-native'

//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import axios from 'axios';
import moment from 'moment'
import Svg, { Path } from 'react-native-svg'

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const CatReward = ({ route: { params: { name } } }: { route: { params: { name: string } } }) => {
  const navigation = useNavigation()
  const user = useStoreState((store) => store.user)
  const [isCopied, setIsCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setLoading] = useState(false);


  const [showContent, setShowContent] = useState(Array(data.length).fill(false));

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };


  const fetchData = async (token: any) => {
    setLoading(true);

    try {

      const { data } = await axios({
        url: `${SERVER_BASE_URL}/milestone/offers?category=${name}`,
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        cancelToken: token
      });
      //console.log("catname", data)

      setData(data)

    } catch (error) {
      console.log(error)
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

    const dateString = data.updatedAt;
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return (
      <View>
        <View
          key={index}
          style={{
            backgroundColor: data && data?.orderAcheived === data?.maxOrderRequired ? '#00d74f' : '#e1f1e1',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: 70,
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center'
          }}>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

            }}>

            <View style={{
              flex: 1,
              gap: 20,

            }}>

              <View style={{
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
                    resizeMode='contain'
                  />
                </TouchableOpacity>


                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  gap: 5,


                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.size14b, color: '#5C595F', lineHeight: 16, letterSpacing: -0.03 }}>
                      {data?.brandName}</Text>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                        <Text style={{ ...FONTS.size14b, color: '#30D792', lineHeight: 16, letterSpacing: -0.03 }}>
                                            + {data?.rewardrdArt} </Text>
                                        <Image style={{ height: 16, width: 16 }} source={icons.coin} resizeMode='contain' />
                                    </View> */}

                  </View>

                  <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>
                    {data?.offerTitle} </Text>
                </View>

              </View>

            </View>



          </View>
        </View>

        {/* dotted line */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: data && data?.orderAcheived === data?.maxOrderRequired ? '#00d74f' : '#e1f1e1',
          alignItems: 'center',
          paddingHorizontal: 25,
          height: 40,
        }}>
          <View style={{
            borderRadius: 1000,
            position: 'absolute',
            backgroundColor: '#ffffff',
            width: 40,
            height: '50%',
            left: -20,
            zIndex: 1000
          }} />
          <View style={{
            flex: 1,
            width: '100%',
            borderWidth: 1.5,
            borderColor: '#ffffff',
            borderStyle: 'dashed',
          }} />
          <View style={{
            position: 'absolute',
            borderRadius: 1000,
            backgroundColor: '#ffffff',
            width: 40,
            height: '50%',
            right: -20,
            zIndex: 1000
          }} />
        </View>
        {/* dotted line */}

        <View
          style={{
            backgroundColor: data && data?.orderAcheived === data?.maxOrderRequired ? '#00d74f' : '#e1f1e1',
            borderBottomLeftRadius: showContent[index] ? 0 : 20,
            borderBottomRightRadius: showContent[index] ? 0 : 20,
            height: data && data?.orderAcheived === data?.maxOrderRequired ? 135 : 90,
            paddingHorizontal: 20,
            paddingVertical: data && data?.orderAcheived === data?.maxOrderRequired ? 0 : 5,
            justifyContent: 'flex-start',
            gap: 9
          }}>

          {data && data?.orderAcheived === data?.maxOrderRequired ? (
            <View style={{
              flexDirection: 'row',
              gap: 17,
              alignItems: 'center',
              width: '100%'
            }}>

              <QRCode value={`${data?.voucherCode}`} size={52} />

              <Text style={{ ...FONTS.h2, color: '#5C595F', letterSpacing: -0.03 }}>{data?.voucherCode}</Text>

              <TouchableOpacity
                onPress={handleCopy}
              >
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
          ) :
            (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: 5 }}>
                {Array.from({ length: data?.maxOrderRequired }, (_, i) => i + 1).map((x) => {
                  const fill = x <= data?.orderAcheived ? images.gstar : images.estar;
                  return (
                    <Image
                      key={x}
                      source={fill}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                      resizeMode='contain'
                    />
                  )
                })}
              </View>
            )
          }
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: data && data?.orderAcheived === data?.maxOrderRequired ? 20 : 0 }}>
            <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>Valid upto  {formattedDate}</Text>
            <View style={{ gap: 2 }}>
              <Text style={{ ...FONTS.size14m, color: data && data?.orderAcheived === data?.maxOrderRequired ? '#ffffff' : '#333333', lineHeight: 20, marginTop: -5 }}>
                Earn </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: -2, marginTop: -4 }}>
                <Text style={{ ...FONTS.size20s, color: data && data?.orderAcheived === data?.maxOrderRequired ? '#ffffff' : '#333333', lineHeight: 20, marginTop: 5 }}>
                  +{data?.rewardrdArt} </Text>
                <Image style={{ height: 22, width: 22 }} source={icons.coin} resizeMode='contain' />
              </View>
            </View>

          </View>

          <TouchableOpacity onPress={() => handleTextClick(index)}>
            <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03, marginTop: -20, textDecorationLine: 'underline' }}>
              Terms & conditions
            </Text>
          </TouchableOpacity>


        </View>

        {showContent[index] && (<View
          style={{
            backgroundColor: data && data?.orderAcheived === data?.maxOrderRequired ? '#00d74f' : '#fbf5c5',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            paddingHorizontal: 20,
            paddingVertical: 8,
            justifyContent: 'flex-start',
            gap: 9,
            marginTop: -2
          }}
        >
          {data.termsAndConditions.map((term: any, index: any) => (
            <Text key={index}>{index + 1}  {term}</Text>

          ))}

        </View>
        )}

      </View>


    )
  }

  const renderSeparator = () => (
    <View
      style={{
        padding: 8,
      }}
    />
  );


  return (
    <View style={styles.container}>


      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingTop: Platform.OS === 'android' ? hr * 30 : hr * 50,
          paddingBottom: 30,
          paddingLeft: 25,
          paddingRight: 25
        }}
      >
        <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <Path d="M18.7165 6.95109H4.37986L10.6433 1.80561C11.1439 1.39439 11.1439 0.719571 10.6433 0.308354C10.5246 0.210607 10.3835 0.133058 10.2283 0.0801464C10.073 0.0272349 9.90655 0 9.73845 0C9.57035 0 9.40391 0.0272349 9.24864 0.0801464C9.09337 0.133058 8.95233 0.210607 8.83359 0.308354L0.375351 7.25687C0.256366 7.35442 0.161968 7.47028 0.0975606 7.59784C0.0331529 7.72539 0 7.86213 0 8.00022C0 8.13832 0.0331529 8.27505 0.0975606 8.40261C0.161968 8.53016 0.256366 8.64603 0.375351 8.74358L8.83359 15.6921C8.95242 15.7897 9.09349 15.8671 9.24874 15.92C9.404 15.9728 9.5704 16 9.73845 16C9.9065 16 10.0729 15.9728 10.2282 15.92C10.3834 15.8671 10.5245 15.7897 10.6433 15.6921C10.7621 15.5945 10.8564 15.4786 10.9207 15.351C10.985 15.2235 11.0181 15.0868 11.0181 14.9487C11.0181 14.8107 10.985 14.674 10.9207 14.5464C10.8564 14.4189 10.7621 14.303 10.6433 14.2054L4.37986 9.0599H18.7165C19.4224 9.0599 20 8.58542 20 8.0055C20 7.42557 19.4224 6.95109 18.7165 6.95109Z" fill="white" />
        </Svg>
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          bottom: 0,

          alignSelf: 'center',
          width: SIZES.width * 0.92,
          height: Platform.OS === 'android' ? (SIZES.height - 70) : (SIZES.height - 90),
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
          height: Platform.OS === 'android' ? (SIZES.height - 82) : (SIZES.height - 102),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFFFFF',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 20,
          paddingBottom: 50
        }}
      >

        <View style={{
          padding: 0,
          gap: 6,
        }}>

          <Text style={{ ...FONTS.heading, color: 'black' }}>{name} offers</Text>

        </View>
        {isLoading ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    {/* <ActivityIndicator size={100} color="red" /> */}
                    <LottieView source={images.loader} autoPlay loop />

                </View>

            ) : (
        <View style={{
          gap: 12,
          marginTop: 20
        }}>
          <CommonFlatlist
            data={data}
            renderItem={renderItem}
            //ListEmptyComponent={renderEmpty}
            keyExtractor={(item: any) => `${item.id}`}
            ItemSeparatorComponent={renderSeparator}
          />


        </View>
            )}
      </View>
    </View>


  )
}

export default CatReward

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
