import { useState } from "react";
import "./newProduct.css";
import {getStorage, ref ,uploadBytesResumable, getDownloadURL} from "firebase/storage"
import app from "../../firebase"
import { addProducts } from "../../redux/apicalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [input , setInput] = useState ({}) 
  const [file , setFile] = useState (null)
  const [cat, setCat] = useState([])
  const [color,setColor] = useState([]);
  const [size,setSize] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
  setInput(prev=>{
    return {...prev,[e.target.name]:e.target.value}
  })
  }
  const handleCat = (e) => {
   setCat(e.target.value.split(","))
  }
  const handleColor = (e) => {
    setColor(e.target.value.split(","))
  }
  const handleSize = (e) => {
    setSize(e.target.value.split(","))
  }

 const handleClick = (e) => {
  e.preventDefault()
  const fileName = new Date().getTime() + file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage,fileName);
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;

    }

  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    const product = {...input,img:downloadURL,categories:cat,color:color,size:size};
    addProducts(product,dispatch)
    });
  }
);
navigate("/products")

 }  

  
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input  type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Description..."  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="text" placeholder="100"  onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts,Tshirt" onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="red,green,etc.." onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="red,green,etc.." onChange={handleSize}/>
        </div>
        

        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Create</button>
        </form>
        </div>
  );
}