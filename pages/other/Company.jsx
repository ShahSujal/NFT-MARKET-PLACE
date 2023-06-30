import React from "react";
import { BsHeart } from "react-icons/bs";
import Style from '../style/Company.module.css'
import {format} from 'timeago.js'
const Company = ({CompanyData}) => {
  return (
    <section style={{width:"100%"}}>
      <div className={Style.container}>
  <div className={Style.wrapper}>

          <table className={Style.tableClass} >
            <thead>
              <tr>
              <th className={Style.tableTitle}>
                  Company
                </th>
                <th className={Style.tableTitle}>
                  Transaction from
                </th>
                <th className={Style.tableTitle}>
                  Transaction To
                </th>
                <th className={Style.tableTitle}>
                  Type
                </th>
              
                <th className={Style.tableTitle}> company </th>
              </tr>
            </thead>
            <tbody className={Style.borderAdd}>
              {CompanyData.map((items) => {
                return (
                  <tr key={items._id} className={Style.flash}>
                    <td className={Style.itemClass}>{items.companyName}</td>
                     <td className={Style.itemClass}>{items.Transaction.from.slice(0,18)}XXXXXXXXX</td> 
                    <td className={Style.itemClass}>
                      {items.Transaction.to.slice(0,18)}XXXXXXXXX
                    </td>
                    <td className={Style.itemClass}>{items.TypeOfTransaction}</td>
                    <td className={Style.tdClass}>
                     {format(items.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

              </div>
      </div>
    </section>
  );
};

export default Company;
