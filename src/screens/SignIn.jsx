import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { auth } from '../../App'
import Button from '../components/Button'
import Input from '../components/Input'

export default function SignIn({ navigation }) {
     const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then(res => {
            console.log("login successfully ",res)
        })
    }
  return (
    <SafeAreaView style={{flex:1}}>
        
          <Image
              resizeMode='contain' style={{ alignSelf: "center", height: 300, width: 300 }}
              source={require("../../assets/images/mobile-login-concept-illustration_114360-83.webp")}
          />
          <Text style={styles.notes}>Never Forget Your Notes</Text>
          <View style={{paddingHorizontal:20,paddingVertical:20}}>
              <Input placeholder="Your Email" onChangeText={(text) => setEmail(text)} autoCapitalize={ "none"} />
              <Input  placeholder='password' onChangeText={(text)=>setPassword(text)} secureTextEntry />
              <Button onPress={login} title={"Login"} customStyles={{alignSelf:"center",marginBottom:60, } }/>
          </View>
          <View style={styles.signUpLink}>
              
              <Pressable onPress={()=>navigation.navigate('SignUp')}>
                  <Text>dont have an account?{" "}
                      <Text style={{ color: "blue", fontWeight: "bold" }}>Sign up</Text></Text>
              </Pressable>
          </View>
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
    }
    

})