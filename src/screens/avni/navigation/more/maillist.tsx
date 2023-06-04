import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';
import { useNavigation } from '@react-navigation/native';

//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import { FONTS, icons, SIZES } from '../../../../constants';
import Svg, { Path } from 'react-native-svg';

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const Item = ({ title, description }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const maillist = () => {
  const [data, setData] = useState([]);
  const user = useStoreState((store) => store.user)
  const navigation = useNavigation()
 

  useEffect(() => {
    const fetchMailid = async () => {

      try {
        const { data } = await axios({
          method: "GET",
          url: `${SERVER_BASE_URL}/forward-mail?userId=${user.id}`,
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        })

        setData(data)
        //console.log("Mail data length:", data);
      

      } catch (error) {
        console.log(error)

      }
    }


    fetchMailid()


  }, [])


  const deleteId = async (prop: any) => {

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${user.token}`);

      var raw = JSON.stringify({
        "active": false
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let response = await fetch(`${SERVER_BASE_URL}/forward-mail/${prop}`, requestOptions)



    } catch (error) {
      console.log(error)
    }
    finally {
      navigation.goBack()
    }

  }



  const renderItem = ({ item: data, index }: any) => {

    const dateString = data.updatedAt;
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });


    return (
      <TouchableOpacity
        key={index}

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
                  uri: data?.picture,
                }}

                style={{
                  width: wr * 23,
                  height: hr * 23
                }}
                resizeMode='contain'
              />

              <View

              >
                <Text style={{ ...FONTS.h4, color: '#000000' }}>
                  {data?.name} </Text>

                <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                  {data?.email}</Text>
              </View>



            </View>



          </View>

          <View>
            <TouchableOpacity
              onPress={() => deleteId(data?.id)}
              style={{
                backgroundColor: true ? '#30D792' : "#DBDBDB",
                borderRadius: 10,
                justifyContent: 'center',
                height: 32,
                alignItems: 'center',
               
                padding:8
              }}

            //@ts-ignore

            >
              <Text style={{
                ...FONTS.paragraph,
                color: '#fff'
              }}>Delete</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingTop: Platform.OS === 'android' ? hr * 30 : hr * 50,
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
          width: SIZES.width * 0.92,
          height: Platform.OS === 'android' ? (SIZES.height - 83) : (SIZES.height - 110),
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
          height: Platform.OS === 'android' ? (SIZES.height - 95) : (SIZES.height - 123),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#eeeeee',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 20,
          paddingBottom: 50,
          gap: 5

        }}
      >

        <View style={{
          padding: 0,
          gap: 6,
        }}>

          <Text style={{ ...FONTS.heading, color: 'black', marginBottom: 8 }}>Mail ids</Text>

        </View>
        {/* 
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            
              <LottieView source={images.loader} autoPlay loop />

          </View> */}


        <FlatList
          contentContainerStyle={{ paddingLeft: 0 }}
          showsVerticalScrollIndicator={false}
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


        <TouchableOpacity
          onPress={() => navigation.navigate('Google' as never)}
          style={{
            backgroundColor: true ? '#30D792' : "#DBDBDB",
            borderRadius: 10,
            justifyContent: 'center',
            height: 52,
            alignItems: 'center',
            marginTop: 10
          }}

        //@ts-ignore

        >
          <Text style={{
            ...FONTS.paragraph,
            color: '#fff'
          }}>ADD</Text>
        </TouchableOpacity>
      </View>


    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792',
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

export default maillist