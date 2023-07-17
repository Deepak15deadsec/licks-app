import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, SIZES, FONTS } from '../../../constants'

interface Props {
    onPress:any
}

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const ResendOTP = (props:Props) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const handlePress = () => {
        setButtonDisabled(true);
        props.onPress();
    
        // Disable the button for 30 seconds
        setTimeout(() => {
          setButtonDisabled(false);
        }, 30000);
      };
    return (
        <TouchableOpacity
            style={{ marginTop: hr*30, justifyContent:'center', alignSelf:'center' }}
            onPress={handlePress}
            disabled={isButtonDisabled}
        >
            <Text
                style={{
                    ...FONTS.paragraph,
                    color: isButtonDisabled ? '#CCCCCC' : '#30D792',
                }}
            >Resend verification code</Text>
        </TouchableOpacity>
    )
}

export default ResendOTP

const styles = StyleSheet.create({})