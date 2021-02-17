import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,Alert,ScrollView,Modal,KeyboardAvoidingView} from 'react-native';
import db from '../config'
import firebase from 'firebase';
 

export default class SignupLoginScreen extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            firstName:'',
            lastName:'',           
             address:'',
            mobilenumber:'',
             confirmPassword:'',
            isModalVisible:'false',
            }
        }
        
    

        userLogin=(emailId,password)=>{
            firebase.auth().signInWithEmailAndPassword(emailId,password)
            .then(()=>{
                return alert("Successfully Login")
            })
            .catch((error)=>{
                var errorCode=error.code;
                var errorMessage=error.message;
                return alert(errorMessage)
            })
        }


        
        userSignUp=(username,password,confirmPassword)=>{
        if(password !== confirmPassword){
            return alert ("Password Does not Match \n Check Your Password")
        }else{
            firebase.auth().createUserWithEmailAndPassword(username,password)
            .then((response)=>{
                db.collection("users").add({
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    mobile_number:this.state.mobilenumber,
                    username:this.state.username,
                    address:this.state.address,
        
                })
                return alert("User Added Successfully",
                '',
                [
                    {text:'ok',onPress:()=>this.setState({"isModalVisible":false})}
                ])
            })
            .catch((error)=>{
                var errorCode=error.code;
                var errorMessage=error.message;
                return alert(errorMessage)
            });
        }
        }
        

    userLogin=(username,password)=>{
        firebase.auth().signInWithEmailAndPassword(username,password)
        .then(()=>{
            return Alert. alert("Successfully Login")
        })
        .catch((error)=>{
            var errorCode=error.code;
            var errorMessage=error.message;
            return Alert .alert(errorMessage)
        })
    }
   
    showModal=()=>{
       <Modal animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible} >

<View style={styles.modalContainer} >  
    <ScrollView style={{width:'100%'}}  >
<KeyboardAvoidingView style={styles.keyboardAvoidingView} >
<Text  style={styles.modalTitle} >
    Registration
</Text>


<TextInput
 style={styles.formTextInput}
 placeholder={ "First Name" }
 maxLength={8}
 onChangeText={(text)=>{
     this.setState({
         firstName:text,

     })
 }}
/>

<TextInput
 style={styles.formTextInput}
 placeholder={ "Last Name" }
 maxLength={8}
 onChangeText={(text)=>{
     this.setState({
         lastName:text,
         
     })
 }}
/>

<TextInput
 style={styles.formTextInput}
 placeholder={ "Phone Number" }
 maxLength={10}
 keyboardType={'numeric'}
 onChangeText={(text)=>{
     this.setState({
         contact:text,
         
     })
 }}
/>

<TextInput
 style={styles.formTextInput}
 placeholder={ "Address" }
 multiline={true}
 onChangeText={(text)=>{
     this.setState({
         address:text,
         
     })
 }}
/>

<TextInput
 style={styles.formTextInput}
 placeholder={ "Email" }
keyboardType={'email-address'}
 onChangeText={(text)=>{
     this.setState({
         emailId:text,
         
     })
 }}
/>

<TextInput
 style={styles.formTextInput}
 placeholder={ "Password" }
 secureTextEntry={true}
 onChangeText={(text)=>{
     this.setState({
         password:text,
         
     })
 }}
/>

<TextInput
 style={styles.formTextInput}
 placeholder={ "Confirm Password" }
 secureTextEntry={true}
 onChangeText={(text)=>{
     this.setState({
         confirmPassword:text,
         
     })
 }}
/>


<View style={styles.modalBackButton} >
    <TouchableOpacity 
    style={styles.registerButton}
  onPress={()=>this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}  >
<Text style={styles.registerButtonText} >
       Register
</Text>
</TouchableOpacity>
</View>

<View style={styles.modalBackButton} >
    <TouchableOpacity 
       style={styles.cancelButton}   
       onPress={()=>this.setState({"isModalVisible":false})} 
    >
        <Text style={{color:'#ff5722',fontSize:20}}>

           Cancel
        </Text>
    </TouchableOpacity>

</View>

</KeyboardAvoidingView>
    </ScrollView>
      </View>

        </Modal>
    
}




   
    render(){
        return(
     <View>     
    
<Text style={{color:'#ff5722',fontSize:18,fontWeight:'bold',marginLeft:55}} > USERNAME</Text>
<View style={{alignItems:'center'}}>
    <TextInput 
      style={styles.loginBox}
     keyboardType='email-address'
      onChangeText={(text)=>{
          this.setState({
              emailId:text
          })
      }}/>
    </View>

    <Text style={{color:'#ff5722',fontSize:18,fontWeight:'bold',marginLeft:55}} > PASSWORD </Text>
<View style={{alignItems:'center'}}>
    <TextInput
     style={styles.loginBox}
     secureTextEntry={true}
     placeholder="password"
     placeholderTextColor="#ffff"
     onChangeText={(text)=>{
         this.setState({
             password:text
         })
     }}
    
    />
     </View>
    
    <View style={{alignItems:'center'}}>
        <TouchableOpacity
        style={[styles.button,{marginBottom:10}]}
        onPress={()=>{this.userLogin(this.state.username,this.state.password)}}>

       <Text style={{color:'#ff5722',fontSize:18,fontWeight:'bold'}}>LOGIN</Text>
       </TouchableOpacity>
       <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.userSignUp(this.state.username,this.state.password)}}>
<Text  style={{color:'#ff5722',fontSize:18,fontWeight:'bold'}}> SIGN UP </Text>
       
       </TouchableOpacity>
    </View>
    
    </View>
          
        )
    }
    }
    
    const styles=StyleSheet.create({
       
        loginBox:{
            width:400,
            height:50,
            borderBottomWidth:1.5,
            borderColor:'#ff8b65',
            fontSize:20,
            margin:10,
            paddingLeft:10,
    
    
        },
        button:{
            width:300,
            height:50,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:25,
            backgroundColor:'#ff99800',
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:8
            },
            shadowOpacity:0.30,
            shadowRadius:10.32,
           elevation:16,
    
    
    
        },
        keyboardAvoidingView:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
    
        },
        modalTitle:{
            justifyContent:'center',
            alignSelf:'center',
            fontSize:30,
            color:"#ff5722",
            margin:50,
    
        },
        modalContainer:{
            flex:1,
            borderRadius:20,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:"#ffff",
            marginRight:30,
            marginLeft:30,
            marginTop:80,
            marginBottom:80,
    
    
        },
        formTextInput:{
            width:'75%',
            height:35,
            alignSelf:'center',
            borderColor:'#ffab91',
            borderRadius:10,
            borderWidth:1,
            marginTop:20,
            padding:10,
    
        },
        registerButton:{
            width:200,
            height:40,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            borderRadius:10,
            marginTop:30,
    
        },
        registerButtonText:{
            color:'#ff5722',
            fontSize:15,
            fontWeight:'bold',
    
        },
        cancelButton:{
            width:200,
            height:30,
            justifyContent:'center',
            alignItems:'center',
            marginTop:5,
            
        },
    })
    

    
    
    