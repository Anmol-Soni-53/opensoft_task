import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import 'mdb-react-ui-kit/dist/scss/mdb.scss';
// import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom'; // Import withRouter
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
}
    from 'mdb-react-ui-kit';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                name: '',
                email: '',
                password: ''
            }
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        var name = e.target.name
        var value = e.target.value
        var temp = this.state.details;
        temp[name] = value
        this.setState(temp)
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.details)
        // history.push('/login');
        var url = 'http://127.0.0.1:8000/api/register'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(this.state.details)
        }).then((response) => {
            console.log('registeration succes');
            this.setState({
                details: {
                    name: '',
                    email: '',
                    password: ''
                }
            })
            // this.props.history.push('/login');

        }).catch(function (error) {
            console.log("ERROR", error);
        })
    }
    render() {
        return (
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput onChange={this.handleChange} label='Your Name' id='form1'
                                        type='text' name='name' className='w-100' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput onChange={this.handleChange} label='Your Email' id='form2'
                                        name='email' type='email' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput onChange={this.handleChange} label='Password' id='form3' type='password'
                                        name='password' />
                                </div>
                                <MDBBtn onClick={this.handleSubmit} className='mb-4' size='lg'>Register</MDBBtn>
                                <div className='text-center text-md-start mt-4 pt-2'>
                                    {/* <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn> */}
                                    <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <a href='/login' className="link-danger">Login</a>
                                    </p>
                                </div>
                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }
}
export default Register;