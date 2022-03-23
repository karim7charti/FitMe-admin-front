import React from "react";
import {Component} from "react";
import {Link,withRouter} from "react-router-dom"
import '../../../css/SideNav.css'

import logo from '../../../img/FitMe_logo.png'

import swal from "sweetalert";
import back4 from "../../../img/username.png";
import back3 from "../../../img/password.png";
import back5 from "../../../img/password_reset.png";
import back6 from "../../../img/email.png";

import acc_mng from "../../../img/account_manage.png";
import axios from "axios";





class SideNav extends Component{



    clickBoxMenu= (e)=>{
        let sidebar = document.querySelector(".sidebar");

        sidebar.classList.toggle("open");


    }
    state={


        username:'',
        name:'',
        email:'',
        email1:'',

        password:'',
        oldPass:'',
        errors:[],
        type:'password',
        confirmPassword:'',
        disable:true,
        disableI:true,
        disableEmail:true,

        code:'',

        disablePass:true,

        loading:true,
        autoFocus:true,
        placeholder:'***********'

    }

    componentDidMount() {
        axios.get('/username').then(res=>{
            this.setState({
                username:res.data.username,
                name:res.data.username,
                 email:res.data.email,
                email1:res.data.email
            })
        })




    }


    editUsername=e=>{

        const edit_un = document.querySelector("#ed_username");
        const save_un = document.querySelector("#sv_username");
        const cancel_un = document.querySelector("#cl_username");
        const in_un = document.querySelector("#in_username");
        this.setState({
            disable:false,

        },()=>{
            edit_un.style.display="none";
            save_un.style.display="block";
            cancel_un.style.display="block";
            in_un.style.borderBottom="1px solid rgb(233,0,120)";
        })


    }
    cancelEdituserName=e=>{
        const edit_un = document.querySelector("#ed_username");
        const save_un = document.querySelector("#sv_username");
        const cancel_un = document.querySelector("#cl_username");
        const in_un = document.querySelector("#in_username");
        this.setState(state=>({
            name:state.username
        }))
        this.setState({
            disable:true,
            errors:[]
        },()=>{
            edit_un.style.display="block";
            save_un.style.display="none";
            cancel_un.style.display="none";
            in_un.style.border="0";
        })
    }
    editMail=e=>{

        const edit_em = document.querySelector("#ed_email");
        const save_em = document.querySelector("#sv_email");
        const cancel_em = document.querySelector("#cl_email");
        const in_em = document.querySelector("#in_email");
        const oldPass = document.querySelector("#oldPassEmail");


        this.setState({
            disableEmail:false
        },()=>{
            edit_em.style.display="none";
            save_em.style.display="block";
            cancel_em.style.display="block";
            oldPass.style.display="block";
            in_em.style.borderBottom="1px solid rgb(233,0,120)";
        })


    }
    cancelEditMail=e=>{
        const edit_em = document.querySelector("#ed_email");
        const save_em = document.querySelector("#sv_email");
        const cancel_em = document.querySelector("#cl_email");
        const in_em = document.querySelector("#in_email");
        const oldPass = document.querySelector("#oldPassEmail");
        this.setState(state=>({
            email:state.email1
        }))
        this.setState({
            disableEmail:true,
            errors:[]
        },()=>{
            edit_em.style.display="block";
            save_em.style.display="none";
            oldPass.style.display="none";
            cancel_em.style.display="none";
            in_em.style.border="0";
        })
    }
    editPassword=e=>{
        const edit_ps = document.querySelector("#ed_pass");
        const save_ps = document.querySelector("#sv_pass");
        const cancel_ps = document.querySelector("#cl_pass");

        const cnf_div = document.querySelector("#new_pass_confirm");
        const cnf_pr = document.querySelector("#new_pass_preview");
        this.setState({
            disablePass:false
        },()=>{
            edit_ps.style.display="none";
            save_ps.style.display="block";
            cancel_ps.style.display="block";
            cnf_div.style.display="block";
            cnf_pr.style.display="block";

        })

    }
    cancelEditPass=e=>{
        const edit_ps = document.querySelector("#ed_pass");
        const save_ps = document.querySelector("#sv_pass");
        const cancel_ps = document.querySelector("#cl_pass");

        const cnf_div = document.querySelector("#new_pass_confirm");
        const cnf_pr = document.querySelector("#new_pass_preview");
        this.setState({
            disablePass:true,
            password:'',
            oldPass:'',
            confirmPassword:'',
            errors:[]

        },()=>{
            edit_ps.style.display="block";
            save_ps.style.display="none";
            cnf_div.style.display="none";
            cnf_pr.style.display="none";
            cancel_ps.style.display="none";

        })

    }
    handleInputs=e=>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:[]
        })
    }

    updateUsername=e=>{

        var frm=new FormData();
        frm.append("username",this.state.name)
         const cancel_un = document.querySelector("#cl_username");
        this.setState({
            disable:true
        },()=>{
            axios.post('/updateUsername',frm).then(response=>{

                    this.setState({
                        name:response.data,

                        username:response.data,
                        disable:false


                    },()=>{
                        swal({
                            title: "done!",
                            text: "username updated succefully!",
                            icon: "success",
                        });
                        cancel_un.click()

                    })


            }).catch(err=>{
                swal({
                    title: "oops!",
                    text: "somthing went wrong retry !",
                    icon: "error",
                });
            })
        })


    }
    updateEmail=e=>{


          const cancel_em = document.querySelector("#cl_email");
        var frm=new FormData();
        frm.append("email",this.state.email);
        frm.append("oldPass",this.state.password)
        this.setState({
            disableEmail:true
        },()=>{
            axios.post('/updateEmail',frm).then(response=>{

                if(response.status===201)
                {
                    this.setState({
                        disableEmail:false
                    },()=>{
                        swal({
                            title: "oops!",
                            text: "invalid password !",
                            icon: "warning",
                        });
                    })
                }



                else
                {

                        swal({
                            title: "done!",
                            text: "email updated succefully!",
                            icon: "success",
                        });
                        localStorage.removeItem("token")
                        window.location.reload()




                }

            }).catch(err=>{
                swal({
                    title: "oops!",
                    text: "somthing went wrong retry !",
                    icon: "error",
                });
            })




        })

    }
    updatePass=e=>{
        const cancel_ps = document.querySelector("#cl_pass");
        var payload={OldPass:this.state.oldPass,password: this.state.password,password_confirmation:this.state.confirmPassword}
        this.setState({
            disable:true
        },()=>{
            if(payload.password.length<8)
            {
                swal({
                            title: "oops!",
                            text: "new password must have more than 8 caracters !",
                            icon: "warning",
                        });
                return
            }

            if(payload.password_confirmation!==payload.password)
            {
                 swal({
                            title: "oops!",
                            text: "new password does not match the confirmation!",
                            icon: "warning",
                        });
                return
            }
            let frm=new FormData();
            frm.append("oldPass",payload.OldPass)
            frm.append("password",payload.password)
            frm.append("password_confirmation",payload.password_confirmation)

            axios.post('/updatePassword',frm).then(res=>{
                     if(res.status===201)
                {
                    this.setState({
                        disable:false
                    },()=>{
                        swal({
                            title: "oops!",
                            text: "invalid password !",
                            icon: "warning",
                        });
                    })
                }



                else
                {

                        swal({
                            title: "done!",
                            text: "password updated succefully!",
                            icon: "success",
                        });
                        localStorage.removeItem("token")
                        window.location.reload()




                }


            }).catch(err=>{
                  swal({
                    title: "oops!",
                    text: "somthing went wrong retry !",
                    icon: "error",
                });
            })


        })
    }
    handlePass=e=>{
        //var input=document.querySelector('#pass');

        if(this.state.type==="text")
            this.setState({
                type:'password'
            })
        else
            this.setState({
                type:'text'
            })

    }


    logOut=e=>{

        localStorage.clear()
        this.props.history.push("/")
    }


    render() {
        return(
            <>
                <div className="sidebar">
                    <div className="logo-details">
                        <img src={logo}/>

                        <i className='bx bx-menu' id="btn" onClick={this.clickBoxMenu}></i>
                    </div>
                    <ul className="nav-list">

                        <li id="Dashboard">
                            <Link to={'/Dash'} className="box">
                                <i className='bx bx-pie-chart-alt-2'></i>
                                <span className="links_name">Dashboard</span>
                            </Link>
                            <span className="tooltip">Dashboard</span>
                        </li>

                        <li id="Clients">
                            <Link to={'/Client'} className="box">
                                <i className='bx bx-user-check'></i>
                                <span className="links_name">Client</span>
                            </Link>
                            <span className="tooltip">Client</span>
                        </li>

                        <li id="Equipment">
                            <Link to={'/Equipment'} className="box">
                                <i className='bx bx-grid-alt'></i>
                                <span className="links_name">Equipment</span>
                            </Link>
                            <span className="tooltip">Equipment</span>
                        </li>

                        <li id="Employees">
                            <Link to={'/Employe'} className="box">
                                <i className='bx bx-briefcase-alt-2'></i>
                                <span className="links_name">Employees</span>
                            </Link>
                            <span className="tooltip">Employees</span>
                        </li>

                        <li id="test">
                            <a className="box"  data-bs-toggle="modal" data-bs-target="#manage_model" >
                                <i className='bx bx-user'></i>
                                <span className="links_name">Profile</span>
                            </a>
                            <span className="tooltip">Profile</span>
                        </li>

                        <li className="profile">
                            <div className="profile-details">

                                <div className="name_job">
                                    <div className="name">{this.state.username}</div>
                                    <div className="job">Admin</div>
                                </div>
                            </div>
                            <i className='bx bx-log-out' id="log_out" onClick={this.logOut}></i>
                        </li>
                    </ul>
                </div>



                {/*Manage account modal*/}

                <div className="modal fade" id="manage_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-lg modal-dialog-centered ">
                        <div className="modal-content" id="manage">
                            <div className="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col">
                                    <img src={acc_mng} id="logo_manage_pr"/>
                                </div>
                                <button id="close" type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pb-4">
                                        <p className="text-justify text-center">
                                            Manage and review your account wherever you are! </p>

                                    </div>

                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto">
                                        <div className="row mx-auto">
                                            <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back4}
                                                                                                          className="icons"/></span>

                                                    <input type="text" required className="form-control"
                                                           placeholder="Username"
                                                           aria-label="Email" aria-describedby="basic-addon1" name="name" onChange={this.handleInputs} value={this.state.name} id="in_username" disabled={this.state.disable} />

                                                </div>
                                                <span className="text-danger">{this.state.errors.username}</span>

                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                                <div className="row">
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                        <button  className="btn text-center cl_mg p-auto" id="cl_username"  onClick={this.cancelEdituserName}>Cancel</button>
                                                    </div>
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                        <button  className="btn text-center sv_mg p-auto" id="sv_username" onClick={this.updateUsername} >Save</button>
                                                    </div>
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto" >
                                                        <button className="btn text-center ed_mg p-auto" id="ed_username"  onClick={this.editUsername}>Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                    {/*email*/}


                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto">
                                        <div className="row mx-auto">
                                            <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back6}
                                                                                                          className="icons"/></span>

                                                    <input type="email" required className="form-control"
                                                           placeholder="Email"
                                                           aria-label="Email" value={this.state.email} onChange={this.handleInputs} disabled={this.state.disableEmail} aria-describedby="basic-addon1" name="email"  id="in_email" />

                                                </div>
                                                <span className="text-danger">{this.state.errors.email}</span>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                                <div className="row">
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                        <button className="btn text-center cl_mg p-auto" id="cl_email"  onClick={this.cancelEditMail}>Cancel</button>
                                                    </div>
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                        <button  className="btn text-center sv_mg p-auto" id="sv_email"  onClick={this.updateEmail}>

                                                            Save</button>
                                                    </div>
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto" >
                                                        <button className="btn text-center ed_mg p-auto" id="ed_email" onClick={this.editMail}>Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto" id="oldPassEmail" style={{display:'none'}}>
                                        <div className="row mx-auto">
                                            <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                    <input  type={this.state.type}   className="form-control"
                                                            placeholder="Old password"
                                                            aria-label="Password"  aria-describedby="basic-addon1" name="password" value={this.state.password} onChange={this.handleInputs} id="in_new_password"/>

                                                    <box-icon id="eye" name='show' color='#6E3CBC' onClick={this.handlePass}></box-icon>
                                                </div>
                                                <span className="text-danger">{this.state.errors.password}</span>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-6">

                                            </div>
                                        </div>


                                    </div>

                                    {/*password*/}

                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto" id="old_pass_preview">
                                        <div className="row mx-auto">
                                            <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                    <input  type={this.state.type}  required className="form-control"
                                                            placeholder="Old password"
                                                            aria-label="Password" aria-describedby="basic-addon1"  name="oldPass" value={this.state.oldPass} onChange={this.handleInputs} disabled={this.state.disablePass}/>

                                                    <box-icon id="eye" name='show' color='#6E3CBC' onClick={this.handlePass}></box-icon>
                                                </div>
                                                <span className="text-danger">{this.state.errors.OldPass}</span>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                                <div className="row">
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                        <button className="btn text-center cl_mg p-auto" id="cl_pass" onClick={this.cancelEditPass}>Cancel</button>
                                                    </div>
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6  mx-auto ">
                                                        <button className="btn text-center sv_mg p-auto" id="sv_pass"  onClick={this.updatePass}>Save</button>
                                                    </div>
                                                    <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto" >
                                                        <button className="btn text-center ed_mg p-auto" id="ed_pass" onClick={this.editPassword}>Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto" id="new_pass_preview">
                                        <div className="row mx-auto">
                                            <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                    <input  type={this.state.type} required className="form-control"
                                                            placeholder="New password"
                                                            aria-label="Password" aria-describedby="basic-addon1" name="password" value={this.state.password} onChange={this.handleInputs} id="in_new_password"/>

                                                    <box-icon id="eye" name='show' color='#6E3CBC' onClick={this.handlePass}></box-icon>
                                                </div>
                                                <span className="text-danger">{this.state.errors.password}</span>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-6">

                                            </div>
                                        </div>


                                    </div>


                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto"  id="new_pass_confirm">
                                        <div className="row mx-auto">
                                            <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back5}
                                                                                                          className="icons"/></span>

                                                    <input   type={this.state.type}  required className="form-control"
                                                             placeholder="Confirm new password"
                                                             aria-label="Password" aria-describedby="basic-addon1" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputs}  id="in_new_password_confirm"/>

                                                    <box-icon id="eye" name='show' color='#6E3CBC' onClick={this.handlePass}></box-icon>
                                                </div>
                                                <span className="text-danger">{this.state.errors.password_confirmation}</span>
                                            </div>
                                            <div className="col-lg-4">

                                            </div>
                                        </div>


                                    </div>
                                    <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id=""
                                          method="post"  >

                                        <div className="modal-footer">
                                            <button type="button" id="cancel_login" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Cancel
                                            </button>
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

export default withRouter(SideNav);
