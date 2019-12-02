import React , {Fragment , useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form , Button} from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";


const Login = ({ login, isAuthenticated }) => {
  const [formData , setFormData] = useState({
    email:'',
    password:''
  });

  const {email,password} = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e =>{
    e.preventDefault();
    login(email,password)
   };
   //Redirect if login sucess
   if(isAuthenticated){
     return <Redirect to="/homepage" />
   }
    return (
      <Fragment>
      <>
        <Form onSubmit={e => onSubmit(e)}>

  <Form.Group controlId="formEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e => onChange(e)} required/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={e => onChange(e)} required/>
  </Form.Group>
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
</>
</Fragment>
    )
}

Login.prototype ={
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}
 
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ login })(Login);
