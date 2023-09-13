import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { images, SIZES } from '../../../../constants'

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Postcard = ({ title, description, image }: { description: string, title: string, image: any }) => {
    return (
        <View style={{
            flexDirection: 'row', // Arrange children in a row
            alignItems: 'center', // Vertically align children
         
            backgroundColor: 'transparent',
            borderRadius: 10,
            
            gap: 10
        }}>
            <View style={{ backgroundColor: 'red', paddingVertical: 15, paddingHorizontal: 15 }}>
                <Image source={image} style={styles.image} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.price}>{description}</Text>
            </View>
        </View>
    )
}

export default Postcard

const styles = StyleSheet.create({

    infoContainer: {

        marginRight: wr*80, // Add some space between image and text
    },
    name: {
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 2,
        color: '#A259FF',

    },
    price: {
        fontSize: 12,
        color: '#9FA0A5',
        fontWeight: '400'
    },
    image: {
        width: 43, // Set the width of the circular image
        height: 43, // Set the height of the circular image
        borderRadius: 40, // Make the image circular (half of width/height),

    },

});