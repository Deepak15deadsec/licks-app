import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, useColorScheme, ScrollView, KeyboardAvoidingView, Platform, FlatList, Alert, Button, Keyboard, ActivityIndicator, Dimensions, TouchableWithoutFeedback } from 'react-native'
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
import Svg, { Path } from 'react-native-svg';

const Discount = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const navigation = useNavigation()
    const [input, setInput] = useState<any>({
        query: ""
    })
    const [query, setQuery] = useState('');
    const user = useStoreState((store) => store.user)
    const is_keyboard_enabled = useKeyboard()
    const [isLoading, setLoading] = useState(false);

    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)
    //const query = useStoreState(store => store.query);
    const { id, token } = useAuth();
    const theme = useColorScheme();

    //const [data, setData] = useState<any[]>([])
    const handleScratch = (index: number) => {
        setScratchedArray(prevState => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
      };

 
    const [page, setPage] = useState(1)
    const [dataa, setDataa] = useState([])

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${SERVER_BASE_URL}/elastic/_list?index=discounts&limit=10`,
                {
                    method: 'get',
                    headers: {
                        Authorization:
                            `Bearer ${token}`, // Replace with your actual access token
                    },
                }
            );
            const data = await response.json();
           // console.log('data', data);
            setDataa(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, []);

    const [isScratchedArray, setScratchedArray] = useState<boolean[]>([]);

    const handleInputChange = (value: string, name: string) => {
        setInput({ ...input, [name]: value })

    };

    //flatlist components
    const renderItem = ({ item: data, index }: any) => {

        const dateString = data?.ends_at;
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        const sentence = data.type.join(' ');
        const subtext = sentence;
        const maxLength = 55;
        let truncatedText = subtext.slice(0, maxLength);
        if (subtext.length > maxLength) {
          truncatedText += '...';
        }
        return (
            <View style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20,  borderWidth: 1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderStyle: 'dashed', }}>
                <View
                    key={index}
                    style={{
                        backgroundColor: '#fff',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        height: 85,
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
                                            uri: data?.brand?.images[0],
                                        }}
                                        style={{
                                            width: wr * 38,
                                            height: hr * 38,
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
                                            {data?.brand.name}</Text>


                                    </View>


                                    <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>
                                        {truncatedText} </Text>

                                    <TouchableWithoutFeedback onPress={() => handleScratch(index)}>
                                        <View style={styles.coupon}>
                                            {isScratchedArray[index] ? (
                                                <Text style={styles.revealedText}> {data?.discountCodes[0].code}</Text>
                                            ) : (
                                                <Text style={styles.scratchText}>Touch to reveal coupon</Text>
                                            )}
                                        </View>
                                    </TouchableWithoutFeedback>
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
                        zIndex: 1000,
                        borderStyle: 'dashed',
                        borderWidth: 1,
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
                        zIndex: 1000,
                        borderStyle: 'dashed',
                        borderWidth: 1,
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

            {/* <View style={{ flexDirection: "row", justifyContent: 'flex-end', gap: 20, alignItems: 'center', padding: 20 }}>
                <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg>

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
            </View> */}

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    paddingTop: Platform.OS === 'android' ? hr * 30 : hr * 50,
                    paddingBottom: 30,
                    paddingLeft: 25,
                    paddingRight: 25,
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

                    <Text style={{ ...FONTS.heading, color: 'black' }}>Discounts</Text>



                </View>


                {/* search */}
                <View style={{
                    flex: 1,
                    marginTop: 20,
                }}>
                    {isLoading ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <ActivityIndicator size={100} color="red" />

                        </View>

                    ) : (
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

                    )}
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
    coupon: {

        backgroundColor: '#fff',
       
        borderRadius: 10,
    },
    scratchText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        marginVertical: 0,
        marginHorizontal: 0,
    },
    revealedText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        marginVertical: 0,
        marginHorizontal: 0,
    },
})