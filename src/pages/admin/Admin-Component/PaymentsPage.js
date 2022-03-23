import React,{Component} from "react";
import "../../../css/AdminProducts.css"
import ShowAllPayments from "./Clients/ShowAllPayments";
import SideNav from "./SideNav";



function Payments(){

    return (
        <>
            <SideNav  tab="products"/>
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0" id="up_bar">
                <ShowAllPayments/>
            </div>



        </>


    );

};




export default Payments;
