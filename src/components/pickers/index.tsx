import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, } from 'react'
import { Picker } from '@react-native-picker/picker';
import { FONTS } from '../../constants';

interface Gender {
    label: string
    value: string
}


const MainPicker = (props: any) => {
    const { gendersTypes } = props



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

            {/* <Picker
                {...props}
                style={{
                    marginTop: 7,
                    marginLeft: -9,
                    ...FONTS.paragraph,
                    color: '#4E656F',

                }}>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker> */}


            {gendersTypes.length > 0 && (
                <Picker
                    {...props}
                    style={{
                        marginTop: 7,
                        marginLeft: -9,
                        ...FONTS.paragraph,
                        color: '#4E656F',

                    }}

                >
                    {
                        gendersTypes.map(({ label, value }: Gender, index:number) => 
                           <Picker.Item key={index} label={label} value={value} />
                        )
                    }
                </Picker>
            )}


        </View>
    )
}

export default MainPicker

const styles = StyleSheet.create({})