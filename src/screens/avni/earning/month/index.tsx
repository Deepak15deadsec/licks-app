import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import { FONTS, icons, images, SIZES } from '../../../../constants';
import { trendingJson } from '../../data/trendingJson';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';
import { formatDate } from '../../../../utils/formatDate';
import LottieView from 'lottie-react-native';

//@ts-ignore
import { SERVER_BASE_URL } from '@env';
import axios from 'axios';
import moment from 'moment';
import Orbit from '../../../../components/orbit/Orbit';
import { useAuth } from '../../../../hooks/auth';

const Item = ({ title, description }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const Month = () => {
  const { user, query }: { user: any; query: Date } = useStoreState(store => store);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { id, token } = useAuth()

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      // const to = formatDate(query)

      try {

        const { data } = await axios({
          method: 'GET',
          url: `${SERVER_BASE_URL}/earning?userId=${id
            }&type=month&date=${moment(query).format('YYYY-MM')}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(data);
        //console.log('monthdate', data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (token && query && id) {
      fetchEarnings();
    }
  }, [query, id, token]);

  // const handleRefresh = () => {
  //     setRefreshing(true);
  //     fetchEarnings();
  // };

  const renderItem = ({ item: data, index }: any) => {
    const dateStringg = data?.name;
    const nameInitial = dateStringg ? dateStringg.charAt(0).toUpperCase() : '';

    const dateString = data?.createdAt;
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });

    const subtext = data?.description;
    const maxLength = 30;

    let truncatedText = subtext.slice(0, maxLength);
    if (subtext.length > maxLength) {
      truncatedText += "...";
    }

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
          <View
            style={{
              gap: 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              {data?.name !== null && (
                <Image
                  source={{
                    uri: `https://www.google.com/s2/favicons?sz=256&domain=${data?.name}`,
                  }}
                  style={{
                    width: wr * 23,
                    height: hr * 23,
                  }}
                  resizeMode="contain"
                />
              )}

              {data?.name === null && (
                <Image
                  source={{
                    uri: `https://www.google.com/s2/favicons?sz=256&domain=avni.club`,
                  }}
                  style={{
                    width: wr * 23,
                    height: hr * 23,
                  }}
                  resizeMode="contain"
                />
              )}

              {/* <View style={styles.circle}>
                                <Text style={styles.initial}>{nameInitial}</Text>
                            </View> */}
              <View style={{ gap: 5 }}>
                <Text style={{ ...FONTS.earning, color: '#000000' }}>
                  {truncatedText}
                </Text>
                <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                  {formattedDate}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Image
              style={{ height: hr * 16, width: wr * 16 }}
              source={icons.coin}
              resizeMode="contain"
            />
            <Text
              style={{ ...FONTS.size12s, color: '#5C595F', marginRight: wr * 3 }}>
              {data?.rewardedAmount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text> No earnings for this month</Text>
      {/* <Button onPress={() => requestAPI()} title='Refresh' /> */}
    </View>
  );

  if (isLoading) {
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {/* <ActivityIndicator size={100} color="red" /> */}
      <LottieView source={images.loader} autoPlay loop />
    </View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingLeft: 0 }}
        data={data}
        renderItem={renderItem}
        nestedScrollEnabled={true}
        ListEmptyComponent={renderEmpty}
        // refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        // }
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                padding: 10,
              }}
            />
          );
        }}
        ListFooterComponent={
          <>
            <Orbit />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginBottom: hr * 5,
  },
  initial: {
    fontSize: 20,
    color: 'white',
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Month;
