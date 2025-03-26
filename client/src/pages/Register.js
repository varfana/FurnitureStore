
import styled from 'styled-components'
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import MyContext from '../MyContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const navigate = useNavigate('/user')
    const { token, setToken, setUser } = useContext(MyContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address1: '',
        address2: '',
        phone: '',
        password: ''

    });

    const handleChange = event => {
        const { name, value } = event.target;

        setFormData(prevState => ({ ...prevState, [name]: value }));

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await axios.post('/api/v1/user/register', { ...formData })

        const token = data.token
        const user = data.user
        const objectData = { token, user }
        const jsonData = JSON.stringify(objectData)
        localStorage.setItem('userData', jsonData)
        toast.success('user registered successfully', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setUser(user)
        setToken(token)
        navigate('/user')

    };

    return (
        <>
            <Wrapper>
                <form onSubmit={handleSubmit} className='upper' >
                    <div className='item'>
                        <h1>Register</h1>
                    </div>
                    <div className='main'>
                        <div className='form'>


                            <div className='item'>
                                <label>
                                    Name:
                                </label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                            </div>



                            <div className='item'>


                                <label>
                                    Email:
                                </label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} />

                            </div>
                            <div className='item'>
                                <label>
                                    Password:
                                </label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                            </div>
                            <div className='item'>


                                <label>
                                    Address 1:
                                </label>
                                <input type="text" name="address1" value={formData.address1} onChange={handleChange} />
                            </div>
                            <div className='item'>


                                <label>
                                    Address 2:
                                </label>
                                <input type="text" name="address2" value={formData.address2} onChange={handleChange} />
                            </div>


                            <div className='item'>

                                <label htmlFor="phone">Phone:</label>

                                <input type='tel' id="phone" name="phone" value={formData.phone} placeholder="Enter your phone number" onChange={handleChange} />
                            </div>
                            <div className='link'>

                                <Link to='/login' className='link'>
                                    Already got an account ?
                                </Link>

                            </div>
                            <div>

                                <button type="submit" className='btn'>Submit</button>
                            </div>
                        </div>

                    </div>

                </form>

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
const Wrapper = styled.div`
background-color: aliceblue;
font-size: calc(.2em + 1vw);
padding: 2rem;
.main{
    display: flex;
    justify-content: space-evenly;
    padding: 4rem;
}
.form{
  width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(20rem,1fr));
    align-items: center;
    gap: 4rem;
    

}
.item{
    display: grid;
    
}
input{
    width: 80%;
    padding: calc(.2em + 1vw);

}
`
export default Register
