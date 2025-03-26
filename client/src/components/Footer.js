
import styled from "styled-components";
import appStores from '../assets/appstores.jpg'
import mastercard from '../assets/mastercard-svgrepo-com.svg'
import visa from '../assets/visa-svgrepo-com.svg'
import maestro from '../assets/maestro-svgrepo-com.svg'
import wallet from '../assets/wallet-svgrepo-com.svg'
import netbanking from '../assets/samsung-internet-browser-svgrepo-com.svg'
import insta from '../assets/instagram-1-svgrepo-com.svg'
import facebook from '../assets/facebook-svgrepo-com.svg'
import youtube from '../assets/youtube-svgrepo-com.svg'
import twitter from '../assets/twitter-svgrepo-com.svg'

const Footer = () => {
  return <>
    <Wrapper>
      <Wrapper3>
        <div className="letter">
          <div className="text1">
            <div>
              <h2>Join Our Newsletter</h2>
              <p>
                Stay updated with our latest collections and exclusive discounts
                by joining our newsletter! Simply enter your email address below
                and hit 'Subscribe' to receive updates on sales and new
                arrivals.
              </p>
            </div>
          </div>
          <div className="text">
            <div className="inner">
             
                <input  placeholder="Enter Email" />
                <button  className="btn">
                  Subscribe
                </button>
              
            </div>
          </div>
        </div>
      </Wrapper3>
      <hr />
      <div className='follow'>
        <div className="card">
          <h2>Corporate</h2>
          <p>About Us</p>
          <p> Corporate Governance</p>
          <p> The Furniture Shop in the News</p>
          <p> Careers</p>
        </div>
        <div className="card">
          <h2>Corporate</h2>
          <p>About Us</p>
          <p> Corporate Governance</p>
          <p> The Furniture Shop in the News</p>
          <p> Careers</p>
        </div>
        <div className="card">
          <h2>Useful Links</h2>
          <p>Explore Gift Cards</p>
          <p> Buy in Bulk</p>
          <p> Discover Our Brands</p>
          <p> Find a Studio</p>
        </div>
        <div className="card">
          <h2>Partner With Us</h2>
          <p>Become a franchise</p>
          <p> Our Market Policies</p>
          <p> Become Our Channel Partner</p>

        </div>
        <div className="card">
          <h2>Need Help ?</h2>
          <p>FAQs</p>
          <p> Policies</p>
          <p> Contact Us</p>

        </div>
        <div className="card">

          <img src={appStores} alt="" />

        </div>

      </div>

      <div className="foot">
        <div className="card-containers">
          <h2>We Accept</h2>
          <div className="cards">
            <img src={visa} alt="" />
            <img src={mastercard} alt="" />
            <img src={maestro} alt="" />

            <img src={netbanking} alt="" />
          </div>
        </div>
        <div className="card-containers">
          <h2>Follow us Here</h2>
          <div className="stickers">
            <img src={insta} alt="" />
            <img src={facebook} alt="" />
            <img src={youtube} alt="" />
            <img src={twitter} alt="" />

          </div>
        </div>

      </div>
      <hr />
      <div className="closing">

        <p>
          Whitehat
        </p>
        <p>
          Sitemap
        </p>
        <p>
          Terms Of Use
        </p>
        <p>
          Privacy Policy
        </p>
        <p>
          Your Data and Security
        </p>
        <p>
          Grievance Redressal
        </p>
      </div>
      <div className="last">
        <div>
          <h2>

            &#169; Copyright The Furniture Shop Limited
          </h2>
        </div>
      </div>



    </Wrapper>
  </>
}

const Wrapper = styled.footer`
 background-color: aliceblue;
 margin-top:calc(.2em + 1vw);
padding: 1.4rem;
 .last{
  display: flex;
  justify-content: space-evenly;
 }
 .closing{
  display: flex;
  font-size: calc(.2em + 1vw);
  flex-wrap: wrap;
  font-family: Georgia, 'Times New Roman', Times, serif;
  p{
    margin: 1.2rem;
    width: 200px;
  }
 }
 .stickers{
  display: flex;
  width: 100%;
  justify-content: space-between;
  img{
    width: 15%;
  }
 }
 .card-containers{
  width: 400px;
 }
 .foot{
  display: flex;
  justify-content:space-between;
  padding: 1.8rem;
  flex-wrap: wrap;
 }
 h2{
  color: #39A1AE;
 }
 .cards{
  display: flex;
  width: 100%;
  justify-content: space-between;
  img{
    width: 15%;
  }
 }
.follow{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
 
}
.card{
  width: 25vw;
  min-width: 100px;
  padding: 1.2rem;
  font-size: calc(.2em + 1vw);
 
  h2{
    color: #39A1AE;
  }
  img{
    width: 100%;
  }
}


`
const Wrapper3 = styled.div`
  background: aliceblue;
  margin: 1.4rem;
  

  .inner {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .text1 {
    width: calc(100 - 50vw);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
     font-size: calc(.2em + 1vw);
 
    padding: 1.2rem;
  }

  .text {
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .letter {
    height: calc(100 -50vw);
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .btn {
    margin: 0;
    border-radius: 0;
  }

  input {
    width: 50%;
    border-style: solid;
     font-size: calc(.4em + 1vw);
    padding: 1.2rem;
  }

   @media only screen and (max-width: 840px) {
    .letter{
      display: none;
    }
  }
`;
export default Footer