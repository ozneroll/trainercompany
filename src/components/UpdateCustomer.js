import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';


class UpdateCustomer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''};
        this.addModal = React.createRef();
    }

    componentDidMount() {
        this.getCustomer();
    }

    getCustomer = () => {
        fetch(this.props.self)
            .then(response => response.json())
            .then(responseData => {
                this.setState({ 
                    firstname: responseData.firstname,
                    lastname: responseData.lastname,
                    streetaddress: responseData.streetaddress,
                    postcode: responseData.postcode,
                    city: responseData.city,
                    email: responseData.email,
                    phone: responseData.phone
                 })
            })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    saveCustomer = () => {
        const customer = {firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, 
                     postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone}
        this.props.updateCustomer(this.props.self, customer);
        this.addModal.current.hide();
    }


    
    render() {
    
        const addDialog = {
            width: '30%',
            height: '300px',
            marginLeft: '-15%'
        }

        return (
        <div>
            
            <Button style={{margin: 10}} onClick={() => this.addModal.current.show()}><EditIcon/></Button>
            <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Update customer">
            
            <table style={{textAlign: "left"}}>
              <tr>
                <td><b>Fist name</b></td>
                <td><TextField name="firstname" onChange={this.handleChange} value={this.state.firstname}/><br />
                </td>
              </tr>
              <tr>
                  <td><b>Last name</b></td>
                  <td><TextField name="lastname"  onChange={this.handleChange} value={this.state.lastname}/><br />
          </td>
              </tr>
              <tr>
                  <td><b>Street address</b></td>
                  <td><TextField name="streetaddress"  onChange={this.handleChange} value={this.state.streetaddress}/><br />
          </td>
              </tr>
              <tr>
                  <td><b>Postcode</b></td>
                  <td><TextField name="postcode"  onChange={this.handleChange} value={this.state.postcode}/><br />
          </td></tr>
          <tr>
                  <td><b>City</b></td>
                  <td><TextField name="city" onChange={this.handleChange} value={this.state.city}/><br />
          </td>
              </tr>
              <tr>
                  <td><b>Email</b></td>
                  <td><TextField name="email" onChange={this.handleChange} value={this.state.email}/><br />
          </td>
              </tr>
              <tr>
                  <td><b>Phone</b></td>
                  <td><TextField name="phone" onChange={this.handleChange} value={this.state.phone}/><br />
          </td>
              </tr>
          </table>
          
          <Button style={{marginTop: 10, float:"left"}} onClick={this.saveCustomer} variant="outlined" ><SaveIcon />SAVE</Button>
        </SkyLight>
        </div>
        );
    }
    
}

export default UpdateCustomer;