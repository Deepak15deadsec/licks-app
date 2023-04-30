import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MialNavigation } from '../../../../navigation/MailNavigation'
import { SIZES, FONTS, images } from '../../../../constants'
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
                        backgroundColor: '#F3E182',
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
                                  onPress={() => navigation.navigate('Detail' as never, { id: reward.advertiser_id } as never)}
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
                    backgroundColor: "#F3E182",
                    alignItems: 'center',
                    paddingHorizontal: 25,
                    height: 40,
                }}>
                    <View style={{
                        borderRadius: 1000,
                        position: 'absolute',
                        backgroundColor: '#fff',
                        width: 40,
                        height: '100%',
                        left: -20,
                        zIndex: 1000
                    }} />
                    <View style={{
                        flex: 1,
                        width: '100%',
                        borderWidth: 0.5,
                        borderColor: '#fff',
                        borderStyle: 'dashed',
                    }} />
                    <View style={{
                        position: 'absolute',
                        borderRadius: 1000,
                        backgroundColor: '#fff',
                        width: 40,
                        height: '100%',
                        right: -20,
                        zIndex: 1000
                    }} />
                </View>
                {/* dotted line */}

                <View
                    style={{
                        backgroundColor: '#F3E182',
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        height: reward && reward.level === reward.maxLevel ? 100 : 70,
                        paddingHorizontal: 20,
                        paddingVertical: reward && reward.level === reward.maxLevel ? 0 : 5,
                        alignItems: 'center',
                        gap: 9
                    }}>

                    {reward && reward.level === reward.maxLevel ? (
                        <View style={{
                            flexDirection:'row',
                            gap:17,
                            alignItems:'center',
                            width: '100%' 
                        }}>

                            <Image
                                source={images.qr}
                                style={{
                                    width: 65,
                                    height: 65
                                }} />

                            <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>{reward.qrCode}</Text>

                        </View>
                    ) :
                        (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                {Array.from({ length: reward.maxLevel }, (_, i) => i + 1).map((x) => {
                                    return (
                                        <View key={x} style={{
                                            width: 25,
                                            height: 25,
                                            backgroundColor: x <= reward.level ? '#30D792' : '#D9D9D9'
                                        }} />
                                    )
                                })}
                            </View>
                        )
                    }

                    <Text style={{ ...FONTS.size14m, color: '#5C595F', letterSpacing: -0.03 }}>Valid upto : {reward.expiry}</Text>

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


            <View style={{ flexDirection: "row", alignItems: 'center', gap: 20, padding: 20 }}>


            </View>


            <View
                style={{
                    position: 'absolute',
                    bottom: 0,

                    alignSelf: 'center',
                    width: SIZES.width * 0.92,
                    height: hr * (SIZES.height - 20),
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
                    height: hr * (SIZES.height - 30),
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: '#FFFFFF',
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