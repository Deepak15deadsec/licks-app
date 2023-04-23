import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { FONTS, icons } from '../../../../constants'
import { categoriesJson } from './categoriesData'

const Categories = () => {



    return (
        <View style={{
            marginTop: 30,

        }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Categories</Text>
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
                marginTop: 20,
                flexDirection: 'row',
                flex: 1,
                justifyContent:'space-between',
                flexWrap: 'wrap',
                rowGap: 12
            }}>
                {categoriesJson?.map((category, index) => {
                    return (
                        <View key={index} style={{
                            width: '47%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap:8,
                            //backgroundColor:'red'
                        }}>
                            <Image
                                source={category.icon}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                                resizeMode='contain'
                            />
                            <Text style={{ ...FONTS.category, color: '#5C595F' }}>{category.name}</Text>
                        </View>


                    )
                })}
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({})