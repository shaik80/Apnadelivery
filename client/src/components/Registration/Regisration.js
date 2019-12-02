import React , {Fragment , useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form , Button} from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types'


const Regisration = ({setAlert, register, isAuthenticated}) => {
  const [formData , setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const {name,email,password,password2} = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e =>{
    e.preventDefault();
    if(password !== password2){
      setAlert('password do not match', 'danger')
    }
    else{
      register({name, email, password});
    }
  }
     //Redirect if  registration sucess
     if(isAuthenticated){
      return <Redirect to="/homepage" />
    }
    return (
      <Fragment>
      <>
        <Form onSubmit={e => onSubmit(e)}>
  <Form.Group controlId="formName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter name"  name='name' value={name} onChange={e => onChange(e)} required/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

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
  <Form.Group controlId="formPassword2">
    <Form.Label>Comfirm Password</Form.Label>
    <Form.Control type="password" placeholder="Comfirm Password" name='password2' value={password2} onChange={e => onChange(e)} required/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
</>
</Fragment>
    )
}

Regisration.prototype ={
  setAlert:PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert, register})(Regisration)
