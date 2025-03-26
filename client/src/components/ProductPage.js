import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import QuantityCounter from "./QuantityCounter";
import MyContext from "../MyContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Star from "./Star";
import Loader from './Loader'
import { useNavigate } from "react-router-dom";
import { GrFormSubtract } from 'react-icons/gr';
import { GrFormAdd } from 'react-icons/gr';
import refurbished from '../assets/refurbished.jpg';
import newsvg from '../assets/new.svg'
import no_termite from '../assets/notermite.png'
import norefund from '../assets/refund.png'
import refund from '../assets/refund.svg'
import termite from '../assets/termite.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductPage = (data) => {
  const navigate = useNavigate()
  const { _id } = data
  const { user, cartItems, setCartItems } = useContext(MyContext);
  const [product, setproduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [showModal, setModal] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const fetchData = async () => {
    const { data } = await axios.get(`/api/v1/products/${_id}`)
    setproduct(data.data)
    setLoading(false)
    setReviews(data.data.reviews)

  }
  useEffect(() => {
    fetchData()
  }, [])
  const clickHandler = () => {
    setModal(!showModal)
  }
  const [formData, setFormData] = useState({
    username: '',
    rating: '',
    comment: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { reviews } = product
    reviews = [...reviews, formData]
    await axios.post('/api/v1/products/reviews', { _id, reviews })
    setModal(!showModal)
    fetchData()

  };
  const deleteHandler = async (e) => {
    e.preventDefault();
    let { reviews } = product
    reviews = reviews.filter((el) => {
      return el._id != e.target.value
    })
    await axios.post('/api/v1/products/reviews', { _id, reviews })
    fetchData()
  }
  const addCart = () => {

    product["quantity"] = quantity
    product["subtotal"] = quantity * product.price
    let condition = cartItems.filter((el) => el._id == product._id)

    if (condition.length != 0) {
      toast.warn('item already in the cart', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast.success('item added successfuly! checkout the cart', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setCartItems([...cartItems, product])




    }



    // navigate('/cart')
  }
  const add = () => {
    setQuantity(quantity + 1)
  }
  const sub = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; // add 1 to convert from 0-indexed to 1-indexed
    const day = date.getDate();
    const year = date.getFullYear().toString().substr(-2); // extract the last 2 digits of the year
    return `${month}/${day}/${year}`;
  }

  if (loading) {
    return <Loader></Loader>

  }
  else {
    const { image, description, price, name, company, averageRating, offers, termiteResistant, refundable, used } = product

    return (
      <>
        <Wrapper>
          <div className={`product-page ${showModal ? 'transparent' : ''}`}>
            <div className="upper">


              <div className="product-image">
                <img src={image} alt="product" />
              </div>
              <div className="product-info">
                <h2 className="product-name">{name}</h2>
                <div className="stars properites">
                  <Star stars={averageRating}></Star>
                  <div>

                    {averageRating}
                  </div>
                </div>

                <div className="properites"> <span className="label">Price</span> : -${price}</div>
                <div className="properites">
                  {offers.map((el) => {
                    return <>
                      <div className="price ">
                        <div>
                          <span className="label">{el.offerName} :</span>

                        </div>
                        <div>

                          -{el.discount}
                        </div>
                        <div>
                          Available
                        </div>
                      </div>

                    </>
                  })}
                </div>

                <div className="properites description">
                  <span className="label">Product Description</span>: {description}
                </div>



                <div className="properites"><span className="label">Company</span> : {company}</div>
                <div className="properites">
                  Quantitiy
                  <div className="counter">
                    <GrFormSubtract className="add-sub" onClick={() => sub()}></GrFormSubtract>
                    <div className="qunat">

                      {quantity}
                    </div>
                    <GrFormAdd className="add-sub" onClick={() => add()}></GrFormAdd>

                  </div>
                  <div>
                    Woodtype : {product.woodType.length != 0 ? product.woodType.map(el => el + '  ') : 'Engineered'}
                  </div>
                  <div className="stickers">

                    {termiteResistant == "Yes" ? <>
                      <div className="contain">

                        <img className="props" src={no_termite} alt="" />

                      </div>
                    </> : <>
                      <div className="contain">
                        <img className="props" src={termite} alt="" />
                      </div>


                    </>}
                    {refundable == "true" ? <>
                      <div className="contain">

                        <img className="props" src={refund} alt="" />

                      </div>
                    </> : <>
                      <div className="contain">

                        <img className="props" src={norefund}
                          alt="" />
                      </div>

                    </>}
                    {used == "false" ? <>
                      <div className="contain">

                        <img className="props" src={newsvg} alt="" />

                      </div>
                    </> : <>
                      <div className="contain">
                        <img className="props" src={refurbished}
                          alt="" />

                      </div>


                    </>}

                  </div>
                </div>
                <div className="btn-section">
                  <button className="btntext" onClick={addCart}>
                    Add to Cart
                  </button>
                  <Link to="/cart">
                    <button className="btntext">Check Out Cart</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="reviews">

              <div className="title">
                {reviews.length != 0 ? <h1>Reviews</h1> : <h1>No reviews for this product</h1>}

              </div>



              {reviews.map((el) => {

                return <>
                  <div className="review-card">
                    <div className="review-head">

                      <h2>

                        {el.username}
                      </h2>

                      <div >
                        <h2>

                          {formatDate(el.date)}
                        </h2>
                      </div>

                      <Star stars={el.rating}></Star>
                    </div>
                    <div className="review-comment">
                      "{el.comment}"
                    </div>
                    <div>

                    </div>

                  </div>
                </>
              })}

            </div>

            <div>

              <button className="btn" onClick={clickHandler}>

                Add review
              </button>
            </div>
          </div>

          <div className={`main ${showModal ? '' : 'none'}`}>
            <h1>Thanks for giving feedback</h1>
            <form onSubmit={handleSubmit}  >

              <div className='form'>


                <div className='item'>
                  <label>
                    Name:
                  </label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Name' />
                </div>



                <div className='item'>


                  <label>
                    Rating:
                  </label>
                  <input type="number" name="rating" value={formData.rating} onChange={handleChange} />

                </div>
                <div className='item'>
                  <label>
                    Comment:
                  </label>
                  <input type="text" name="comment" value={formData.comment} onChange={handleChange} />
                </div>


                <div>

                  <button type="submit" className='btn btnm'>Submit</button>
                </div>
              </div>



            </form>
            <div>

              <button className="btntext " onClick={clickHandler}>Go back</button>
            </div>
          </div>


        </Wrapper>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"

        />
      </>
    );
  }

};

const Wrapper = styled.div`
background-color: aliceblue;

.label{
  color: #39A1AE;
  font-weight: bold;
}
.stickers{
  display: grid;
   width: 80%;
   max-width: 25rem;
  grid-template-columns: repeat(auto-fit,minmax(2rem,1fr));
  gap: 1rem;

}


.btn-section{
  display: grid;
  grid-template-columns: repeat(2,10vw);
  gap: 1rem;
}

h2{
  margin: 0;
  padding: 0;
}


.stars{
  display: flex;
  width: 20%;
  justify-content: space-between;
}
.add-sub{
  background-color: white;
  color: #39A1AE;
  font-size: 1.2rem;
}
.counter{
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.6rem;
}


.main{
  position:fixed;
  top: 15%;
  left: 20%;
  padding: 6rem;
  background-color: aliceblue;
  flex-direction: column;
  width: 50%;

  
}
.review-card{
  margin: 1.8rem 1.4rem;
  
}
.review-comment{
  font-size: calc(0.35em + 1vw);
}
.review-head{
  display: flex;
  align-items: center;
  width: 55%;
  flex-wrap:wrap;
  justify-content: space-between;
}
.title{
  display: flex;
  justify-content: space-evenly;
}
.reviews{
  background-color: aliceblue;
  padding: 1.4rem;
  
}
.upper{
  display: grid;
  padding: 1.4rem;
 justify-items: center;
  
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  
  gap: 2rem;
}
.product-image{
  width: 85%;
}
img{
  width: 100%;
  border-radius: 1.2rem;

}
.product-info{
  display: grid;
  /* grid-template-columns: repeat(auto-fit,minmax(250px,1fr)); */
  grid-template-columns: repeat(2,1fr);
  align-items: center;
  gap: 1.5rem;
  font-size: calc(0.35em + 1vw);

}



  .transparent{
    opacity: 0.2;
  }
  .none{
    display: none;
  }


  input{
    padding: 1.2rem;
    width: 60%;
    font-size: 1.4rem;
}
form{
  
  font-size: 1.2rem;
}
.item{
  display: flex;
  justify-content: space-between;
   align-items: center; 
   margin: 1.2rem;
}



.contain{
 margin-right: 1.8rem;
 margin-top: 1.2rem;
}
.btntext{
  background: none;
  color: #39A1AE;
border: none;
  font-size: calc(0.2em + 1vw);
  :hover{
    cursor: pointer;
  }
}


`;

export default ProductPage;
