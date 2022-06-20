import React, {useState, useEffect} from 'react';
import {Button, TextInput, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

const PhoneSignIn = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    phoneNumber ='+16505553434'
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log(confirmation);

    setConfirm(confirmation);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  function signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      let userData = await auth().currentUser.linkWithCredential(credential);
      setUser(userData.user);
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    }
  }
  if (initializing) return null;

  if (!user) {
    return (
      <Button
        title="Verify Phone Number"
        onPress={() => signInWithPhoneNumber()}
      />
    );
  } else if (!confirm) {
    return (
      <>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  } else {
    return (
      <>
        <Text>
          Welcome! {user.phoneNumber} linked with {user.email}
        </Text>
        <Button title="Sign Out" onPress={() => signOut()} />
      </>
    );
  }
};
export default PhoneSignIn;
