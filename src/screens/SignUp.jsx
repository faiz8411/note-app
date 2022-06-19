import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { showMessage } from "react-native-flash-message"
import { SafeAreaView } from "react-native-safe-area-context"
import { auth, db } from "../../App"
import Button from '../components/Button'
import Input from '../components/Input'


const genderOption=["Male","Female"]
export default function SignUp({ navigation }) {
    const [gender, setGender] = useState(null)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [age, setAge] = useState("")
    
    const signup = async () => {
        setLoading(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
             await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                gender: gender,
                age: age,
                uid:result.user.uid
            })
            // console.log(result)
             setLoading(false)
        }
       
        catch(error) {
            console.log("error", error);
            showMessage({
                message: "error!!",
                type:"danger"
            })
            
                setLoading(false)
        }
    }
  return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView>
          <Image
              resizeMode='contain' style={{ alignSelf: "center", height: 300, width: 300 }}
              source={require("../../assets/images/modern-online-registration-compositio_23-2147993862.webp")}
          />
          <Text style={styles.notes}>Never Forget Your sign up</Text>
          <View style={{paddingHorizontal:20,paddingVertical:20}}>
                  <Input placeholder="Your Email" onChangeText={(text) => setEmail(text)} autoCapitalize={ "none"} />
               <Input placeholder="Password" secureTextEntry onChangeText={(text)=>setPassword(text)}/>
              <Input placeholder='Full Name' autoCapitalize={"words"} onChangeText={(text)=>setName(text)}/>
                  <Input placeholder=' Your age'onChangeText={(text)=>setAge(text)} />
                   <View style={{marginVertical:20}}>
                      <Text>select gender</Text>
                  </View>
              {
                  genderOption.map((option) => {
                      const selected = option === gender;
                      return(<Pressable onPress={() => setGender(option)} key={option} style={styles.radioContainer}>
                          <View style={[styles.outerCircle,selected&&styles.selectedOuterCircle]}>
                              <View style={[styles.innerCircle,selected&&styles.selectedInnerCircle]}>

                              </View>
                          </View>
                          <Text>{option}</Text>
                      </Pressable>)}) }
             
                 
              <Button onPress={signup} title={"sign up"} customStyles={{alignSelf:"center",marginBottom:60, } }/>
          </View>
          <View style={styles.signUpLink}>
              
              <Pressable onPress={()=>navigation.navigate("SignIn")}>
                  <Text>already have an account{" "}
                      <Text style={{ color: "blue", fontWeight: "bold" }}>Sign In</Text></Text>
              </Pressable>
              </View>
              </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    notes: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign:"center"
    },
    input: {
        borderColor: "black",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        height: 49,
        marginBottom: 20,
        
    },
    signUpLink: {
        flex:1,
        justifyContent: "flex-end",
        alignItems:"center"
    },
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