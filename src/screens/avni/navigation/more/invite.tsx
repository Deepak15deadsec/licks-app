import React from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, Linking, Platform} from 'react-native'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';
import { useNavigation } from '@react-navigation/native';
import { AvniTextInput } from '../../../../components/inputs';
import MessageInput from '../../../../components/inputs/MessageInput';
import Share from 'react-native-share';
import { Clipboard } from '@react-native-clipboard/clipboard/dist/Clipboard';


let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)



const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

const Invite = () => {
    const navigation = useNavigation()
    const user = useStoreState((store) => store.user)

    const handleCopy = () => {
        const textToCopy = user.referralCode;
        copyToClipboard(textToCopy);
      };


    const handleShare = () => {
        const message = 'Check out this awesome app!';
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

        Share.open({ url })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };



 
    return (
        <View style={styles.container}>


            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    paddingTop: Platform.OS === 'android' ? hr*30 : hr*50,
                    paddingBottom: hr*30,
                    paddingLeft: wr*25,
                    paddingRight: wr*25
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
                    height: Platform.OS === 'android' ? (SIZES.height - 70) :(SIZES.height - 90),
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
                    paddingBottom: hr * 50
                }}
            >

                <View style={{
                    padding: 0,
                    gap: 6,
                }}>

                    <Text style={{ ...FONTS.heading, color: 'black' }}>Invite a Friend</Text>

                </View>


                <View
                    style={{
                        borderWidth: 1,
                        borderStyle: 'dotted',
                        borderRadius: 4,
                        borderColor: '#cccccc',
                        padding: 12,
                        marginTop: hr * 5,

                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 5
                        }}
                    >
                        <View style={{
                            ...FONTS.size14b, width: wr*40,
                            borderWidth: 1,
                            borderRadius: 100,
                            alignItems: 'center',
                            padding: 8,
                            height: hr * 40,
                            borderColor: '#cccccc',

                        }}>
                            <Text>1</Text>
                        </View>
                        <View
                            style={{ alignSelf: 'center' }}
                        >
                            <Text style={{ ...FONTS.size14b, color: '#000000' }}>
                                Invite Your Friends</Text>
                        </View>

                    </View>


                    <View
                        style={{
                            borderWidth: 0.5,
                            backgroundColor: '#f0fcfa',

                            borderRadius: 10,
                           
                           
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: hr * 30,
                            paddingLeft:wr*10,
                            paddingRight:wr*10,
                            paddingTop: hr*10,
                            paddingBottom: hr*10,
                        }}
                    >
                        <Text style={{ ...FONTS.category, color: '#000000' }}>
                           {user.referralCode}
                        </Text>

                        <TouchableOpacity
                        onPress={handleCopy}
                        >
                            <Image
                                source={icons.copyb}
                                style={{
                                    width: wr*18,
                                    height: hr*18,
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>


                        {/* <TouchableOpacity
                            style={{
                                backgroundColor: true ? '#30D792' : "#DBDBDB",
                                borderRadius: 10,
                                justifyContent: 'center',
                                height: hr*28,
                                width: wr*80,
                                alignItems: 'center',


                            }}

                        //@ts-ignore

                        >
                            <Text style={{
                                ...FONTS.category,
                                color: '#fff'
                            }}>Copy Code</Text>
                        </TouchableOpacity> */}
                    </View>

                    <TouchableOpacity
                        onPress={handleShare}
                        style={{
                            backgroundColor: true ? '#30D792' : "#DBDBDB",
                            borderRadius: 20,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            height: hr * 52,
                            alignItems: 'center',
                            marginTop: hr * 30,
                            paddingLeft: wr * 20,
                            paddingRight: wr * 20
                        }}

                    //@ts-ignore

                    >
                        <Text style={{
                            ...FONTS.paragraph,
                            color: '#fff'
                        }}>INVITE YOUR FRIEND</Text>
                        <Image
                            source={icons.whatsapp}
                            style={{
                                width: wr*28,
                                height: hr*28,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        borderLeftWidth: 1,
                        borderLeftColor: '#cccccc',
                        height: hr * 80,
                        marginLeft: wr * 30.5, // To make the line appear seamless
                        // To make the line appear seamless
                    }}
                ></View>

                <View
                    style={{
                        borderWidth: 1,
                        borderStyle: 'dotted',
                        borderRadius: 4,
                        borderColor: '#cccccc',
                        padding: 12,

                        height: hr * 180
                    }}
                >

                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 5
                        }}
                    >
                        <View style={{
                            ...FONTS.size14b, width: wr*40,
                            borderWidth: 1,
                            borderRadius: 100,
                            alignItems: 'center',
                            padding: 8,
                            height: hr * 40,
                            borderColor: '#cccccc',

                        }}>
                            <Text>2</Text>
                        </View>
                        <View
                            style={{ alignSelf: 'center' }}
                        >
                            <Text style={{ ...FONTS.size14b, color: '#000000' }}>
                                You get 50 ART</Text>
                        </View>

                    </View>

                    <View
                        style={{
                            borderLeftWidth: 1,
                            borderLeftColor: '#cccccc',
                            height: hr * 18,
                            marginLeft: wr * 20.5, // To make the line appear seamless
                            // To make the line appear seamless
                        }}
                    ></View>

                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 5
                        }}
                    >
                        <View style={{
                            ...FONTS.size14b, width: wr*40,
                            borderWidth: 1,
                            borderRadius: 100,
                            alignItems: 'center',
                            padding: 8,
                            height: hr * 40,
                            borderColor: '#cccccc',

                        }}>
                            <Text></Text>
                        </View>
                        <View
                            style={{ alignSelf: 'center' }}
                        >
                            <Text style={{ ...FONTS.size14b, color: '#000000' }}>
                                Download and register on Avni App</Text>
                        </View>

                    </View>
                    <View
                        style={{
                            borderLeftWidth: 1,
                            borderLeftColor: '#cccccc',
                            height: hr * 18,
                            marginLeft: wr * 20.5, // To make the line appear seamless
                            // To make the line appear seamless
                        }}
                    ></View>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 5
                        }}
                    >
                        <View style={{
                            ...FONTS.size14b, width: wr*40,
                            borderWidth: 1,
                            borderRadius: 100,
                            alignItems: 'center',
                            padding: 8,
                            height: hr * 40,
                            borderColor: '#cccccc',

                        }}>
                            <Text></Text>
                        </View>
                        <View
                            style={{ alignSelf: 'center' }}
                        >
                            <Text style={{ ...FONTS.size14b, color: '#000000' }}>
                                On completion both earn 50 ART </Text>
                        </View>

                    </View>

                </View>


                <View style={{ position: 'absolute', flexDirection: 'row', gap: 10, alignSelf: 'center', bottom: hr*80 }}>

                    {/* <TouchableOpacity
                        onPress={handleShare}
                        style={{
                            backgroundColor: '#ffffff',
                            width: 60,
                            borderWidth: 1,
                            borderRadius: 100,
                            borderColor: '#30D792',
                            padding: 8,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 40
                        }}

                    >
                        <Image
                            source={icons.whatsapp}
                            style={{
                                width: 33,
                                height: 22,
                            }}
                            resizeMode="contain"
                        />

                    </TouchableOpacity> */}


                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ffffff',
                            padding: 8,
                            borderWidth: 1,
                            borderRadius: 100,
                            borderColor: '#30D792',
                            width: wr*60,
                            height: hr*60,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}

                    //@ts-ignore

                    >
                        <Image
                            source={icons.facebook}
                            style={{
                                width: wr*33,
                                height: hr*22,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ffffff',
                            width: wr*60,
                            borderWidth: 1,
                            borderRadius: 100,
                            borderColor: '#30D792',
                            padding: 8,
                            height: hr*60,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}

                    >
                        <Image
                            source={icons.twitter}
                            style={{
                                width: wr*33,
                                height: hr*22,
                            }}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ffffff',
                            width: wr*60,
                            borderWidth: 1,
                            borderRadius: 100,
                            borderColor: '#30D792',
                            padding: 8,
                            height: hr*60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}

                    >
                        <Image
                            source={icons.insta}
                            style={{
                                width: wr*33,
                                height: hr*22,
                            }}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

export default Invite

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30D792'
    }
})