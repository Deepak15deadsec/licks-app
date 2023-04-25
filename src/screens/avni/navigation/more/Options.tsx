import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import Svg, {
  Path,
  Circle
} from 'react-native-svg'
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';
import { useNavigation } from '@react-navigation/native';

const Options = () => {
  const removeUser = useStoreActions((store) => store.removeUser)
  const navigation = useNavigation()
  
  return (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      

    }}>

     

      <View style={{
        flexDirection: 'column',
        position: 'relative',
        bottom: 0,
        top: 10,
        rowGap: 22,

      }}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Profile' as never)}
          style={{
            flexDirection: 'row',
            backgroundColor: '#30D792',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            borderRadius: 12
          }}
        >

          <View
          
          style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Svg width="14" height="13" viewBox="0 0 14 13" fill="none" >
              <Path fillRule="evenodd" clipRule="evenodd" d="M10.5 3.36588e-09C11.0356 -3.07824e-05 11.5511 0.211124 11.9408 0.59026C12.3305 0.969397 12.5651 1.48786 12.5965 2.03956L12.6 2.16667V5.30833L13.0158 5.11767C13.4456 4.9205 13.9412 5.226 13.9958 5.694L14 5.77778V11.5556C14.0001 11.92 13.8667 12.271 13.6266 12.5382C13.3864 12.8054 13.0572 12.9691 12.705 12.9964L12.6 13H1.4C1.0468 13.0001 0.706603 12.8625 0.447616 12.6147C0.188629 12.3669 0.0299903 12.0273 0.00350008 11.6639L0 11.5556V5.77778C0 5.29244 0.4725 4.94939 0.9079 5.08806L0.9849 5.11767L1.4 5.30833V2.16667C1.39997 1.61401 1.60463 1.08224 1.9721 0.680145C2.33957 0.278051 2.84207 0.0360335 3.3768 0.0036112L3.5 3.36588e-09H10.5ZM12.6 6.88928L7.5684 9.19606C7.38945 9.27808 7.19581 9.32046 7 9.32046C6.80419 9.32046 6.61055 9.27808 6.4316 9.19606L1.4 6.89V11.5556H12.6V6.88928ZM10.5 1.44444H3.5C3.31435 1.44444 3.1363 1.52054 3.00503 1.65598C2.87375 1.79142 2.8 1.97512 2.8 2.16667V5.95039L7 7.87656L11.2 5.95039V2.16667C11.2 1.97512 11.1263 1.79142 10.995 1.65598C10.8637 1.52054 10.6857 1.44444 10.5 1.44444ZM7 3.61111C7.17842 3.61132 7.35002 3.6818 7.47976 3.80817C7.60949 3.93453 7.68756 4.10724 7.69802 4.29101C7.70848 4.47477 7.65053 4.65572 7.53602 4.79688C7.4215 4.93804 7.25907 5.02876 7.0819 5.0505L7 5.05556H5.6C5.42158 5.05535 5.24998 4.98487 5.12024 4.8585C4.99051 4.73213 4.91244 4.55942 4.90198 4.37566C4.89152 4.1919 4.94947 4.01095 5.06398 3.86979C5.1785 3.72863 5.34093 3.63791 5.5181 3.61617L5.6 3.61111H7Z" fill="#fff" />
            </Svg>

            <Text style={{
              ...FONTS.size16m,
              color: '#fff'
            }}>Profile</Text>
          </View>

          <View>
            <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <Path d="M0.348991 13.801C0.11633 13.5683 0 13.2722 0 12.9127C0 12.5531 0.11633 12.257 0.348991 12.0243L5.29832 7.075L0.348991 2.12567C0.11633 1.89301 0 1.5969 0 1.23733C0 0.877765 0.11633 0.581651 0.348991 0.348991C0.581651 0.11633 0.877765 0 1.23733 0C1.5969 0 1.89301 0.11633 2.12567 0.348991L7.96334 6.18666C8.09025 6.31356 8.18035 6.45105 8.23365 6.5991C8.28695 6.74716 8.31318 6.90579 8.31233 7.075C8.31233 7.24421 8.28568 7.40284 8.23238 7.5509C8.17908 7.69895 8.0894 7.83643 7.96334 7.96334L2.12567 13.801C1.89301 14.0337 1.5969 14.15 1.23733 14.15C0.877765 14.15 0.581651 14.0337 0.348991 13.801Z" fill="white" />
            </Svg>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.navigate('Support' as never)}
          style={{
            flexDirection: 'row',
            backgroundColor: '#30D792',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            borderRadius: 12
          }}
        >

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>

            <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <Path d="M7 0C3.1402 0 0 3.1402 0 7V9.9001C0 10.6169 0.6279 11.2 1.4 11.2H2.1C2.28565 11.2 2.4637 11.1263 2.59497 10.995C2.72625 10.8637 2.8 10.6857 2.8 10.5V6.8999C2.8 6.71425 2.72625 6.5362 2.59497 6.40492C2.4637 6.27365 2.28565 6.1999 2.1 6.1999H1.4644C1.8536 3.4909 4.1846 1.4 7 1.4C9.8154 1.4 12.1464 3.4909 12.5356 6.1999H11.9C11.7143 6.1999 11.5363 6.27365 11.405 6.40492C11.2737 6.5362 11.2 6.71425 11.2 6.8999V11.2C11.2 11.9721 10.5721 12.6 9.8 12.6H8.4V11.9H5.6V14H9.8C11.3442 14 12.6 12.7442 12.6 11.2C13.3721 11.2 14 10.6169 14 9.9001V7C14 3.1402 10.8598 0 7 0Z" fill="#fff" />
            </Svg>
            <Text style={{
              ...FONTS.size16m,
              color: '#fff'
            }}>Support</Text>

          </View>

          <View>
            <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <Path d="M0.348991 13.801C0.11633 13.5683 0 13.2722 0 12.9127C0 12.5531 0.11633 12.257 0.348991 12.0243L5.29832 7.075L0.348991 2.12567C0.11633 1.89301 0 1.5969 0 1.23733C0 0.877765 0.11633 0.581651 0.348991 0.348991C0.581651 0.11633 0.877765 0 1.23733 0C1.5969 0 1.89301 0.11633 2.12567 0.348991L7.96334 6.18666C8.09025 6.31356 8.18035 6.45105 8.23365 6.5991C8.28695 6.74716 8.31318 6.90579 8.31233 7.075C8.31233 7.24421 8.28568 7.40284 8.23238 7.5509C8.17908 7.69895 8.0894 7.83643 7.96334 7.96334L2.12567 13.801C1.89301 14.0337 1.5969 14.15 1.23733 14.15C0.877765 14.15 0.581651 14.0337 0.348991 13.801Z" fill="white" />
            </Svg>
          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#30D792',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            borderRadius: 12
          }}
        >

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>

            <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <Path d="M1.45833 14C1.05729 14 0.713855 13.8628 0.428022 13.5884C0.142189 13.314 -0.000484873 12.9845 1.23797e-06 12.6V1.4C1.23797e-06 1.015 0.142918 0.685301 0.428751 0.410901C0.714584 0.136501 1.05778 -0.000465478 1.45833 1.18846e-06H7.29167L11.6667 4.2V7H10.2083V4.9H6.5625V1.4H1.45833V12.6H5.83333V14H1.45833ZM10.4271 8.7675L11.2109 9.52L8.38542 12.215V12.95H9.15104L11.9766 10.255L12.7422 10.99L9.60677 14H7.29167V11.7775L10.4271 8.7675ZM12.7422 10.99L10.4271 8.7675L11.4844 7.7525C11.6181 7.62417 11.7882 7.56 11.9948 7.56C12.2014 7.56 12.3715 7.62417 12.5052 7.7525L13.7995 8.995C13.9332 9.12333 14 9.28667 14 9.485C14 9.68333 13.9332 9.84667 13.7995 9.975L12.7422 10.99Z" fill="#fff" />
            </Svg>
            <Text style={{
              ...FONTS.size16m,
              color: '#fff'
            }}>Terms & Conditions</Text>

          </View>

          <View>
            <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <Path d="M0.348991 13.801C0.11633 13.5683 0 13.2722 0 12.9127C0 12.5531 0.11633 12.257 0.348991 12.0243L5.29832 7.075L0.348991 2.12567C0.11633 1.89301 0 1.5969 0 1.23733C0 0.877765 0.11633 0.581651 0.348991 0.348991C0.581651 0.11633 0.877765 0 1.23733 0C1.5969 0 1.89301 0.11633 2.12567 0.348991L7.96334 6.18666C8.09025 6.31356 8.18035 6.45105 8.23365 6.5991C8.28695 6.74716 8.31318 6.90579 8.31233 7.075C8.31233 7.24421 8.28568 7.40284 8.23238 7.5509C8.17908 7.69895 8.0894 7.83643 7.96334 7.96334L2.12567 13.801C1.89301 14.0337 1.5969 14.15 1.23733 14.15C0.877765 14.15 0.581651 14.0337 0.348991 13.801Z" fill="white" />
            </Svg>
          </View>


        </TouchableOpacity>


        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#30D792',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            borderRadius: 12
          }}
        >


          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Svg width="14" height="13" viewBox="0 0 14 13" fill="none" >
              <Path fillRule="evenodd" clipRule="evenodd" d="M10.5 3.36588e-09C11.0356 -3.07824e-05 11.5511 0.211124 11.9408 0.59026C12.3305 0.969397 12.5651 1.48786 12.5965 2.03956L12.6 2.16667V5.30833L13.0158 5.11767C13.4456 4.9205 13.9412 5.226 13.9958 5.694L14 5.77778V11.5556C14.0001 11.92 13.8667 12.271 13.6266 12.5382C13.3864 12.8054 13.0572 12.9691 12.705 12.9964L12.6 13H1.4C1.0468 13.0001 0.706603 12.8625 0.447616 12.6147C0.188629 12.3669 0.0299903 12.0273 0.00350008 11.6639L0 11.5556V5.77778C0 5.29244 0.4725 4.94939 0.9079 5.08806L0.9849 5.11767L1.4 5.30833V2.16667C1.39997 1.61401 1.60463 1.08224 1.9721 0.680145C2.33957 0.278051 2.84207 0.0360335 3.3768 0.0036112L3.5 3.36588e-09H10.5ZM12.6 6.88928L7.5684 9.19606C7.38945 9.27808 7.19581 9.32046 7 9.32046C6.80419 9.32046 6.61055 9.27808 6.4316 9.19606L1.4 6.89V11.5556H12.6V6.88928ZM10.5 1.44444H3.5C3.31435 1.44444 3.1363 1.52054 3.00503 1.65598C2.87375 1.79142 2.8 1.97512 2.8 2.16667V5.95039L7 7.87656L11.2 5.95039V2.16667C11.2 1.97512 11.1263 1.79142 10.995 1.65598C10.8637 1.52054 10.6857 1.44444 10.5 1.44444ZM7 3.61111C7.17842 3.61132 7.35002 3.6818 7.47976 3.80817C7.60949 3.93453 7.68756 4.10724 7.69802 4.29101C7.70848 4.47477 7.65053 4.65572 7.53602 4.79688C7.4215 4.93804 7.25907 5.02876 7.0819 5.0505L7 5.05556H5.6C5.42158 5.05535 5.24998 4.98487 5.12024 4.8585C4.99051 4.73213 4.91244 4.55942 4.90198 4.37566C4.89152 4.1919 4.94947 4.01095 5.06398 3.86979C5.1785 3.72863 5.34093 3.63791 5.5181 3.61617L5.6 3.61111H7Z" fill="#fff" />
            </Svg>
            <Text style={{
              ...FONTS.size16m,
              color: '#fff'
            }}>Invite a Friend</Text>
          </View>

          <View>
            <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <Path d="M0.348991 13.801C0.11633 13.5683 0 13.2722 0 12.9127C0 12.5531 0.11633 12.257 0.348991 12.0243L5.29832 7.075L0.348991 2.12567C0.11633 1.89301 0 1.5969 0 1.23733C0 0.877765 0.11633 0.581651 0.348991 0.348991C0.581651 0.11633 0.877765 0 1.23733 0C1.5969 0 1.89301 0.11633 2.12567 0.348991L7.96334 6.18666C8.09025 6.31356 8.18035 6.45105 8.23365 6.5991C8.28695 6.74716 8.31318 6.90579 8.31233 7.075C8.31233 7.24421 8.28568 7.40284 8.23238 7.5509C8.17908 7.69895 8.0894 7.83643 7.96334 7.96334L2.12567 13.801C1.89301 14.0337 1.5969 14.15 1.23733 14.15C0.877765 14.15 0.581651 14.0337 0.348991 13.801Z" fill="white" />
            </Svg>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#30D792',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            borderRadius: 12
          }}
        >
          <TouchableOpacity
          onPress={() => removeUser()}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path d="M3.88894 3.33328H12.7778V8.77772H13.8889V3.33328C13.8889 3.03859 13.7719 2.75598 13.5635 2.5476C13.3551 2.33923 13.0725 2.22217 12.7778 2.22217H3.88894C3.59426 2.22217 3.31164 2.33923 3.10327 2.5476C2.8949 2.75598 2.77783 3.03859 2.77783 3.33328V16.6666C2.77783 16.9613 2.8949 17.2439 3.10327 17.4523C3.31164 17.6607 3.59426 17.7777 3.88894 17.7777H12.7778C13.0725 17.7777 13.3551 17.6607 13.5635 17.4523C13.7719 17.2439 13.8889 16.9613 13.8889 16.6666H3.88894V3.33328Z" fill="#fff" />
              <Path d="M15.6446 9.5999C15.5383 9.50888 15.4016 9.46132 15.2618 9.46672C15.122 9.47212 14.9893 9.53009 14.8904 9.62903C14.7915 9.72797 14.7335 9.8606 14.7281 10.0004C14.7227 10.1402 14.7702 10.277 14.8613 10.3832L16.739 12.2221H8.68349C8.53614 12.2221 8.39484 12.2806 8.29065 12.3848C8.18646 12.489 8.12793 12.6303 8.12793 12.7777C8.12793 12.925 8.18646 13.0663 8.29065 13.1705C8.39484 13.2747 8.53614 13.3332 8.68349 13.3332H16.739L14.8613 15.2555C14.8031 15.3053 14.7559 15.3665 14.7225 15.4355C14.6892 15.5044 14.6704 15.5795 14.6675 15.656C14.6645 15.7325 14.6774 15.8088 14.7054 15.8801C14.7333 15.9514 14.7756 16.0161 14.8298 16.0703C14.8839 16.1244 14.9487 16.1668 15.02 16.1947C15.0913 16.2226 15.1676 16.2355 15.2441 16.2326C15.3206 16.2296 15.3957 16.2109 15.4646 16.1775C15.5335 16.1442 15.5948 16.0969 15.6446 16.0388L18.889 12.8166L15.6446 9.5999Z" fill="#fff" />
            </Svg>
            <Text style={{
              ...FONTS.size16m,
              color: '#fff'
            }}>Logout</Text>
          </TouchableOpacity>
          <View>
            <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <Path d="M0.348991 13.801C0.11633 13.5683 0 13.2722 0 12.9127C0 12.5531 0.11633 12.257 0.348991 12.0243L5.29832 7.075L0.348991 2.12567C0.11633 1.89301 0 1.5969 0 1.23733C0 0.877765 0.11633 0.581651 0.348991 0.348991C0.581651 0.11633 0.877765 0 1.23733 0C1.5969 0 1.89301 0.11633 2.12567 0.348991L7.96334 6.18666C8.09025 6.31356 8.18035 6.45105 8.23365 6.5991C8.28695 6.74716 8.31318 6.90579 8.31233 7.075C8.31233 7.24421 8.28568 7.40284 8.23238 7.5509C8.17908 7.69895 8.0894 7.83643 7.96334 7.96334L2.12567 13.801C1.89301 14.0337 1.5969 14.15 1.23733 14.15C0.877765 14.15 0.581651 14.0337 0.348991 13.801Z" fill="white" />
            </Svg>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Options

const styles = StyleSheet.create({})