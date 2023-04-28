import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS, icons } from '../../../../../constants'
import { trendingJson } from '../../../data/trendingJson'
import { SharedElement } from 'react-native-shared-element';
import { useNavigation } from '@react-navigation/native';



const Expiring = () => {
    const navigation = useNavigation()

    const renderItem = ({ item: trending }: any) => {
        return (
            <TouchableOpacity 
            onPress={()=>navigation.navigate('Detail' as never, {id : trending.id} as never)}
            style={{
                flexDirection: 'column',
            }}>
                {/* @ts-ignore */}
                <SharedElement id={`banner${trending.id}`}>
                    <Image
                        source={trending.banner}
                        style={{
                            width: 231,
                            height: 138
                        }}
                        resizeMode='contain'
                    />
                </SharedElement>

                <View
                    style={{
                        marginTop: 10,
                        marginBottom: 62,
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
                                source={trending.icon}
                                style={{
                                    width: 23,
                                    height: 23
                                }}
                                resizeMode='contain'
                            />

                            <Text style={{ ...FONTS.category, color: '#000000' }}>
                                {trending.name}</Text>

                        </View>

                        <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                            {trending.expire}</Text>

                    </View>

                    <View>
                        <Text style={{ ...FONTS.size12s, color: '#5C595F', marginRight: 3 }}>
                            {trending.price}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            marginTop: 30
        }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Expiring Soon</Text>
                <TouchableOpacity
                    style={{
                        borderRadius: 9,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#DBDBDB'
                    }}>
                    <Text style={{ ...FONTS.label, color: '#5C595F' }}> View All</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                gap: 12,
                marginTop: 20
            }}>
                <FlatList
                    style={{ flexGrow: 0 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 0 }}
                    data={trendingJson}
                    renderItem={renderItem}
                    nestedScrollEnabled={true}
                    keyExtractor={item => `${item.id}`}
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    width: 20
                                }} />
                        );
                    }}
                />


            </View>
        </View>
    )
}

export default Expiring

const styles = StyleSheet.create({})