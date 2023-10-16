import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'

import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { FONTS, images, SIZES } from '../../../constants';

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)
const Chat = () => {
    const navigation = useNavigation()

    const [input, setInput] = useState<any>({
        supportCat: "",

    });



    const onchangeHandler = useCallback((value: any, name: string) => {

        setInput((prevState: any) => ({ ...prevState, [name]: value }));

    }, []);

    return (

        <View style={styles.container}>

            <View style={{ alignItems: 'center', marginTop: hr * 20 }}>
                <Text style={{ color: '#E7E7E9', fontSize: 33, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30,
                marginTop: hr * -70
            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: hr * 264, width: wr * 270, }} source={images.image16} resizeMode='contain' />

                </View>


                <Text style={{ color: '#9FA0A5', textAlign: 'left', paddingHorizontal: wr*50, fontSize: 12, fontWeight: '500', lineHeight: 16.8, }}><Text style={{ color: '#A259FF' }}>Handpicked by creators: </Text> Licks Community is a space intended for all things related to a specific creator. These communities are run by Community Leads who are personally selected by the creators.</Text>

                <Text style={{ color: '#9FA0A5', textAlign: 'left', paddingHorizontal: wr*50, fontSize: 12, fontWeight: '500', lineHeight: 16.8, }}> Not only that, the Community Leads organise their own online and offline sessions, treasure hunts, and so on, which truly engaged members of the community stand a chance to win.</Text>

                <TouchableOpacity style={[styles.button, styles.button1]}>
                    <Text style={styles.buttonText}>Buy Licks</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Community' as never)} style={[styles.button, styles.button2]}>
                    <Text style={styles.buttonText}>Join Without Licks</Text>
                </TouchableOpacity>
            </View>




        </View>

    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: '#0F111E',

    },
    button: {
        width: 130,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    button1: {
        backgroundColor: '#A259FF',
        left: wr * 80, // Adjust this value to control the position of Button 1
        bottom: hr * 100
    },
    button2: {
        backgroundColor: '#272935',
        left: wr * 180, // Adjust this value to control the position of Button 2
        bottom: hr * 100
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13
    },
})