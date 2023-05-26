import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { icons, images } from '../../constants';

interface Language {
    name: string;
    code: string;
    language: string;
    dail_code: string;
    image: string;
}

const Languages: Language[] = [
    {
        name: 'United States',
        code: 'US',
        language: 'English',
        dail_code: '+1',
        image:
            'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg',
    },
    {
        name: 'Saudi Arabia',
        code: 'SA',
        language: 'Arabic',
        dail_code: '+966',
        image:
            'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg',
    },
    {
        name: 'Spain',
        code: 'ES',
        language: 'Spanish',
        dail_code: '+34',
        image:
            'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg',
    },
    {
        name: 'India',
        code: 'IN',
        language: 'Hindi',
        dail_code: '+91',
        image:
            'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg',
    },
];

const Language: React.FC = () => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState<Language[]>(Languages);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
    const searchRef = useRef<TextInput>(null);

    const onSearch = (search: string) => {
        if (search !== '') {
            let tempData = Languages.filter((item) => {
                return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(Languages);
        }
    };

    return (
        <View style={{}}>
            <TouchableOpacity
                style={{
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                }}
                // onPress={() => {
                //     setClicked(!clicked);
                // }}
            >

                {selectedLanguage?.image ? (
                    <SvgUri
                        uri={selectedLanguage?.image || 'Select Language'}
                        style={{
                            width: 40,
                            height: 40,

                        }}

                    />
                ) : (
                    <Image
                        source={images.usa}
                        style={{ width: 40, height: 40 }}
                    />
                )}
            </TouchableOpacity>
            {clicked ? (
                <View
                    style={{
                        elevation: 5,
                        marginTop: 20,
                        height: 200,
                        alignSelf: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: 10,
                    }}
                >


                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={{


                                        height: 50,
                                        justifyContent: 'center',
                                        borderBottomWidth: 0.5,
                                        borderColor: '#8e8e8e',
                                    }}
                                    onPress={() => {
                                        setSelectedLanguage(item);
                                        setClicked(!clicked);
                                        onSearch('');
                                        setSearch('');
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <Text style={{ fontWeight: '600', marginLeft: 10 }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            ) : null}
        </View>
    );

};

export default Language;
