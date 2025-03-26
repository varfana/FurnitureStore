import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import wood from '../assets/wood.jpg'
import sofa from '../assets/home-main.jpg'

const HomeHeader = () => {
    return (
        <Wrapper>
            <div className="main">
                <div className="zone">
                    <h1>Design Your Comfort</h1>
                    <p className="text">


                        <p>
                            At our furniture company, we prioritize sustainability and environmental responsibility in all aspects of our operations. From sourcing materials to manufacturing and delivery, we are committed to reducing our environmental impact and promoting eco-friendly practices.

                        </p>

                    </p>
                    <Link to="/products">
                        <button className="btn">shop now</button>
                    </Link>
                </div>
                <div className="main-image">
                    <img src={sofa} alt="" />
                </div>
            </div>
            <div>
                <div className="custom">

                    <h1>Totally Customizable</h1>
                </div>
                <div className="env">

                    <div className="img-container">
                        <img src={wood} alt="" />
                    </div>
                    <div className="wood-description">
                        <p>
                            With our furniture, you have the ability to create your dream piece, tailor-made to your exact specifications. Choose from a wide range of colors, textures, and finishes, as well as the option to add your own personal touch with bespoke detailing.
                        </p>
                        <p>
                            Our expert craftsmen will bring your vision to life, creating a piece that is truly one of a kind. At our furniture site, we pride ourselves on providing a seamless customer experience, ensuring that you are completely satisfied with your purchase from start to finish.
                        </p>

                    </div>



                </div>
            </div>


        </Wrapper>
    )
}
const Wrapper = styled.div`
  background: aliceblue;
  
  padding: 1.2rem;
  .custom{
    display: flex;
    justify-content: space-evenly;
  }
  .img-container{
    width: 50%;
    
  }
  .env{
     display: flex;
     justify-content: space-between;
     font-size: calc(.4em + 1vw);
     
     .wood-description{
      width: 48%;
     }
  }
  
  .main {
    display: flex;
    justify-content: space-between;
    align-items: top;
    .main-image{
      width: 60vw
    }
  }
  .zone {
    width: 50vw;
   h1{
    margin: 0;
   }
  }
  img {
    max-width: 100%;
  }
  .text {
 font-size: calc(.4em + 1vw);
  }
  .quotes {
    font-size: 1rem;
  }
  
  @media only screen and (max-width: 1100px) {
    .main {
      flex-direction: column-reverse;
      align-items: center;
    }
    .zone {
      width: 100%;
    }
    .env{
        flex-direction: column;
        align-items: center;
         .wood-description{
          width: 100%;
     }
     .main-image{
      width: 100vw
    }
    
    }
     
  }
`;

export default HomeHeader