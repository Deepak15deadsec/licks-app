import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, FlatList } from 'react-native'

import Svg, {
    Path,
    Circle,
    Rect,
    ClipPath
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { FONTS, images, SIZES } from '../../../../constants';
import Circlecard from './Circlecard';


const data = [
    { title: 'Creator', data: 'Ranveer' },
    { title: 'Rarity', data: '2' },
    { title: 'Blockchain', data: 'Polygon' },
    { title: 'Address', data: '0x60e...' },

];


const Pagethree = () => {
    const navigation = useNavigation()

    const [input, setInput] = useState<any>({
        supportCat: "",

    });

    let wr = (SIZES.width / 391)
    let hr = (SIZES.height / 812)

    const onchangeHandler = useCallback((value: any, name: string) => {

        setInput((prevState: any) => ({ ...prevState, [name]: value }));

    }, []);

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        paddingTop: Platform.OS === 'android' ? hr * 30 : hr * 50,
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
                        paddingTop: Platform.OS === 'android' ? hr * 30 : hr * 50,
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


            <View style={{ alignItems: 'center', marginTop: hr * 37, marginHorizontal: wr * 156, position: 'absolute' }}>

                <Text style={{ color: '#E7E7E9', fontSize: 28, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>

            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30,
                marginTop: hr * 250
            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: hr * 332, width: wr * 256, }} source={images.image7} resizeMode='contain' />
                    <View style={{
                        width: 257, // Adjust the size of the square as needed
                        height: 64, // Adjust the size of the square as needed
                        justifyContent: 'space-evenly',
                        alignItems: 'center',

                        borderBottomRightRadius: 27,
                        borderBottomLeftRadius: 27,
                        backgroundColor: 'white',
                    }}>
                        <View style={{
                            width: 187, // Adjust the size of the square as needed
                            height: 64, // Adjust the size of the square as needed
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            borderRadius: 27,

                            backgroundColor: '#0F111E',
                            flexDirection: 'row'

                        }}>
                            <TouchableOpacity>
                                <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" >

                                    <Circle id="Ellipse 2" cx="14" cy="14" r="14" fill="#6F7078" />
                                    <Path id="Vector" d="M20.7663 8.23771C20.3753 7.84532 19.9111 7.53405 19.4002 7.32168C18.8893 7.10931 18.3417 7.00001 17.7887 7.00001C17.2357 7.00001 16.6881 7.10931 16.1772 7.32168C15.6663 7.53405 15.2021 7.84532 14.8112 8.23771L13.9998 9.05167L13.1884 8.23771C12.3987 7.44549 11.3277 7.00042 10.2109 7.00042C9.09409 7.00042 8.02303 7.44549 7.23334 8.23771C6.44365 9.02993 6 10.1044 6 11.2248C6 12.3452 6.44365 13.4197 7.23334 14.2119L8.0447 15.0258L13.9998 21L19.9549 15.0258L20.7663 14.2119C21.1574 13.8197 21.4677 13.354 21.6794 12.8415C21.891 12.3289 22 11.7796 22 11.2248C22 10.67 21.891 10.1207 21.6794 9.60812C21.4677 9.09558 21.1574 8.62991 20.7663 8.23771Z" fill="#E7E7E9" />

                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Svg width="18" height="22" viewBox="0 0 18 22" fill="none" >

                                    <Path id="Vector" d="M1 11V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V11" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path id="Vector_2" d="M13 5.00001L9 1.00001L5 5.00001" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path id="Vector_3" d="M9 1.00001V14" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Svg width="17" height="4" viewBox="0 0 17 4" fill="none" >

                                    <Path id="Vector" d="M8.5 3.00001C9.01777 3.00001 9.4375 2.55229 9.4375 2.00001C9.4375 1.44772 9.01777 1.00001 8.5 1.00001C7.98223 1.00001 7.5625 1.44772 7.5625 2.00001C7.5625 2.55229 7.98223 3.00001 8.5 3.00001Z" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path id="Vector_2" d="M15.0625 3.00001C15.5803 3.00001 16 2.55229 16 2.00001C16 1.44772 15.5803 1.00001 15.0625 1.00001C14.5447 1.00001 14.125 1.44772 14.125 2.00001C14.125 2.55229 14.5447 3.00001 15.0625 3.00001Z" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path id="Vector_3" d="M1.9375 3.00001C2.45527 3.00001 2.875 2.55229 2.875 2.00001C2.875 1.44772 2.45527 1.00001 1.9375 1.00001C1.41973 1.00001 1 1.44772 1 2.00001C1 2.55229 1.41973 3.00001 1.9375 3.00001Z" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={{ color: '#A259FF', textAlign: 'left', fontSize: 16, fontWeight: '700', lineHeight: 16.8, }}>Ranveer Singh</Text>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" >

                        <Path id="Vector" d="M8.68063 0.911796C9.7111 -0.404729 11.7984 -0.00680594 12.2723 1.59649C12.557 2.55989 13.4961 3.1766 14.4933 3.05505C16.1529 2.85277 17.3475 4.61013 16.5488 6.07888C16.0689 6.96143 16.2968 8.06154 17.088 8.68072C18.4045 9.7112 18.0066 11.7985 16.4033 12.2724C15.4398 12.5571 14.8231 13.4962 14.9447 14.4934C15.147 16.153 13.3896 17.3476 11.9209 16.5489C11.0383 16.069 9.93821 16.2969 9.31901 17.0881C8.28856 18.4046 6.20122 18.0067 5.72737 16.4034C5.44267 15.4399 4.50357 14.8232 3.50636 14.9448C1.84677 15.1471 0.65219 13.3897 1.45084 11.921C1.93075 11.0384 1.70278 9.9383 0.911705 9.31911C-0.404823 8.28865 -0.00689905 6.20131 1.5964 5.72746C2.5598 5.44276 3.17651 4.50366 3.05495 3.50645C2.85268 1.84688 4.61002 0.652281 6.07879 1.45093C6.96133 1.93084 8.06146 1.70288 8.68063 0.911796Z" fill="#03A4FE" />
                        <Path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M12.6593 6.35997C12.9693 6.65883 12.9782 7.15234 12.6794 7.46226L8.10897 12.2019L5.32046 9.31014C5.0216 9.00021 5.03057 8.50669 5.3405 8.20783C5.65043 7.90899 6.14394 7.91796 6.4428 8.22787L8.10897 9.95577L11.557 6.38001C11.8559 6.07008 12.3494 6.06111 12.6593 6.35997Z" fill="#E7E7E9" />


                        <ClipPath id="clip0_19_614">
                            <Rect width="18" height="18" fill="white" />
                        </ClipPath>

                    </Svg>
                </View>

                <View style={{}}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Circlecard title={item.title} data={item.data} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2} // Set the number of columns you want
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                        }}
                    />
                </View>

            </View>


        </View>

    )
}

export default Pagethree

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: '#0F111E',

    },

})