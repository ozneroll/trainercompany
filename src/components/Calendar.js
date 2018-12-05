import React, { Component } from 'react';

import SkyLight from 'react-skylight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {trainings: []};
    }

    componentDidMount() {
        this.listTrainings();
    }


    listTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ trainings: responseData.content })
            })
    }


    
    render() {

        moment.locale('en-GB');
        BigCalendar.momentLocalizer(moment);

        var tempDates = [];

        this.state.trainings.forEach(
        function (training, index) {
            const beginTime = new Date(training.date);
            const endTime = new Date(beginTime.getTime() + training.duration * 60000);
            const event = {
            id: index,
            title: training.activity,
            startDate: beginTime,
            endDate: endTime,
            customer: training.links[2].href
            }
            tempDates.push(event);
    });


        return (
            <div style={{ height: 700 }}>
            <BigCalendar
            style={{width: '90%', margin: 'auto'}}
            localizer={localizer}
            selectable
            events={tempDates}
            startAccessor='startDate'
            endAccessor='endDate'
            />
        </div>
        );
    }
    
}

export default Calendar;
