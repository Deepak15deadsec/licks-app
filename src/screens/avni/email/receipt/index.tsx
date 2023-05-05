import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import { FONTS } from '../../../../constants';
import { trendingJson } from '../../data/trendingJson';
import { useNavigation } from '@react-navigation/native';

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

const Receipt = () => {
    const navigation = useNavigation()
    const renderItem = ({ item: trending }: any) => {
        return (
            <TouchableOpacity
            onPress={() => navigation.navigate('Maildetail' as never, { id: trending.id } as never)}
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
                            <Image
                                source={trending.icon}
                                style={{
                                    width: 23,
                                    height: 23
                                }}
                                resizeMode='contain'
                            />

                            <View 
                          
                            >
                            <Text style={{ ...FONTS.category, color: '#000000' }}>
                                Your {trending.name} Receipt</Text>

                                <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                            {trending. domain}</Text>
                            </View>

                          

                        </View>

                       

                    </View>

                    <View>
                        <Text style={{ ...FONTS.size12s, color: '#5C595F', marginRight: 3 }}>
                            {trending.price}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingLeft: 0 }}
                data={trendingJson}
                renderItem={renderItem}
                nestedScrollEnabled={true}
                keyExtractor={item => `${item.id}`}
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
});

export default Receipt;