import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, Animated } from 'react-native'
import { SharedElement } from 'react-native-shared-element';
import { trendingJson } from '../data/trendingJson'
import { COLORS, FONTS, SIZES, icons, TYPES, images } from '../../../constants'
import Svg, {
  Path,
  Circle
} from 'react-native-svg'
import { useStoreActions, useStoreState } from '../../../store/easy-peasy/hooks';
import { useNavigation } from '@react-navigation/native';
import FaqAccordion from './faq';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import SwipeButton from "../../../components/swipe"
import Instruction from '../../../components/instruction';


let DURATION = 400

const Detail = ({ route: { params: { id } } }: { route: { params: { id: string } } }) => {
  const navigation = useNavigation()
  const trending: any = trendingJson.find((x) => x.id === id)
  const user = useStoreState((store) => store.user)
  const [toggled, setToggled] = useState(false);


  let offerKeys = Object.keys(trending.offer);
  let { offer } = trending


  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)


  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingTop: 30,
          paddingBottom: 30,
          paddingLeft: 25,
          paddingRight: 25
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
          width: wr * (SIZES.width * 0.92),
          height:(SIZES.height - 70),
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
          height: (SIZES.height - 82),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFFFFF',

        }}
      >

        {/* @ts-ignore */}
        <View  >
          <Image
            source={trending.banner}
            style={{
              width: SIZES.width,
              height: 255,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}
            resizeMode='cover'
          />
          <Animatable.View
            animation="bounceIn"
            delay={DURATION}
            style={{
              position: 'absolute',
              right: 15,
              top: 15,
              padding: 8,
              borderRadius: 4,
              backgroundColor: '#30D792'
            }}>
            <Text>{trending.percentDiscount} OFF</Text>
          </Animatable.View>
        </View>

        <ScrollView
          style={{
            marginBottom: 5
          }}
          showsVerticalScrollIndicator={false}>


          {/* title */}
          <View
            style={{
              padding: 10,
              gap: 8
            }}>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16
              }}>
                <Image
                  source={trending.icon}
                  style={{
                    width: 48,
                    height: 48
                  }}
                  resizeMode='cover'
                />

                <Text style={{ ...FONTS.size17m, color: '#000000', letterSpacing: -0.03 }}>
                  {trending.name}</Text>

              </View>

              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: '#DBDBDB'
                }}
              >
                <Text style={{ ...FONTS.size14m, letterSpacing: -0.03, color: '#5C595F', marginRight: 3 }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>

              {offerKeys.map((key, index) => {
                return (
                  <Animatable.View
                    key={index}
                    animation="bounceIn"
                    delay={DURATION + index * 100}
                    style={{ gap: 6, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.size12m, letterSpacing: -0.03, color: '#5C595F' }}>{offer[key]}</Text>
                    {offerKeys.length - 1 > index && (
                      <View
                        style={{
                          height: 4,
                          width: 4,
                          backgroundColor: '#5C595F',
                          borderRadius: 100
                        }}
                      />
                    )}
                  </Animatable.View>
                )
              })}

            </View>


          </View>

          <Animatable.View
            animation="fadeInUp"
            delay={DURATION}
          >

            {/* point */}
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              {toggled && (
                <View
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 5,
                    paddingVertical: 7,
                    alignItems: 'center',
                    borderStyle: 'dotted',
                    justifyContent: 'center',
                    borderColor: '#000',
                    backgroundColor: '#E8FFF5',
                    borderRadius: 10,
                    gap: 4

                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',

                    }}>

                    <Image
                      source={images.qr}
                      style={{
                        width: wr * 203,
                        height: hr * 205,
                      }}
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    style={{
                      gap: 40,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ ...FONTS.size12m, color: '#000000' }}>
                      1x32314sasb
                    </Text>


                    <TouchableOpacity
                      style={{
                        backgroundColor: true ? '#30D792' : "#DBDBDB",
                        borderRadius: 10,
                        justifyContent: 'center',
                        height: 28,
                        width: 80,
                        alignItems: 'center',


                      }}

                    //@ts-ignore

                    >
                      <Text style={{
                        ...FONTS.category,
                        color: '#fff'
                      }}>Copy Code</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

            </View>

            <View
              style={{
                marginTop: 10,
                paddingRight: 20,
                paddingLeft: 20
              }}>
              <SwipeButton swipe={[toggled, setToggled]} />
            </View>



            {/* faq */}
            <View
              style={{
                marginTop: 30,
                paddingHorizontal: 20,
                gap: 10
              }}>
              {
                trending.instructions?.map(({ title, points,  }: { title: string, points: [] }, index: number) => {
                  return (
                    <Instruction title={title} points={points}  key={index}/>
                  )
                })
              }

            </View>
          </Animatable.View>
        </ScrollView>
      </View>

    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792'
  }
})