import React, { useEffect, useLayoutEffect, useState } from 'react'
import MyContext from './myContext';
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

function MyState(props) {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
      if (mode === 'light') {
          setMode('dark');
          document.body.style.backgroundColor = "rgb(17, 24, 39)"
      }
      else {
          setMode('light');
          document.body.style.backgroundColor = "white"

      }
  }

  const [Loading, setLoading] = useState(false);

  const [Products, setProducts] = useState({
    title : null,
    price : null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date:  new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  });

  const addProduct = async () => {
    if(Products.title == null || Products.price == null || Products.imageUrl == null || Products.category == null 
      || Products.description == null){
        return toast.error("all fields are required")
      }

      setLoading(true)


      try {

        const productRef = collection(fireDB,'products');

        await addDoc(productRef, Products)
        toast.success("Add product successfully");
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 800);

        getProductData();
        setLoading(false)
        
      } catch (error) {
        console.log(error);
        setLoading(false)
      }

  }

  const [product, setProduct] = useState([]);


const getProductData = async () => {

  setLoading(true)

  try {
    const q = query(
      collection(fireDB, 'products'),
      orderBy('time')
    );
    const data = onSnapshot(q,(QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({...doc.data(), id: doc.id})
      });
      setProduct(productArray);
      setLoading(false)
    });

    return () =>data;
    
  } catch (error) {
    console.log(error);
    setLoading(false)
  }

}
 
useEffect(() => {
getProductData();
}, []);


     //update product function

     const editHandle = (item) => {
      setProduct(item)
     }

     const UpdateProduct = async () =>{
      setLoading(true)
      try {
        await setDoc(doc(fireDB, 'products',products.id),products)
        toast.success("Product Updated successfully")
        getProductData();
       setTimeout(()=>{
        window.location.href = '/dashboard'
       }, 800);
        setLoading(false)
        
      } catch (error) {
        console.log(error);
        setLoading(false)
        
      }

     }

     //delete product

     const deleteProduct = async (item) =>{
      setLoading(true)
try {
  await deleteDoc(doc(fireDB, 'products',item.id))
  toast.success('Product Deleted successfully')
  getProductData();
  setLoading(false)
  
} catch (error) {
  console.log(error);
  setLoading(false)
  
}
     }

     const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData()

  }, []);

 


  return (
    <MyContext.Provider value={{mode, toggleMode, Loading, setLoading,
      Products, setProducts, addProduct, product, editHandle, UpdateProduct, deleteProduct,order
    }}>
      
       {props.children}
    </MyContext.Provider>
  )
}

export default MyState
