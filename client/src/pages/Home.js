import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from '../components/Loader.js'
import { useContext } from "react";
import MyContext from "../MyContext.js";
import cities from '../localData/cities.js'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { useEffect } from "react";
import { Icon } from 'leaflet'
import Star from "../components/Star.js";
import HomeHeader from "../components/HomeHeader.js";

const customIcon = new Icon({
  iconUrl: 'https://www.svgrepo.com/show/302636/map-marker.svg',
  iconSize: [38, 38]
})
const Home = () => {


  const { data, isLoading } = useContext(MyContext);
  const [products, setProducts] = useState([])

  function selectThreeRandomItems(array) {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array.slice(0, 6);
  }
  const get3products = () => {

    setProducts(selectThreeRandomItems(data))


  }
  useEffect(() => {
    get3products()
  }, [])

  if (isLoading) {
    return <Loader></Loader>
  }
  return (


    <>
      <HomeHeader></HomeHeader>


      <Wrapper1>

        <div className="map">
          <div>
            <h1>Cities we deliver to</h1>
          </div>
          <div>
            <p className="">
              Several new furniture stores were opening across India, including in Bengaluru, Mumbai, Delhi, Hyderabad, Pune, and Chennai. The stores featured a wide range of contemporary and traditional designs, as well as expert design services and customer support. The openings were highly anticipated, and the stores attracted large crowds of eager customers.
            </p>
          </div>
          <MapContainer center={[20.5937, 78.9629]} zoom={6} scrollWheelZoom={false} className="map-container" >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {cities.map((el) => {
              const position = [el.latitude, el.longitude]
              return <Marker position={position} icon={customIcon}>
                <Popup>
                  {el.label}
                  <div>
                    {el.latitude},{el.longitude}
                  </div>
                </Popup>
              </Marker>
            })}

          </MapContainer>
        </div>

        <div className="center">
          <h1> Products of the day </h1>

        </div>
        <div className="products-container">
          {isLoading ? <Loader></Loader> : <div className="products">

            {products.map((obj) => {

              return (
                <>
                  <div className="card">
                    <div className="image">
                      <Link to={`/products/${obj._id}`}>
                        <img src={`/products/${obj.image}`} alt="" />
                      </Link>
                    </div>
                    <div>
                      <div className="text">
                        <div>
                          Rating:
                        </div>

                        <Star className="val" stars={obj.averageRating}></Star>

                      </div>
                      <div className="text">
                        <div>Name:</div>
                        <div className="val">{obj.name}</div>
                      </div>
                      <div className="text">
                        <div>Price:</div>
                        <div className="val">-${obj.price}</div>
                      </div>
                      <div className="text">
                        <div>Company</div>
                        <div className="val">{obj.company}</div>
                      </div>
                    </div>


                  </div>

                </>
              );
            })}

          </div>}
        </div>





      </Wrapper1>
      <Wrapper2>
        <div className="mission">
          <div className="text">
            <div className="inner">
              <div>
                <h2>Popular Categories</h2>
              </div>
              <div>
                <p>
                  Queen Size Beds, King Size Beds, Coffee Tables, Dining Sets,
                  Recliners, Sofa cum Beds, Rocking Chairs, Cabinets, Book
                  Shelves, TV Unit, Wardrobes, Outdoor Furniture, Bar Cabinets,
                  Wall Shelves, Photo Frames, Bed Sheets, Mattresses, Table
                  Cloth, Living Room Furniture, Study Tables, Dining Room
                  Furniture, Office Furniture, Bed Room Furniture, Dining Table,
                  Beds, Sofas, Sofa Set, Trundle Bed
                </p>
              </div>
            </div>

            <div className="inner">
              <div>
                <h2>Cities we deliver to</h2>
              </div>
              <div>
                <p>
                  Bengaluru, Mumbai, Navi Mumbai, Delhi, Hyderabad, Pune,
                  Chennai, Gurgaon, Kolkata, Noida, Goa, Ghaziabad, Ahmedabad,
                  Coimbatore, Faridabad, Jaipur, Lucknow, Kochi, Visakhapatnam,
                  Chandigarh, Vadodara, Nagpur, Thiruvananthapuram, Indore,
                  Mysore, Bhopal, Surat, Jalandhar, Patna, Ludhiana, Nashik,
                  Madurai, Kanpur, Aurangabad and many more
                </p>
              </div>
            </div>
          </div>


        </div>
      </Wrapper2>


    </>
  );
};



const Wrapper1 = styled.div`
.center{
  display: flex;
  justify-content: space-evenly;
}
  display: flex;
  flex-direction: column;
  align-items: center;
  
  background: aliceblue;
  padding: 1.4rem;

 .map{
  width: 90vw;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
 p{
   font-size: calc(.35em + 1vw);
 }
  
 }
  .leaflet-container{
    width: 100%;
    height: 80vw;
    
  }

  .val{
  color: #39a1ae;
  
  font-weight: 500;
}

  .products-container {
    display: grid;
    background-color: aliceblue;

    width: 100%;
    grid-template-columns: repeat(8,minmax(min-content,1fr))  ;
    
    
  }
  .products{
    grid-area: 1/1/-1/10;
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(35rem, 550px) );
    justify-content: space-evenly;
    grid-auto-rows: min-content;
    gap: 2rem;
    

  }
 
  img{
    width: 100%;
    height: 35rem;
    object-fit: cover;
    border-radius: 1.2rem;
   
  }
  display: grid;
 
   .card {
    padding: 1.4rem;
    flex-direction: column;
    font-size: calc(.4em + 1vw);
    justify-content: space-between;
    transition: all .5s;
    align-items: center;
    
    transition: all .4s;
   
  }
  .card:hover{
    scale: 1.08;
  }
 

 @media only screen and (max-width:768px) {
  img{
    height: 20rem;
  }
  .products{
     grid-template-columns: repeat( auto-fit, minmax(25rem, 1fr) );
  }
 }
 
`;

const Wrapper2 = styled.div`
  display: flex;
  .text {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0 0 1.4rem 0;
    
  }
  .inner {
    width: 100%;

    display: flex;
    padding: 1.2rem;
    flex-direction: column;
    align-items: center;
    font-size: calc(.35em + 1vw);
    text-align: center;
    
    background: aliceblue;
  }
  .mission {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    
  }
  .services {
    display: flex;
    justify-content: space-between;
  }

  .s-text {
    display: flex;
    flex-direction: column;
    background: aliceblue;
    align-items: center;
    padding: 1.2rem;
    width: 30.5%;

    line-height: 2rem;
     font-size: calc(.35em + 1vw);
    text-align: center;
  }
`;


export default Home;
