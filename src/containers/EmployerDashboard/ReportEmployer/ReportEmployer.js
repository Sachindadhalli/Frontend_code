//library dependency
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

//custom components
import EmployerSideNav from "../../../components/EmployerSideNav/EmployerSideNav";
import ReportEmployerSearchCard from "./Components/ReportEmployerSearchCard";
import ReportEmployerWeekWisedata from "./Components/ReportEmployerWeekWisedata";
import ReportEmployerJobWisedata from "./Components/ReportEmployerJobWisedata";

//styles
import './styles.scss';

/**
 * this is used to overrides material ui styles
 * @returns {{root: {justifyContent: string, flexWrap: string}}}
 */
const styles = () => ({root: {justifyContent: 'center', flexWrap: 'wrap'}});

class ReportEmployer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Export_value: "PDF", job: {key: 1, value: 'All Job Posts'}, view_data: {key: 1, value: 'Week wise'},
      week_data: {key: 1, value: '1 Week'}, line_data: [{name: "Java Developer", data: []}],
      pie_data: [
        {
          name: "Java Developer", data: [{name: 'Applied', y: 12, color: '#8c9ae6'},
            {name: 'In-Review', y: 10, color: '#ef769b'}, {name: 'On-Hold', y: 33, color: '#f8c04c'},
            {name: 'Shortlisted', y: 20, color: '#4ab1c0'}, {name: 'Rejected', y: 20, color: '#8bd086'},
            {name: 'Review Later', y: 20, color: '#ec7f55'}, {name: 'Offered', y: 20, color: '#d376c9'}]
        },
        {
          name: "Backend Developer", data: [{name: 'Applied', y: 525, color: '#8c9ae6'},
            {name: 'In-Review', y: 101, color: '#ef769b'}, {name: 'On-Hold', y: 133, color: '#f8c04c'},
            {name: 'Shortlisted', y: 120, color: '#4ab1c0'}, {name: 'Rejected', y: 120, color: '#8bd086'},
            {name: 'Review Later', y: 201, color: '#ec7f55'}, {name: 'Offered', y: 210, color: '#d376c9'}]
        },
        {
          name: "Frontend Developer", data: [
            {name: 'Applied', y: 20, color: '#8c9ae6'},
            {name: 'In-Review', y: 10, color: '#ef769b'}, {name: 'On-Hold', y: 13, color: '#f8c04c'},
            {name: 'Shortlisted', y: 21, color: '#4ab1c0'}, {name: 'Rejected', y: 10, color: '#8bd086'},
            {name: 'Review Later', y: 10, color: '#ec7f55'}, {name: 'Offered', y: 10, color: '#d376c9'}]
        },
        {
          name: "NodeJs Developer", data: [{name: 'Applied', y: 10, color: '#8c9ae6'},
            {name: 'In-Review', y: 1, color: '#ef769b'}, {name: 'On-Hold', y: 3, color: '#f8c04c'},
            {name: 'Shortlisted', y: 2, color: '#4ab1c0'}, {name: 'Rejected', y: 2, color: '#8bd086'},
            {name: 'Review Later', y: 0, color: '#ec7f55'}, {name: 'Offered', y: 5, color: '#d376c9'}]
        }
      ]
    }
  }

  /**
   * this function used to modify state variable data as per data receives from report employer search card
   * @param data
   */
  handleEmployerReportCardData = (data) => {
    this.setState({
      "Export_value": data.Export_value, 'job': data.job, 'view_data': data.view_data, 'week_data': data.week_data
    })
  };

  render() {
    const {job, view_data, line_data, week_data, pie_data} = this.state;
    const {history} = this.props;
    return (
      <div className="report-employer-page">
        <EmployerSideNav history={history} selected={0}>
          <div>
            <div className="report-employer-auto-overflow">
              <div className="report-employer-border-padding">
                <div className="head-text-padding report-employer-text">Dashboard</div>
                <div className="report-employer-right-container">
                  <div className="report-employer-component-container">
                    <ReportEmployerSearchCard handleEmployerReportCardData={this.handleEmployerReportCardData}/>
                  </div>
                  {view_data.value === "Week wise" ?
                    <div className="report-employer-component-container">
                      {line_data.map((values, index) => {
                        return <ReportEmployerWeekWisedata week_data={week_data} key={index} data={values}/>
                      })}
                    </div>
                    :
                    <div className="report-employer-component-container-2">
                      {job.value === "All Job Posts" ? pie_data.map((values, index) => {
                        return <ReportEmployerJobWisedata key={index} data={values}/>
                      }) : pie_data.map((values, index) => {
                        return job.value === values.name ? <ReportEmployerJobWisedata key={index} data={values}/> : ""
                      })}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default withStyles(styles)(ReportEmployer);
