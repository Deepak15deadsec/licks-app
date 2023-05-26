import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { COLORS, FONTS, SIZES, icons, TYPES, images } from '../../constants'



const Orbit = () => {
    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)
    return (

        <View style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            height: hr * 120,
            paddingLeft: wr * 8,
            paddingRight: wr * 8,
            paddingTop: hr * 25,
            paddingBottom: hr * 20,
            gap: 4,
            alignContent: 'center',
            marginTop: hr*15,
            marginBottom: Platform.OS === 'android' ? hr*50 :hr*70,
        }}>

            <View
                style={{
                    gap: 15
                }}
            >
                <Text style={{
                    ...FONTS.orbit,
                    color: "#cccccc"
                }}>Simplifying{'\n'}Rewards</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        gap: 5
                    }}>
                    <View
                        style={{
                            flexDirection: 'row'

                        }}
                    >
                        <Image style={{ height: hr*10, width: wr*10, alignSelf:'center' }} source={images.sparkle} resizeMode='contain' />
                        <Text style={{
                            ...FONTS.label,
                            color: "#cccccc",
                            marginLeft:2
                        }}>Offers</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Image style={{ height: hr*10, width: wr*10, alignSelf:'center' }} source={images.sparkle} resizeMode='contain' />
                        <Text style={{
                            ...FONTS.label,
                            color: "#cccccc",
                            marginLeft:2
                        }}>Tokens</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Image style={{ height: hr*10, width: wr*10, alignSelf:'center' }} source={images.sparkle} resizeMode='contain' />
                        <Text style={{
                            ...FONTS.label,
                            color: "#cccccc",
                            marginLeft:2
                        }}>Digital Collectables</Text>
                    </View>

                </View>

            </View>




            <View
                style={{
                    borderRadius: 50,
                    padding: 8,
                    position: 'absolute',
                    flexDirection: 'row',
                    top: hr*0,
                    right: wr*-50,
                    marginTop: hr*-6,
                    marginRight: wr*-20
                    
                }}>
                <Image style={{ height: hr*160, width: wr*160 }} source={images.orbit} resizeMode='contain' />
            </View>


        </View>

    )
}

export default Orbit

const styles = StyleSheet.create({})