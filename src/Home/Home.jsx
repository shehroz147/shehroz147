import React, { useState, useEffect } from "react";
import FlatListSlider from '../FlatListSlider';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {Touchable, Text, View, SafeAreaView, ScrollView, StyleSheet ,FlatList,TouchableOpacity,Dimensions,ImageBackground,Image} from "react-native";
import ProgressCircle from "../Components/CircularProgress";
import Navbar from "../Navbar/Navbar";
import Filter from "../Components/Filter";
import ProductCard from "../Components/Card";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../Actions";

export default function Home({ navigation }) {

   AsyncStorage.getItem("User").then((res) => {

    const user =  JSON.parse(res)
  //    alert(JSON.stringify(user))   

  })

  const user =  AsyncStorage.getItem("User")
  const screenWidth = Math.round(Dimensions.get('window').width);

  


  const categoryList = [
    { id: 0, name: "Electrition" },
    { id: 1, name: "Mechanic" },
    { id: 2, name: "Plumber" },
   
  ];

 const  data = [

    {
      image:
      'https://firebasestorage.googleapis.com/v0/b/chatapp-d3504.appspot.com/o/slider1.png?alt=media&token=ad7ec7ba-1779-43f1-9896-6507362a9f51',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/chatapp-d3504.appspot.com/o/slider2.png?alt=media&token=7fd1e4bb-2433-4a5c-a162-9113d79cb880',
      desc:
        'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/chatapp-d3504.appspot.com/o/slider3.png?alt=media&token=0a17ccc5-7d41-4dbe-b330-509fc9620eb2',
      desc:
        'Sample Description below the image for representation purpose only',
    },
    
   
  ] 


  const products = useSelector((state) => state.posts);
  let [filteredProduct, setFilteredProduct] = useState();
  let [loading, setLoading] = useState(true);
  let [category, setCategory] = useState({ id: 0, name: "All" });

  const dispatch = useDispatch(); 
  // useEffect(() => {
  //   setLoading(true);
  //   setFilteredProduct([...products]);
  // }, [products]);
  useEffect(() => {
    setLoading(false);
    dispatch(fetchProducts(setLoading, setFilteredProduct));
    // alert(JSON.stringify(fetchProducts))
  }, []);


  const handleFilter = (item) => {
    setCategory(item);
    if (item.name === "All") {
      return setFilteredProduct(products);
    }
    else{
    let prodArray = [];
    for (let prods of products) {
      if (prods.category === item.name) {
        // alert(JSON.stringify(prods))
        prodArray.push(prods);
      }
    }
    //  alert(JSON.stringify(...prodArray))
    setFilteredProduct(prodArray);
  }    
  };


  return (
    <>
    
      {/* <Navbar navigation={navigation} /> */}

      <Navbar navigation={navigation} />
      <View
          style={{
            flex: 1,
            // alignItems: "center",
            // justifyContent: "center",
            // backgroundColor: "white",
          }}
        >
          

        <ImageBackground 
        source={require('../../assets/bghome.png')}
        resizeMode="cover" style={style.image}>    


      <SafeAreaView >
        <View style={{marginTop:110}}>
        <View style={style.headingText}>
          {/* <Text style={style.headingText}>Main</Text> */}
          <Text style={style.headingText}> Good Evening</Text>
        </View>
        <View style={style.headingText}>
          {/* <Text style={style.headingText}>Main</Text> */}
          <Text style={style.headingText}> {user.firstName ?user.name:'John'} !</Text>
        </View>
        </View>
 
        <View style={{marginTop:30,padding:30}}>
            <FlatListSlider
            data={data}
            timer={7000}
            imageKey={'image'}
            width={screenWidth}
            separator={0} 
            loop={true}
             autoscroll={true}
             currentIndexCallback={index => console.log('Index', index)}
            indicator
            animation
            height={333} 
          />  
          </View>


        <View style={style.headingText}>
          {/* <Text style={style.headingText}>Main</Text> */}
          <Text style={style.headingText}>What do you want !</Text>
        </View>
        {/* <Filter
          // filteredProduct={filteredProduct}
          setFilteredProduct={setFilteredProduct}
          products={products}
        /> */}



          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:50}}>

    <TouchableOpacity
     onPress={
      () => navigation.navigate("detaledPage",{
        categorey:categoryList[0] }
        )
    }
    >
          <Image
     source={require('../../assets/Electritionbutton.png')}
      resizeMode="cover" 
       style={{width:120,height:149}}
      
      />
      </TouchableOpacity>
      <TouchableOpacity 
     onPress={
      () => navigation.navigate("detaledPage",{
        categorey: categoryList[1]
      })
    }
    >
<Image 
     source={require('../../assets/Mechanic.png')}
      resizeMode="cover" 
       style={{width:120,height:149}}
      
      />
     </TouchableOpacity>


      <TouchableOpacity
     onPress={
      () => navigation.navigate("checkout",{
        categorey:categoryList[2],
        subCategorey : { id: 6, name: "Test" },

      })
    }
    >
      <Image
 source={require('../../assets/Plumber.png')}
  resizeMode="cover" 
   style={{width:120,height:149}}
  
  />
  </TouchableOpacity>


          </View>

        {/* {loading ? (
          <ProgressCircle />
        ) : ( 
          <>


            

            <ProductCard  navigation={navigation} product={filteredProduct} />
          </> 
        )} */}
        </SafeAreaView>
        </ImageBackground>
        </View>
        
    </>
  );
}

const style = StyleSheet.create({
 
    image: {
      flex: 1,
    //  justifyContent: "center"
    },
   
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: "white",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
  },
});
