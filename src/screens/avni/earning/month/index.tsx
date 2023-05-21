import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import { FONTS } from '../../../../constants';
import { trendingJson } from '../../data/trendingJson';
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';
import { formatDate } from '../../../../utils/formatDate';

//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import axios from 'axios';
import moment from 'moment';


const Item = ({ title, description }: any) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
);

const Month = () => {
    const { user, query }: { user: any, query: Date } = useStoreState((store) => store)

    const [data, setData] = useState([]);



    useEffect(() => {
        const fetchEarnings = async () => {
            // const to = formatDate(query)

            //console.log("jur",moment(query).format("YYYY-MM")); // Output: "2023-05-05"

            
            const { data } = await axios({
                method: "GET",
                url: `${SERVER_BASE_URL}/earning?userId=${user.id}&type=month&date=${moment(query).format("YYYY-MM")}`,
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            setData(data)

            console.log("month", data)

        }


        fetchEarnings()


    }, [query])



    const renderItem = ({ item: data }: any) => {

        const dateStringg = data?.name;
        const nameInitial = dateStringg ? dateStringg.charAt(0).toUpperCase() : '';

        const dateString = data?.updatedAt;
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        });


        return (
            <TouchableOpacity

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
                            {/* <Image
                                source={data?.icon}
                                style={{
                                    width: 23,
                                    height: 23
                                }}
                                resizeMode='contain'
                            /> */}

                            <View style={styles.circle}>
                                <Text style={styles.initial}>{nameInitial}</Text>
                            </View>
                            <View style={{ gap: 5 }}>
                                <Text style={{ ...FONTS.category, color: '#000000' }}>
                                    {data?.name}</Text>
                                <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                                    {formattedDate}</Text>
                            </View>

                        </View>



                    </View>

                    <View>
                        <Text style={{ ...FONTS.size12s, color: '#5C595F', marginRight: 3 }}>
                            {data?.rewardedAmount}</Text>
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

export default Month;