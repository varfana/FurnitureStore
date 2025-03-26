import styled from "styled-components"
import { useContext } from "react";
import userImage from '../assets/user.png'
import MyContext from "../MyContext";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
const User = () => {
  const { user, token } = useContext(MyContext);

  const navigate = useNavigate()
  useEffect(() => {

    if (!token || !user) {
      navigate('/login')
    }

  }, [])
  return (
    <>
      <Wrapper>

        <div className="main">
          <div className="photo">
            <img src={userImage} alt="" />
          </div>


          <div className="span2">
            Name : {user.name}
          </div>
          <div className="span2">
            Email : {user.email}
          </div>
          <div>
            Mobile: {user.phone}
          </div>


          <div className="span2">
            address 1 : {user.address1}
          </div>
          <div className="span2">
            address 2 :{user.address2}
          </div>






        </div>
        <div className="lower">
          <div className="section">
            <div className="links" >
              <Link to='/user/product' className="links">
                Your Products/Furniture
              </Link>
            </div>
            <div className="links">
              <Link to='/user/addyourproduct' className="links">
                Sell Products/Furniture
              </Link>
            </div>
            <div className="links">
              <Link to='/user/order' className="links">
                Orders
              </Link>
            </div>
            <div className="links">
              <Link to='/user/offer' className="links">
                Offers And Coupons
              </Link>
            </div>
            <div className="links">
              <Link to='/user/edit' className="links">
                Edit Profile
              </Link>
            </div>
            <div className="links" >
              <button className="btn">Logout</button>
            </div>
          </div>
          <div className="outlet">
         
            <Outlet />
          </div>
        </div>

      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
background-color: aliceblue;
padding: 2rem;
font-size: calc(0.4em + 1vw);
.links{
  text-decoration: none;
  margin-top: 1rem;
  color: #39a1ae;
}
.main{
  
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  align-items: center;
  
  gap: 2rem;
}
img{
  width: 12vw;

}
.span2{
  grid-column: span 2;
}
.lower{
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 2rem;
}

`
export default User