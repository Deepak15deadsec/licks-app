import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
            marginTop: 10,
            marginBottom: 50,
        }}>

            <View
                style={{
                    gap: 15
                }}
            >
                <Text style={{
                    ...FONTS.orbit,
                    color: "gray"
                }}>Simplifying{'\n'}Credit</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        gap: 2
                    }}>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Image style={{ height: 15, width: 15 }} source={images.sparkle} resizeMode='contain' />
                        <Text style={{
                            ...FONTS.label,
                            color: "gray"
                        }}>Personalised</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Image style={{ height: 15, width: 15 }} source={images.sparkle} resizeMode='contain' />
                        <Text style={{
                            ...FONTS.label,
                            color: "gray"
                        }}>Secure</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Image style={{ height: 15, width: 15 }} source={images.sparkle} resizeMode='contain' />
                        <Text style={{
                            ...FONTS.label,
                            color: "gray"
                        }}>Rewarding</Text>
                    </View>

                </View>

            </View>




            <View
                style={{
                    borderRadius: 50,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                    position: 'absolute',
                    flexDirection: 'row',
                    top: 17,
                    right: 7,
                    marginTop: -6,
                    marginRight: -20
                }}>
                <Image style={{ height: 85, width: 85 }} source={images.orbit} resizeMode='contain' />
            </View>


        </View>

    )
}

export default Orbit

const styles = StyleSheet.create({})