// screens/UserScreen.js
import React, {useState, useEffect, Component} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
const UserScreen = () => {
  const [userArr, setUserArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getCollection();

      return () => null;
    }, []),
  );

  // useEffect(() => {
  //   getCollection();
  // }, []);

  getCollection = async () => {

    const userArr = [];
    await firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(res => {
          const {name, email, mobile} = res.data();

          userArr.push({
            key: res.id,
            res,
            name,
            email,
            mobile,
          });
        });
      });
    setIsLoading(false);
    console.log(' we cone hgere')
    console.log(isLoading)
    setUserArr(userArr);
    // this.setState({
    //   userArr,
    //   isLoading: false,
    // });
  };
  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {userArr.map((res, i) => {
        return (
          <ListItem
            key={i}
            onPress={() => {
              navigation.navigate('UserDetailScreen', {
                userkey: res.key,
              });
            }}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{res.name}</ListItem.Title>
              <ListItem.Subtitle>
                {res.email} and mobile : {res.mobile}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="black" />
          </ListItem>
        );
      })}
    </ScrollView>
  );
  // const renderItem = () => {
  //   if (this.state.isLoading) {
  //     return (
  //       <View style={styles.preloader}>
  //         <ActivityIndicator size="large" color="#9E9E9E" />
  //       </View>
  //     );
  //   }

  //   return (
  //     <ScrollView style={styles.container}>
  //       {this.state.userArr.map((res, i) => {
  //         return (
  //           <ListItem
  //             key={i}
  //             onPress={() => {
  //               this.props.navigation.navigate('UserDetailScreen', {
  //                 userkey: res.key,
  //               });
  //             }}
  //             bottomDivider>
  //             <ListItem.Content>
  //               <ListItem.Title>{res.name}</ListItem.Title>
  //               <ListItem.Subtitle>
  //                 {res.email} and mobile : {res.mobile}
  //               </ListItem.Subtitle>
  //             </ListItem.Content>
  //             <ListItem.Chevron color="black" />
  //           </ListItem>
  //         );
  //       })}
  //     </ScrollView>
  //   );
  // };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default UserScreen;
