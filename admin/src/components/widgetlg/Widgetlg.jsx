import { useEffect, useState } from "react";
import { userRequest } from "../../requestmethod";
import "./widgetlg.css";
import {format} from "timeago.js"
import profileicon from "../../assets/green.jpeg"

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
  return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer-Id</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
            <img
            src={profileicon}
            alt="img"
            className="widgetSmImg"
          />
              <span className="widgetLgName">{order._id}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">${order.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}