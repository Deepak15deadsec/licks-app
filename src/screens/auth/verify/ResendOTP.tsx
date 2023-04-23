import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons, SIZES, FONTS } from '../../../constants'

interface Props {
    onPress:any
}

const ResendOTP = (props:Props) => {
    return (
        <TouchableOpacity
            style={{ marginTop: 40, justifyContent:'center', alignSelf:'center' }}
            onPress={props.onPress}
        >
            <Text
                style={{
                    ...FONTS.paragraph,
                    color: '#30D792'
                }}
            >Resend verification code</Text>
        </TouchableOpacity>
    )
}

export default ResendOTP

const styles = StyleSheet.create({})