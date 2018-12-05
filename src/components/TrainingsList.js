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
import moment from 'moment';
import AddTraining from './AddTraining';
import UpdateTraining from './UpdateTraining';
import ViewCustomer from './ViewCustomer';

import 'react-confirm-alert/src/react-confirm-alert.css'


class TrainingsList extends Component {

    constructor(props) {
        super(props);
        this.state = { trainings: [], showSnackbar: false, customer: 'test' };
        this.addModal = React.createRef();
    }

    componentDidMount() {
        this.listTrainings();
    }

    deleteConfirm = (link) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this training ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.deleteTraining(link)
              },
              {
                label: 'No',
              }
            ]
          })
    }

    deleteTraining = (link) => {
        fetch(link, { method: 'DELETE' })
            .then(response => {
                this.listTrainings();
                this.setState({showSnackbar: true})
            })
    }

    saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
        {method: 'POST', 
        headers: {'Content-Type' : 'application/json'}, 
        body: JSON.stringify(training)} )
        .then(response => {
            this.listTrainings();
        })
    }

   

    
    updateTraining = (link, training) => {
        fetch(link, 
        {method: 'PUT', 
        headers: {'Content-Type' : 'application/json'}, 
        body: JSON.stringify(training)} )
        .then(response => {
            this.listTrainings();
        })
    }


    listTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ trainings: responseData.content })
            })
    }

    

    showCustomer = (link) => {
        return (
            <ViewCustomer></ViewCustomer>
        )
    }

    

    handleClose = (event, reason) => {
        this.setState({ showSnackbar: false });
    };

    render() {

        const columns = [{
            Header: 'Date',
            accessor: 'date',
            Cell: ({value}) => <span>{moment(value).format('MM/DD/YYYY')}</span>
        }, {
            Header: 'Time',
            accessor: 'date',
            Cell: ({value}) => <span>{moment(value).format('hh:mm')}</span>
        },{
            Header: 'Duration',
            accessor: 'duration',
            
        },{
            Header: 'Activity',
            accessor: 'activity',
           
        }, {
            Cell: ({ value }) => <ViewCustomer url={value}/>,
            Header: 'Customer',
            accessor: 'links[2].href',
            filterable: false   
        }, 
        {
            Header: '',
            accessor: 'links[0].href',
            Cell: ({ value }) => <UpdateTraining self={value} updateTraining={this.updateTraining}/>,
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
                <AddTraining saveTraining={this.saveTraining}/>
                <ReactTable style={{width: '90%', margin: 'auto'}} data={this.state.trainings} columns={columns} filterable={true} defaultPageSize={10} />
                <Snackbar message='Training deleted' open={this.state.showSnackbar} onClose={this.handleClose} autoHideDuration={3000}/>
            </div>
        );
    }
}

export default TrainingsList;