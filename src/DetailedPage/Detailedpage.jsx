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

export default function Home({route, navigation }) {

  const { categorey } = route.params;
  AsyncStorage.getItem("User").then((res) => {

    const user =  JSON.parse(res)
      // alert(JSON.stringify(user))   
 
  })
  const screenWidth = Math.round(Dimensions.get('window').width);

  


  const subCategoryList = [
    { id: 0, name: "Installation Technition" },
    { id: 1, name: "Car Electrition" },
    { id: 2, name: "Appliances" },
    { id: 3, name: "Bike Mechanic" },
    { id: 4, name: "Generator Mechanic" },
    { id: 5, name: "Car Mechanic" },

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
        
        

           <View style={{marginTop:60}}>
          <View style={style.headingText}>
          {/* <Text style={style.headingText}>Main</Text> */}
          <Text style={style.headingText}>Tap The Categorey </Text>
          <Text style={style.headingText}>To Select</Text>
        </View>
        </View>

        {/* <Filter
          // filteredProduct={filteredProduct}
          setFilteredProduct={setFilteredProduct}
          products={products}
        /> */} 


  { categorey?.id===0 && (
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:60}}>

    <TouchableOpacity 
     onPress={

      () => navigation.navigate("checkout",{
        categorey: categorey,
        subCategorey:subCategoryList[0]
      })
    }
    > 
          <Image
     source={require('../../assets/Installationtechnician.png')}
      resizeMode="cover" 
       style={{width:120,height:180}}
      />
      </TouchableOpacity>

      <TouchableOpacity
     onPress={
      () => navigation.navigate("checkout",{
        categorey: categorey,
        subCategorey:subCategoryList[1]
      })
    }
    >
<Image
     source={require('../../assets/Carelectrician.png')}

      resizeMode="cover" 
       style={{width:120,height:180}}
     
      />
      </TouchableOpacity>


      <TouchableOpacity 
     onPress={
      () => navigation.navigate("checkout",{
        categorey: categorey,
        subCategorey:subCategoryList[2]
      })
    }
    >
      <Image
 source={require('../../assets/Homeappliciences.png')}
  resizeMode="cover" 
   style={{width:120,height:180}}
  
  />
  </TouchableOpacity>



          </View>
)}




{ categorey?.id===1 && (
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:60}}>

    <TouchableOpacity 
     onPress={
      () => navigation.navigate("checkout",{
        categorey: categorey,
        subCategorey:subCategoryList[3]

      })
    }
    > 
          <Image
     source={require('../../assets/BikeMechanic.png')}
      resizeMode="cover" 
       style={{width:120,height:149}}
      
      />
      </TouchableOpacity>

      <TouchableOpacity
     onPress={
      () => navigation.navigate("checkout",{
        categorey: categorey,
        subCategorey:subCategoryList[4]
      })
    }
    >
<Image
     source={require('../../assets/Generatormechanic.png')}
      resizeMode="cover" 
       style={{width:120,height:149}}
      
      />
      </TouchableOpacity>


      <TouchableOpacity 
     onPress={
      () => navigation.navigate("checkout",{
        categorey: categorey,
        subCategorey:subCategoryList[5]
      })
    }>  
      <Image
 source={require('../../assets/carmechanic.png')}
  resizeMode="cover" 
   style={{width:120,height:149}}
  
  />
  </TouchableOpacity>



          </View>
)}

    <View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
          <Image
 source={require('../../assets/bnb.png')}
  resizeMode="contain" 
   style={{width:'65%',height:149}}
  
  />
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
