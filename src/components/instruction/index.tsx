import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants'

const Instruction = ({ title, points }: { title: string, points: [] }) => {
    return (
        <View
            style={{
                paddingLeft: 20, paddingRight: 20, borderRadius: 8,
                borderWidth: 1,
                borderColor: '#30D792',
                padding: 12,
                gap: 6
            }}
        >
            <Text
                style={{
                    ...FONTS.heading, lineHeight: 20, color: 'black'
                }}
            >
                {title}

            </Text>

            <View
                style={{
                    gap: 4
                }}
            >
                {points.map((point: string, index: number) => {
                    return (
                        <Text
                            style={{
                                ...FONTS.size12s,textAlign:'justify', lineHeight: 20, color: 'black'
                            }}
                        >
                            {index + 1}. {point}

                        </Text>
                    )
                })}
            </View>
        </View>
    )
}

export default Instruction

const styles = StyleSheet.create({})