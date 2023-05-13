import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MialNavigation } from '../../../../navigation/MailNavigation'
import { SIZES, FONTS, images, icons } from '../../../../constants'
import { FlatList } from 'react-native-gesture-handler'
import { CommonFlatlist } from '../../../../components/flatlist';
import Svg, { Path } from 'react-native-svg'
import { searchEnum } from '../search/search.enum'
import { useNavigation } from '@react-navigation/native'
import { rewardJson } from '../../data/rewardJson'
import { trendingJson } from '../../data/trendingJson'

const Reward = () => {
    const navigation = useNavigation()

    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)

    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [isLoading, setLoading] = useState(false);





    useEffect(() => {
        setData(rewardJson)
    }, [rewardJson])

    const fetchMoreData = () => {
        setPage(page + 1)
    }

    const renderItem = ({ item: reward }: any) => {

        return (
            <View>
                <View

                    style={{
                        backgroundColor: '#ffffff',
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
                                        source={reward.icon}
                                        style={{
                                            width: 58,
                                            height: 58,
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
                                            {reward.name}</Text>
                                        <Text style={{ ...FONTS.size14b, color: '#30D792', lineHeight: 16, letterSpacing: -0.03 }}>
                                            + {reward.reward} ART</Text>
                                    </View>

                                    <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>
                                        {reward.discount} </Text>
                                </View>

                            </View>

                        </View>



                    </View>
                </View>

                {/* dotted line */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: "#ffffff",
                    alignItems: 'center',
                    paddingHorizontal: 25,
                    height: 40,
                }}>
                    <View style={{
                        borderRadius: 1000,
                        position: 'absolute',
                        backgroundColor: '#eeeeee',
                        width: 40,
                        height: '50%',
                        left: -20,
                        zIndex: 1000
                    }} />
                    <View style={{
                        flex: 1,
                        width: '100%',
                        borderWidth: 1.5,
                        borderColor: '#eeeeee',
                        borderStyle: 'dashed',
                    }} />
                    <View style={{
                        position: 'absolute',
                        borderRadius: 1000,
                        backgroundColor: '#eeeeee',
                        width: 40,
                        height: '50%',
                        right: -20,
                        zIndex: 1000
                    }} />
                </View>
                {/* dotted line */}

                <View
                    style={{
                        backgroundColor: '#ffffff',
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        height: reward && reward.level === reward.maxLevel ? 100 : 70,
                        paddingHorizontal: 20,
                        paddingVertical: reward && reward.level === reward.maxLevel ? 0 : 5,
                        justifyContent: 'flex-start',
                        gap: 9
                    }}>

                    {reward && reward.level === reward.maxLevel ? (
                        <View style={{
                            flexDirection: 'row',
                            gap: 17,
                            alignItems: 'center',
                            width: '100%'
                        }}>

                            <Image
                                source={images.qr}
                                style={{
                                    width: 65,
                                    height: 65
                                }} />

                            <Text style={{ ...FONTS.h2, color: '#5C595F', letterSpacing: -0.03}}>{reward.qrCode}</Text>

                        </View>
                    ) :
                        (
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: 5 }}>
                                {Array.from({ length: reward.maxLevel }, (_, i) => i + 1).map((x) => {
                                    const fill = x <= reward.level ? images.gstar : images.estar;
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

                    <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>Valid upto  {reward.expiry}</Text>

                </View>
            </View>


        )
    }



    const renderSeparator = () => <View style={{
        padding: 8
    }} />;

    const renderFooter = () => (
        <View style={styles.footerText}>
            {isLoading && <ActivityIndicator />}
        </View>
    )

    const renderEmpty = () => (
        <View style={styles.emptyText}>
            <Text>No Data at the moment</Text>
            {/* <Button onPress={() => requestAPI()} title='Refresh' /> */}
        </View>
    )


    return (
        <View style={styles.container}>

            <View style={{ flexDirection: "row", justifyContent: 'flex-end', gap: 20, alignItems: 'center', padding: 20 }}>


                
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
                                width: wr*38,
                                height: hr*38
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
                    height: (SIZES.height - 83),
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
                    height: (SIZES.height - 95),
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: '#eeeeee',
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 20,
                    paddingBottom: 50,
                    gap: 5

                }}
            >

                <View style={{
                    padding: 0,
                    gap: 6,
                }}>

                    <Text style={{ ...FONTS.heading, color: 'black' }}>Milestone Rewards</Text>

                </View>


                <CommonFlatlist
                    data={data}

                    renderItem={renderItem}
                    ItemSeparatorComponent={renderSeparator}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={fetchMoreData}
                />
            </View>


        </View>
    )
}

export default Reward

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
    }
})