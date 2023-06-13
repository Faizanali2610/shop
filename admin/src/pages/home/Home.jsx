import Chart from "../../components/chart/Chart";
import Featuredinfo from "../../components/featured/Featuredinfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetsm/Widgetsm";
import WidgetLg from "../../components/widgetlg/Widgetlg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestmethod";
import { Link } from "react-router-dom";

export default function Home() {
  const [userStats,setUserStats] = useState([])
 
   const MONTH  = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
   )

   useEffect(()=>{
   const getStats = async () => {
   try {
    const res = await userRequest.get("users/stats")
    res.data.map(item=>{
      setUserStats(prev=>[
        ...prev,
        {name:MONTH[item._id -1],"Active User": item.total},
      ])
    })
   } catch (error) {
    console.log(error)
    }
   }
   getStats()
 
   },[MONTH])


  return (
    <div className="home">

      <Featuredinfo />
     <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>  
    </div>    

  );
}

