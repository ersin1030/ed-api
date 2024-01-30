import React, { useState, useEffect } from "react";
 
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
 
function EditProduct()
{
    const navigate = useNavigate();
     
    const {id}=   useParams();
     
    const[message, setMessage]= useState('');
 
    const [inputs, setInputs] = useState([]);
    const [fileimage, setPhoto]= useState('');
     
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
     
    const uploadProduct= async()=>{
        const formData= new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', inputs.name);
        formData.append('description',inputs.description);
        formData.append('image', fileimage);
        const response= await axios.post("http://127.0.0.1:8000/api/productsupdate/"+id, formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
        setMessage(response.data.message); //"message": "Product successfully updated.."
        console.log(response)
        setTimeout(()=>{
            navigate('/productlist');
        }, 2000);
    }
 
    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadProduct();
 
   }
    
    useEffect(() => {
        getproduct();
    }, []);
   
    function getproduct() {
        axios.get('http://127.0.0.1:8000/api/products/'+id).then(function(response) {
            console.log(response);
            setInputs(response.data.product);
        });
    }
     
    return(
    <React.Fragment>
        <div className="container">
            <div className="row">
              <div className="col-md-8 mt-4">
                <h5 className="mb-4">Edit Product </h5> 
                <p className="text-success"><b>{ message }</b></p>                              
                 
                    <form onSubmit={ handleSubmit}>             
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Product Title </label>
                    <div className="col-sm-9">
                        <input type="text" value={inputs.name} className="form-control" name="name" onChange={ handleChange}/>
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Description </label>
                    <div className="col-sm-9">
                        <input type="text" value={inputs.description} className="form-control" name="description" onChange={ handleChange} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Product Image</label>
                    <div className="col-sm-9">
                        <img src={`http://127.0.0.1:8000/storage/${inputs.image}`} alt="" height={300} width={300} />
                        <input type="file" className="form-control" onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label className="col-sm-3"></label>
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                    </div>
 
                    </form>
 
             </div>
            </div>
        </div>
    </React.Fragment>
    );
}
export default EditProduct;