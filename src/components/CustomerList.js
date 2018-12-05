import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {confirmAlert } from 'react-confirm-alert'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import UpdateCustomer from './UpdateCustomer';

import 'react-confirm-alert/src/react-confirm-alert.css'

class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.state = { customers: [], showSnackbar: false };
    }

    componentDidMount() {
        this.listCustomers();
    }

    deleteConfirm = (link) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this customer ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.deleteCustomer(link)
              },
              {
                label: 'No',
              }
            ]
          })
    }

    deleteCustomer = (link) => {
        fetch(link, { method: 'DELETE' })
            .then(response => {
                this.listCustomers();
                this.setState({showSnackbar: true})
            })
    }

    saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', 
        {method: 'POST', 
        headers: {'Content-Type' : 'application/json'}, 
        body: JSON.stringify(customer)} )
        .then(response => {
            this.listCustomers();
        })
    }

    updateCustomer = (link, customer) => {
        fetch(link, 
        {method: 'PUT', 
        headers: {'Content-Type' : 'application/json'}, 
        body: JSON.stringify(customer)} )
        .then(response => {
            this.listCustomers();
        })
    }


    listCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ customers: responseData.content })
            })
    }

    

    handleClose = (event, reason) => {
        this.setState({ showSnackbar: false });
    };

    render() {

        const columns = [{
            Header: 'Firstname',
            accessor: 'firstname',
            
        }, {
            Header: 'Lastname',
            accessor: 'lastname',
            
        }, {
            Header: 'Street address',
            accessor: 'streetaddress',
            
        }, {
            Header: 'Postcode',
            accessor: 'postcode',
            
        }, {
            Header: 'City',
            accessor: 'city',

        }, {
            Header: 'Email',
            accessor: 'email',
            
        }, {
            Header: 'Phone',
            accessor: 'phone',
         
        }, 
        {
            Header: '',
            accessor: 'links[0].href',
            Cell: ({ value }) => <UpdateCustomer self={value} updateCustomer={this.updateCustomer} />,
            filterable: false
        },
        {
            Header: '',
            accessor: 'links[0].href',
            Cell: ({ value }) => <Tooltip title='Delete' placement='right'><IconButton onClick={() => this.deleteConfirm(value)} aria-label='delete'><DeleteIcon /></IconButton></Tooltip>,
            filterable: false
        }]

        return (
            <div>
                <AddCustomer saveCustomer={this.saveCustomer}/>
                <ReactTable style={{ width: '90%', margin: 'auto'}} data={this.state.customers} columns={columns} filterable={true} defaultPageSize={10} />
                <Snackbar message='Customer deleted' open={this.state.showSnackbar} onClose={this.handleClose} autoHideDuration={3000}/>
            </div>
        );
    }
}

export default CustomerList;