import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../constants'

const CoinCard = () => {
    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)
    return (

        <View style={{
            backgroundColor: "#222831",
            borderRadius: 10,
            height: hr * 97,
            paddingLeft: wr * 8,
            paddingRight: wr * 8,
            paddingTop: hr * 20,
            paddingBottom: hr * 20,
            gap: 4,
            alignContent: 'center',
            marginTop: 15
        }}>


            <Text style={{
                ...FONTS.label,
                color: COLORS.white
            }}>You Have</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ ...FONTS.coin, color: 'white' }}>2,000</Text>
                <Text style={{
                    ...FONTS.label,
                    color: COLORS.white
                }}>Avni</Text>
            </View>


            <View style={{ position: 'absolute', flexDirection: 'row', right: 0 }}>
                {/* <Svg  width="87" height="64" viewBox="0 0 87 64" fill="none">
              <Circle  cx="43.5" cy="20.5" r="43.5" fill="white" fillOpacity="0.14"/>
              </Svg> */}
                <Svg width="78" height="64" viewBox="0 0 78 64" fill="none">
                    <Circle cx="43.5" cy="20.5" r="43.5" fill="white" fillOpacity="0.14" />
                </Svg>
            </View>
        </View>

    )
}

export default CoinCard

const styles = StyleSheet.create({})