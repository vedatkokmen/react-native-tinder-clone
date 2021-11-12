import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';

const Card = ({user}) => {
  const {name, bio, image} = user;

  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: image,
        }}>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: '70%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  bio: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 25,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '20%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    paddingHorizontal: 10,
  },
});

export default Card;
