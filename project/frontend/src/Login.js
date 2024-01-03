import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [details, setDetails] = useState({
        'email': '',
        'password': '',
    });

    function handleChange(e) {
        var name = e.target.name
        var value = e.target.value
        var temp = details;
        temp[name] = value
        setDetails(temp);
    }
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(details);
        var csrftoken = getCookie('csrftoken');
        var url = 'http://127.0.0.1:8000/api/login';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(details)
        }).then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    console.log(errorData);
                    throw new Error('Login failed');
                });
            } else {
                return response.json().then((data) => {
                    const token = data.jwt; // Assuming the token is in the 'jwt' field of the response
                    console.log('Login successful! Token:', token);
                    setDetails({
                        'email': '',
                        'password': '',
                    });
                    // Handle the token as needed (e.g., store it)
                    return token; // Return the token for further processing if needed
                });
            }
        }).catch(function (error) {
            console.log("ERROR", error);
        });
    }

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('Token');
            if (!token) {
                throw new Error('Token missing or expired');
            }

            const response = await fetch('http://127.0.0.1:8000/api/user');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');

            }

            const userData = await response.json();
            console.log('User data:', userData);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };


    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            const data = await response.json();
            const token = data.jwt; // Assuming the token is in the 'token' field of the response
            console.log('Login successful! Token:', token);
            // Handle token (e.g., store it in state or localStorage)
            localStorage.setItem('Token', token);
            const Token_ = localStorage.getItem('Token');
            console.log(Token_);
            setError(null); // Clear any previous errors
            // fetchUserData();
            // navigate('/user');
        } catch (error) {
            setError(error.message || 'Login failed');
            console.error('Login failed:', error);
        }
    };
    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="SampleImage" />
                </MDBCol>

                <MDBCol col='4' md='6'>
                    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' name='email' onChange={handleChange} size="lg" />
                    <MDBInput wrapperClass='mb-4' label='Password' type='password'
                        name='password' onChange={handleChange} size="lg" />

                    <div className="d-flex justify-content-between mb-4">
                        {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin} >Login</MDBBtn>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href='/register' className="link-danger">Register</a>
                        </p>
                    </div>
                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='facebook-f' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='twitter' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='linkedin-in' />
                        </MDBBtn>
                    </div>
                </MDBCol>

            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='facebook-f' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='twitter' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='google' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='linkedin-in' size="md" />
                    </MDBBtn>

                </div>

            </div>

        </MDBContainer>
    );
}

export default Login;