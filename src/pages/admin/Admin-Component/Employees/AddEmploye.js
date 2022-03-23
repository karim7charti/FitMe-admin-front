import React,{Component} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";

import "../../../../css/AdminProducts.css"

import fname from '../../../../img/user_first.png';
import lname from '../../../../img/user_last.png';
import id from '../../../../img/user_id.png';
import udate from '../../../../img/user_date.png';
import usernum from '../../../../img/user_num.png';
import price from '../../../../img/user_price.png';

import user_note from '../../../../img/user_note.png';
import axios from "axios";
import swal from "sweetalert";


class AddClients extends Component{



    state={
        professions:[],
        errors:{},
        loading:true,
        firstName:'',
        lastName:'',
        nationalId:'',
        monthly_Amount:'',
        id_profe:"",
        paymentDay:"",

    }





    componentDidMount() {
         axios.get('/professions').then(res=>{
            this.setState({
                 professions:res.data,

                loading:false,
            })

        })
    }

    storeEmploye=e=>{
        e.preventDefault();
         var spinner=document.querySelector('.spinner-border');
        var btn=document.querySelector('#btn_add');
        spinner.style.display="inline-block";
        btn.disabled=true;

        var payload={
               firstName:this.state.firstName,
                lastName:this.state.lastName,
                nationalId:this.state.nationalId,
                monthly_Amount:this.state.monthly_Amount,
                id_profe:this.state.id_profe,
                paymentDay:this.state.paymentDay
        }

        axios.post('/addEmploye',payload).then(res=>{



            if(res.data.status===422)
            {

               this.setState({
                   errors:res.data.errors
               })

            }
            else
            {
                this.props.addProduct(res.data)
                 this.setState({
                       firstName:'',
                        lastName:'',
                        nationalId:'',
                        monthly_Amount:'',
                        id_profe:"",
                        paymentDay:"",
                })
                   swal({
                    title: "good job!",
                    text: "employe added succefuly",
                    icon: "success",
                });
            }

            spinner.style.display="none";
             btn.disabled=false;

        }).catch(err=>{
             swal({
                title: "oops!",
                text: "somthing went wrong!",
                icon: "error",
            });
              spinner.style.display="none";
             btn.disabled=false;
        })


    }
    handleInput=e=>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:[]
        })
    }




    render() {
        var professions="";
        if(this.state.loading)
        {
            professions= <option colSpan="4" className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </option>
        }
        else {

            professions=this.state.professions.map(item=>{

                return(
                    <option value={item.id}>{item.label}</option>
                )

            });
        }

        return (this.props.trigger) ? (

            <form method="post" onSubmit={this.storeEmploye}>
            <div className="add_bg col-10 col-lg-12 col-md-12 col-sm-12 m-auto">
                <div className="col-11 col-md-9 col-lg-4 col-sm-8 m-auto px-1 py-4" id="Add">


                    <div className="row">

                        <div className="col-11 col-md-7 col-lg-12 col-sm-10 order-2 sm-order-2 m-auto">

                            <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><img src={fname} className="icons"/></span>

                                    <input type="text" className="form-control" placeholder="First name"
                                           aria-label="Name" aria-describedby="basic-addon1" name="firstName" onChange={this.handleInput} value={this.state.firstName} required/>
                                    <span className="text-danger">{this.state.errors.firstName}</span>

                                </div>

                            </div>
                            <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><img src={lname} className="icons"/></span>

                                    <input type="text" className="form-control" placeholder="Last name"
                                           aria-label="Start price" aria-describedby="basic-addon1" name="lastName" onChange={this.handleInput} value={this.state.lastName} required/>
                                    <span className="text-danger">{this.state.errors.lastName}</span>
                                </div>

                            </div>

                            <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><img src={id} className="icons"/></span>

                                    <input type="text" className="form-control" placeholder="National ID"
                                           aria-label="Discount price" aria-describedby="basic-addon1" name="nationalId" onChange={this.handleInput} value={this.state.nationalId} required/>
                                    <span className="text-danger">{this.state.errors.NationalId}</span>
                                </div>

                            </div>

                            <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><img src={price} className="icons"/></span>

                                    <input type="number"   min="20" className="form-control" placeholder="Monthly payment"
                                           aria-label="about key" aria-describedby="basic-addon1" name="monthly_Amount" onChange={this.handleInput} value={this.state.monthly_Amount} required/>
                                    <span className="text-danger">{this.state.errors.Monthly_Amount}</span>
                                </div>

                            </div>
                            <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><img src={udate} className="icons"/></span>

                                    <input type="number" max="31" min="1" className="form-control" placeholder="Payment day"
                                           aria-label="about key" aria-describedby="basic-addon1" name="paymentDay" onChange={this.handleInput} value={this.state.paymentDay} required/>
                                    <span className="text-danger">{this.state.errors.paymentDay}</span>
                                </div>

                            </div>


                            <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><img src={user_note} className="icons"/></span>

                                    <select  className="form-select form-control" aria-label="Default select example" name="id_profe" onChange={this.handleInput} value={this.state.id_profe}>
                                        {professions}
                                    </select>
                                    <span className="text-danger">{this.state.errors.id_profe}</span>
                                </div>

                            </div>




                        </div>




                    </div>

                    <div className="row">

                        <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pt-4">
                            <div className="row">
                                <div className="col-5 col-lg-5 col-md-5 col-sm-5 m-auto">
                                    <button className="btn btn-primary col-lg-12" type="reset" id="btn_cancel" onClick={() =>{

                                        this.props.setTrigger()


                                    }}>Cancel</button>
                                </div>
                                <div className="col-5 col-lg-5 col-md-5 col-sm-5 m-auto">
                                    <button className="btn btn-primary col-lg-12" type="submit"  id="btn_add">
                                        <span className="spinner-border spinner-border-sm" style={{display:"none"}}></span>
                                        Add</button>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>

            </form>
        ) : "";

    }
}


export default AddClients;
