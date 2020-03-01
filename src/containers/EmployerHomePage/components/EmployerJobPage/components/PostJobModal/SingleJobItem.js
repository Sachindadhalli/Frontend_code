//library dependencies
import React from 'react';
import moment from 'moment'

//style
import './style.scss';

// To change the date format
const DateTimeToDMY = (inputDate) => {
    try{
        const givenDate = moment(inputDate).toDate()
        const formattedDate = givenDate.getDate() + ' ' + givenDate.toLocaleString('en-us', { month: 'short' }) + ' ' + givenDate.getUTCFullYear();
        return formattedDate
    }
    catch(exc){
         'Undefined'
    }
};

function SingleJobItem(props) {
  return (
    <div className="single-job-wrapper" key={props.jobItem.key}>
        <div 
            className="single-job-item"
            onClick={()=>props.setPreviousJob(props.jobItem)}
            >
            <div>
                {props.jobItem.job_title}
            </div>
            <div>
                {DateTimeToDMY(props.jobItem.created_on)}
            </div>
        </div>
        <div className="job-item-hr"></div>
    </div>
  )
}

export default SingleJobItem;
