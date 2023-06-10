import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import { useNavigation } from '@react-navigation/native';


let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const UpdateCard = () => {
    const navigation = useNavigation()
    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)
    return (

        <View style={{
            backgroundColor: "#E7EEED",
            borderRadius: 10,
            height: hr * 85,
            paddingLeft: wr * 15,
            paddingRight: wr * 15,
            paddingTop: hr * 25,
            paddingBottom: hr * 20,
            gap: 4,
            alignContent: 'center',
            marginTop: hr * 10
        }}>



            <View style={{ gap: 5 }}>
                <Text style={{
                    ...FONTS.label,
                    color: COLORS.darker
                }}>complete your profile</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: -2, marginTop: -4 }}>
                    <Text style={{ ...FONTS.size20s, color: '#333333', lineHeight: 20, marginTop: 5 }}>
                        +30 </Text>
                    <Image style={{ height: 22, width: 22 }} source={icons.coin} resizeMode='contain' />
                </View>

            </View>



            <TouchableOpacity
                onPress={() => navigation.navigate('Profile' as never)}
                style={{
                    borderRadius: 15,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                    position: 'absolute',
                    flexDirection: 'row',
                    top: hr * 26,
                    right: wr * 10,
                    backgroundColor: '#333333'
                }}>
                <Text style={{ ...FONTS.label, color: '#ffffff' }}> Update</Text>
            </TouchableOpacity>


        </View>

    )
}

export default UpdateCard

const styles = StyleSheet.create({})