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
  const {user, query}: {user: any; query: Date} = useStoreState(store => store);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {data} = await axios({
          method: 'GET',
          url: `${SERVER_BASE_URL}/earning?userId=${
            user.id
          }&type=category&date=${moment(query).format('YYYY-MM')}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setData(data);

        //console.log("cat", data)
      } catch (error) {
        console.log(error);
      }
    };

    if (user.token) {
      user.token && fetchCategories();
    }
  }, [user.token]);

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
