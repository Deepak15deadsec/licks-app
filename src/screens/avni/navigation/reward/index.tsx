import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MialNavigation } from '../../../../navigation/MailNavigation'
import { SIZES, FONTS } from '../../../../constants'
import { FlatList } from 'react-native-gesture-handler'
import { CommonFlatlist } from '../../../../components/flatlist';
import Svg, { Path } from 'react-native-svg'
import { searchEnum } from '../search/search.enum'
import { useNavigation } from '@react-navigation/native'
import { rewardJson } from '../../data/rewardJson'

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
                        flexDirection: 'column',
                        backgroundColor: '#F3E182',
                        borderRadius: 4,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        height: 90,
                        padding: 20,
                        
                    }}>


                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View style={{
                            gap: 3
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5
                            }}>
                                <Image
                                    source={reward.icon}
                                    style={{
                                        width: 23,
                                        height: 23
                                    }}
                                    resizeMode='contain'
                                />

                                <Text style={{ ...FONTS.category, color: '#000000' }}>
                                    Your {reward.name} Receipt</Text>

                            </View>

                            <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                                {reward.domain}</Text>

                        </View>

                        <View>
                            <Text style={{ ...FONTS.size12s, color: '#5C595F', marginRight: 3 }}>
                                {reward.price}</Text>
                        </View>

                    </View>

                </View>

                <View

                    style={{
                        flexDirection: 'column',
                        backgroundColor: '#F3E182',
                        borderRadius: 4,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        height: 90,
                        padding: 20,
                    }}>



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