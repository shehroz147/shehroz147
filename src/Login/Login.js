import React, { useState,useEffect } from "react";
import server from "../apis/server";
import ProgressCircle from "../Components/CircularProgress";
import { useDispatch } from "react-redux";
import { signIn } from "../Actions";
import { View, Text,ImageBackground ,StyleSheet, TouchableOpacity} from "react-native";
import Navbar from "../Navbar/Navbar";
import { TextInput, Avatar, Button, Caption } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useState } from "react";
const image = { uri: "https://reactjs.org/logo-og.png" };
export default function Signin({ navigation }) {
  let [passwordType, setPasswordType] = React.useState(true);
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(async() => {
    // Update the document title using the browser API
    const role = await AsyncStorage.getItem("Role");
    alert(JSON.stringify(role))  
  },[]);
  
  const handleClickShowPassword = () => {
    if (passwordType) {
      setPasswordType(false);
    } else {
      setPasswordType(true);
    }
  };

  let validationSchema = yup.object({
    email: yup.string().email().required("email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSignin = async (values, resetForm) => {
    try {
      setLoading(true);
      const { data } = await server.post("/login", values);
    //  alert(JSON.stringify(data))
      dispatch(signIn(data.user, data.token, navigation));
      resetForm({
        values: "",
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert("you have entered wrong email or password");
    }
  };

  return (
    <>
      {/* <Navbar navigation={navigation} /> */}

      {loading ? (
        <ProgressCircle />
      ) : (
        <View
          style={{
            flex: 1,
            // alignItems: "center",
            // justifyContent: "center",
            // backgroundColor: "white",
          }}
        >


<ImageBackground 
source={require('../../assets/background.png')}
resizeMode="cover" style={styles.image}>
      {/* <Text style={styles.text}>Inside</Text> */}
      <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>


      <Formik
            initialValues={{ email: "test110@gmail.com", password: "1234" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignin(values, resetForm);
            }}
          > 
            {(formikProps) => (
              <>
                <TextInput
                  id="email"
                  name="email"
                  label="Email"
                  mode="outlined"
                  outlineColor ={'#DFFB96'}
                  dense
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange("email")}
                  style={{ width: "75%",height:60,borderRadius:5,backgroundColor:'#DFFB96'}}
                  onBlur={formikProps.handleBlur("email")}
                  error={
                    formikProps.errors.email && formikProps.touched.email
                      ? true
                      : false
                  } 
                />
                <View style={{ width: "75%" }}>
                  {formikProps.errors.email && formikProps.touched.email ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.email}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                selectionColor='red'
                underlineColor = 'red'
                outlineColor ={'red'}
                  id="password"
                  name="password"
                  label="Password"
                  mode="outlined"
                  outlineColor ={'#DFFB96'}
                  dense
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange("password")}
                  secureTextEntry={passwordType}
                  style={{ width: "75%",height:60,borderRadius:20,backgroundColor:'#DFFB96' }}
                  right={
                    <TextInput.Icon
                      name={passwordType ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      onPress={handleClickShowPassword}
                    />
                  }
                  onBlur={formikProps.handleBlur("password")}
                  error={
                    formikProps.errors.password && formikProps.touched.password
                      ? true
                      : false
                  }
                />

                <View style={{ width: "75%" }}>
                  {formikProps.errors.password &&
                  formikProps.touched.password ? (
                    <Caption
                      style={{
                        color: "red",
                      }}
                    >
                      {formikProps.errors.password}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

               
                <Button
                  style={{ marginTop: 20, borderRadius: 50,width:"75%",height:50 ,backgroundColor:'#B9FF01'}}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                 <Text style ={{textAlign:'center',color:'black',fontSize:22}}> LOGIN ! </Text>
                </Button>
                <View style={{marginTop:10,flexDirection:'row',padding:5}}>
                {/* <Caption onPress={() => navigation.navigate("Signup")}>
                  Don't have an account? 
                   Sign up"
                </Caption> */}
                <Text>
                Don't have an account? 
                </Text>
                <TouchableOpacity
                onPress={
                  () => navigation.navigate("Signup")
                }
                > 
                <Text style ={{color:'#B9FF01',}}>
                 Sign Up
                </Text>
                </TouchableOpacity>
               
                </View>
              </>
            )}
          </Formik> 
      {/* <Image
        style={styles.tinyLogo}
        source={require('../')}
      /> */}
      </View>
    </ImageBackground>

          {/* <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 10 }}>
            SIGN IN
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignin(values, resetForm);
            }}
          > 
            {(formikProps) => (
              <>
                <TextInput
                  id="email"
                  name="email"
                  label="Email"
                  mode="outlined"
                  dense
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange("email")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("email")}
                  error={
                    formikProps.errors.email && formikProps.touched.email
                      ? true
                      : false
                  }
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.email && formikProps.touched.email ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.email}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                  id="password"
                  name="password"
                  label="Password"
                  mode="outlined"
                  dense
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange("password")}
                  secureTextEntry={passwordType}
                  style={{ width: "95%" }}
                  right={
                    <TextInput.Icon
                      name={passwordType ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      onPress={handleClickShowPassword}
                    />
                  }
                  onBlur={formikProps.handleBlur("password")}
                  error={
                    formikProps.errors.password && formikProps.touched.password
                      ? true
                      : false
                  }
                />

                <View style={{ width: "95%" }}>
                  {formikProps.errors.password &&
                  formikProps.touched.password ? (
                    <Caption
                      style={{
                        color: "red",
                      }}
                    >
                      {formikProps.errors.password}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <Caption onPress={() => navigation.navigate("Signup")}>
                  Don't have an account? Sign up"
                </Caption>
                <Caption onPress={() => navigation.navigate("forgetPassword")}>
                  Forget Password
                </Caption>
                <Button
                  style={{ marginTop: 10, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                  Signin
                </Button>
              </>
            )}
          </Formik> */}
        </View>
      )}
    </>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});
