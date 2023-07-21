import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, useColorScheme, ScrollView, KeyboardAvoidingView, Platform, FlatList, Alert, Button, Keyboard, ActivityIndicator, Dimensions } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../../../constants';
import { useStoreState } from '../../../../store/easy-peasy/hooks';
import { useKeyboard } from '../../../../utils/useKeyboard';
import { useNavigation } from '@react-navigation/native';
import { CommonFlatlist } from '../../../../components/flatlist';
import { useAuth } from '../../../../hooks/auth';
import { getRequest, queries } from '../../../../react-query';
import { useQuery } from 'react-query';

//@ts-ignore
import { SERVER_BASE_URL } from '@env';
import axios from 'axios';



const Discount = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const navigation = useNavigation()
    const [input, setInput] = useState<any>({
        query: ""
    })
    const [query, setQuery] = useState('');
    const user = useStoreState((store) => store.user)
    const is_keyboard_enabled = useKeyboard()



    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)
    //const query = useStoreState(store => store.query);
    const { id, token } = useAuth();
    const theme = useColorScheme();

    //const [data, setData] = useState<any[]>([])

    const [page, setPage] = useState(1)
    const [dataa, setDataa] = useState([])

    const fetchSearchResults = async () => {
        try {
            const response = await fetch(
                'https://adsapi.avniads.com/discount/shopify?limit=10',
                {
                    method: 'get',
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzIyYThhNS1kNzU5LTRjMzEtODU1Mi0yODUyYTM4NjAwYzUiLCJlbWFpbCI6InB2YWxsYXRAZ21haWwuY29tIiwiaWF0IjoxNjg5ODM1MTg4LCJleHAiOjE2ODk5MjE1ODh9.ewAkiLG3Zm-l0dj74biI5gUWMXdGfWylPjPs-7BXlBQ', // Replace with your actual access token
                    },
                }
            );
            const data = await response.json();
            //console.log('data', data);
            setDataa(data.discounts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, []);

    const handleInputChange = (value: string, name: string) => {
        setInput({ ...input, [name]: value })

    };

    //flatlist components
    const renderItem = ({ item: data, index }: any) => {
        console.log('data', dataa);
        const inputDate = data?.validUpto;
        // const formattedDate = moment(inputDate).format('DD/MM/YYYY');

        const dateString = data?.ends_at;
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
                        backgroundColor: '#fff',
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
                                    {/* <Image
                    source={{
                      uri: data?.brandImage[0],
                    }}
                    style={{
                      width: wr * 58,
                      height: hr * 58,
                    }}
                    resizeMode='contain'
                  /> */}
                                </TouchableOpacity>


                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    gap: 5,


                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ ...FONTS.size14b, color: '#5C595F', lineHeight: 16, letterSpacing: -0.03 }}>
                                            {data?.title}</Text>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                        <Text style={{ ...FONTS.size14b, color: '#30D792', lineHeight: 16, letterSpacing: -0.03 }}>
                                            + {data?.rewardrdArt} </Text>
                                        <Image style={{ height: 16, width: 16 }} source={icons.coin} resizeMode='contain' />
                                    </View> */}

                                    </View>

                                    <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>
                                        {data?.title} </Text>
                                </View>

                            </View>

                        </View>



                    </View>
                </View>

                {/* dotted line */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    paddingHorizontal: 25,
                    height: 40,
                }}>
                    <View style={{
                        borderRadius: 1000,
                        position: 'absolute',
                        backgroundColor: '#eee',
                        width: 40,
                        height: '50%',
                        left: -20,
                        zIndex: 1000
                    }} />
                    <View style={{
                        flex: 1,
                        width: '100%',
                        borderWidth: 1.5,
                        borderColor: '#eee',
                        borderStyle: 'dashed',
                    }} />
                    <View style={{
                        position: 'absolute',
                        borderRadius: 1000,
                        backgroundColor: '#eee',
                        width: 40,
                        height: '50%',
                        right: -20,
                        zIndex: 1000
                    }} />
                </View>
                {/* dotted line */}

                <View
                    style={{
                        backgroundColor: '#fff',
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        height: 60,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        justifyContent: 'flex-start',
                        gap: 9
                    }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                        <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>Valid upto  {formattedDate}</Text>


                    </View>
                    <TouchableOpacity >
                        <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03, marginTop: 0, textDecorationLine: 'underline' }}>
                            Terms & conditions
                        </Text>
                    </TouchableOpacity>



                </View>



            </View>


        )
    }


    const renderSeparator = () => <View style={{
        padding: 8
    }} />;



    const renderEmpty = () => (
        <View style={styles.emptyText}>
            <Text>No Data at the moment</Text>
            {/* <Button onPress={() => requestAPI()} title='Refresh' /> */}
        </View>
    )

    const fetchMoreData = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        //api call
    }, [page])


    return (
        <View
            style={styles.container}>

            <View style={{ flexDirection: "row", justifyContent: 'flex-end', gap: 20, alignItems: 'center', padding: 20 }}>
                <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg> */}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile' as never)}
                    >
                        <Image
                            source={icons.avatar}
                            style={{
                                width: wr * 38,
                                height: hr * 38
                            }}
                            resizeMode='contain'
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
                    height: is_keyboard_enabled ? (SIZES.height - 190) : (SIZES.height - 83),
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
                    height: is_keyboard_enabled ? (SIZES.height - 250) : (SIZES.height - 95),
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: '#eee',
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

                    <Text style={{ ...FONTS.heading, color: 'black' }}>Search</Text>



                </View>


                {/* search */}
                <View style={{
                    flex: 1,
                    marginTop: 20,
                }}>

                    <CommonFlatlist
                        data={dataa}
                        //ListHeaderComponent={renderHeader}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                        //ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmpty}
                        keyExtractor={(item: any) => `${item.id}`}
                        onEndReachedThreshold={0.2}
                        onEndReached={fetchMoreData}
                    />


                </View>

            </View>


        </View>
    )
}

export default Discount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30D792',
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

})