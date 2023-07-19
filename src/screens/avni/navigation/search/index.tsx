import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, useColorScheme, ScrollView, KeyboardAvoidingView, Platform, FlatList, Alert, Button, Keyboard, ActivityIndicator, Dimensions } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../../../constants';
import Svg, {
  Path,
  Circle
} from 'react-native-svg';
import { useStoreState } from '../../../../store/easy-peasy/hooks';
import { SearchInput } from '../../../../components/inputs';
import { useKeyboard } from '../../../../utils/useKeyboard';
import { trendingJson } from '../../data/trendingJson';
import { recentJson } from '../../data/recentsJson';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-native-shared-element';
import { CommonFlatlist } from '../../../../components/flatlist';
import { searchEnum } from './search.enum'
import { useAuth } from '../../../../hooks/auth';
import { getRequest, queries } from '../../../../react-query';
import { useQuery } from 'react-query';
import Swiper from 'react-native-swiper';
import Picker from '../../../../components/variantpicker';
import RenderHTML, { CustomBlockRenderer, CustomMixedRenderer, CustomTextualRenderer, HTMLContentModel } from 'react-native-render-html';

//@ts-ignore
import { SERVER_BASE_URL } from '@env';
import axios from 'axios';

const debounce = (func: any, delay: any) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


const Search = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const navigation = useNavigation()
  const [input, setInput] = useState<any>({
    query: ""
  })
  const [query, setQuery] = useState('');
  const user = useStoreState((store) => store.user)
  const is_keyboard_enabled = useKeyboard()



  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)
  //const query = useStoreState(store => store.query);
  const { id, token } = useAuth();
  const theme = useColorScheme();

  //const [data, setData] = useState<any[]>([])
  const [type, setType] = useState(searchEnum.INFINITE as string)
  const [page, setPage] = useState(1)
  const [dataa, setDataa] = useState([])

  const fetchSearchResults = async (query: string) => {
    const response = await fetch(`https://adsapi.avniads.com/product/_search?name=${query}*`, {
      method: 'get',
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NzNjZDFlNC04NWI3LTQyZGQtYTQzMC04MTc0YTI2MzkwMjciLCJlbWFpbCI6InB2YWxsYXRAZ21haWwuY29tIiwiaWF0IjoxNjg5NzQ3NjkyLCJleHAiOjE2ODk4MzQwOTJ9.qxHlOFEqETe9soABg0KmTP548A0Qm-j64tG2qcTPFjI' }
    });
    const data = await response.json();
    console.log("data", data)
    setDataa(data.results);
    return data;
  };

  const debouncedSearch = debounce(fetchSearchResults, 300);

  const { data, isLoading, isError, error } = useQuery(
    ['searchResults', input?.query],
    () => debouncedSearch(input?.query),
    {
      enabled: Boolean(input?.query),
    }
  );

  // const onchangeHandler = useCallback((title: string, price: string, src:any) => {
  //   setInput((prevState: any) => ({ ...prevState, selectedTitle: title, selectedPrice: price, selectedImage: src }));
  // }, []);

  const handleInputChange = (value: string, name: string) => {
    setInput({ ...input, [name]: value })

  };



  // const onchangeHandler = (value: string, name: string) => {
  //   if (value !== "") {
  //     try {
  //       const searchResult = trendingJson.filter(item =>
  //         item.name.toLowerCase().includes(value.toLowerCase())
  //       );

  //       setData(searchResult);
  //     } catch (error: any) {
  //       Alert.alert(error.message);
  //     } finally {
  //       setType(searchEnum.SEARCH);
  //       setInput({ ...input, [name]: value });

  //     }
  //   } else {
  //     setType(searchEnum.INFINITE);
  //     setInput({ ...input, [name]: value });
  //     setData(trendingJson); // Restore the full data when the search query is empty
  //   }
  // };


  // useEffect(() => {
  //   setData(trendingJson)
  // }, [trendingJson])


  //flatlist components
  const renderItem = ({ item: dataa }: any) => {
    //console.log("item",dataa)

    return (

      <View style={styles.containerr}>
        <View style={styles.header}>
          <Image style={styles.profileImage} source={{ uri: dataa?.brand?.images[0] }} />
          <Text style={styles.username}>{dataa?.brand.name}</Text>
        </View>
        {/* <View style={styles.slide} >
          <Image source={{ uri: input.selectedImage }}  style={styles.image} />
        </View> */}
        <Swiper style={{ height: 300 }}
          autoplayTimeout={3}  >
          {dataa.variants.map((image: any, index: any) => (
            <View style={styles.slide} key={index}>
              <Image source={{ uri: image.src }} style={styles.image} />
            </View>
          ))}
        </Swiper>
        <View style={{ flexDirection: 'row', marginTop: 10, }}>
          {/* <Picker
            label="Support"
            selectedValue={input.selectedTitle}
            onValueChange={onchangeHandler}
            supportTypes={dataa.variants}
          /> */}
          <ScrollView horizontal={true}>
            <View style={styles.containervariant}>
              {dataa.variants.map((variant: any, index: any) => (
                <TouchableOpacity
                  style={[
                    styles.slidevariant,
                    index === selectedItemIndex && styles.selectedTitle,
                  ]}
                  onPress={() => setSelectedItemIndex(index)}
                  key={index}
                >
                  <Text
                    style={[
                      styles.varianttitle,
                      index === selectedItemIndex && styles.selectedTitle,
                    ]}
                  >
                    {variant.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

        </View>
        <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{flexDirection:'row', gap:20}}>
            <Text style={styles.caption}>{dataa.variants[selectedItemIndex].price}</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.caption}>{dataa.variants[selectedItemIndex].compare_at_price}</Text>
              <View style={{
                width: '130%',
                height: 1,
                backgroundColor: 'black',
                marginTop: -10,
              }} />
            </View>
          </View>

          <TouchableOpacity
              
              style={{
                backgroundColor: '#30D792',
                borderRadius: 10,
                justifyContent: 'center',
                height: hr * 36,
                alignItems: 'center',
                paddingLeft: wr * 8,
                paddingRight: wr * 8,
                marginTop: hr * -6,
              }}

              //@ts-ignore
            >
              <Text
                style={{
                  ...FONTS.paragraph,
                  color: '#ffffff',
                }}>
                Apply
              </Text>
            </TouchableOpacity>
        </View>
        <View style={{ marginTop: 8 }}>
          <RenderHTML
            // contentWidth={width - 20}
            source={{ html: dataa?.body_html }}

            contentWidth={Dimensions.get('window').width - 20} // Adjust padding

          />
        </View>



      </View>
    )
  }

  const renderHeader = () => {
    switch (type) {
      case searchEnum.INFINITE:
        return (
          <View style={{
            marginBottom: 15
          }}>
            <Text style={{ ...FONTS.size14m, color: 'black', letterSpacing: -0.03 }}>
              All Products
            </Text>
          </View>
        )
      case searchEnum.SEARCH:
        return (
          <View style={{
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Text style={{ ...FONTS.size14m, color: 'black', letterSpacing: -0.03 }}>
              Searched Products
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#DBDBDB',
                borderRadius: 5,
                flexDirection: 'row',
                gap: 6,
                padding: 8
              }}
            >

              <Svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <Path d="M8.09991 11.4001C7.84491 11.4001 7.631 11.3137 7.4582 11.1409C7.2854 10.9681 7.19931 10.7545 7.19991 10.5001C7.19991 10.2451 7.28631 10.0312 7.45911 9.8584C7.63191 9.6856 7.84551 9.5995 8.09991 9.6001H9.89991C10.1549 9.6001 10.3688 9.6865 10.5416 9.8593C10.7144 10.0321 10.8005 10.2457 10.7999 10.5001C10.7999 10.7551 10.7135 10.969 10.5407 11.1418C10.3679 11.3146 10.1543 11.4007 9.89991 11.4001H8.09991ZM1.79991 2.4001C1.54491 2.4001 1.33101 2.3137 1.15821 2.1409C0.985405 1.9681 0.899305 1.7545 0.899905 1.5001C0.899905 1.2451 0.986306 1.0312 1.15911 0.858401C1.33191 0.685601 1.54551 0.599501 1.79991 0.600101H16.1999C16.4549 0.600101 16.6688 0.686501 16.8416 0.859301C17.0144 1.0321 17.1005 1.2457 17.0999 1.5001C17.0999 1.7551 17.0135 1.969 16.8407 2.1418C16.6679 2.3146 16.4543 2.4007 16.1999 2.4001H1.79991ZM4.49991 6.9001C4.24491 6.9001 4.03101 6.8137 3.85821 6.6409C3.68541 6.4681 3.59931 6.2545 3.59991 6.0001C3.59991 5.7451 3.68631 5.5312 3.85911 5.3584C4.03191 5.1856 4.24551 5.0995 4.49991 5.1001H13.4999C13.7549 5.1001 13.9688 5.1865 14.1416 5.3593C14.3144 5.5321 14.4005 5.7457 14.3999 6.0001C14.3999 6.2551 14.3135 6.469 14.1407 6.6418C13.9679 6.8146 13.7543 6.9007 13.4999 6.9001H4.49991Z" fill="#5C595F" />
              </Svg>

              <Text style={{ ...FONTS.size12m, color: '#5C595F' }}>Filter</Text>

            </TouchableOpacity>
          </View>
        )
      default:
        return (<View />)
    }
  };

  const renderSeparator = () => <View style={{
    padding: 8
  }} />;

  const renderFooter = () => (
    <View style={styles.footerText}>
      {isLoading && <ActivityIndicator />}
    </View>
  )

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      {/* <Button onPress={() => requestAPI()} title='Refresh' /> */}
    </View>
  )

  const fetchMoreData = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    //api call
  }, [page])


  return (
    <View
      style={styles.container}>

      <View style={{ flexDirection: "row", justifyContent: 'flex-end', gap: 20, alignItems: 'center', padding: 20 }}>
        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <Image
              source={icons.avatar}
              style={{
                width: wr * 38,
                height: hr * 38
              }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>


      <View
        style={{
          position: 'absolute',
          bottom: 0,

          alignSelf: 'center',
          width: SIZES.width * 0.92,
          height: is_keyboard_enabled ? (SIZES.height - 190) : (SIZES.height - 83),
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
          height: is_keyboard_enabled ? (SIZES.height - 250) : (SIZES.height - 95),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#eee',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 20,
          paddingBottom: 50
        }}
      >
        <View style={{
          padding: 0,
          gap: 6,
        }}>

          <Text style={{ ...FONTS.heading, color: 'black' }}>Search</Text>


          <SearchInput
            value={input.query}
            onChangeText={(value: any) => handleInputChange(value, "query")}
            placeholder='What would you like to search?'
          />
        </View>


        {/* search */}
        <View style={{
          flex: 1,
          marginTop: 20,
        }}>

          <CommonFlatlist
            data={dataa}
            ListHeaderComponent={renderHeader}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            keyExtractor={(item: any) => `${item.id}`}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />


        </View>

      </View>


    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerr: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  caption: {
    fontSize: 16,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  containervariant: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidevariant: {
    marginHorizontal: 10,
  },
  varianttitle: {
    textAlign: 'center',
    padding: 10,

  },
  selectedTitle: {
    borderColor: 'blue', // Customize the border color for selected item
    borderWidth: 0.5,
    borderRadius: 10,
  },
})