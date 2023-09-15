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
import { celebData } from '../../data/celebData';

const data = [
    { title: 'Creator', data: 'Ranveer' },
    { title: 'Rarity', data: '2' },
    { title: 'Blockchain', data: 'Polygon' },
    { title: 'Address', data: '0x60e...' },

];

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)


const Pagethree = ({ route }:any) => {
    const navigation = useNavigation()
    const { itemId } = route.params;
    const matchedCeleb = celebData.find((celeb) => celeb.id === itemId);
    const [input, setInput] = useState<any>({
        supportCat: "",

    });

  

    const onchangeHandler = useCallback((value: any, name: string) => {

        setInput((prevState: any) => ({ ...prevState, [name]: value }));

    }, []);

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
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

                <Text style={{ color: '#E7E7E9', fontSize: 33, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>

            </View>
            <View style={{
         
                justifyContent: 'center',

               gap:10

            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: hr * 332, width: wr * 256, }} source={matchedCeleb?.profile}  />
                    <View style={{
                        width: wr*257, // Adjust the size of the square as needed
                        height: hr*64, // Adjust the size of the square as needed
                        justifyContent: 'space-evenly',
                        alignItems: 'center',

                        borderBottomRightRadius: 27,
                        borderBottomLeftRadius: 27,
                        backgroundColor: 'white',
                    }}>
                        <View style={{
                            width: wr*187, // Adjust the size of the square as needed
                            height: hr*64, // Adjust the size of the square as needed
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

                <View style={{ flexDirection: 'row', gap: 5, paddingHorizontal: wr*30 }}>
                    <Text style={{ color: '#A259FF', textAlign: 'left', fontSize: 16, fontWeight: '700', lineHeight: 16.8, }}>{matchedCeleb?.name}</Text>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" >

                        <Path id="Vector" d="M8.68063 0.911796C9.7111 -0.404729 11.7984 -0.00680594 12.2723 1.59649C12.557 2.55989 13.4961 3.1766 14.4933 3.05505C16.1529 2.85277 17.3475 4.61013 16.5488 6.07888C16.0689 6.96143 16.2968 8.06154 17.088 8.68072C18.4045 9.7112 18.0066 11.7985 16.4033 12.2724C15.4398 12.5571 14.8231 13.4962 14.9447 14.4934C15.147 16.153 13.3896 17.3476 11.9209 16.5489C11.0383 16.069 9.93821 16.2969 9.31901 17.0881C8.28856 18.4046 6.20122 18.0067 5.72737 16.4034C5.44267 15.4399 4.50357 14.8232 3.50636 14.9448C1.84677 15.1471 0.65219 13.3897 1.45084 11.921C1.93075 11.0384 1.70278 9.9383 0.911705 9.31911C-0.404823 8.28865 -0.00689905 6.20131 1.5964 5.72746C2.5598 5.44276 3.17651 4.50366 3.05495 3.50645C2.85268 1.84688 4.61002 0.652281 6.07879 1.45093C6.96133 1.93084 8.06146 1.70288 8.68063 0.911796Z" fill="#03A4FE" />
                        <Path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M12.6593 6.35997C12.9693 6.65883 12.9782 7.15234 12.6794 7.46226L8.10897 12.2019L5.32046 9.31014C5.0216 9.00021 5.03057 8.50669 5.3405 8.20783C5.65043 7.90899 6.14394 7.91796 6.4428 8.22787L8.10897 9.95577L11.557 6.38001C11.8559 6.07008 12.3494 6.06111 12.6593 6.35997Z" fill="#E7E7E9" />


                        <ClipPath id="clip0_19_614">
                            <Rect width="18" height="18" fill="white" />
                        </ClipPath>

                    </Svg>
                </View>


                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <Circlecard title={item.title} data={item.data} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2} // Set the number of columns you want

                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: hr*30, marginHorizontal: wr*20 }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#9FA0A5' }}>Price</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <Path d="M14.9974 0L14.7961 0.68366V20.5201L14.9974 20.7209L24.2051 15.2782L14.9974 0Z" fill="#A259FF" />
                                <Path d="M14.9972 0L5.78931 15.2782L14.9972 20.7209V11.0929V0Z" fill="#A259FF" />
                                <Path d="M14.9975 22.4642L14.884 22.6026V29.6686L14.9975 29.9998L24.2108 17.0243L14.9975 22.4642Z" fill="#8247CC" />
                                <Path d="M14.9975 29.9998V22.4642L5.78955 17.0243L14.9975 29.9998Z" fill="#A259FF" />
                                <Path d="M14.9973 20.7209L24.205 15.2782L14.9973 11.0928V20.7209Z" fill="#8247CC" />
                                <Path d="M5.78955 15.2782L14.9975 20.7209V11.0928L5.78955 15.2782Z" fill="#8247CC" />
                            </Svg>
                            <Text style={{ fontWeight: '600', fontSize: 24, color: '#E7E7E9' }}>945.50</Text>
                        </View>

                    </View>
                    <TouchableOpacity style={{
                        width: wr * 195,
                        height: hr * 60,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#A259FF',
                        flexDirection: 'row', gap: 10
                    }}>
                        <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.67053 12.4491C6.78055 12.7763 6.60451 13.1307 6.27734 13.2407C5.21792 13.597 4.65489 14.4863 4.35373 15.3907C4.23414 15.7498 4.16189 16.0955 4.11848 16.3814C4.40434 16.338 4.75006 16.2657 5.10917 16.1461C6.01355 15.845 6.9029 15.2819 7.25916 14.2225C7.36918 13.8954 7.7236 13.7193 8.05078 13.8293C8.37795 13.9394 8.55399 14.2938 8.44396 14.621C7.9096 16.21 6.58801 16.9712 5.50411 17.3321C4.95655 17.5144 4.44395 17.6045 4.0698 17.6493C3.88182 17.6719 3.72641 17.6833 3.616 17.6891C3.56074 17.6921 3.51658 17.6936 3.48505 17.6943C3.46928 17.6947 3.45666 17.6949 3.44737 17.6951L3.43596 17.6952L3.43217 17.6952L3.43077 17.6952L3.43019 17.6952C3.42993 17.6952 3.42969 17.6952 3.42969 17.0702C2.80469 17.0702 2.80469 17.0699 2.80469 17.0697L2.80469 17.0691L2.80469 17.0677L2.80471 17.0639L2.80481 17.0525C2.80493 17.0432 2.80514 17.0306 2.80553 17.0148C2.80631 16.9833 2.80782 16.9391 2.81072 16.8839C2.81653 16.7735 2.82797 16.618 2.85052 16.4301C2.8954 16.0559 2.98542 15.5433 3.16776 14.9958C3.5287 13.9119 4.28989 12.5903 5.87891 12.0559C6.20608 11.9459 6.5605 12.1219 6.67053 12.4491ZM3.42969 17.0702H2.80469C2.80469 17.4154 3.08451 17.6952 3.42969 17.6952V17.0702Z" fill="white" />
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M17.0462 3.454C16.3208 3.34937 14.5351 3.30996 12.7076 5.13747L7.84482 10.0002L10.5 12.6554L15.3627 7.79265C17.1903 5.96514 17.1508 4.17945 17.0462 3.454ZM17.2275 2.21721C16.2298 2.07276 14.0058 2.07151 11.8237 4.25359L6.519 9.55827C6.40179 9.67548 6.33594 9.83446 6.33594 10.0002C6.33594 10.166 6.40179 10.3249 6.519 10.4422L10.0581 13.9812C10.3021 14.2253 10.6979 14.2253 10.9419 13.9812L16.2466 8.67653C18.4287 6.49445 18.4275 4.27046 18.283 3.27276C18.2465 3.00574 18.1235 2.75797 17.9329 2.56734C17.7422 2.37671 17.4945 2.25376 17.2275 2.21721Z" fill="white" />
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.922 8.49243C15.2672 8.49243 15.547 8.77225 15.547 9.11743V14.1643L15.5469 14.1732C15.5423 14.5015 15.4086 14.8147 15.175 15.0452L12.6527 17.5753C12.4926 17.7352 12.2921 17.8486 12.0725 17.9035C11.853 17.9584 11.6227 17.9527 11.4061 17.8869C11.1896 17.8212 10.995 17.6978 10.843 17.5301C10.6912 17.3625 10.5877 17.1569 10.5435 16.9351C10.5434 16.935 10.5435 16.9353 10.5435 16.9351L9.88731 13.6622C9.81946 13.3237 10.0388 12.9944 10.3773 12.9265C10.7157 12.8587 11.0451 13.078 11.1129 13.4165L11.7694 16.6909L14.297 14.1554V9.11743C14.297 8.77225 14.5768 8.49243 14.922 8.49243Z" fill="white" />
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.32698 4.95307L6.33588 4.953H11.3828C11.7279 4.953 12.0078 5.23282 12.0078 5.578C12.0078 5.92318 11.7279 6.203 11.3828 6.203H6.34472L6.33967 6.20816L6.33964 6.20813L3.80933 8.73063L3.8103 8.73082L7.08373 9.38707C7.42218 9.45492 7.64154 9.78429 7.57369 10.1227C7.50584 10.4612 7.17647 10.6805 6.83803 10.6127L3.56556 9.95663C3.56537 9.95659 3.56518 9.95655 3.565 9.95652C3.34325 9.91232 3.13764 9.8088 2.97006 9.65699C2.80235 9.50504 2.67903 9.31042 2.61327 9.09387C2.54751 8.87733 2.54176 8.647 2.59665 8.42745C2.65154 8.2079 2.765 8.00737 2.92493 7.84725L2.92587 7.84631L2.92587 7.84632L5.45498 5.32502C5.68549 5.09139 5.99869 4.95774 6.32698 4.95307Z" fill="white" />
                        </Svg>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                            BUY NOW
                        </Text>
                    </TouchableOpacity>
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