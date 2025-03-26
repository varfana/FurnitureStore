import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import Loader from "../components/Loader";
import MyContext from "../MyContext";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import Star from "../components/Star";

let itemsPerPage = 9

const Products = () => {
  const {

    data,
    isLoading,
    setLoading,
    searchFunction,
    setsortname,
    setsortprice
  } = useContext(MyContext);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);





  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })

    }
    if (dimensions.width < 400) {
      itemsPerPage = 3
    }
    else if (dimensions.width < 768) {
      itemsPerPage = 4
    }
    else if (dimensions.width < 1366) {
      itemsPerPage = 6
    }
    else if (dimensions.width < 1920) {
      itemsPerPage = 9

    }


    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)

    }

  })


  const handlePageChange = (pageNumber) => {
    setLoading(true)
    setCurrentPage(pageNumber);
    setTimeout(() => {
      setLoading(false)
    }, 500);
  };


  const handleSelect = (e) => {
    e.preventDefault()
    const data = e.target.value

    const [tag, val] = data.split(' ')
    if (tag == 'name') {
      setsortname(val)
      setsortprice(0)
    }
    if (tag == 'price') {
      setsortprice(val)
      setsortname(0)
    }
  };

  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()

    searchFunction(search)

  };
  const handleoptions = (e) => {
    e.preventDefault()

    setSearch(e.target.value)
    searchFunction(e.target.value)

  };




  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pages ${currentPage === i ? "active " : ""}`}

        >
          {i}
        </div>
      );
    }
    return pageNumbers;
  };


  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="search">
            <div className="input">
              <input
                type="text"
                placeholder="Search"
                value={search}

                onChange={(e) => setSearch(e.target.value)}
              />
              <div>


                <FaSearch onClick={handleSearch} className='icon'></FaSearch>

              </div>

            </div>



            <div className="sort">
              <div className="inner-sort">
                <label htmlFor="Sort">
                  <h3>

                    Sort By :
                  </h3>
                </label>
                <select name="Sort" className="select" onChange={(e) => handleSelect(e)}>
                  <option value={'price 1'} >
                    Price(Lowest)
                  </option>
                  <option value={'price -1'} >Price(Highest)</option>
                  <option value={'name 1'} >Name(a-z)</option>
                  <option value={'name -1'} >Name(z-a)</option>
                  <option value={'name 0'} selected>None</option>
                </select>
              </div>
            </div>
          </div>
          <div className="middle">
            <div className="category">
              <div className="category-cat">
                <div className="heading">
                  <h2>Category</h2>
                </div>
                <div className="inner-cat">
                  <div>
                    <button value="" onClick={(e) => handleoptions(e)}>
                      All
                    </button>
                  </div>
                  <div>
                    <button value="office" onClick={(e) => handleoptions(e)}>
                      Office
                    </button>
                  </div>

                  <div>
                    <button
                      value="living room"
                      onClick={(e) => handleoptions(e)}
                    >
                      Living Room
                    </button>
                  </div>

                  <div>
                    <button value="kitchen" onClick={(e) => handleoptions(e)}>
                      Kitchen
                    </button>
                  </div>

                  <div>
                    <button value="bedroom" onClick={(e) => handleoptions(e)}>
                      Bedroom
                    </button>
                  </div>

                  <div>
                    <button value="dining" onClick={(e) => handleoptions(e)}>
                      Dining
                    </button>
                  </div>
                  <div>
                    <button value="kids" onClick={(e) => handleoptions(e)}>
                      Kids
                    </button>
                  </div>
                </div>
              </div>



              <div className="clear-cat">
                {/* <button
                  className="clear"
                  value="all"
                  onClick={(e) => clickHandler(e)}
                >
                  Clear Filters
                </button> */}
              </div>
            </div>

            {isLoading ? <Loader></Loader> : <div className="products-container">
              {currentItems.length == 0 ? <>

                <div className="sorry">
                  <div>


                    <h1>{`Sorry no Products related to "${search}"`}</h1>
                  </div>
                </div>
              </> : <div className="products">


                {currentItems.map((obj) => {

                  return (
                    <>
                      <div className="card">
                        <div className="image">
                          <Link to={`/products/${obj._id}`}>
                            <img src={`/products/${obj.image}`} alt="" />
                          </Link>
                        </div>
                        <div className="info">
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
            </div>}




          </div>


        </div>
        <div className="pagecontainer">

          <div className="pagination">

            {renderPageNumbers()}
          </div>
        </div>
      </Wrapper>
    </>
  );

};

const Wrapper = styled.div`

.sorry{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  color: #39a1ae;
}
.icon{
  font-size: 1.2rem;
  margin: 1.2rem;
  :hover{
    cursor: pointer;
  }
}
.loader{
  background-color: aliceblue;
  height: 30vh;
}
.val{
  color: #39a1ae;
  
  font-weight: 500;
}
.btn{
  background-color: #39a1ae;
  border-radius: 0rem;
  transition: all 0.2s;
}
.btn:hover{
  color:white;
  scale: 1.5;
  
}

.pagecontainer{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  

}
.pages{
  font-size: calc(0.4em + 1vw);
  transition: all 0.2s;
  :hover{
    scale:1.12;
  }
}
.pagination{
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  color: aliceblue;
  flex-wrap: wrap;
  .active{
    background-color: aliceblue;
    color: #39a1ae;
    
    
  }
}
  h2 {
    color: #39a1ae;
  }
  .clear-cat {
    display: flex;
  }
  .company-cat {
    width: 30%;
  }


  .inner-sort {
    font-size: 1.2rem;
  }
  .view {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 30%;
  }

  .icon {
  font-size: calc(.6em + 1vw);
  color: #39a1ae;
  }


  .sort {
    width: 20vw;
    display: flex;
    justify-content: right;
    align-items: center;
    
  }
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50vw;
    
    input {
    width: 90%;
    border: none;
    font-size: calc(.6em + 1vw);
    padding: 0.5rem;
  }
  }
    
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
  }

  .company {
    font-size: 1.2rem;
    margin: 1.2rem;
  }

  .select {
    font-size: calc(.2em + 1vw);
    border: none;

    padding: 0.3rem;
  }

 
  button {
    border: none;
    background: aliceblue;
    text-align: left;
    font-size: calc(.4em + 1vw);
    font-family: 'Merienda', cursive;
    padding: 1rem;
  }
  .clear {
    color: #39a1ae;
  }
  button:hover {
    cursor: pointer;
    color: #39a1ae;
  }
  .search {
    background: aliceblue;
  }
  .main {
    display: flex;
    flex-direction: column;
   background-color: aliceblue;
   padding: calc(.2em + 1vw);

  }
  .middle {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: #39a1ae;
  }
  .category {
    width: 100%;
    display: flex;
    background: aliceblue;
    justify-content: space-between;
    
  }
  .category-cat {
    display: flex;
    flex-direction: column;
  }
  .inner-cat {
  display: flex;
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
    grid-template-columns: repeat( auto-fit, minmax(35rem, 1fr) );
    grid-auto-rows: min-content;
    gap: 2rem;
    

  }
 
  img{
    width: 100%;
    height: 30rem;
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
    width: 45vw;
    height: 25vw;
  }
  
  .products{
     grid-template-columns: repeat( auto-fit, minmax(25rem, 1fr) );
     justify-items: center;
  }
 }

   
 
`;

export default Products;
