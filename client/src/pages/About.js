import styled from "styled-components";
import timeline from '../assets/timeline.jpg'
import gif from '../assets/treegif.gif'
import globe from '../assets/globe.gif'
const About = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div>
            <div className="title">
              <h1>About us</h1>
            </div>
            <div className="about">


              <p>
                The Furniture Shop is a family-owned business that has been
                providing high-quality, stylish, and affordable furniture to our
                customers for over 30 years. We believe that everyone should
                have access to beautiful and functional living spaces, and we
                strive to make that a reality for our customers.
              </p>
              <p>
                Our mission is to provide our customers with an unparalleled
                shopping experience. We have a wide selection of furniture and
                home decor products, as well as knowledgeable and friendly staff
                who are always ready to help. We are committed to being the
                go-to destination for all of your home furnishings needs.
              </p>
              <p>
                We believe that every home is unique, and we want to help our
                customers create living spaces that reflect their individual
                style and personality. Whether you're looking for a new couch, a
                dining room table, or a statement piece of decor, we have
                something for everyone.
              </p>


            </div>
          </div>
          <div className="timeline">
            <div>
              <h1>Milestones</h1>
            </div>
            <div className="image-conatiner">

              <img src={timeline} alt="" />
            </div>
          </div>

        </div>


      </Wrapper>
      <Wrapper2>
        <div className="services">
          <div className="s-text">
            <div>
              <h2>Mission</h2>
            </div>
            <div>
              <p>
                Our mission at (The Furniture Shop) is to provide
                high-quality, stylish, and affordable furniture to our
                customers. We strive to create a welcoming and inclusive
                shopping experience for all, and to make the process of
                furnishing your home as seamless and enjoyable as possible.
              </p>
            </div>
          </div>

          <div className="s-text">
            <div>
              <h2>Vision</h2>
            </div>
            <div>
              <p>
                Our vision is to be the go-to destination for all of your home
                furnishings needs. We aim to be the industry leader in
                customer service, product selection, and design inspiration.
                We want to empower our customers to create beautiful,
                comfortable, and functional living spaces that reflect their
                unique style and personality.
              </p>
            </div>
          </div>

          <div className="s-text">
            <div>
              <h2>History</h2>
            </div>
            <div>
              <p>
                Throughout our history, we've been committed to providing our
                customers with the very best products, services, and shopping
                experience. And we'll continue to do so in the future.
              </p>
            </div>
          </div>
        </div>
      </Wrapper2>
    </>
  );
};

const Wrapper2 = styled.div`
 display: flex;
 justify-content: center; 
 background-color: aliceblue;
  .mission {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 1.4rem;
  }
  .services {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .s-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    width:30vw ;
    min-width: 200px;
    font-size: calc(.4em + 1vw);
    text-align: center;
  }
`

const Wrapper = styled.div`

  .about{
    font-size: calc(.4em + 1vw);
  }
  .main {
   
    justify-content: space-evenly;
    padding: 1.4rem;

    background: aliceblue;
    .title{
      display: flex;
      justify-content: space-evenly;
    }
  }
  .timeline{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    
    img{
      width: 80vw;
     
    }
    
  }
  
  @media only screen and (max-width:768px ) {
    
   .timeline{
    img{
      width: 95vw;
    }
   }
  }
 
 
`;

export default About;
