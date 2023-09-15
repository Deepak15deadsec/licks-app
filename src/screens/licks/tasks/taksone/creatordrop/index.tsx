import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { images, SIZES } from '../../../../../constants'
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';



const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Creatordrop = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: hr * 57, marginHorizontal: wr * 156, position: 'absolute' }}>

                <Text style={{ color: '#E7E7E9', fontSize: 33, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>

            </View>
            <ImageBackground
                source={images.image34} // Replace with your background image source
                style={styles.backgroundImage}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            paddingTop: Platform.OS === 'android' ? hr * 0 : hr * 0,
                            paddingBottom: hr * 30,
                            paddingLeft: wr * 25,


                        }}
                    >
                        <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                            <Path d="M18.7165 6.95109H4.37986L10.6433 1.80561C11.1439 1.39439 11.1439 0.719571 10.6433 0.308354C10.5246 0.210607 10.3835 0.133058 10.2283 0.0801464C10.073 0.0272349 9.90655 0 9.73845 0C9.57035 0 9.40391 0.0272349 9.24864 0.0801464C9.09337 0.133058 8.95233 0.210607 8.83359 0.308354L0.375351 7.25687C0.256366 7.35442 0.161968 7.47028 0.0975606 7.59784C0.0331529 7.72539 0 7.86213 0 8.00022C0 8.13832 0.0331529 8.27505 0.0975606 8.40261C0.161968 8.53016 0.256366 8.64603 0.375351 8.74358L8.83359 15.6921C8.95242 15.7897 9.09349 15.8671 9.24874 15.92C9.404 15.9728 9.5704 16 9.73845 16C9.9065 16 10.0729 15.9728 10.2282 15.92C10.3834 15.8671 10.5245 15.7897 10.6433 15.6921C10.7621 15.5945 10.8564 15.4786 10.9207 15.351C10.985 15.2235 11.0181 15.0868 11.0181 14.9487C11.0181 14.8107 10.985 14.674 10.9207 14.5464C10.8564 14.4189 10.7621 14.303 10.6433 14.2054L4.37986 9.0599H18.7165C19.4224 9.0599 20 8.58542 20 8.0055C20 7.42557 19.4224 6.95109 18.7165 6.95109Z" fill="white" />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={{
                            paddingTop: Platform.OS === 'android' ? hr * 0 : hr * 0,
                            paddingBottom: hr * 30,
                            paddingLeft: wr * 25,
                            paddingRight: wr * 25,

                        }}
                    >

                        <Svg width="20" height="22" viewBox="0 0 20 16" fill="none">
                            <Path d="M18.5764 15.7289L17.3573 13.7615C17.1013 13.3229 16.8697 12.4933 16.8697 12.0074V9.00886C16.8697 6.22368 15.1874 3.81775 12.7615 2.69183C12.1276 1.60146 10.9573 0.925903 9.61638 0.925903C8.28762 0.925903 7.093 1.62516 6.4591 2.72738C4.08195 3.87701 2.43624 6.25924 2.43624 9.00886V12.0074C2.43624 12.4933 2.20462 13.3229 1.94862 13.7496L0.717384 15.7289C0.229765 16.5229 0.120051 17.4 0.424813 18.2059C0.717384 19 1.41224 19.6163 2.31434 19.9126C4.67929 20.6948 7.16615 21.074 9.65295 21.074C12.1398 21.074 14.6267 20.6948 16.9916 19.9244C17.8449 19.6518 18.5032 19.0237 18.8202 18.2059C19.1371 17.3881 19.0518 16.4874 18.5764 15.7289Z" fill="#E7E7E9" />
                        </Svg>
                    </TouchableOpacity>
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
                    width: 270, marginTop: hr * 50,
                    height: 46, backgroundColor: '#272935', borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 10, paddingLeft: 4,
                }}>
                    <TouchableOpacity style={{
                        width: wr * 130,
                        height: hr * 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#A259FF',

                    }}>
                        <Text style={{ color: 'white' }}>
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
        backgroundColor: '#0F111E',

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain', // or 'contain' or 'stretch' as needed
        justifyContent: 'center', // or 'flex-start' or 'flex-end' or 'space-between' or 'space-around'
        paddingHorizontal: wr * 50,
        gap: 30
    },

    contentContainer: {
        marginTop: hr * 50,
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
        marginBottom: hr * 10,
        color: 'white',
        alignSelf: 'center',
    },
    sideTitle: {
        fontsize: 12,
        color: 'white',
        marginRight: wr * 5,
        fontWeight: '500',
    },
    pointsContainer: {

    },
    point: {
        fontsize: 12,
        marginBottom: hr * 5,
        fontWeight: '500',
        color: 'white',
    },
})