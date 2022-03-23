import React, {Component} from "react";
import {Link,useHistory} from "react-router-dom"

import "../../../css/loginStyle.css"
import back from '../../../img/FitMe_logo.png'
import back2 from '../../../img/logo_withe.png'
import back3 from '../../../img/password.png'
import back4 from '../../../img/username.png'
import back5 from '../../../img/email.png'
import back6 from '../../../img/password_reset.png'
import back7 from '../../../img/code.png'

import axios from "axios";

import swal from "sweetalert";

class LoginPage extends Component{

    state={
        email:'',
        password:'',
        errors: {}
    }


    handlePass=e=>{
        var input=document.querySelector('#pass');
        if(input.type==="text")
            input.type="password";
        else
            input.type="text";

    }
    handleInput=e=>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:[]
        })
    }

        logIn=e=>{
        e.preventDefault();
        var spinner=document.querySelector('.spinner-border');
        var btn=document.querySelector('.btn');
        spinner.style.visibility="visible";
        btn.disabled=true;
        var payload={email:this.state.email,password:this.state.password};
        axios.post('authenticate',payload).then(response=>{

            if(response.data.status===422)
            {
                console.log(response.data.errors)

                this.setState({
                   errors:response.data.errors
                });

            }
            else {
                   localStorage.setItem('token',response.data.token);
                   localStorage.setItem('refresh_token',response.data.refreshToken);

                this.props.history.push('/Dash');


            }

            spinner.style.visibility="hidden";
            btn.disabled=false;
        }).catch(function (error){


            swal({
                title: "oops!",
                text: "wrong credentials please retry !",
                icon: "error",
            });

            spinner.style.visibility="hidden";
            btn.disabled=false;

        });

    }


    render() {
        return(
            <>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-0 my-0" id="core">
                    <section id="login" className="pt-1 mt-0">
                        <div className="row mx-auto my-5 py-0">
                            <div className="col-10 col-lg-10 col-md-10 col-sm-10 mt-5 offset-1 login_form">
                                <div className="row">
                                    <div className="col-12 col-lg-6 col-md-12 col-sm-12 py-5">
                                        <div className="row">
                                            <div className="col-10 col-lg-10 col-md-10 col-sm-10 offset-1">
                                                <h6><b>WELCOME TO</b></h6>
                                            </div>

                                            <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto" id="logo_col">
                                                <img src={back} id="logo"/>
                                            </div>
                                            <div className="col-10 col-lg-10 col-md-10 col-sm-10 offset-1">
                                                <p className="text-justify">
                                                    Login to your admin account and start managing!
                                                </p>

                                            </div>
                                            <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id="login_form" method="post" onSubmit={this.logIn}>
                                                <div className="col-10 col-lg-8 col-md-6 col-sm-8 m-auto">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon1"><img src={back4} className="icons"/></span>

                                                        <input type="email" required className="form-control" placeholder="Email"
                                                               aria-label="Email" aria-describedby="basic-addon1" name="email" onChange={this.handleInput} value={this.state.email}/>

                                                    </div>
                                                    <span className="text-danger">{this.state.errors.email}</span>

                                                </div>
                                                <div className="col-10 col-lg-8 col-md-6 col-sm-8 m-auto">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon1"><img src={back3} className="icons"/></span>

                                                        <input id="pass" type="password" required className="form-control" placeholder="Password"
                                                               aria-label="Password" aria-describedby="basic-addon1" name="password" onChange={this.handleInput} value={this.state.password} />
                                                        <box-icon id="eye" name='show' color='#6E3CBC' onClick={this.handlePass}> </box-icon>


                                                    </div>
                                                        <span className="text-danger">{this.state.errors.password}</span>

                                                </div>

                                                <div className="col-10 col-lg-7 col-md-6 col-sm-9 mt-5  m-auto">
                                                    <button className="btn btn-primary col-lg-12" type="submit" id="btn_login">
                                                        <span className="spinner-border spinner-border-sm" style={{visibility:"hidden"}}></span>&nbsp; Log In</button>
                                                </div>

                                                <div className="col-10 col-lg-7 col-md-6 col-sm-9 mt-2  text-center  mx-auto">
                                                    <a data-bs-toggle="modal" data-bs-target="#email_model" style={{fontSize:"0.8em",color:"#6E3CBC",cursor:"pointer"}}>
                                                        Forgot your password?
                                                    </a>
                                                </div>
                                            </form>


                                        </div>

                                    </div>
                                    <div className="col-12 col-lg-6 col-md-12 col-sm-12 py-1" id="present">

                                        <img src={back2} className="col-lg-10 col-md-7 col-sm-7 col-7 m-auto" id="logo_withe"/>

                                    </div>
                                </div>

                            </div>
                        </div>


                    </section>
                </div>


                {/*password modals*/}

                <div className="modal fade" id="email_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="login"  style={{borderRadius:"15px"}}>
                            <div className="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col" style={{borderRadius:"15px"}}>
                                    <img src={back} id="logo"/>
                                </div>
                                <button id="close2" type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pb-4">
                                        <p className="text-justify text-center">
                                            Type your email here </p>

                                    </div>
                                    <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id="login_form"
                                          method="post">
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back5}
                                                                                                          className="icons"/></span>

                                                <input type="email" required className="form-control"
                                                       placeholder="Email"
                                                       aria-label="Email" aria-describedby="basic-addon1" name="email" />
                                                <span className="text-danger"></span>
                                            </div>

                                        </div>


                                        <div className="modal-footer">
                                            <button type="submit" id="btn_login" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#pass_model" className="btn btn-primary">
                                                <span id="spinner" className="spinner-border spinner-border-sm"  style={{display:"none"}}></span>&nbsp;
                                                Next</button>
                                        </div>
                                    </form>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="modal fade" id="pass_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="login"  style={{borderRadius:"15px"}}>
                            <div className="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col" style={{borderRadius:"15px"}}>
                                    <img src={back} id="logo"/>
                                </div>
                                <button id="close2" type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pb-4">
                                        <p className="text-justify text-center">
                                            Type your 6-digital code then change your password</p>

                                    </div>
                                    <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id="login_form"
                                          method="post">
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back7}
                                                                                                          className="icons"/></span>

                                                <input type="text" required className="form-control"
                                                       placeholder="6-digital code"
                                                       aria-label="Email" aria-describedby="basic-addon1" name="email" />
                                                <span className="text-danger"></span>
                                            </div>

                                        </div>

                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto py-2">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                <input  type={this.state.type} required className="form-control"
                                                        placeholder="New password"
                                                        aria-label="Password" aria-describedby="basic-addon1"
                                                        name="confirmPassword"  onChange={this.handleInputs} />
                                                <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>

                                                <span className="text-danger">{this.state.errors.confirmPassword}</span>
                                            </div>

                                        </div>

                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto py-2">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back6}
                                                                                                          className="icons"/></span>

                                                <input  type={this.state.type} required className="form-control"
                                                        placeholder="Confirm new password"
                                                        aria-label="Password" aria-describedby="basic-addon1"
                                                        name="confirmPassword"  onChange={this.handleInputs}  value={this.state.confirmPassword}/>
                                                <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>

                                                <span className="text-danger">{this.state.errors.confirmPassword}</span>
                                            </div>

                                        </div>

                                        <div className="modal-footer">
                                            <button type="submit" id="btn_login" className="btn btn-primary">
                                                <span id="spinner" className="spinner-border spinner-border-sm"  style={{display:"none"}}></span>&nbsp;
                                                Finish</button>
                                        </div>
                                    </form>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>



            </>

        );
    }

}
export default LoginPage;
