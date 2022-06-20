import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../App';
import Button from '../components/Button';
import Input from '../components/Input';

const noteColorOptions = ["red", "green", "blue"];
export default function Create({user,navigation}) {
  const [loading,setLoading]=useState(false)
  const [title,setTitle]=useState("")
  const [description, setDescription] = useState("")
  const [noteColor, setNoteColor] = useState("blue")
  const navigationUse=useNavigation()
  const onPressCreate = async () => {
     setLoading(true)
    try {
     
      const result=await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color: noteColor,
                
        
      });
      
    console.log(result)
      setLoading(false)
      showMessage({
        message: "note created successfully",
        type:"success"
      })
    navigationUse.navigate("Home")
    } catch (err){
      console.log("error", err)
      setLoading(false)
   }
  }
  return (
    <SafeAreaView>
      
        <Text style={{textAlign:"center",fontWeight:"900",fontSize:20}}>Edit</Text>
      
      <Input placeholder="title" onChangeText={(text) => setTitle(text)} autoCapitalize={ "none"} />
      <Input placeholder="Description" multiline={true} onChangeText={(text) => setDescription(text)} autoCapitalize={ "none"} />
      <View style={{ height: 20 ,marginBottom:20}}>
        <Text>select your notes colour</Text>
     </View>
      {
                  noteColorOptions.map((option) => {
                      const selected = option === noteColor;
                      return(<Pressable onPress={() => setNoteColor(option)} value={noteColor} setValue={setNoteColor} key={option} style={styles.radioContainer}>
                          <View style={[styles.outerCircle,selected&&styles.selectedOuterCircle]}>
                              <View style={[styles.innerCircle,selected&&styles.selectedInnerCircle]}>

                              </View>
                          </View>
                          <Text>{option}</Text>
                    </Pressable>)
                  })}
      
      {loading?(<ActivityIndicator/>):( <Button onPress={onPressCreate} title={"submit"} customStyles={{alignSelf:"center",marginBottom:60,width:"100%" } }/>)}
      
    </SafeAreaView>
  )
}
  
  const styles = StyleSheet.create({
    

    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom:10,
    }
    , outerCircle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#cfcfcf",
        justifyContent: "center",
        alignItems:"center"
        
    }
    , innerCircle: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: "#cfcfcf",
        
    },
    selectedOuterCircle: {
        borderColor:"orange"
    }
    ,
    selectedInnerCircle: {
        backgroundColor: "orange",
        borderColor:"orange"
    }
    

})
