import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, useColorScheme, ScrollView, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '../../../../constants';
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

const Search = () => {

  const navigation = useNavigation()
  const [input, setInput] = useState({
    query: ""
  })

  const user = useStoreState((store) => store.user)
  const is_keyboard_enabled = useKeyboard()

  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)

  const theme = useColorScheme();

  const onchangeHandler = (value: string, name: string) => {

    setInput({ ...input, [name]: value })
  }

  const renderItem = ({ item }: any) => {
    return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>

        <Image
          source={item.icon}
          style={{
            width: wr * 40,
            height: hr * 40
          }}
        />

        <Text
          style={{ ...FONTS.size14r, color: 'black' }}>
          {item.search}
        </Text>

      </View>

      <View>
        <Image
          source={item.recent}
          style={{
            width: wr * 20,
            height: hr * 20
          }}
        />
      </View>

    </TouchableOpacity>)
  }


  const renderHeader = () => {
    return (
      <View style={{
        marginBottom: 15
      }}>
        <Text style={{ ...FONTS.size14m, color: 'black', letterSpacing: -0.03 }}>
          Recent Search:
        </Text>
      </View>
    );
  };

  const renderSeparator = () => <View style={{
    padding: 8
  }} />;


  return (
    <View
      style={styles.container}>

      <View style={{ flexDirection: "row", justifyContent: 'flex-end', gap: 20, alignItems: 'center', padding: 20 }}>
        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg>

          <TouchableOpacity>
            <Image
              source={icons.avatar}
              style={{
                width: 38,
                height: 38
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
          top: 68,
          alignSelf: 'center',
          width: SIZES.width * 0.92,
          height: is_keyboard_enabled ? hr * (SIZES.height - 190) : hr * (SIZES.height - 20),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#ffffff80',
        }}
      />


      <View
        style={{
          position: 'absolute',
          bottom: 0,
          top: 80,
          width: SIZES.width,
          height: is_keyboard_enabled ? hr * (SIZES.height - 200) : hr * (SIZES.height - 30),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFFFFF',
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
            onChangeText={(value: any) => onchangeHandler(value, "query")}
            placeholder='What would you like to search?'
          />
        </View>


        {/* search */}
        <View style={{
          flex: 1,
          marginTop: 20,
        }}>

          <FlatList
          showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListHeaderComponent={renderHeader}
            data={recentJson}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={item => `${item.id}`}
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
  }
})