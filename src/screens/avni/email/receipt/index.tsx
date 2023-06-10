import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import { FONTS, images, SIZES } from '../../../../constants';
import { trendingJson } from '../../data/trendingJson';
import { useNavigation } from '@react-navigation/native';
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';
import LottieView from 'lottie-react-native'

//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import axios from 'axios';


let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Item = ({ title, description }: any) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
);

const Receipt = () => {
    const user = useStoreState((store) => store.user)
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMails = async () => {
            setLoading(true);
            try {
                const { data } = await axios({
                    method: "GET",
                    url: `${SERVER_BASE_URL}/avni-inbox?userId=${user.id}&receipt=true`,
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                setData(data)

                //console.log("mailll", data)
            } catch (error) {
                console.log(error)

            } finally {
                setLoading(false);
            }
        }

        if (user.token) {
            user.token && fetchMails()
        }

    }, [user.token])

    const handleRefresh = async () => {

        try {
            setRefreshing(true);

            const { data } = await axios({
                url: `${SERVER_BASE_URL}/avni-inbox?userId=${user.id}&receipt=true`,
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },

            });
        
            setData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false)

        }


    };



    const renderItem = ({ item: data, index }: any) => {
         const dateStringg = data?.from;

        // const nameInitial = dateStringg
        //     ? dateStringg.split('@')[1].charAt(0).toUpperCase()
        //     : '';

        const dateString = data?.updatedAt;
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        });

        const domain = dateStringg
        ? dateStringg.split("@")[1]
        : '';

        const subtext = data?.subject;
        const maxLength = 13;

        let truncatedText = subtext.slice(0, maxLength);
        if (subtext.length > maxLength) {
            truncatedText += "...";
        }
        return (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Maildetail' as never, { s3id: data?.s3PathId } as never)}
                style={{
                    flexDirection: 'column',
                }}>
                {/* @ts-ignore */}


                <View
                    style={{
                        marginTop: hr * 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View style={{
                        gap: 3
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                        }}>
                            {/* <View style={styles.circle}>
                                <Text style={styles.initial}>{nameInitial}</Text>
                            </View> */}
                            <Image
                                source={{
                                    uri: `https://www.google.com/s2/favicons?sz=256&domain=${domain}`,
                                }}

                                style={{
                                    width: wr * 23,
                                    height: hr * 23
                                }}
                                resizeMode='contain'
                            />

                            {/* <Image
                                source={data?.icon}
                                style={{
                                    width: wr * 23,
                                    height: hr * 23
                                }}
                                resizeMode='contain'
                            /> */}

                            <View

                            >
                                <Text style={{ ...FONTS.h4, color: '#000000' }}>
                                    {truncatedText} </Text>

                                <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                                    {data?.from}</Text>
                            </View>



                        </View>



                    </View>

                    <View>
                        <Text style={{ ...FONTS.size12s, color: '#5C595F', marginRight: wr * 3 }}>
                            {formattedDate}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    {/* <ActivityIndicator size={100} color="red" /> */}
                    <LottieView source={images.loader} autoPlay loop />

                </View>

            ) : (
                <FlatList
                    contentContainerStyle={{ paddingLeft: 0 }}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    nestedScrollEnabled={true}
                    keyExtractor={(item: any) => `${item.id}`}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    padding: 10
                                }} />
                        );
                    }}
                />

            )}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: hr * 6,
    },
    item: {
        padding: 10,

        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#888',
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
});

export default Receipt;