import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { icons, SIZES, FONTS } from '../../constants'




const MessageInput = (props: any) => {
    return (

        <View style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#30D792',
            height: 263,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 0,
            paddingBottom: 10,
          

        }}>
            <Text style={{
                ...FONTS.label,
                color: 'black',
                marginTop:8,
                
              
            }}>
                {props.label}
            </Text>
            <TextInput
                {...props}
                placeholderTextColor="#00000080"
                style={{
                    padding:5,
                    marginTop: 5,
                    ...FONTS.paragraph,
                    color: '#4E656F',
                   
                }}
            />

        </View>



    )
}

export default MessageInput

const styles = StyleSheet.create({})