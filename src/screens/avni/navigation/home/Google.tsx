import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import { getUrl } from '../../../../hooks/googleUrl'
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';

const Google = () => {
    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)

    const user = useStoreState((store) => store.user)
   
console.log("easy",user)
    const handleClick = async () => {
        const url = getUrl(user?.phone);
        await Linking.openURL(url);
      };
      
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
            }}>connect your existing mail</Text>



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
                     backgroundColor: '#fff'
                }}
                onPress={handleClick}
                >
                 <Image style={{ height: 22, width: 22 }} source={icons.googleicon} resizeMode='contain' />
            </TouchableOpacity>


        </View>

    )
}

export default Google

const styles = StyleSheet.create({})


