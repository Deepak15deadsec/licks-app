import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import CountryPicker from 'react-native-country-picker-modal'
import { SIZES, FONTS } from '../../../constants'


interface Props {
    detail: any,
    setDetail: any,
    error: {
        phone:boolean
    }
}


let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const PhoneInput = (props: Props) => {

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hr*30,
                height: hr*63,
                borderRadius: 10,
                borderWidth: wr*1,
                marginBottom: hr*15,
                padding: hr*8,
                borderColor: '#30D792'
            }}>

                <CountryPicker
                    withFilter
                    withFlag
                    withCallingCodeButton
                    countryCode={props.detail.countryCode}
                    withCallingCode={true}
                    onSelect={(country) => {
                        props.setDetail({ ...props.detail, ['countryCode']: country.cca2, ['callingCode']: '+'.concat(country.callingCode[0])})
                    }
                    }

                />

                <View style={{
                    height: 40,
                    borderLeftWidth: 1,
                    borderLeftColor: '#DBDBDB',
                    marginLeft: 10,
                }} />

                <TextInput
                    value={props.detail.phone}
                    onChangeText={(text) => props.setDetail({ ...props.detail, ['phone']: text })}
                    placeholder='Enter Your Number'
                    placeholderTextColor="#00000080"
                    keyboardType='numeric'
                    style={{
                        ...FONTS.paragraph,
                        flex: 1,
                        color: '#4E656F',
                        height: hr*63,
                        padding: 10
                    }}
                    maxLength={10}
                />
            </View>
            {props.error.phone && <Text style={{
                color: '#F65C65',
                ...FONTS.size16b,
                letterSpacing: -1.03,
                marginTop: hr*12
            }}>Incorrect phone, please enter the correct phone.</Text>}
        </View>

    )
}

export default PhoneInput