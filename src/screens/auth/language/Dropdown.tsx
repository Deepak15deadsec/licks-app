import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SvgUri } from 'react-native-svg';
import { Languages } from './language'
import { Langauge } from './types'

interface Props {
    language: Langauge,
    onPress: any
}

const Dropdown = (props: Props) => {

    return (
        <View style={{ marginTop: 30 }}>
            {
                Languages.map((language: Langauge, index: number) => {
                    let select = language.code === props.language.code ? true : false

                    
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => props.onPress(language)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height:63,
                                borderRadius: 10,
                                borderWidth: 1,
                                marginBottom: 15,
                                padding:16,
                                borderColor: (select) ? '#30D792' : '#5C595F'
                            }}
                        >
                            <SvgUri
                                uri={language?.image}
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginRight: 20
                                }}

                            />

                            <Text style={{ color: 'black', opacity:0.5 }}>
                                {language?.language}
                            </Text>

                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default Dropdown

const styles = StyleSheet.create({})