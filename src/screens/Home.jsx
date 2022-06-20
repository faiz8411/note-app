import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../App';

export default function Home({  user ,route,navigation }) {
  const moveMent=useNavigation()
  console.log("user-------", user)
  const moveToCreate = () => {
    moveMent.navigate("Create")
  }
  
  const renderItem = ({ item ,navigation}) => {
    const { title, description } = item;
    console.log(item)
    return (
      <Pressable onPress={navigation.navigate('Edit', { item } )}
      
        style={{ backgroundColor: item.color, marginBottom: 20, borderRadius: 16, padding: 14 }}>
        <Pressable onPress={() => {
          deleteDoc(doc(db,"notes",item.id))
        }}
          style={{ position: "absolute", alignSelf: "flex-end", padding: 15, zIndex:4}}>
          <AntDesign name="delete" size={24} color="black" />
      </Pressable>
        <Text style={{ color: "white", fontSize: 23 }}>{title}</Text>
        
        <Text style={{color:"white",fontSize:18,marginTop:12}}>{ description}</Text>
        
      </Pressable>
    )
  }

  const [notes, setNotes] = useState([])
  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid))
    const noteListListener = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({...doc.data(),id:doc.id})
      })
      setNotes(list)
    })
    return noteListListener;
  }, [])
  console.log(notes,"notes")
  return (
    <SafeAreaView style={{flex:1}}>
      <View>
        <View style={styles.homeContainer}>
        <Text>My Notes</Text>
        <Pressable onPress={moveToCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
        <View>
        <FlatList data={notes} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={{padding:20} } />

      </View>
      </View>
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