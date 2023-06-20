import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-native-shared-element';
import {FONTS, icons, SIZES} from '../../../../constants';
import {trendingJson} from '../../data/trendingJson';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';

//@ts-ignore
import {SERVER_BASE_URL} from '@env';
import axios from 'axios';
import moment from 'moment';
import Orbit from '../../../../components/orbit/Orbit';
import { useAuth } from '../../../../hooks/auth';
import { useQuery } from 'react-query';
import { getRequest, queries } from '../../../../react-query';

const Item = ({title, description}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const Site = () => {

  const query = useStoreState(store => store.query);
  const {id, token} = useAuth();

  const {data = [], isLoading} = useQuery(
    [queries.category],
    () =>
      getRequest(
        `${SERVER_BASE_URL}/earning?userId=${
          id
        }&type=site&date=${moment(query).format('YYYY-MM')}`,
        token,
      ),
    {
      enabled: !!id && !!token && !!query,
    },
  );


  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No earnings for this month</Text>
      {/* <Button onPress={() => requestAPI()} title='Refresh' /> */}
    </View>
  );

  const renderItem = ({item: data, index}: any) => {
    const dateStringg = data?.name;
    const nameInitial = dateStringg ? dateStringg.charAt(0).toUpperCase() : '';

    const dateString = data?.createdAt;
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
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
            marginTop: 10,
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
                gap: 10,
              }}>
              <Image
                source={{
                  uri: data?.icon,
                }}
                style={{
                  width: wr * 23,
                  height: hr * 23,
                }}
                resizeMode="contain"
              />

              {/* <View style={styles.circle}>
                                <Text style={styles.initial}>{nameInitial}</Text>
                            </View> */}
              <View style={{gap: 5}}>
                <Text style={{...FONTS.h4, color: '#000000'}}>
                  {data?.name}
                </Text>
                {/* <Text style={{ ...FONTS.size10m, color: '#5C595F' }}>
                                    {formattedDate}</Text> */}
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <Image
              style={{height: 16, width: 16}}
              source={icons.coin}
              resizeMode="contain"
            />
            <Text
              style={{...FONTS.size12s, color: '#5C595F', marginRight: wr * 3}}>
              {data?.totalrewardedamount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    <View></View>;
  }

  return (
    <View  style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingLeft: 0}}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        nestedScrollEnabled={true}
        keyExtractor={({id}) => id}
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
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Site;
