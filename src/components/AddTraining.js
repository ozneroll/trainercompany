import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';


class AddTraining extends Component {
    
    constructor(props) {
        super(props);
        this.state = {date: '', time: '', duration: '', activity: '', customer: '', customers: []};
        this.addModal = React.createRef();
    }

    componentDidMount() {
        this.getAllCustomers();
    }

    getAllCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => {
            this.setState({ 
                customers: responseData.content,
                customer: responseData.content[0].links[0].href
            })

        })
        
        
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    

    saveTraining = () => {
        const training = {date: this.state.date, duration: this.state.duration, activity: this.state.activity, 
                     customer: this.state.customer}
                     
        this.props.saveTraining(training);
        
        this.setState({
            date: '',
            duration: '',
            activity: '',
            customer: ''
        })
        this.addModal.current.hide();
    }


    
    render() {
    
        const addDialog = {
            width: '30%',
            height: '300px',
            marginLeft: '-15%'
        }

        const customers = this.state.customers.map((cust) => <option key={cust.links[0].href} value={cust.links[0].href}>{cust.firstname} {cust.lastname}</option>)
       
        return (
        <div>
            <Button style={{margin: 10}} variant="outlined" onClick={() => this.addModal.current.show()}><AddIcon/>New training</Button>
            <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="New training">
          
          <table style={{textAlign: "left"}}>
              <tr>
                <td><b>Date</b></td>
                <td><TextField name="date" type="date" onChange={this.handleChange} value={this.state.date}/><br />
          </td>
              </tr>
              <tr>
                  <td><b>Duration</b></td>
                  <td><TextField name="duration" onChange={this.handleChange} value={this.state.duration}/><br />
          </td>
              </tr>
              <tr>
                  <td><b>Activity</b></td>
                  <td><TextField name="activity" onChange={this.handleChange} value={this.state.activity}/><br />          
          </td>
              </tr>
              <tr>
                  <td><b>Customer</b></td>
                  <td><select name="customer" value={this.state.customer} onChange={this.handleChange}>{customers}</select><br /></td>
              </tr>
          </table>
       
          <Button style={{marginTop: 10, float: "left"}} onClick={this.saveTraining} variant="outlined"><SaveIcon />SAVE</Button>
        </SkyLight>
        </div>
        );
    }
    
}

export default AddTraining;