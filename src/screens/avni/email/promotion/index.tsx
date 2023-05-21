import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import { FONTS } from '../../../../constants';
import { trendingJson } from '../../data/trendingJson';
import { useNavigation } from '@react-navigation/native';
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';

//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import axios from 'axios';
const DATA = [
    { id: '1', title: 'Starbucks', description: 'June 22' },
    { id: '2', title: 'Title 2', description: 'Description 2' },
    { id: '3', title: 'Title 3', description: 'Description 3' },
];

const Item = ({ title, description }: any) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
);

const Promotion = () => {
    const user = useStoreState((store) => store.user)
    const navigation = useNavigation()

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchMails = async () => {

            try {
                const { data } = await axios({
                    method: "GET",
                    url: `${SERVER_BASE_URL}/avni-inbox?userId=${user.id}&receipt=false`,
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                setData(data)

               //console.log("promotion", data)
            } catch (error) {
                console.log(error)

            }
        }

        if (user.token) {
            user.token && fetchMails()
        }

    }, [user.token])

    const renderItem = ({ item: data }: any) => {
        const dateStringg = data?.from;
        
        const nameInitial = dateStringg
        ? dateStringg.split('@')[1].charAt(0).toUpperCase()
        : '';

        const dateString = data?.updatedAt;
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        });
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Maildetail' as never, { s3id: data?.s3PathId } as never)}
                style={{
                    flexDirection: 'column',
                }}>
                {/* @ts-ignore */}


                <View
                    style={{
                        marginTop: 10,
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
                            <View style={styles.circle}>
                                <Text style={styles.initial}>{nameInitial}</Text>
                            </View>
                            {/* <Image
                                source={trending.icon}
                                style={{
                                    width: 23,
                                    height: 23
                                }}
                                resizeMode='contain'
                            /> */}

                            <View

                            >
                                <Text style={{ ...FONTS.h4, color: '#000000' }}>
                                     {data?.subject} </Text>

                                <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                                    {data?.from}</Text>
                            </View>



                        </View>



                    </View>

                    <View>
                        <Text style={{ ...FONTS.size12s, color: '#5C595F', marginRight: 3 }}>
                            {formattedDate}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingLeft: 0 }}
                data={data}
                renderItem={renderItem}
                nestedScrollEnabled={true}
                keyExtractor={(item: any) => `${item.id}`}
                ItemSeparatorComponent={() => {
                    return (
                        <View
                            style={{
                                padding: 10
                            }} />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 6,
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
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#5C595F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    initial: {
        fontSize: 20,
        color: 'white'
    },
});

export default Promotion;