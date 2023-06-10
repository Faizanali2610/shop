import {  ArrowDownward, ArrowDownwardOutlined, ArrowDownwardRounded, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestmethod";
import "./featuredInfo.css";

export default function FeaturedInfo() {
const [income,setIncome] = useState([])

useEffect(()=>{
  const getIncome = async () => {
    try {
      const res = await userRequest.get("orders/income");
      setIncome(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  getIncome();
  },[])

   
  return (
  
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
        <span className="featuredMoney">${income[0]?.total}</span>
         <span className="featuredMoneyRate">
         <ArrowUpward className="featuredIcon"/>
         </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4  <ArrowDownwardOutlined className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4  <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
    
  );
  }