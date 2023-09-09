import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { images } from '../../../../constants'

const Circle = ({ title, data }: { data: string, title: string }) => {
    return (
        <View style={{
            flexDirection: 'row', // Arrange children in a row
            alignItems: 'center', // Vertically align children
            padding: 10,
            backgroundColor: 'transparent',
            borderRadius: 10,
            marginBottom: 10,
            elevation: 2, // Add shadow on Android
            shadowColor: '#000', // Add shadow on iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        }}>

            <Image source={images.image1} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.price}>{data}</Text>
            </View>
        </View>
    )
}

export default Circle

const styles = StyleSheet.create({

    infoContainer: {
       
        marginRight: 10, // Add some space between image and text
    },
    name: {
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 5,
        color: '#9FA0A5',

    },
    price: {
        fontSize: 16,
        color: '#E7E7E9',
        fontWeight: '600'
    },
    image: {
        width: 43, // Set the width of the circular image
        height: 43, // Set the height of the circular image
        borderRadius: 40, // Make the image circular (half of width/height)
    },

});