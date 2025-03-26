import { useState } from "react";
import styled from 'styled-components'
import { useContext } from "react";
import MyContext from "../../MyContext";
import axios from "axios"
const AddYourProduct = () => {

    const { user } = useContext(MyContext);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        company: '',
        description: '',
        category: '',
        shipping: false,
        used: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        let { _id } = user

        const { data } = await axios.post('/api/v1/products/create', { ...formData, user });

        user.products = [...user.products, data.data]
        const { products } = user
        await axios.post('/api/v1/user/update', { _id, products });

    };
    return (
        <Wrapper>
            <div className="main">
                <div className="box">

                    <form >

                        <div className="items">

                            <label>
                                Name:
                                <input type="text" name="name" value={formData.name} placeholder={'Name'} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="items">



                            <label>
                                Price:
                                <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder={'Price in $'} />
                            </label>
                        </div>

                        <div className="items">


                            <label>
                                Image:
                                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder={'Provide Image Url'} />
                            </label>
                        </div>

                        <div className="items">


                            <label>
                                Company:
                                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder={'Company'} />
                            </label>
                        </div>

                        <div className="items">


                            <label>
                                Description:
                                <input name="description" value={formData.description} onChange={handleChange} placeholder={'Add Your Decription'} />
                            </label>
                        </div>

                        <div className="items">
                            <label>
                                Category:
                                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder={'Category'} />
                            </label>
                        </div>
                        <div className="items">
                            <label>
                                Shipping:
                                <input type="text" name="shipping" checked={formData.shipping} onChange={handleChange} placeholder={'True/False'} />
                            </label>
                        </div>

                        <div className="items">
                            <label>
                                Used:
                                <input type="text" name="used" checked={formData.used} onChange={handleChange} placeholder={'True/False or Time Period'} />
                            </label>
                        </div>
                    </form>
                    <div>
                        <button className="btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
.box{
    width:100%;
}

.items{
 width: 25%;
}
form{
 width: 100%;
 padding: 1.4rem 0;
 display: flex;
 flex-direction: column;
 flex-wrap: wrap;
 height: 20rem;
 justify-content: space-between;

}
input{
    padding: 1.2rem;
    width: 70%;
    font-size: 1.4rem;
    margin: 1.2rem ;
}

`

export default AddYourProduct