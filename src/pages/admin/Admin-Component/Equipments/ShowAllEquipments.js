import React,{Component} from "react";
import {Link} from "react-router-dom";

import ShowOneClient from "./ShowOneEquipment";
import "../../../../css/AdminProducts.css"
import AddClients from "./AddEquipment";
import EditProducts from "./EditEquipment";

import addic from '../../../../img/add_equi.png'

import SketelonClients from "./../../Ui-compoment/SketelonClients"
import ShowOneEquipment from "./ShowOneEquipment";
import axios from "axios";
import swal from "sweetalert";
import EditClients from "../Clients/EditClients";
import EditEquipment from "./EditEquipment";




class ShowAllEquipments extends Component{

    state={
        btnAdd:false,
        btnEdit:false,
        loading:true,
        equipments:[],
        p2:[],
        item:{},
        index:0
    }

    componentDidMount() {
            axios.get('/getEquipments').then(res=>{
            if(res.status===200)
            {
                console.log(res.data)
                this.setState({
                    loading:false,
                    equipments:res.data,
                    p2:res.data
                })


            }
        }).catch(err=>{
             swal({
                title: "oops!",
                text: "somthing went wrong!",
                icon: "error",
            });
        })

    }
    search=(e)=>{



        var arr=this.state.p2.filter(item=>{

            let name=item.name.toLowerCase();

            let searchText=e.target.value.toString().toLowerCase().trim()
            if(name.includes(searchText) )
                return item;
        })
        this.setState({
            equipments:arr
        })



    }



    setbtnAdd=()=>{
        this.setState({
            btnAdd:false
        })
    }

    addProduct=(prod)=>{

         this.setState( state => ({
            equipments:[...state.equipments,prod]
        }));

    }
    sortAlpha=()=>{
        this.setState( state => ({
            products:state.products.sort((a, b) => (a.name > b.name) ? 1 : -1)
        }));

    }
    removeIt=(i)=>{

        var arr=this.state.equipments
        arr.splice(i,1);
        this.setState({
            equipments:arr,
            p2:arr
        })



    }

    setbtnEdit=(show,item,i)=>{
        this.setState({
            btnEdit:show,
            item:item,
            index:i
        })
    }
    updateListElemnt=(prod)=>{
        this.state.equipments[this.state.index] = prod
        this.state.p2[this.state.index] = prod

        this.forceUpdate()


    }

    render() {

        var equipments="";


        if(this.state.loading)
        {
            equipments= <>
                <SketelonClients/>
                <SketelonClients/>
                <SketelonClients/>
                <SketelonClients/>
                <SketelonClients/>
            </>
        }
        else {


            if(this.state.equipments.length===0)
                equipments= <div className="alert alert-success m-0" role="alert">
                    No equipment found
                </div>
            else {
                equipments=this.state.equipments.map((item,index)=>{


                    return(

                        <ShowOneEquipment i={index} item={item} setBtnEdit={this.setbtnEdit} removeIt={this.removeIt}


                        />
                    )

                });
            }


        }

        if(Object.keys(this.state.item).length===0)
        {
            return (
                <>
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-4 py-3 w-100" id="search_bar" >
                        <div className="row">
                            <div className="col-7 col-lg-8 col-md-4 col-sm-5 m-auto">
                                <form>
                                    <div className="row">
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <input type="text" className="form-control" id="search_input"
                                                   aria-describedby="emailHelp" placeholder="Search equipments here..."
                                                   onChange={this.search}


                                            />
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="col-2 col-lg-1 col-md-3 col-sm-2 m-auto pr-3" id="add_div">
                                <img src={addic}  title="Add new equipment" id="add_pr" onClick={() => {

                                    this.setState({
                                        btnAdd:true,

                                    });

                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" id="show_product">





                        <div className="overflow-auto col-11 col-lg-12 col-md-10 col-sm-11 m-auto" id="prs_list">

                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0 mx-auto my-0" id="table_prs">

                                    <table className="table table-striped table-hover  pb-0 mb-0 " id="pr_table">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {equipments}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="col-10 col-lg-7 col-md-11 col-sm-11 m-auto">
                            <AddClients trigger={this.state.btnAdd} setTrigger={this.setbtnAdd}  addProduct={this.addProduct}  />
                        </div>

                    </div>








                </>


            );

        }

        else
        {
            return (
                  <>
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-4 py-3 w-100" id="search_bar" >
                        <div className="row">
                            <div className="col-7 col-lg-8 col-md-4 col-sm-5 m-auto">
                                <form>
                                    <div className="row">
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <input type="text" className="form-control" id="search_input"
                                                   aria-describedby="emailHelp" placeholder="Search equipments here..."
                                                   onChange={this.search}


                                            />
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="col-2 col-lg-1 col-md-3 col-sm-2 m-auto pr-3" id="add_div">
                                <img src={addic}  title="Add new product" id="add_pr" onClick={() => {

                                    this.setState({
                                        btnAdd:true,

                                    });

                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" id="show_product">





                        <div className="overflow-auto col-11 col-lg-12 col-md-10 col-sm-11 m-auto" id="prs_list">

                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0 mx-auto my-0" id="table_prs">

                                    <table className="table table-striped table-hover  pb-0 mb-0 " id="pr_table">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {equipments}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="col-10 col-lg-7 col-md-11 col-sm-11 m-auto">
                            <AddClients trigger={this.state.btnAdd} setTrigger={this.setbtnAdd}  addProduct={this.addProduct}  />
                        </div>
                          <div className="col-10 col-lg-7 col-md-11 col-sm-11 m-auto">
                             <EditEquipment trigger={this.state.btnEdit} setTrigger={this.setbtnEdit}  item={this.state.item} updateListElemnt={this.updateListElemnt}/>
                        </div>

                    </div>








                </>


            );

        }


    }
}




export default ShowAllEquipments;
