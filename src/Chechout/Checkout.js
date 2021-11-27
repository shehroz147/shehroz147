import React, { useState } from "react";
import { View, Text,ImageBackground,StyleSheet } from "react-native";
import server from "../apis/server";
import Navbar from "../Navbar/Navbar";
import ProgressCircle from "../Components/CircularProgress";
import { useDispatch } from "react-redux";
import { signIn } from "../Actions";
import { TextInput, Button, Caption } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation,route }) {
  const dispatch = useDispatch();
  let [passwordType, setPasswordType] = React.useState(true);
  let [confirmPasswordType, setConfirmPasswordType] = React.useState(true);
  let [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => {
    if (passwordType) {
      setPasswordType(false);
    } else {
      setPasswordType(true);
    }
  };

  const handleClickShowConfirmPassword = () => {
    if (confirmPasswordType) {
      setConfirmPasswordType(false);
    } else {
      setConfirmPasswordType(true);
    }
  };
      
  let validationSchema = yup.object({
    shippingAddress: yup.string().required("shippingAddress is required"),
    firstName: yup.string().required("First name is required"),
    lastName:yup.string().required("Last name is required"),
    contactDetails: yup
      .string()
      .required("contactDetails is required"),
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // ),
     
  });

  const handleSignup = async(values, resetForm) => {
    setLoading(true); 

    const { categorey,subCategorey } = route.params;
    const user = await AsyncStorage.getItem("User")
        const userId = JSON.parse(user);

        values['userID'] = userId._id
        values['categorey'] = categorey
        values['subCategorey'] = subCategorey
        // alert(JSON.stringify(values))

      server
      .post("/checkout", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => { 
        resetForm({
          values: "",
        });
        // alert(JSON.stringify(res.data))
        navigation.navigate("Home");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        // alert("user with this shippingAddress already exist try other!");
      });
  };
  return (
    <>

      {loading ? (
        <ProgressCircle />
      ) : (
        <View c

          style={{
            flex: 1,
            // alignItems: "center",
            // justifyContent: "center",
            // backgroundColor: "white",
          }}
        >


    <ImageBackground 
     source={require('../../assets/SignUpBg.png')}
      resizeMode="cover" style={styles.image}>
      {/* <Text style={styles.text}>Inside</Text> */} 
      <View style={{justifyContent:'center',alignItems:'center',marginTop:90}}>

          <Formik
            initialValues={{ shippingAddress: "", contactDetails: "", firstName:"",lastName:""}}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values, resetForm);
            }}
          >
            {(formikProps) => (
              <> 
                                <TextInput
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  mode="outlined"
                  outlineColor ={'#DFFB96'}
                  dense
                  value={formikProps.values.firstName}
                  onChangeText={formikProps.handleChange("firstName")}
                  style={{ width: "75%",height:60,borderRadius:5,backgroundColor:'white'}}
                  onBlur={formikProps.handleBlur("firstName")}
                  error={
                    formikProps.errors.firstName && formikProps.touched.firstName
                      ? true
                      : false
                  } 
                />
                <View style={{ width: "75%" }}>
                  {formikProps.errors.firstName && formikProps.touched.firstName ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.firstName}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>


                <TextInput
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  mode="outlined"
                  outlineColor ={'#DFFB96'}
                  dense
                  value={formikProps.values.lastName}
                  onChangeText={formikProps.handleChange("lastName")}
                  style={{ width: "75%",height:60,borderRadius:5,backgroundColor:'white'}}
                  onBlur={formikProps.handleBlur("lastName")}
                  error={
                    formikProps.errors.lastName && formikProps.touched.lastName
                      ? true
                      : false
                  } 
                />
                <View style={{ width: "75%" }}>
                  {formikProps.errors.lastName && formikProps.touched.lastName ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.lastName}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>






                <TextInput
                  id="shippingAddress"
                  name="shippingAddress"
                  label="shippingAddress"
                  mode="outlined"
                  outlineColor ={'white'}
                  dense
                  value={formikProps.values.shippingAddress}
                  onChangeText={formikProps.handleChange("shippingAddress")}
                  style={{ width: "75%",height:60,borderRadius:5,backgroundColor:'white' }}
                  onBlur={formikProps.handleBlur("shippingAddress")}
                  error={
                    formikProps.errors.shippingAddress && formikProps.touched.shippingAddress
                      ? true
                      : false
                  }
                />
                <View style={{ width: "75%" }}>
                  {formikProps.errors.shippingAddress && formikProps.touched.shippingAddress ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.shippingAddress}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                  id="contactDetails"
                  name="contactDetails"
                  label="contactDetails"
                  mode="outlined"
                  dense
                  outlineColor ={'white'}
                  value={formikProps.values.contactDetails} 
                  onChangeText={formikProps.handleChange("contactDetails")}
                  style={{ width: "75%",height:60,borderRadius:5,backgroundColor:'white' }}
                 
                  onBlur={formikProps.handleBlur("contactDetails")}
                  error={
                    formikProps.errors.contactDetails && formikProps.touched.contactDetails
                      ? true
                      : false
                  }
                /> 

                <View style={{ width: "75%" }}>
                  {formikProps.errors.contactDetails &&
                  formikProps.touched.contactDetails ? (
                    <Caption
                      style={{
                        color: "red",
                      }}
                    >
                      {formikProps.errors.contactDetails}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

               
                <Caption onPress={() => navigation.navigate("Login")}>
                  Already have an account? Signin
                </Caption>
                {/* <Button
                  style={{ marginTop: 10, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                  Signup
                </Button> */}
                
                 <Button
                  style={{ marginTop: 20, borderRadius: 50,width:"75%",height:50 ,backgroundColor:'#B9FF01'}}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                 <Text style ={{textAlign:'center',color:'white',fontSize:22}}> Book Now ! </Text>
                </Button>
              </>
            )}
          </Formik>
          </View>
    </ImageBackground>
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
