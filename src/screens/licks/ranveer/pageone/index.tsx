import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'

import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { FONTS, images, SIZES } from '../../../../constants';

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Pageone = () => {
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
                gap: 50,
                marginTop:hr* -70
            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: hr * 161, width: wr * 286, }} source={images.image8} resizeMode='contain' />
                    <Text style={{
                        position: 'absolute',
                        textAlign: 'center',

                        fontSize: 18, // Set the font size for the text
                        color: 'white', // Set the text color

                        padding: 10,
                    }}>Hey, it’s me Ravs!</Text>
                </View>


                <Text style={{ color: '#9FA0A5', textAlign: 'left', paddingHorizontal: 50, fontSize: 12, fontWeight: '500', lineHeight: 16.8, }}><Text style={{ color: '#A259FF' }}>Welcome to all things me: </Text> Every Lick you find here is personally curated by me, capturing my many moods and ideas. When you buy these, you will be part of my exclusive club and gain access to the many limited edition projects that I will be launching from time to time. Become part of my world like it was never possible before.</Text>

                <View style={{ flexDirection: 'row', gap: 30 }}>
                    <Image style={{ height: hr * 117, width: wr * 127, }} source={images.screenshot1} resizeMode='contain' />
                    <View
                        style={{
                            borderLeftWidth: 1,
                            borderLeftColor: '#cccccc',
                            height: hr * 108,
                            // To make the line appear seamless
                            // To make the line appear seamless
                        }}
                    ></View>
                    <Image style={{ height: hr * 117, width: wr * 127, }} source={images.screenshot2} resizeMode='contain' />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Pagethree' as never)} style={[styles.button, styles.button1]}>
                    <Text style={styles.buttonText}>View Licks</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.button2]}>
                    <Text style={styles.buttonText}>Upcoming Drops</Text>
                </TouchableOpacity>

            </View>


        </View>

    )
}

export default Pageone

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