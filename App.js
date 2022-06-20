import React from 'react';
import Providers from './src/navigation';
export default function App() {
  return <Providers />;
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
}