import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../../constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const DatePicker = (props: any) => {
    const [show, setShow] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
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

            <View
                style={{
                    marginTop: 22,
                    marginLeft: 4
                }}
            >
                {props.value ?
                    <Text style={{ ...FONTS.paragraph, color: '#4E656F' }}>{props.value.toISOString().split('T')[0]}</Text>
                    : <Text style={{ ...FONTS.paragraph, color: '#00000080' }}>{props.placeholder}</Text>
                }

            </View>


            <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={(value) => {
                    props.onchangeHandler(value, "dob")
                    setShow(!show)
                }}
                onCancel={() => setShow(!show)}

            />



        </TouchableOpacity>
    )
}

export default DatePicker

const styles = StyleSheet.create({})