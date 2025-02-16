'use client'

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
 [key: string]: {
   label: string;
   digit: number;
 }
}

const Summary: React.FC<SummaryProps> = ({ orders = [], products = [], users = [] }) => {
    console.log("Orders:", orders);
    console.log("Products:", products);
    console.log("Users:", users);
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
   sale: { label: 'Total Sale', digit: 0 },
   products: { label: 'Total Products', digit: 0 },
   orders: { label: 'Total Orders', digit: 0 },
   paidOrders: { label: 'Paid Orders', digit: 0 },
   unpaidOrders: { label: 'Unpaid Orders', digit: 0 },
   users: { label: 'Total Users', digit: 0 },
 });
 
 useEffect(() => {
    setSummaryData(prevData => {
      // Cálculos basados en orders, products y users
      const totalSale = orders.reduce((acc, item) =>
        item.status === 'complete' ? acc + item.amount / 100 : acc, 0);
  
      const paidOrders = orders.filter(order => order.status === 'complete');
      const unpaidOrders = orders.filter(order => order.status === 'pending');
      
  console.log("pagaaaaaaaaaaaaa",unpaidOrders)
      const newData = {
        ...prevData,
        sale: { ...prevData.sale, digit: totalSale },
        orders: { ...prevData.orders, digit: orders.length },
        paidOrders: { ...prevData.paidOrders, digit: paidOrders.length },
        unpaidOrders: { ...prevData.unpaidOrders, digit: unpaidOrders.length },
        products: { ...prevData.products, digit: products.length },
        users: { ...prevData.users, digit: users.length },
      };
      
      // Solo actualizamos si hay cambios
      if (
        prevData.sale.digit !== newData.sale.digit ||
        prevData.orders.digit !== newData.orders.digit ||
        prevData.paidOrders.digit !== newData.paidOrders.digit ||
        prevData.unpaidOrders.digit !== newData.unpaidOrders.digit ||
        prevData.products.digit !== newData.products.digit ||
        prevData.users.digit !== newData.users.digit
      ) {
        return newData;
      }
      return prevData; // Sin cambios
    });
  }, [orders, products, users]);
   // Only runs if these props change

 const summaryKeys = Object.keys(summaryData);
 console.log("usuarios",users)
 return (
   <div className="max-w-[1150px] m-auto"> 
     <div className="mb-4 mt-8">
       <Heading title="Stats" center />
     </div>
     <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
       {
         summaryKeys.map((key) => (
           <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
             <div className="text-xl md:text-4xl font-bold">
               {summaryData[key].label === 'Total Sale' ? formatPrice(summaryData[key].digit) : formatNumber(summaryData[key].digit)}
             </div>
             <div>{summaryData[key].label}</div>
           </div>
         ))
       }
     </div>
   </div>
 );
}

export default Summary;
