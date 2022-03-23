import React,{Component} from "react";
import {Link} from "react-router-dom";

import ShowOneClient from "./ShowOneClient";
import "../../../../css/AdminProducts.css"
import AddClients from "./AddClients";
import EditClients from "./EditClients";

import addic from '../../../../img/add_user.png'

import SketelonClients from "./../../Ui-compoment/SketelonClients"
import axios from "axios";
import swal from "sweetalert";
import EditEmploye from "../Employees/EditEmploye";




class ShowAllClients extends Component{

    state={
        btnAdd:false,
        btnEdit:false,
        loading:true,
        clients:[],
        p2:[],
        item:{},
        index:0
    }

    componentDidMount() {
               axios.get('/getClients').then(res=>{
            if(res.status===200)
            {
                this.setState({
                    loading:false,
                    clients:res.data,
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

            let lname=item.firstName.toLowerCase();
            let fname=item.lastName.toLowerCase();

            let nId=item.nationalId.toString().toLowerCase()
            let searchText=e.target.value.toString().toLowerCase().trim()
            if(lname.includes(searchText) || fname.includes(searchText) || nId.includes(searchText))
                return item;
        })
        this.setState({
            clients:arr
        })


    }



    setbtnAdd=()=>{
        this.setState({
            btnAdd:false
        })
    }

    addProduct=(prod)=>{
     this.setState( state => ({
            clients:[...state.clients,prod]
        }));


    }
    sortAlpha=()=>{
        this.setState( state => ({
            clients:state.clients.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
        }));

    }
    removeIt=(i)=>{

        var arr=this.state.clients
        arr.splice(i,1);
        this.setState({
            clients:arr,
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
        this.state.clients[this.state.index] = prod
        this.state.p2[this.state.index] = prod

        this.forceUpdate()


    }

    render() {

        var clients="";
        var cat="";

        if(this.state.loading)
        {
            clients= <>
                    <SketelonClients/>
                    <SketelonClients/>
                    <SketelonClients/>
                    <SketelonClients/>
                    <SketelonClients/>
            </>
        }
        else {

            if(this.state.clients.length===0)
                clients= <div className="alert alert-success m-0" role="alert">
                    No client found
                </div>
            else {
                clients=this.state.clients.map((item,index)=>{


                    return(

                        <ShowOneClient i={index} item={item} setBtnEdit={this.setbtnEdit} removeIt={this.removeIt}


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
                            <div className="col-5 col-lg-5 col-md-4 col-sm-5 m-auto">
                                <form>
                                    <div className="row">
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <input type="text" className="form-control" id="search_input"
                                                   aria-describedby="emailHelp" placeholder="Search clients here..." onChange={this.search}/>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="col-1 col-lg-1 col-md-3 col-sm-2 m-auto pr-3" id="add_div">
                                <img src={addic}  title="Add new product" id="add_pr" onClick={() => {

                                    this.setState({
                                        btnAdd:true,

                                    });

                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" id="show_product">





                        <div className="overflow-auto col-9 col-lg-12 col-md-10 col-sm-10 m-auto m-auto" id="prs_list">

                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto">

                                    <table className="table table-striped table-hover" id="pr_table">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {clients}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="col-10 col-lg-7 col-md-11 col-sm-11 m-auto">
                            <AddClients trigger={this.state.btnAdd} setTrigger={this.setbtnAdd} setCat={this.setCat} addProduct={this.addProduct}  />
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
                            <div className="col-5 col-lg-5 col-md-4 col-sm-5 m-auto">
                                <form>
                                    <div className="row">
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <input type="text" className="form-control" id="search_input"
                                                   aria-describedby="emailHelp" placeholder="Search clients here..." onChange={this.search}/>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="col-1 col-lg-1 col-md-3 col-sm-2 m-auto pr-3" id="add_div">
                                <img src={addic}  title="Add new product" id="add_pr" onClick={() => {

                                    this.setState({
                                        btnAdd:true,

                                    });

                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" id="show_product">



                        <div className=" col-9 col-lg-11 col-md-9 col-sm-10 m-auto pt-0 pb-4" id="filter_bar">
                            <div className="row" >
                                <div className="col-3 col-lg-4 col-md-3 col-sm-3 m-auto">
                                    <div className="row">

                                        <select className="form-select" aria-label="Default select example" onChange={this.searchByDate}>
                                            <option value="All time" selected>All time</option>
                                            <option value="This month" >This month</option>
                                            <option value="last 7 days">Last 7 days</option>
                                            <option value="This year">This Year</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="col-7 col-lg-4 col-md-7 col-sm-7 m-auto">
                                    <div className="row">
                                        <div className="col-4 col-lg-6 col-md-6 col-sm-4 text-right" id="cat_text">
                                            Payment state
                                        </div>
                                        <div className="col-7 col-lg-6 col-md-6 col-sm-7 ml-0 text-left" id="cat_list">
                                            <select className="form-select" aria-label="Default select example" onChange={this.diplayByCategori}>
                                                <option value="All" selected>Expired</option>
                                                <option value="All" selected>Current</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-1 col-lg-4 col-md-1 col-sm-1 m-auto">
                                    <div className="row">
                                        <div className="col-9 col-lg-9 col-md-9 col-sm-9 mr-0 pr-0 text-right">
                                            <button className="btn_sort mx-auto" onClick={this.sortAlpha}><box-icon name='sort-a-z' color='#575757' > </box-icon></button>
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>


                        <div className="overflow-auto col-9 col-lg-12 col-md-10 col-sm-10 m-auto m-auto" id="prs_list">

                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto">

                                    <table className="table table-striped table-hover" id="pr_table">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {clients}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="col-10 col-lg-7 col-md-11 col-sm-11 m-auto">
                            <AddClients trigger={this.state.btnAdd} setTrigger={this.setbtnAdd} setCat={this.setCat} addProduct={this.addProduct}  />
                        </div>
                        <div className="col-10 col-lg-7 col-md-11 col-sm-11 m-auto">
                            <EditClients trigger={this.state.btnEdit} setTrigger={this.setbtnEdit}  item={this.state.item} updateListElemnt={this.updateListElemnt}/>
                        </div>

                    </div>








                </>


            );

        }


    }
}




export default ShowAllClients;
