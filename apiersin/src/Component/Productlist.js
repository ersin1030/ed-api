//C:\react-js\myreactdev\src\Component\Productlist.js
import React, { useState, useEffect } from "react";
 
import { Link } from "react-router-dom";
import axios from "axios";
 
function Productlist()
{ 
    const[product, setProduct]= useState([]);
     
    useEffect( ()=>{
        const getProduct= ()=>{
            fetch("http://127.0.0.1:8000/api/products")
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.products)
                setProduct(response.products)
            })
            .catch(error=>{ console.log(error)});
        }
        getProduct();
    },[]);
  
   
    const deleteProduct = (id) => {
        axios.delete('http://127.0.0.1:8000/api/productdelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
        });
    }
     
    return(
        <React.Fragment>
            <div className="container container_overflow">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-4">Product List</h5> 
                        <p className="text-danger"> </p>                 
                                <table className="table table-bordered">
                                <thead>
                                <tr>
                                <th scope="col">Sr.No</th>
                                <th scope="col">Product Title</th>
                                <th scope="col">Product Description</th>
                                <th scope="col">Product Image</th>
                                <th scope="col" width="200">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((pdata, index)=>(
                                            <tr key={index}>
                                            <td>{index+1 } </td>
                                            <td>{pdata.name } </td>
                                            <td>{pdata.description } </td>
                                            <td><img src={`http://127.0.0.1:8000/storage/${pdata.image}`} alt="" height={50} width={90} /></td>
                                            <td>
                                                <Link to={`/editproduct/${pdata.id}/edit`} className="btn btn-success mx-2">Edit</Link>
                                                <button onClick={() => deleteProduct(pdata.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                            </tr>
                                        ))
                                    }
                               
                                                                
                                </tbody>
                                </table>  
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Productlist;