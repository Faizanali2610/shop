import { Link, useLocation } from "react-router-dom";
import "./product.css";
import {getStorage, ref ,uploadBytesResumable, getDownloadURL} from "firebase/storage"
import app from "../../firebase"
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestmethod";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apicalls";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import { gridColumnGroupingSelector } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


export default function Product() {
    const location =  useLocation()
    const productId = location.pathname.split("/")[2];
    const [pStats,setPStats] = useState([])
    const [file,setFile] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [input , setInput] = useState ({}) 
    const [cat, setCat] = useState([])
    const [color,setColor] = useState([]);
    const [size,setSize] = useState([]);
    const navigate = useNavigate()
  
    const dispatch = useDispatch();

    const product = useSelector((state)=>state.product.products.find(product => product._id === productId ))
          
    const MONTHS  = useMemo(
        () => ["Jan","Feb","Mar","Apr","May","Jun","Jul","Agu","Sep","Oct","Nov","Dec",],[])

    const handleChange = (e) => {
    setInput(prev=>{
      return {...prev,[e.target.name]:e.target.value,id:productId}
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreviewImage(URL.createObjectURL(selectedFile));
    };
    

       useEffect(()=>{
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                res.data.map((item) => 
                setPStats((prev) => [
                    ...prev,
                    { name: MONTHS[item._id -1], Sales: item.total },
                ])
                );
            } catch (err) {
                console.log(err)
            }
        }
         getStats();
    },[productId,MONTHS])

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
            const product = { title: input.title,
              desc: input.desc,
              price: input.price,
              inStock: input.inStock,img:downloadURL,categories:cat,color:color,size:size}
            updateProduct(productId,product,dispatch);
          })
        }
      );
      navigate("/products")
       }  
      
        

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
              {previewImage ? (
        <img src={previewImage} alt="" className="productUploadImg" />
      ) : (
        <img src={product.img} alt="" className="productUploadImg" />
      )}                     
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">{product.sales}</span>
                  </div>
                  
                  <div className="productInfoItem">
                      <span className="productInfoKey">in-Stock:</span>
                      <span className="productInfoValue">
                        {product.inStock}
                        </span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input name="title" onChange={handleChange} type="text" placeholder={product.title} />
                  <label>Product Description</label>
                  <input name="desc" onChange={handleChange} type="text" placeholder={product.desc} />
                  <label>Price</label>
                  <input name="price" onChange={handleChange} type="text" placeholder={product.price} />
                  <label>Categories</label>
                  <input name="categories" onChange={handleCat} type="text" placeholder={product.categories} />
                  <label>Size</label>
                  <input name="size" onChange={handleSize} type="text" placeholder={product.size} />
                  <label>Color</label>
                  <input name="color" onChange={handleColor} type="text" placeholder={product.color} />
                  <label>In Stock</label>
                  <select onChange={handleChange} name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                  {previewImage ? (
        <img src={previewImage} alt="" className="productUploadImg" />
      ) : (
        <img src={product.img} alt="" className="productUploadImg" />
      )}      
                      <label htmlFor="file">
                          <PublishRoundedIcon />
                      </label>
                      <input type="file" id="file" onChange={handleFileChange} />
                  </div>
                  <button onClick={handleClick} className="productButton">Update</button>
              </div>
          </form> 
               </div>
    </div>
          )}
