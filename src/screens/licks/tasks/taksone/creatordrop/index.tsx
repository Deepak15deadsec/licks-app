import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { images, SIZES } from '../../../../../constants'


const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Creatordrop = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={images.image34} // Replace with your background image source
                style={styles.backgroundImage}
            >
                <View style={{ alignItems: 'center', marginTop: hr * 37 }}>
                    <Text style={{ color: '#E7E7E9', fontSize: 28, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>
                </View>
                <View style={styles.contentContainer}>

                    <View style={styles.innerContent}>
                        <Text style={styles.heading}>DROPPED!</Text>

                        <Text style={styles.sideTitle}>Limited edition kicks from PUMA. If you’re already a Licks holder then you have a chance to earn this drop it for free.</Text>
                        <Text style={styles.sideTitle}>ELIGIBILITY</Text>

                        <View style={styles.pointsContainer}>
                            <Text style={styles.point}>• You have at least 10K Insta followers or Twitter followers</Text>
                            <Text style={styles.point}>• Your average engagement per tweet/post is over 20% of your followers.</Text>
                        </View>

                        <Text style={styles.sideTitle}>TASK</Text>

                        <View style={styles.pointsContainer}>
                            <Text style={styles.point}>• Follow PUMA on Insta & Twitter</Text>
                            <Text style={styles.point}>• Share our latest reel & Tweet on your social handles</Text>
                            <Text style={styles.point}>• Take a selfie and geo-tag it to the nearest PUMA store to you</Text>
                        </View>
                    </View>

                </View>
                <TouchableOpacity style={{
                    width: 270, marginTop:hr*50,
                    height: 46, backgroundColor: '#272935', borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 10, paddingLeft:4,
                }}>
                    <TouchableOpacity style={{
                        width: wr*130,
                        height: hr*40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#A259FF',
                       
                    }}>
                        <Text style={{color:'white'}}>
                        Let’s Do It
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>Join without Licks</Text>
                </TouchableOpacity>


            </ImageBackground>
        </View>
    )
}

export default Creatordrop

const styles = StyleSheet.create({
    container: {
         //flex: 1,
        height: SIZES.height,
        width: SIZES.width,


    },
    backgroundImage: {
flex:1,
        resizeMode: 'contain', // or 'contain' or 'stretch' as needed
        justifyContent: 'center', // or 'flex-start' or 'flex-end' or 'space-between' or 'space-around'
      paddingHorizontal:wr*50,
        gap:30
    },

    contentContainer: {
      marginTop:hr*50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent white background
    },
    blurContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent white background
        padding: 20,
        borderRadius: 10,
    },
    innerContent: {
        padding: 20,
        justifyContent: 'center',

    },
    heading: {
        fontsize: 12,
        fontWeight: '500',
        marginBottom: hr*10,
        color: 'gray',
        alignSelf:'center',
    },
    sideTitle: {
        fontsize: 12,
        color: 'gray',
        marginRight: wr*5,
        fontWeight: '500',
    },
    pointsContainer: {

    },
    point: {
        fontsize: 12,
        marginBottom: hr*5,
        fontWeight: '500',
        color: 'gray',
    },
})