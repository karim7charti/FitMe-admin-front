import React,{Component} from "react";
import {Link} from "react-router-dom";
import "../../../../css/AdminProducts.css"
import swal from "sweetalert";
import axios from "axios";


class ShowOneClient extends Component{
    constructor(props) {
        super(props);

    }
    state={
        btnEdit:false,

    }


    deleteProduct=(e,id)=>{

          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.delete('/deleteClient/'+id).then(response=>{
                        if(response.status===200)
                        {
                            this.props.removeIt(this.props.i)
                            swal("Good job!", "client deleted successfully","success");

                        }
                        else {
                            swal("oops!", "some thing went wrong retry please ","error");
                        }
                    }).catch(function (err){
                        swal({
                            title: "oops!",
                            text: "somthing went wrong !",
                            icon: "error",
                        });
                        this.props.history.push('/')
                    })

                }
            });

    }


    setbtnEdit=()=>{
        this.setState({
            btnEdit:false
        })
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
         return this.props.item !== nextProps.item;
    }

    render() {

        return (
            <>

                <tr>



                        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">

                            <td className="col-10 col-lg-2 col-md-3 col-sm-10 pb-0 text-center m-auto">
                                <div>
                                    <h5 id="pr_title">{this.props.item.firstName} {this.props.item.lastName}</h5>
                                    <p id="description">
                                       {this.props.item.nationalId}

                                    </p>
                                </div>
                            </td>

                            <td className="col-12 col-lg-5 col-md-5 col-sm-12 m-auto">
                                <div>
                                    <table className="col-12 col-sm-12 m-auto" id="price_table">
                                        <tr>
                                            <td>Email</td>
                                            <td><b>{this.props.item.email}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Phone number</td>
                                            <td><b>{this.props.item.num}</b></td>
                                        </tr>

                                    </table>


                                </div>
                            </td>

                            <td className="col-12 col-lg-5 col-md-12 col-sm-12 text-center m-auto">
                                <div id="buttons">
                                    <div className="row">


                                        <div  className="col-12 col-lg-6 col-md-8 col-sm-12 text-center m-auto">

                                            <Link to={{
                                                pathname: "/pay",
                                                item:this.props.item

                                            }} > <button id="payment_btn" className="my-3">
                                                <div className="row">
                                                    <div className="col-2 col-lg-2 col-md-2 col-sm-2 ml-1">
                                                        <i className="far fa-file-invoice-dollar"></i>

                                                    </div>
                                                    <div className="col-9 col-lg-9 col-md-9 col-sm-9 text-left">

                                                        <span style={{color:"white"}}>Subscription</span>
                                                    </div>

                                                </div>

                                            </button></Link>
                                        </div>

                                        <div className="col-4 col-lg-2 col-md-2 col-sm-4 edit_div text-center m-auto">
                                            <box-icon name='edit-alt' color='#6E3CBC' onClick={() => {

                                                this.props.setBtnEdit(true,this.props.item,this.props.i)
                                            }} > </box-icon>
                                        </div>
                                        <div  className="col-4 col-lg-2 col-md-2 col-sm-4 text-center m-auto">

                                            <a onClick={e => this.deleteProduct(e,this.props.item.id)}>
                                                <box-icon  name='trash' color='#6E3CBC' > </box-icon>
                                            </a>
                                        </div>

                                    </div>

                                </div>
                            </td>



                        </div>

                </tr>



            </>


        );

    }
}





export default ShowOneClient;
