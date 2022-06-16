import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
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

export default function App() {
  const Stack = createNativeStackNavigator();
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background:"#fff"
    }
  }
const user=false
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Create" component={Create} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
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
