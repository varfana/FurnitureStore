import styled from "styled-components";
import { useContext, useEffect } from "react";
import MyContext from "../MyContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(MyContext);
  useEffect(() => {
   
  }, [cartItems.length]);

  const clickHandler = (e) => {
    e.preventDefault()
    toast.success('item deleted successfully', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const elId = e.target.value
    setCartItems(
      cartItems.filter(({ _id }) => {

        return _id != elId;
      })
      
    );
   
  };
  let total = 0

  if (cartItems.length == 0) {
    return (
      <>
        <Wrapper1>
          <div className="main">
            <div>Your Cart is Empty</div>
            <div>
              <Link to="/products">
                <button className="btn">Fill it</button>
              </Link>
            </div>
          </div>
        </Wrapper1>
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
  } else {
    return (
      <>
        <Wrapper>
          <div className="container">
            <div className="head">
              <h1>Your Cart</h1>
            </div>
            {cartItems.map(
              ({ _id, name, price, image, quantity, subtotal }) => {
                total = total + subtotal
                return (
                  <>

                    <div className="category">
                      <div className="holders">
                        <h3>Items</h3>
                        <div className="image-container">
                          <Link to={`/products/${_id}`}>
                            <img src={image} alt="" />
                          </Link>

                        </div>
                        <div>{name}</div>
                      </div>
                      <div className="holders">
                        <h3>Price</h3>
                        <div className="inner-holder">-$ {price}</div>
                      </div>

                      <div className="holders">
                        <h3>Quantity</h3>
                        <div className="inner-holder">{quantity}</div>
                      </div>
                      <div className="holders">
                        <h3>Subtotal</h3>
                        <div className="inner-holder">-${subtotal}</div>
                      </div>
                      <div className="holders">
                        <h3>Remove-item</h3>
                        <div className="inner-holder">
                          <button className="btn" value={_id} onClick={(e) => clickHandler(e)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    ;
                  </>
                );
              }
            )}
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
.inner-holder{
  font-size: calc(0.4em + 1vw);
}

.head{
  display: flex;
  justify-content: space-evenly;
}
  .btn {
    margin: 0;
    padding: 0;
    border-radius: 0;
    display: flex;
    background: aliceblue;
    color: #39a1ae;
  }
  

   img {
    width: 100%;
    height: 95%;
  
  }
  
  .category {
    display: grid;
    gap: 2rem;
    justify-items: space-evenly;
    grid-template-columns: repeat(auto-fit,minmax(100px,1fr));
    padding: 2rem;
  }
  .container {
    display: flex;
    background: aliceblue;
    flex-direction: column;
  }
`;
const Wrapper1 = styled.div`
  .main {
    display: flex;
   
    background: aliceblue;
    height: 30vh;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.8rem;
  }
  
`;
export default Cart;
