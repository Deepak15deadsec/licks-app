import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Box = ({ color, title }: { color: string, title: string }) => {
    return (
        <View style={[styles.square, { backgroundColor: color }]}>
            <Text style={{
                color: '#E7E7E9', // You can change the text color
                fontSize: 12,   // You can adjust the font size
                fontWeight: '700',
            }}>{title}</Text>
        </View>
    )
}

export default Box

const styles = StyleSheet.create({

    square: {
        width: 91, // Adjust the size of the square as needed
        height: 93, // Adjust the size of the square as needed
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 27,
    },

});