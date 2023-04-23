import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, SIZES, FONTS } from '../../../constants'
import Dropdown from './Dropdown'
import { Langauge } from './types'
import { useNavigation } from '@react-navigation/native';
import Loading from '../../../components/Loading'
import RingWave from '../../../components/RingWave'


const Language = () => {

  const navigation = useNavigation()

  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)

  const [screen, setScreen] = useState(1)

  // console.log("wr", wr)
  // console.log("hr", hr)

  const [lang, setLang] = useState<Langauge>({
    code: '',
    dail_code: '',
    name: '',
    image: '',
    language: ''
  })

  const onDropdownHandler = (data: any) => {
    setLang(data)
  }

  switch (screen) {
    case 1:

      return (
        <View style={styles.container}>

          <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: hr * 47 }}>
            <Image
              source={icons.avni_logo}
              style={{
                width: wr * 77,
                height: hr * 105
              }}
            />
          </View>


          <View
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              width: SIZES.width * 0.92,
              height: hr * 620,
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
              height: hr * 610,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#FFFFFF',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 36
            }}
          >

            <View>
              <Text style={{ ...FONTS.heading, color: 'black' }}>Langauge</Text>
              <Text style={{ ...FONTS.paragraph, color: '#5C595F' }}>Please select your Language</Text>
              <Dropdown language={lang} onPress={onDropdownHandler} />
            </View>

            <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: 40 }}>
              {/* back */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#DBDBDB',
                  width: 60,
                  borderRadius: 100,
                  padding: 8,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 40
                }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icons.back}
                  style={{
                    width: 33,
                    height: 22,
                  }}
                  resizeMode="contain"
                />

              </TouchableOpacity>

              {/* next */}
              <TouchableOpacity
                style={{
                  backgroundColor: lang.code !== "" ? '#30D792' : "#DBDBDB",
                  padding: 8,
                  borderRadius: 100,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                disabled={lang.code === ""}
                //@ts-ignore
                onPress={() => navigation.navigate('Phone', {
                  user: { language: lang.language, countryCode: lang.code, callingCode: lang.dail_code }
                })}
              >
                <Image
                  source={icons.next}
                  style={{
                    width: 33,
                    height: 22,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

          </View>


        </View>
      )
    case 2:
      return (
        <Loading />
      )

    default:
      return (
        <RingWave />
      )
  }
}

export default Language

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792'
  }
})