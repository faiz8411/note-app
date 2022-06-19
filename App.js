import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import Create from "./src/screens/Create";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";


const firebaseConfig = {
  apiKey: "AIzaSyBKk9WvezKtW3B3JEIx1hhOTh_UL-DeWWU",
  authDomain: "note-app-2048d.firebaseapp.com",
  projectId: "note-app-2048d",
  storageBucket: "note-app-2048d.appspot.com",
  messagingSenderId: "215298877161",
  appId: "1:215298877161:web:2731371baa9ee5af357278",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db=getFirestore(app)

export default function App({navigation}) {
  const [user,setUser]=React.useState(null)
  const [loading,setLoading]=React.useState(true)
  const Stack = createNativeStackNavigator();
  React.useEffect(() => {
    signOut(auth)
  },[])
  React.useEffect(() => {
    const authSubscription = onAuthStateChanged(auth,(user) => {
      if (user) {
        setLoading(false)
        setUser(user);
      }
      else {
        setUser(null)
        setLoading(false);
      }
     
    })
    return authSubscription;
  }, [])
  
  if (loading) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator color="blue" size="large"/>
      </View>
    )
  }
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background:"#fff"
    }
  }

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(...props) => <Home {...props} user={user} />}
            </Stack.Screen>
            {/* <Stack.Screen name="Edit">
              {(...props) => <Edit {...props} user={user} />}
            </Stack.Screen> */}
            <Stack.Screen name="Create">
              {(...props) => <Create {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
