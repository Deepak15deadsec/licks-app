import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'

import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { FONTS, images, SIZES } from '../../../../constants';


const Pagetwo = () => {
    const navigation = useNavigation()

    const [input, setInput] = useState<any>({
        supportCat: "",

    });

    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)

    const onchangeHandler = useCallback((value: any, name: string) => {

        setInput((prevState: any) => ({ ...prevState, [name]: value }));

    }, []);

    return (

        <View style={styles.container}>

            <View style={{ alignItems: 'center', marginTop: hr * 37 }}>
                <Text style={{ color: '#E7E7E9', fontSize: 28, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
                marginTop: hr * -70
            }}>
                <Text style={{ color: '#E7E7E9', fontSize: 18, fontWeight: '700', marginBottom: 10 }}>Ranveer</Text>


                <Text style={{ color: '#9FA0A5', textAlign: 'left', paddingHorizontal: 50, fontSize: 12, fontWeight: '500', lineHeight: 16.8, }}><Text style={{ color: '#A259FF' }}>Buy Licks to join the community: </Text>  Watch the video on the home screen to know different attributes of a Lick. Buying Licks of any creator makes you eligible to purchase all limited edition products & experiences on the platform. So, get, set,  <Text style={{ color: '#A259FF' }}>LICK! </Text></Text>



            </View>


        </View>

    )
}

export default Pagetwo

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: '#0F111E',

    }
})