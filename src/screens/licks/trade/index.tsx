import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, FlatList, Dimensions } from 'react-native'
import Picker from '../../../components/pickers';
import { rewardJson } from './data';

import Svg, {
    Path,
    Circle,
    Rect
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { FONTS, images, SIZES } from '../../../constants';
import gendersTypes from './gender-types.json';
import { MotiView } from 'moti';

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Trade = () => {
    const navigation = useNavigation()

    const [input, setInput] = useState<any>({
        supportCat: "",

    });



    const onchangeHandler = useCallback((value: any, name: string) => {

        setInput((prevState: any) => ({ ...prevState, [name]: value }));

    }, []);

    // const renderItem = ({ item: rewardJson, index }: any) => {



    //     return (
    //         <View >
    //             <Image
    //                 source={rewardJson.icon} // Replace with your image URL
    //                 style={styles.image}
    //             />
    //             <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
    //                 <Text style={styles.name}>Price</Text>
    //                 <Text style={styles.date}>Rarity</Text>
    //             </View>
    //             <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
    //                 <Text style={styles.name}>{rewardJson.reward}</Text>
    //                 <Text style={styles.date}>{rewardJson.reward}</Text>
    //             </View>
    //         </View>
    //     )
    // }

    const renderItem = ({ item, index }: any) => {
        return (
            <MotiView
                style={styles.listContainer}
                from={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 1000 + index * 200 }}>
                <View style={styles.imageContainer}>
                    <Image source={item.icon} style={styles.image} />
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -10 }}>
                        <Svg width="7" height="7" viewBox="0 0 7 7" fill="none" >
                            <Rect width="7" height="7" rx="3.5" fill="#F5DB6E" />
                        </Svg>
                        <Text style={styles.name}>Price</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15, marginTop: -10 }}>
                        <Svg width="7" height="7" viewBox="0 0 7 7" fill="none" >
                            <Rect width="7" height="7" rx="3.5" fill="#F5DB6E" />
                        </Svg>
                        <Text style={styles.date}>Rarity</Text>
                    </View>


                </View>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.nameText}>{item.reward}</Text>
                    <Text style={styles.priceText}>{item.rd}</Text>
                </View>

                <TouchableWithoutFeedback
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Buy Now!</Text>
                    </View>
                </TouchableWithoutFeedback>
            </MotiView>
        )
    }

    return (

        <View style={styles.container}>

            <View style={{ alignItems: 'center', marginTop: hr * 20 }}>
                <Text style={{ color: '#E7E7E9', fontSize: 28, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',

                gap: 10,
                marginTop: hr * 0,
                marginBottom: hr * 50,
            }}>
                <Text style={{ color: '#E7E7E9', fontSize: 18, fontWeight: '700', marginBottom: hr * 10, alignSelf: 'center', marginTop: hr * 20 }}>Licks Marketplace</Text>


                <Text style={{ color: '#9FA0A5', textAlign: 'left', paddingHorizontal: wr * 50, fontSize: 12, fontWeight: '500', lineHeight: 16.8, }}><Text style={{ color: '#A259FF' }}>Don your trading hats: </Text>   Licks & Drops are not just to add to your collection. Follow the Licks community channel <Text style={{ color: '#A259FF' }}>HERE</Text> and understand how you can profit from trading them on the secondary market.</Text>

                <View style={{ alignSelf: 'flex-end', paddingHorizontal: wr * 30, marginTop: hr * 10 }}>
                    <Picker
                        label="Filter"
                        selectedValue={input.gender}
                        onValueChange={(value: any) => onchangeHandler(value, 'gender')}
                        gendersTypes={gendersTypes}
                    />
                </View>



                <FlatList
                    data={rewardJson}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        // Create a separator component with a gap
                        <View style={{ height: 10 }} /> // Adjust the height as needed
                    )}
                />

            </View>


        </View>

    )
}

export default Trade

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: '#0F111E',

    },
    name: {

        fontSize: 10,
        marginTop: hr * 10,
        color: 'white',
    },
    date: {
        marginTop: hr * 10,
        fontSize: 10,
        color: 'white',
    },

    listContainer: {
        width: Dimensions.get('window').width / 2 - 20,
        backgroundColor: 'transparent',
        margin: 10,
        borderRadius: 20,
    },
    imageContainer: {
        margin: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: { width: '100%', height: undefined, aspectRatio: 1 },
    nameText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 15,
    },
    priceText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: wr * 15,

    },
    button: {
        backgroundColor: '#A259FF',
        padding: 10,
        margin: 15,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
})