import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MialNavigation } from '../../../../navigation/MailNavigation'
import { SIZES, FONTS } from '../../../../constants'

const mail = () => {

    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)


    return (
        <View style={styles.container}>


            <View style={{ flexDirection: "row", alignItems: 'center', gap: 20, padding: 20 }}>


            </View>


            <View
                style={{
                    position: 'absolute',
                    bottom: 0,

                    alignSelf: 'center',
                    width: SIZES.width * 0.92,
                    height: hr * (SIZES.height - 20),
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: '#ffffff80',
                }}
            />



            <View
                style={{
                    position: 'absolute',
                    bottom: 0,

                    width: SIZES.width,
                    height: hr * (SIZES.height - 30),
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: '#FFFFFF',
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 20,
                    paddingBottom: 50,
                    gap:5

                }}
            >

                <View style={{
                    padding: 0,
                    gap: 6,
                }}>

                    <Text style={{ ...FONTS.heading, color: 'black' }}>Mails pv@avniclub.com</Text>

                </View>

                <MialNavigation />
            </View>


        </View>
    )
}

export default mail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30D792'
    }
})