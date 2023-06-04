import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import { useNavigation } from '@react-navigation/native';


let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const InviteCard = () => {
    const navigation = useNavigation()
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
            marginTop: hr*10
        }}>


            <Text style={{
                ...FONTS.label,
                color: COLORS.darker
            }}>Invitee Code</Text>



            <TouchableOpacity
              onPress={() => navigation.navigate('Invitebox' as never)}
                style={{
                    borderRadius: 15,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                    position: 'absolute', 
                    flexDirection: 'row', 
                    top: hr*17,
                    right: wr*7,
                     backgroundColor: '#333333'
                }}>
                <Text style={{ ...FONTS.label, color: '#ffffff' }}> Enter</Text>
            </TouchableOpacity>


        </View>

    )
}

export default InviteCard

const styles = StyleSheet.create({})