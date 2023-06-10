import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { images, SIZES } from '../../constants';

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const MailPointList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={images.mailpoints}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>Milestone Rewards</Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
         source={images.mailgiftbox}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>Surprise Gifts</Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
           source={images.mailcoupon}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>Brand Offers</Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
           source={images.mailbnb}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>Tokens</Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
             source={images.mailcard}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>NFTs</Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
             source={images.mailededition}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>Limited Edition Collections</Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
             source={images.mailexclusive}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>Exclusive Events Tickets</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hr*30,
    marginLeft: wr*20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hr*15,
  },
  image: {
    width: wr*20,
    height: hr*20,
    marginRight: hr*5,
  },
  item: {
    fontSize: 16,
    color:'gray'
  },
});

export default MailPointList;
