import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-native-shared-element';
import PieChart from '../../../../components/piechart/PieChart';
import {FONTS} from '../../../../constants';
import {trendingJson} from '../../data/trendingJson';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';

//@ts-ignore
import {SERVER_BASE_URL} from '@env';
import axios from 'axios';
import moment from 'moment';
import {useAuth} from '../../../../hooks/auth';
import {useQuery} from 'react-query';
import {getRequest, queries} from '../../../../react-query';

const food = [
  {category: 'Food & Beverages', totalRewardedAmount: 20, color: '#FF0000'},
  {category: 'Entertainment', totalRewardedAmount: 10, color: '#FFA500'},
  {category: 'Travel', totalRewardedAmount: 80, color: '#FFFF00'},
  {category: 'Savings', totalRewardedAmount: 30, color: '#aaaaaa'},
];

const Item = ({title, description}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const Category = () => {
  const query = useStoreState(store => store.query);

  const {id, token} = useAuth();

  const {data = [], isLoading} = useQuery(
    [queries.category],
    () =>
      getRequest(
        `${SERVER_BASE_URL}/earning?userId=${id}&type=category&date=${moment(
          query,
        ).format('YYYY-MM')}`,
        token,
      ),
    {
      enabled: !!id && !!token && !!query,
    },
  );

  return (
    <View style={styles.container}>
      <PieChart data={data} />
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

export default Category;
