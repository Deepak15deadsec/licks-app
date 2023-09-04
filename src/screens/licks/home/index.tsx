import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'

import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { FONTS, images, SIZES } from '../../../constants';


const Home = () => {
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
                gap:50,
                marginTop:hr* -70
            }}>
                <Image style={{ height: hr * 161, width: wr * 286, }} source={images.image5} resizeMode='contain' />
                <Text  style={{ color:'#9FA0A5', textAlign:'left', paddingHorizontal:50,fontSize: 12,fontWeight:'500',lineHeight: 22.4,  }}><Text style={{color:'#A259FF'}}>Pick a lick:</Text> select your creator and buy a unique collectible to join the community</Text>
                <Image style={{ height: hr * 291, width: wr * 305, }} source={images.image6} resizeMode='contain' />
            </View>


        </View>

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: '#0F111E'
    }
})