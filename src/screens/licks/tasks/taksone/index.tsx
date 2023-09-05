import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'

import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { FONTS, images, SIZES } from '../../../../constants';
import box from './box';
import Box from './box';


const Taskone = () => {
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
                marginTop: hr * -300
            }}>



                <Text style={{ color: '#9FA0A5', textAlign: 'left', paddingHorizontal: 50, fontSize: 12, fontWeight: '500', lineHeight: 16.8, }}><Text style={{ color: '#A259FF' }}>Hey, Nayra:  </Text> you don’t have any tasks, yet. Choose for the tasks you are eligible for below and earn exclusive Drops for free. <Text style={{ color: '#A259FF' }}>Get started.</Text></Text>

                <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Box title="Find a task" color="#4F5EA0" />
                    <Box title="Explore Drops" color="#700E44" />
                    <Box title="Buy LICKS" color="#0CA569" />
                </View>
                <Text style={{ color: 'white', alignSelf:'flex-start',paddingHorizontal:55, fontSize:18, fontWeight:'700' }}>Popular Tasks</Text>
            </View>
         

        </View>

    )
}

export default Taskone

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: '#0F111E',

    }
})