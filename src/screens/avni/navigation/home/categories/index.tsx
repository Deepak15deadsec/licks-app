import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { FONTS, icons, SIZES } from '../../../../../constants'
import { categoriesJson } from './categoriesData'
import { useNavigation } from '@react-navigation/native';

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Categories = () => {

    const navigation = useNavigation()

    return (
        <View style={{
            marginTop: 30,

        }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Categories</Text>
                <TouchableOpacity
                     onPress={() => navigation.navigate('Allcategories' as never)}
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
                        <TouchableOpacity key={index}
                        onPress={() => navigation.navigate('Catreward' as never, { name: category?.name } as never)}
                        style={{
                            width: '47%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap:8,
                            //backgroundColor:'red'
                        }}>
                            <View
                             style={{
                                backgroundColor:  "#f0fcfa",
                                borderRadius: 20,
                                justifyContent: 'center',  
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 0.5
                            }}
                            >
                                <Image
                                source={category.icon}
                                style={{
                                    width: wr*28,
                                    height: hr*28
                                }}
                                resizeMode='contain'
                            />
                             </View>
                            
                            <Text style={{ ...FONTS.category, color: '#5C595F' }}>{category.name}</Text>
                        </TouchableOpacity>


                    )
                })}
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({})