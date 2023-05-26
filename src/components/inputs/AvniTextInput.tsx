import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { icons, SIZES, FONTS } from '../../constants'


let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)


const AvniTextInput = (props: any) => {
    return (

        <View style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#30D792',
            height: hr*63,
            paddingLeft: wr*15,
            paddingRight: wr*15,
            paddingTop: hr*10,
            paddingBottom: hr*10

        }}>
            <Text style={{
                ...FONTS.label,
                color: 'black',
                marginLeft: 5,
                position: 'absolute',
                left: wr*15,
                top: hr*10
            }}>
                {props.label}
            </Text>
            <TextInput
                {...props}
                placeholderTextColor="#00000080"
                style={{
                    marginTop: 10,
                    ...FONTS.paragraph,
                    color: '#4E656F',
                    height: hr*45
                }}
            />

        </View>



    )
}

export default AvniTextInput

const styles = StyleSheet.create({})