import { useContext, useEffect } from "react";
import MyContext from "../../MyContext";
import { useState } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from '../../components/Loader'
const YourProducts = () => {
  const { user } = useContext(MyContext);
  let [products, setproducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { _id } = user

  const fetchData = async () => {
    const { data } = await axios.post('/api/v1/user/getbyid', { _id })


    setproducts(data.user.products)
    setLoading(false)

  }
  useEffect(() => {
    fetchData()
  }, [user])


  const clickHandler = async (e) => {
    const id = e.target.value

    products = products.filter((obj) => {
      return obj._id != id
    })

    const res = await axios.post('/api/v1/products/delete', { id })


    const { data } = await axios.post('/api/v1/user/update', { _id, products });
    setproducts(data.user.products)
    setLoading(false)

  }

  if (loading) {
    return <Loader></Loader>
  }
  else if (products.length == 0) {
    return <h4> You Have No Products to sell</h4>
  }

  else {

    return (
      <>
        <Wrapper>

          <div className="">
            <div className="products">
              {products.map((obj) => {
                return (
                  <>
                    <div className="card">
                      <div className="image">
                        <Link to={`/products/${obj.id}`}>
                          <img src={obj.image} alt="" />
                        </Link>
                      </div>

                      <div className="text">
                        <div>{obj.name}</div>
                        <div>-${obj.price}</div>

                      </div>

                      <div>

                        <button className="btn" value={obj._id} onClick={(e) => clickHandler(e)}>

                          Delete
                        </button>

                      </div>


                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Wrapper>

      </>
    )
  }

}

const Wrapper = styled.div`
.btn{
  margin: 0;
  background: none;
  color:red;
}
.products {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: aliceblue;
    justify-content: space-evenly;
  }
  .card {
    flex-direction: column;
    width: 29.5%;
    justify-content: space-evenly;

    align-items: center;
    padding: 1.2rem;
    margin: 0.5rem;
  }
  .text {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    margin: 1.2rem;
  }
   img {
    width: 100%;
    height: 25rem;
    object-fit: cover;
    border-radius: 1.2rem;
  }
  img:hover {
    opacity: 80%;
    cursor: pointer;
  }
  

`
export default YourProducts