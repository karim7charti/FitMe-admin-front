import React,{Component} from "react";

import "../../../../css/AdminProducts.css"
import axios from "axios";
import swal from "sweetalert";

class ShowOneEmploye extends Component{
    constructor(props) {
        super(props);

    }
    state={
        btnEdit:false
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
                    await axios.delete('/deleteEmp/'+id).then(response=>{
                        if(response.status===200)
                        {
                            this.props.removeIt(this.props.i)
                            swal("Good job!", "employe deleted successfully","success");

                        }
                        else {
                            swal("oops!", "some thing went wrong retry please ","error");
                        }
                    }).catch(function (err){
                        swal({
                            title: "oops!",
                            text: "somthing went down !",
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
                                    <h5 id="pr_title">{this.props.item.firstName} {this.props.item.lastName} </h5>
                                    <p id="description">
                                        {this.props.item.prof.label}

                                    </p>
                                </div>
                            </td>

                            <td className="col-12 col-lg-5 col-md-5 col-sm-12 m-auto">
                                <div>
                                    <table className="col-12 col-sm-12 m-auto" id="price_table">
                                        <tr>
                                            <td>National ID</td>
                                            <td><b>{this.props.item.nationalId}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Monthly Payment Amount</td>
                                            <td><b>{this.props.item.monthly_Amount}dh</b></td>
                                        </tr>
                                        <tr>
                                            <td>Payment Day</td>
                                            <td><b>{this.props.item.paymentDay}</b></td>
                                        </tr>

                                    </table>


                                </div>
                            </td>

                            <td className="col-12 col-lg-2 col-md-1 col-sm-12 text-center m-auto">
                                <div id="buttons">
                                    <div className="row">
                                        <div className="col-2 col-lg-6 col-md-6 col-sm-2 edit_div text-center m-auto">
                                            <box-icon name='edit-alt' color='#6E3CBC' onClick={() => {

                                                this.props.setBtnEdit(true,this.props.item,this.props.i)
                                            }} > </box-icon>
                                        </div>
                                        <div  className="col-2 col-lg-6 col-md-6 col-sm-2 text-center m-auto">

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





export default ShowOneEmploye;
