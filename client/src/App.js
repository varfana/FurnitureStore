
import { Route, Routes } from "react-router-dom";
import Sharedlayout from "./components/Sharedlayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import MyContext from "./MyContext";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ProductPage from "./components/ProductPage";
import Login from './pages/Login.js'
import User from "./components/User";
import EditProfile from './pages/user/EditProfile'
import Offer from './pages/user/Offers'
import Order from './pages/user/Orders'
import YourProducts from './pages/user/YourProducts'
import Register from './pages/Register.js'
import axios from "axios";
import AddYourProduct from "./pages/user/AddYourProduct";
function App() {
  const [cartItems, setCartItems] = useState([]);

  const [loader, setloader] = useState(true);
  const [data, setdata] = useState([]);


  const [isLoading, setLoading] = useState(true)
  const [sortname, setsortname] = useState(1)
  const [sortprice, setsortprice] = useState(1)
  const localStorageUserData = localStorage.getItem('userData')
  const objectData = JSON.parse(localStorageUserData) || { token: null, user: null }


  const [token, setToken] = useState(objectData.token)
  const [user, setUser] = useState(objectData.user)


  const fetchdata = async () => {
    setLoading(true)
    const { data } = await axios.get(`/api/v1/products?sortprice=${sortprice}&sortname=${sortname}`);

    setdata(data.data);

    setLoading(false);



  };

  const searchFunction = async (search) => {
    setLoading(true)

    if (search == '') {
      return fetchdata()
    }
    const { data } = await axios.post(`/api/v1/products/search`, { search });
    setdata(data.data);

    setLoading(false);

  }


  useEffect(() => {
    fetchdata();
  }, [sortname, sortprice]);


  return (
    <MyContext.Provider
      value={{
        cartItems,
        setCartItems,

        loader,
        setloader,
        data,
        setdata,
        token,
        setToken,
        user,
        setUser,

        isLoading,
        setLoading,
        searchFunction,
        sortname,
        setsortname,
        sortprice,
        setsortprice

      }}
    >
      <Routes>
        <Route path="/" element={<Sharedlayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path='/user' element={<User></User>}>
            <Route path='/user/edit' element={<EditProfile></EditProfile>}></Route>
            <Route path='/user/offer' element={<Offer></Offer>}></Route>
            <Route path='/user/order' element={<Order></Order>}></Route>
            <Route path='/user/product' element={<YourProducts></YourProducts>}></Route>
            <Route path='/user/addyourproduct' element={<AddYourProduct></AddYourProduct>}></Route>
          </Route>
          {data.map((el) => {

            return (
              <Route
                path={`/products/${el._id}`}
                element={<ProductPage key={el.id} _id={el._id} />}
              ></Route>
            );
          })}
        </Route>
      </Routes>
    </MyContext.Provider>
  );

}

export default App;
