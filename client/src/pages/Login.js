import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import MyContext from '../MyContext';
import { Link } from 'react-router-dom';
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { token, setToken, setUser } = useContext(MyContext);
    const navigate = useNavigate()

    const submitHandler = async () => {
        const { data } = await axios.post('/api/v1/user/login', { email, password })

        const token = data.token
        const user = data.user

        const objectData = { token, user }
        const jsonData = JSON.stringify(objectData)
        localStorage.setItem('userData', jsonData)

        setUser(user)
        setToken(token)
        navigate('/user')


    }
    return (
        <Wrapper>

            <div className='main'>
                <div className='card'>


                    <div className='text' >
                        Email
                        <div className='input text'>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className='text'>
                        Password
                        <div className='input text'>
                            <input type="text" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div>

                        <Link to='/register' className='link'>
                            Don't have an account ?
                        </Link>

                    </div>


                    <button onClick={submitHandler} className='btn'>Submit</button>

                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-color: aliceblue;
font-size: calc(0.4em + 1vw);;
.link{
    text-decoration: none;
    color: #39A1AE;
}
.main{
    display: grid;
    justify-items: center;
 
}
.card{
    width: 40vw;
    display: grid;
    padding: 2rem;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
    
}
button{
    width: 20%;
    
}
input{
    width: 60%;
    padding: calc(0.1em + 1vw);
}

`
export default Login