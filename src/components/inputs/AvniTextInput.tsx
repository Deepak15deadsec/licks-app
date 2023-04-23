import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { icons, SIZES, FONTS } from '../../constants'




const AvniTextInput = (props: any) => {
    return (

        <View style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#30D792',
            height: 63,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10

        }}>
            <Text style={{
                ...FONTS.label,
                color: 'black',
                marginLeft: 5,
                position: 'absolute',
                left: 15,
                top: 10
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
                    height: 45
                }}
            />

        </View>



    )
}

export default AvniTextInput

const styles = StyleSheet.create({})