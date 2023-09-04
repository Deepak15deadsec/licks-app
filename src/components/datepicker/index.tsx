import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FONTS, SIZES } from '../../constants';



let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const DatePicker = (props: any) => {
    const [show, setShow] = useState(false);
    //console.log("props",props)

    return (
        <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#30D792',
                height: hr * 63,
                paddingLeft: wr * 15,
                paddingRight: wr * 15,
                paddingTop: hr * 10,
                paddingBottom: hr * 10

            }}>

            <Text style={{
                ...FONTS.label,
                color: 'black',
                marginLeft: wr * 5,
                position: 'absolute',
                left: wr * 15,
                top: hr * 10
            }}>
                {props.label}
            </Text>

            <View
                style={{
                    marginTop: hr * 22,
                    marginLeft: wr * 4
                }}
            >
                {props.value ?
                    <Text style={{ ...FONTS.paragraph, color: '#4E656F' }}>{props.value != null ? props.value : null}</Text>
                    : <Text style={{ ...FONTS.paragraph, color: '#00000080' }}>{props.placeholder}</Text>
                    
                }

            </View>


            {/* <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={(value) => {
                    props.onchangeHandler(value, "dob")
                    setShow(!show)
                }}
                onCancel={() => setShow(!show)}

            /> */}



        </TouchableOpacity>
    )
}

export default DatePicker

const styles = StyleSheet.create({})