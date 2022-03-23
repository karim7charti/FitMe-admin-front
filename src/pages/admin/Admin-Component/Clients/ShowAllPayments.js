import React,{Component} from "react";
import pay_man from './../../../../img/pay_man.png'
import './../../../../css/AdminProducts.css'
import AddIcon from '@material-ui/icons/Add';
import acc_mng from "../../../../img/bills.png";
import back4 from "../../../../img/user_price.png";
import back3 from "../../../../img/user_date.png";
import back5 from "../../../../img/user_num.png";

import {withRouter} from "react-router-dom";
import axios from "axios";
import SketelonPayment from "../../Ui-compoment/SketelonPayment";
import swal from "sweetalert";


class ShowAllPayments extends Component{
    constructor(props) {
        super(props);
        if(this.props.location.item===undefined)
            this.item=JSON.parse(localStorage.getItem("item"))
        else
        {
              this.item=this.props.location.item;
              localStorage.setItem("item",JSON.stringify(this.item))
        }

    }
    state={
        daysAgo:"",
        current:[],
        expired:[],
        loading:true,
        price:"",
        payment_date:"",
        experation_date:"",
         errors:[]
    }
    fillComponent=()=>{
         axios.get('/getSubscriptions/'+this.item.id).then(res=>{
            this.setState({
                daysAgo:res.data.lastPayment,
                current:res.data.current,
                expired:res.data.expired,
                loading:false
            })
        })
    }
    componentDidMount() {
        this.fillComponent()
    }
    addSubscription=e=>{
        e.preventDefault();

        var payload={
            price:this.state.price,
            payment_date:this.state.payment_date,
             experation_date:this.state.experation_date,
            c:this.item
        }
             swal({
            title: "Are you sure?",
            text: "Once this form is submited you won't be able to modify any data of it",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await   axios.post("/addSubscription",payload).then(response=>{


                            if(response.data.status===422)
                            {
                                 this.setState({
                                       errors:response.data.errors
                                   })

                            }
                            else
                            {
                                 this.setState({
                                     price:"",
                                    payment_date:"",
                                    experation_date:"",

                                })
                                   swal({
                                    title: "good job!",
                                    text: "Subscription passed successfully",
                                    icon: "success",
                                });
                                 this.fillComponent()

                            }

                    })

                }
            });

    }
    handleInput=e=>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:[]
        })
    }
    render() {
             var current="",expired="";


        if(this.state.loading)
        {
            current= <>
                   <SketelonPayment/>
                 <SketelonPayment/>
            </>
             expired= <>
                        <SketelonPayment/>
                 <SketelonPayment/>
            </>
        }
        else {

            /*if(this.state.current.length===0)
                current= <div className="alert alert-primary m-0 col-lg-12 col-md-12 col-sm-12 col-12" role="alert">
                    No equipment found
                </div>

            else {*/



                current=this.state.current.map((item,index)=>{


                    return(
                        <>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
                               <div className="card border-success mb-3 mx-auto" style={{

                                   maxWidth: "40rem",

                               }}>
                                   <div className="card-header text-success"><b>Current</b></div>
                                   <div className="card-body">
                                       <h5 className="card-title">{item[2]} DH </h5>
                                       <p className="card-text  date_p">
                                           <div className="row">

                                               <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                                   Payment date
                                               </div>

                                               <div className="col-lg-5 col-md-5 col-sm-5 col-5 text-right">
                                                   <b>{item[1]}</b>
                                               </div>

                                           </div>

                                           <div className="row">

                                               <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                                   Expired date
                                               </div>

                                               <div className="col-lg-5 col-md-5 col-sm-5 col-5 text-right">
                                                   <b>{item[0]}</b>
                                               </div>

                                           </div>
                                       </p>
                                   </div>
                               </div>
                           </div>


                        </>
                    )

                });

                expired=this.state.expired.map(item=>{
                    return(
                        <>
                           <div className="col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
                               <div className="card border-danger mb-3 mx-auto" style={{

                                   maxWidth: "40rem",

                               }}>
                                   <div className="card-header text-danger"><b>Expired</b></div>
                                   <div className="card-body">
                                       <h5 className="card-title">{item[2]} DH</h5>
                                       <p className="card-text  date_p">
                                           <div className="row">

                                               <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                                   Payment date
                                               </div>

                                               <div className="col-lg-5 col-md-5 col-sm-5 col-5 text-right">
                                                   <b>{item[1]}</b>
                                               </div>

                                           </div>

                                           <div className="row">

                                               <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                                   Expired date
                                               </div>

                                               <div className="col-lg-5 col-md-5 col-sm-5 col-5 text-right">
                                                   <b>{item[0]}</b>
                                               </div>

                                           </div>

                                       </p>
                                   </div>
                               </div>
                           </div>

                    </>
                    )

                })
           /* }*/

        }
        return(

            <>

               <div className="row" style={{
                   width:"100%"
               }}>
                   <div className="col-lg-12 col-sm-11 col-11 col-md-11 mt-0 mx-auto" id="pay_man_card">
                       <div className="card mb-3 mx-auto mt-3 px-1" id="user_card" style={{
                           maxWidth: "700px",
                           borderRadius: "9px",


                       }}>
                           <div className="row g-0">
                               <div className="col-md-4">
                                   <img src={pay_man} style={{
                                       width:'100%',
                                       height:'95%'
                                   }} className="img-fluid rounded-start" alt="Profile"/>
                               </div>
                               <div className="col-md-8 col-sm-12 col-12">
                                   <div className="card-body">
                                       <h4 className="card-title">{this.item.firstName} {this.item.lastName} </h4>
                                       <p className="card-text">
                                           <b>{this.item.nationalId}</b><br/>
                                           {this.item.email}<br/>
                                           {this.item.num}
                                       </p>
                                       <p className="card-text"><small className="text-muted">Last payment {this.state.daysAgo} day ago </small></p>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Don't code this !!!!!!!!!!!!!
                   ----------------------------------------
                   */}
                   <div className="col-lg-12 col-md-11 col-11 col-sm-11 my-3 mx-auto" id="non_visible">
                       <div className="card mb-3 mx-auto px-1" style={{
                           maxWidth: "600px",
                           borderRadius: "9px",

                       }}>
                           <div className="row g-0">
                               <div className="col-md-4">
                                   <img src={pay_man} className="img-fluid rounded-start" alt="Profile"/>
                               </div>
                               <div className="col-md-8">
                                   <div className="card-body">
                                       <h4 className="card-title">Kaim Elmrissani</h4>
                                       <p className="card-text">
                                           <b>FB121212</b><br/>
                                           Karim@gmail.com<br/>
                                           06062222222
                                       </p>
                                       <p className="card-text"><small className="text-muted">Last payment 28 day ago </small></p>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   {/*
                   ----------------------------------------
                   */}



                   <div className="col-lg-11 col-md-11 col-sm-11 col-11 mt-4 mx-auto">

                       <div className="row">

                           {/* If Not expired*/}
                           {current}
                           {expired}

                     </div>






                   </div>


               </div>



                {/*Add Payment Code*/}
                <div className="items_btn" id="floatingBtns">
                    <button className="btn btn-floating btn-sm" title="Add bill" data-bs-toggle="modal" data-bs-target="#bill_model"  style={{
                        position: "fixed",
                        marginLeft: "1%",
                        right: "10px",
                        zIndex: "1",
                        bottom: "8px",
                        backgroundColor: "#6E3CBC",
                        borderRadius:"100%",
                        height:"3.5em",
                        width:"3.5em",
                    }} color='secondary' size='medium'>
                        <AddIcon style={{color: "white"}} className="bx-flashing"/>
                    </button>
                </div>



                <div className="modal fade" id="bill_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-lg modal-dialog-centered ">
                        <div className="modal-content" id="manage">
                            <div className="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col">
                                    <img src={acc_mng} id="logo_manage_pr" style={{
                                        height:"10%",
                                        width:"20%",

                                    }}/>
                                </div>
                                <button id="close" type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                     <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id=""
                                          method="post" onSubmit={this.addSubscription}>

                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto">
                                        <div className="row mx-auto">
                                            <div className="col-lg-10 col-md-10 col-sm-12 col-12 mx-auto">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                    <input type="number" required className="form-control"
                                                           placeholder="Price"
                                                           aria-label="Price" aria-describedby="basic-addon1" name="price" value={this.state.price} onChange={this.handleInput}/>

                                                </div>
                                                <span className="text-danger">{this.state.errors.price}</span>

                                            </div>

                                        </div>


                                    </div>



                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto">
                                        <div className="row mx-auto">
                                            <div className="col-lg-10 col-md-10 col-sm-12 col-12 mx-auto">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back4}
                                                                                                          className="icons"/></span>

                                                    <input type="date" required className="form-control"
                                                           placeholder="Payment Date"
                                                           aria-label="date" aria-describedby="basic-addon1" name="payment_date" value={this.state.payment_date} onChange={this.handleInput}/>

                                                </div>
                                                <span className="text-danger">{this.state.errors.payment_date}</span>

                                            </div>

                                        </div>


                                    </div>



                                    <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto">
                                        <div className="row mx-auto">
                                            <div className="col-lg-10 col-md-10 col-sm-12 col-12 mx-auto">
                                                <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back5}
                                                                                                          className="icons"/></span>

                                                  <input type="date" required className="form-control"
                                                           placeholder="expire Date"
                                                           aria-label="date" aria-describedby="basic-addon1"  min={new Date().toISOString().split('T')[0]} name="experation_date" value={this.state.experation_date} onChange={this.handleInput}/>

                                                </div>
                                                <span className="text-danger">{this.state.errors.experation_date}</span>

                                            </div>

                                        </div>


                                    </div>





                                        <div className="modal-footer">

                                            <button id="add_payment" type="submit"   className="btn btn-primary" >
                                                     <span id="spinncon" className="spinner-border spinner-border-sm" style={{display:"none"}}></span>Add
                                            </button>
                                            <button type="button" id="cancel_payment" className="btn btn-secondary"
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

export default withRouter(ShowAllPayments);
