import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'

const Card = () => {
    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)
    return (

        <View style={{
            backgroundColor: "#E7EEED",
            borderRadius: 10,
            height: hr * 65,
            paddingLeft: wr * 8,
            paddingRight: wr * 8,
            paddingTop: hr * 25,
            paddingBottom: hr * 20,
            gap: 4,
            alignContent: 'center',
            marginTop: 10
        }}>


            <Text style={{
                ...FONTS.label,
                color: COLORS.darker
            }}>complete your profile</Text>



            <TouchableOpacity
                style={{
                    borderRadius: 15,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                    position: 'absolute', 
                    flexDirection: 'row', 
                    top: 17,
                    right: 7,
                     backgroundColor: '#333333'
                }}>
                <Text style={{ ...FONTS.label, color: '#ffffff' }}> Update</Text>
            </TouchableOpacity>


        </View>

    )
}

export default Card

const styles = StyleSheet.create({})