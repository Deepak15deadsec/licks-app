import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator, ScrollView, Platform, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MialNavigation } from '../../../navigation/MailNavigation'
import { SIZES, FONTS, icons } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import Svg, { Path } from 'react-native-svg'
import { trendingJson } from '../data/trendingJson';
import Trending from '../navigation/home/trending'
import Dropdown from '../../../components/dropdown'
import { useStoreActions, useStoreState } from '../../../store/easy-peasy/hooks';
import { useRoute } from '@react-navigation/native';
import RenderHTML, { CustomBlockRenderer, CustomMixedRenderer, CustomTextualRenderer, HTMLContentModel } from 'react-native-render-html';




//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import axios from 'axios';
import WebView from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextWithLinks from '../../../components/textwithlinks'
import { useAuth } from '../../../hooks/auth'

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)



const MailDetail = ({ route: { params: { id } } }: { route: { params: { id: string } } }) => {

    const trending: any = trendingJson.find((x) => x.id === id)
    const { width } = useWindowDimensions();
    const navigation = useNavigation()
    const route = useRoute();
    const { s3id }: any = route.params;
    const user = useStoreState((store) => store.user)
    const [data, setData]: any = useState()
    const {token} = useAuth()




    useEffect(() => {

        const fetchDetails = async () => {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: `${SERVER_BASE_URL}/avni-inbox/get-html?s3_path_id=${s3id}`,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },


                })
                setData(data)
                //console.log("details", data)
            } catch (error) {
                console.log(error)
            }
        }
        if (token) { fetchDetails() }


    }, [token])

    const dateStringg = data?.from;

    // const nameInitial = dateStringg
    //     ? dateStringg.split('@')[1].charAt(0).toUpperCase()
    //     : '';

    const domain = dateStringg
        ? dateStringg.split("@")[1]
        : '';

    const htmlContent = `<html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-size: 40px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      </style>
      <script>
        window.addEventListener('DOMContentLoaded', function() {
          var images = document.getElementsByTagName('img');
          for (var i = 0; i < images.length; i++) {
            images[i].removeAttribute('width');
            images[i].removeAttribute('height');
          }
        });
      </script>
    </head>
    <body>
      ${data?.html}
    </body>
  </html>`;

    //console.log("domain",`https://www.google.com/s2/favicons?sz=256&domain=${domain}`)
    return (

        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    paddingTop: Platform.OS === 'android' ? hr * 30 : hr * 50,
                    paddingBottom: hr * 30,
                    paddingLeft: wr * 25,
                    paddingRight: wr * 25
                }}
            >
                <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <Path d="M18.7165 6.95109H4.37986L10.6433 1.80561C11.1439 1.39439 11.1439 0.719571 10.6433 0.308354C10.5246 0.210607 10.3835 0.133058 10.2283 0.0801464C10.073 0.0272349 9.90655 0 9.73845 0C9.57035 0 9.40391 0.0272349 9.24864 0.0801464C9.09337 0.133058 8.95233 0.210607 8.83359 0.308354L0.375351 7.25687C0.256366 7.35442 0.161968 7.47028 0.0975606 7.59784C0.0331529 7.72539 0 7.86213 0 8.00022C0 8.13832 0.0331529 8.27505 0.0975606 8.40261C0.161968 8.53016 0.256366 8.64603 0.375351 8.74358L8.83359 15.6921C8.95242 15.7897 9.09349 15.8671 9.24874 15.92C9.404 15.9728 9.5704 16 9.73845 16C9.9065 16 10.0729 15.9728 10.2282 15.92C10.3834 15.8671 10.5245 15.7897 10.6433 15.6921C10.7621 15.5945 10.8564 15.4786 10.9207 15.351C10.985 15.2235 11.0181 15.0868 11.0181 14.9487C11.0181 14.8107 10.985 14.674 10.9207 14.5464C10.8564 14.4189 10.7621 14.303 10.6433 14.2054L4.37986 9.0599H18.7165C19.4224 9.0599 20 8.58542 20 8.0055C20 7.42557 19.4224 6.95109 18.7165 6.95109Z" fill="white" />
                </Svg>
            </TouchableOpacity>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                    width: SIZES.width * 0.92,
                    height: Platform.OS === 'android' ? (SIZES.height - 70) : (SIZES.height - 90),
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
                    height: Platform.OS === 'android' ? (SIZES.height - 82) : (SIZES.height - 102),
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: '#FFFFFF',
                    paddingLeft: wr * 24,
                    paddingRight: wr * 24,
                    paddingTop: hr * 20,
                    paddingBottom: hr * 20,
                    gap: 5

                }}
            >

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                    justifyContent: 'space-between'
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            //justifyContent: 'space-between',
                            gap: 5,
                            paddingRight: wr*25,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,

                                gap: 8,
                            }}
                        >
                            {/* <View style={styles.circle}>
                                <Text style={styles.initial}>{nameInitial}</Text>
                            </View> */}
                            {/* <Image
                            source={data?.icon}
                            style={{
                                width: 63,
                                height: 63
                            }}
                            resizeMode='contain'
                        /> */}

                            <Image
                                source={{
                                    uri: `https://www.google.com/s2/favicons?sz=256&domain=${domain}`,
                                }}

                                style={{
                                    width: wr * 36,
                                    height: hr * 36
                                }}
                                resizeMode='contain'
                            />

                            <View
                                style={{ gap: 15, alignSelf: 'center' }}>
                                <Text style={{ ...FONTS.heading, lineHeight: 20, color: 'black' }}>
                                    {data?.subject} </Text>
                                <Text style={{ ...FONTS.paragraph, lineHeight: 20, color: 'gray' }}>
                                    {data?.from} </Text>
                            </View>
                        </View>

                        {/* <View>
                            <Dropdown sendData={data} />
                        </View> */}

                    </View>


                </View>

                <SafeAreaView
                    style={
                        {
                            flex: 1,

                            marginTop: 5
                        }
                    }
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                        {data?.html === false ? (
                            <TextWithLinks text={data?.text} />

                        ) : (


                            // <View style={{ width: Dimensions.get('window').width - 20,   }}>
                            //     <RenderHTML
                            //        // contentWidth={width - 20}
                            //         source={{ html: data?.html}}

                            //         contentWidth={Dimensions.get('window').width - 20} // Adjust padding

                            //     />
                            // </View>




                            <WebView
                                style={styles.webview}
                                source={{ html: htmlContent }}
                                startInLoadingState={true}
                                showsVerticalScrollIndicator={false}
                                renderLoading={() => (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="large" color="black" />
                                    </View>
                                )}

                                scalesPageToFit={true}

                            />
                        )}
                    </ScrollView>
                </SafeAreaView>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hr * 5 }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Forward' as never, { sentData: data } as never) }}
                        style={{ borderWidth: 1, padding: 8, borderRadius: 20, flexDirection: 'row', gap: 5 }}>
                        <Image style={{ height: hr * 18, width: wr * 18 }} source={icons.forward} resizeMode='contain' />
                        <Text>Foward</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Reply' as never, { sentData: data } as never) }}
                        style={{ borderWidth: 1, padding: 8, borderRadius: 20, flexDirection: 'row', gap: 5 }}>
                        <Image style={{ height: hr * 18, width: wr * 18 }} source={icons.reply} resizeMode='contain' />
                        <Text>Reply</Text>
                    </TouchableOpacity>
                </View>



            </View>


        </View>
    )
}

export default MailDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30D792'
    },
    webview: {
        flex: 1,
        //marginTop:100,
        width: "100%",

        //transform: [{ scale: 1.3 }]
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        // flexGrow: 1,
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    circle: {
        width: wr * 50,
        height: hr * 50,
        borderRadius: 25,
        backgroundColor: '#5C595F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hr * 5
    },
    initial: {
        fontSize: 20,
        color: 'white'
    },
})