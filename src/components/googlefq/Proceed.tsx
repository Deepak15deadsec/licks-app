import { View, Text, TouchableOpacity, Linking, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, icons, images } from '../../constants'
import LottieView from 'lottie-react-native'
import axios from 'axios'
import { getUrl } from '../../hooks/googleUrl'

//@ts-ignore
import { SERVER_BASE_URL, CRYPTO_SECRET_KEY } from '@env'
import { useStoreActions, useStoreState } from '../../store/easy-peasy/hooks'

const Proceed = (props: any) => {

    const [data, setData] = useState<any>();

    const handlePrivacyPolicyPress = () => {
        Linking.openURL('https://avni.club/privacy-policy');
    };

    const handleTerms = () => {
        Linking.openURL('https://avni.club/terms-and-conditions');
    };

    const handleClick = async () => {
        const url = getUrl(user?.phone);
        const response = await Linking.openURL(url);
        console.log("resp", response)
    };

    const user = useStoreState((store) => store.user)
    const handleNext = () => {

        props.setStep(2)
        const interval = setInterval(async () => {
            try {
                const { data: forward }: any = await axios({
                    method: 'GET',
                    url: `${SERVER_BASE_URL}/avni-inbox/${user.id}/get-forward-mail/forwarding-noreply@google.com`,
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    },
                })

                if (forward.status === 200) {
                    clearInterval(interval); // Stop checking when response is received          

                    setData(forward.data)
                    props.setStep(3)

                }
                if (forward.status === 404) {
                    props.setStep(1)
                    setData("Please complete the steps above")
                }
            } catch (error: any) {
                props.setStep(1)
            }
        }, 15000); // 30 seconds
    }

    switch (props.step) {
        case 1:
            return (
                <View style={{ gap: 5, alignItems: 'center' }}>
                    <Text>{data}</Text>
                    <View>
                        <Text>
                        <Text style={{ textDecorationLine: 'underline', color: "gray" }} onPress={handleTerms}>
                            T&C
                        </Text>
                        {' '}and{' '}
                        <Text style={{ textDecorationLine: 'underline', color: "gray" }} onPress={handlePrivacyPolicyPress}>
                            privacy policy
                        </Text>
                        </Text>
                       
                    </View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 15,
                            padding: 8,
                            borderWidth: 1,
                            borderColor: '#DBDBDB',
                            justifyContent: "center",
                            flexDirection: 'row',

                            backgroundColor: '#30D792'
                        }}
                        onPress={() => handleNext()}
                    >
                        <Text style={{
                            ...FONTS.h4,
                            color: COLORS.white
                        }}>Next</Text>

                    </TouchableOpacity>
                </View>

            )

        case 2:
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text>Fetching Confirmation ...</Text>
                    {/* <LottieView source={images.loader} autoPlay loop /> */}

                </View>
            )

        case 3:
            return (
                <View style={{ gap: 2, alignItems: 'center' }}>
                    <Text style={{bottom: 20}}>confirmation received</Text>
                    <View>
                        <Text>
                        <Text style={{ textDecorationLine: 'underline', color: "gray" }} onPress={handleTerms}>
                            T&C
                        </Text>
                        {' '}and{' '}
                        <Text style={{ textDecorationLine: 'underline', color: "gray" }} onPress={handlePrivacyPolicyPress}>
                            privacy policy
                        </Text>
                        </Text>
                       
                    </View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 15,
                            padding: 8,
                            borderWidth: 1,
                            borderColor: '#DBDBDB',
                            justifyContent: "space-between",
                            flexDirection: 'row',
                            gap: 5,
                            backgroundColor: '#fff'
                        }}
                        onPress={handleClick}
                    >
                        <Text style={{
                            ...FONTS.h4,
                            color: COLORS.darker
                        }}>Connect your Gmail</Text>
                        <Image style={{ height: 22, width: 22 }} source={images.gmail} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            )

        default:
            return (
                <View />
            )
    }
}

export default Proceed