import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';


class ViewCustomer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {firstname:'', lastname: '', streetaddress: '', postcode: '', city: ''};
        this.addModal = React.createRef();
    }

    componentDidMount() {
        this.getCustomer(this.props.url);
    }

    getCustomer(link) {
        fetch(link)
        .then(response => response.json())
        .then(responseData => {
           this.setState({
               firstname: responseData.firstname,
               lastname: responseData.lastname,
               streetaddress: responseData.streetaddress,
               postcode: responseData.postcode,
               city: responseData.city
           })
        })
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

        return (
        <div>
            <Button onClick={() => this.addModal.current.show()}><VisibilityIcon/></Button>
            <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Customer">
          
          <table style={{textAlign: "left"}}>
              <tr>
                <td><b>First name</b></td>
                <td>{this.state.firstname}</td>
              </tr>
              <tr>
                  <td><b>Last name</b></td>
                  <td>{this.state.lastname}</td>
              </tr>
              <tr>
                  <td><b>Street address</b></td>
                  <td>{this.state.streetaddress}</td>
              </tr>
              <tr>
                  <td><b>Postcode</b></td>
                  <td>{this.state.postcode}</td>
              </tr>
              <tr>
                  <td><b>City</b></td>
                  <td>{this.state.city}</td>
              </tr>
          </table>
        </SkyLight>
        </div>
        );
    }
    
}

export default ViewCustomer;