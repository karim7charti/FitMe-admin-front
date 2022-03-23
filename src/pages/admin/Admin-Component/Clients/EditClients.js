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


class EditClients extends Component{



    state={
       errors:{},
        loading:true,
        email: this.props.item.email,
        nationalId: this.props.item.nationalId,
        firstName: this.props.item.firstName,
         num: this.props.item.num,
        lastName: this.props.item.lastName

    }




    componentDidMount() {

    }

    editClient=e=>{
        e.preventDefault();
        var spinner=document.querySelector('.spinner-border');
        var btn=document.querySelector('#btn_add');
        spinner.style.display="inline-block";
        btn.disabled=true;
        var payload={
               email: this.state.email,
            nationalId: this.state.nationalId,
        firstName: this.state.firstName,
         num: this.state.num,
        lastName: this.state.lastName
        }

        axios.post('/editClient/'+this.props.item.id,payload).then(res=>{



            if(res.data.status===422)
            {

               this.setState({
                   errors:res.data.errors
               })

            }
            else
            {
                this.props.updateListElemnt(res.data)
                   swal({
                    title: "good job!",
                    text: "client updated succefuly",
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


        return (this.props.trigger) ? (

            <form method="post" onSubmit={this.editClient}>
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
                                        <span className="input-group-text" id="basic-addon1"><img src={usernum} className="icons"/></span>

                                        <input type="email" className="form-control" placeholder="email"
                                               aria-label="about key" aria-describedby="basic-addon1" name="email" onChange={this.handleInput} value={this.state.email} required/>
                                        <span className="text-danger">{this.state.errors.email}</span>
                                    </div>

                                </div>
                                <div className="col-12 col-lg-11 col-md-12 col-sm-12 m-auto">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><img src={user_note} className="icons"/></span>

                                        <input type="name" className="form-control" placeholder="phone number"
                                               aria-label="about key" aria-describedby="basic-addon1" name="num" onChange={this.handleInput} value={this.state.num} required/>
                                        <span className="text-danger">{this.state.errors.num}</span>
                                    </div>

                                </div>



                            </div>




                        </div>

                        <div className="row">

                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pt-4">
                                <div className="row">
                                    <div className="col-5 col-lg-5 col-md-5 col-sm-5 m-auto">
                                        <button className="btn btn-primary col-lg-12" type="reset" id="btn_cancel" onClick={() =>{

                                            this.props.setTrigger(false,"")


                                        }}>Cancel</button>
                                    </div>
                                    <div className="col-5 col-lg-5 col-md-5 col-sm-5 m-auto">
                                        <button className="btn btn-primary col-lg-12" type="submit"  id="btn_add">
                                            <span className="spinner-border spinner-border-sm" style={{display:"none"}}></span>
                                            Update</button>
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


export default EditClients;
