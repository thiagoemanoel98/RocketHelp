import { NativeBaseProvider, StatusBar } from "native-base";
import React from "react";
import {THEME} from './src/styles/theme';
import { SignIn } from "./src/screens/SignIn";
import { Home } from "./src/screens/Home";
import { Register } from "./src/screens/Register";
import { Loading } from "./src/components/Loading";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme = {THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded? <Register /> : <Loading/>}
    </NativeBaseProvider>
  );
}
