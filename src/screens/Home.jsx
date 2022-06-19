import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../App';

export default function Home({  user }) {
  const navigation=useNavigation()
  // console.log("user-------", user)
  const moveToCreate = () => {
    navigation.navigate("Create")
  }
  const renderItem = ({ item }) => {
    return (
      <Pressable>
        <View>
          <Text>{ item.title}</Text>
        </View>
      </Pressable>
    )
  }

  const [notes, setNotes] = useState([])
  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid))
    const noteListListener = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data())
      })
      setNotes(list)
    })
    return noteListListener;
  }, [])
  console.log(notes,"notes")
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.homeContainer}>
        <Text>My Notes</Text>
        <Pressable onPress={moveToCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
      
      <FlatList data={notes} keyExtractor={(item) => item.title} renderItem={renderItem} contentContainerStyle={{padding:20} } />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  homeContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent:"space-between"
  }
})