import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { icons, SIZES, FONTS } from '../../constants'


let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)


const MessageInput = (props: any) => {
    return (

        <View style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#30D792',
            height: hr*263,
            paddingLeft: wr*15,
            paddingRight: wr*15,
            paddingTop: 0,
            paddingBottom: hr*10,
          

        }}>
            <Text style={{
                ...FONTS.label,
                color: 'black',
                marginTop:hr*8,
                
              
            }}>
                {props.label}
            </Text>
            <TextInput
                {...props}
                placeholderTextColor="#00000080"
                style={{
                    padding:5,
                    marginTop: hr*5,
                    ...FONTS.paragraph,
                    color: '#4E656F',
                   
                }}
            />

        </View>



    )
}

export default MessageInput

const styles = StyleSheet.create({})