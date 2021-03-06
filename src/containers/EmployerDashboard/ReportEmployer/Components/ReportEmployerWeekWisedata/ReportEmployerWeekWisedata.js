//library dependency
import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts'

//styles
import './styles.scss';

class ReportEmployerWeekWisedata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configLine: {
        title: {
          text: "All Job Posts", align: "left",
          style: {fontSize: "20px", marginBottm: "12px", color: "#656565", fontFamily: "Roboto", fontWeight: 500}
        },
        credits: {enabled: false},
        subtitle: {
          text: "", align: "left",
          style: {fontSize: "14px", marginBottm: "12px", color: "#656565"}
        },
        legend: {layout: 'horizontal', align: 'right', verticalAlign: 'top'},
        xAxis: {
          type: "datetime", dateTimeLabelFormats: {month: "%e. %b", year: "%b"}, title: {
            text: "Date",
            style: {fontSize: "18px", color: "#212121", fontFamily: "Roboto", fontWeight: 400, paddingTop: "10px"}
          }
        },
        yAxis: {
          title: {
            text: "No. of Applicants",
            style: {fontSize: "18px", color: "#212121", fontFamily: "Roboto", fontWeight: 400}
          }
        },
        plotOptions: {series: {label: {connectorAllowed: false}}},
        tooltip: {
          style: {background: "#ffffff", color: "#212121"},
          dateTimeLabelFormats: {day: "%A", month: "%B", week: "Week", year: "%Y"}
        },
        series: [{
          name: "Applied", data: [[1561420800000, 1], [1561507200000, 7], [1561593600000, 20], [1561680000000, 13],
            [1561766400000, 6], [1561852800000, 28], [1561939200000, 24], [1562025600000, 16], [1562112000000, 19], [1562198400000, 10]]
        },
          {
            name: "In-Review", data: [[1561420800000, 5], [1561507200000, 8], [1561593600000, 14], [1561680000000, 25],
              [1561766400000, 16], [1561852800000, 11], [1561939200000, 23], [1562025600000, 19], [1562112000000, 10], [1562198400000, 21]]
          },
          {
            name: "On-Hold", data: [[1561420800000, 3], [1561507200000, 2], [1561593600000, 15], [1561680000000, 26],
              [1561766400000, 17], [1561852800000, 28], [1561939200000, 19], [1562025600000, 10], [1562112000000, 12], [1562198400000, 10]]
          },
          {
            name: "Shortlisted",
            data: [[1561420800000, 0], [1561507200000, 3], [1561593600000, 22], [1561680000000, 22],
              [1561766400000, 8], [1561852800000, 19], [1561939200000, 10], [1562025600000, 19], [1562112000000, 12], [1562198400000, 23]]
          },
          {
            name: "Rejected", data: [[1561420800000, 3], [1561507200000, 8], [1561593600000, 17], [1561680000000, 28],
              [1561766400000, 19], [1561852800000, 10], [1561939200000, 1], [1562025600000, 12], [1562112000000, 19], [1562198400000, 14]]
          },
          {
            name: "Review Later",
            data: [[1561420800000, 8], [1561507200000, 3], [1561593600000, 28], [1561680000000, 9],
              [1561766400000, 20], [1561852800000, 14], [1561939200000, 12], [1562025600000, 23], [1562112000000, 4], [1562198400000, 9]]
          },
          {
            name: "Offered", data: [[1561420800000, 2], [1561507200000, 4], [1561593600000, 9], [1561680000000, 10],
              [1561766400000, 21], [1561852800000, 12], [1561939200000, 3], [1562025600000, 5], [1562112000000, 9], [1562198400000, 16]]
          }
        ]
      }
    }
  }


  componentWillReceiveProps() {
    /**
     * after receiving props set week_data value to receives props data
     */
    this.setState({week_data: this.props.week_data});
    this.updateData();
  }

  /**
   * this function is not developed till yet. it will change dashboard data by week selection dropdown
   * currently it is showing dummy data
   */
  updateData = () => {
    let configLine = this.state.configLine;
    if (this.props.week_data.value === "2 Week") {
      configLine.series = [
        {
          name: "Applied", data: [[1561420800000, 1], [1561507200000, 7], [1561593600000, 20], [1561680000000, 13],
            [1561766400000, 6], [1561852800000, 28], [1561939200000, 24], [1562025600000, 16], [1562112000000, 19], [1562198400000, 10]]
        },
        {
          name: "In-Review", data: [[1561420800000, 5], [1561507200000, 8], [1561593600000, 14], [1561680000000, 25],
            [1561766400000, 16], [1561852800000, 11], [1561939200000, 23], [1562025600000, 19], [1562112000000, 10], [1562198400000, 21]]
        },
        {
          name: "On-Hold", data: [[1561420800000, 3], [1561507200000, 2], [1561593600000, 15], [1561680000000, 26],
            [1561766400000, 17], [1561852800000, 28], [1561939200000, 19], [1562025600000, 10], [1562112000000, 12], [1562198400000, 10]]
        },
        {
          name: "Shortlisted", data: [[1561420800000, 0], [1561507200000, 3], [1561593600000, 22], [1561680000000, 22],
            [1561766400000, 8], [1561852800000, 19], [1561939200000, 10], [1562025600000, 19], [1562112000000, 12], [1562198400000, 23]]
        },
        {
          name: "Rejected", data: [[1561420800000, 3], [1561507200000, 8], [1561593600000, 17], [1561680000000, 28],
            [1561766400000, 19], [1561852800000, 10], [1561939200000, 1], [1562025600000, 12], [1562112000000, 19], [1562198400000, 14]]
        },
        {
          name: "Review Later", data: [[1561420800000, 8], [1561507200000, 3], [1561593600000, 28], [1561680000000, 9],
            [1561766400000, 20], [1561852800000, 14], [1561939200000, 12], [1562025600000, 23], [1562112000000, 4], [1562198400000, 9]]
        },
        {
          name: "Offered", data: [[1561420800000, 2], [1561507200000, 4], [1561593600000, 9], [1561680000000, 10],
            [1561766400000, 21], [1561852800000, 12], [1561939200000, 3], [1562025600000, 5], [1562112000000, 9], [1562198400000, 16]]
        }
      ]
    }
    else if (this.props.week_data.value === "1 Week") {
      configLine.series = [
        {
          name: "Applied", data: [[1561420800000, 11], [1561507200000, 7], [1561593600000, 20], [1561680000000, 3],
            [1561766400000, 6], [1561852800000, 28], [1561939200000, 4], [1562025600000, 16], [1562112000000, 19], [1562198400000, 10]]
        },
        {
          name: "In-Review", data: [[1561420800000, 10], [1561507200000, 3], [1561593600000, 22], [1561680000000, 2],
            [1561766400000, 8], [1561852800000, 19], [1561939200000, 1], [1562025600000, 19], [1562112000000, 12], [1562198400000, 3]]
        },
        {
          name: "On-Hold", data: [[1561420800000, 31], [1561507200000, 2], [1561593600000, 15], [1561680000000, 6],
            [1561766400000, 17], [1561852800000, 28], [1561939200000, 9], [1562025600000, 10], [1562112000000, 12], [1562198400000, 1]]
        },
        {
          name: "Shortlisted", data: [[1561420800000, 13], [1561507200000, 8], [1561593600000, 17], [1561680000000, 8],
            [1561766400000, 19], [1561852800000, 10], [1561939200000, 1], [1562025600000, 12], [1562112000000, 19], [1562198400000, 4]]
        },
        {
          name: "Rejected", data: [[1561420800000, 18], [1561507200000, 3], [1561593600000, 28], [1561680000000, 19],
            [1561766400000, 20], [1561852800000, 14], [1561939200000, 1], [1562025600000, 23], [1562112000000, 4], [1562198400000, 9]]
        },
        {
          name: "Review Later", data: [[1561420800000, 12], [1561507200000, 4], [1561593600000, 9], [1561680000000, 20],
            [1561766400000, 21], [1561852800000, 12], [1561939200000, 3], [1562025600000, 5], [1562112000000, 9], [1562198400000, 6]]
        },
        {
          name: "Offered", data: [[1561420800000, 13], [1561507200000, 2], [1561593600000, 15], [1561680000000, 2],
            [1561766400000, 17], [1561852800000, 28], [1561939200000, 19], [1562025600000, 10], [1562112000000, 12], [1562198400000, 1]]
        }
      ]
    }
    this.setState({configLine: configLine})
  };

  render() {
    const {configLine} = this.state;
    return (
      <div className="report-employer-week-wise-data-card">
        <ReactHighcharts config={configLine}/>
      </div>
    );
  }
}

export default ReportEmployerWeekWisedata;
