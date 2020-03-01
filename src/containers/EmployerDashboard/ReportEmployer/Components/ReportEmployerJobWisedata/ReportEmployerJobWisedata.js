//library dependency
import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts'

//styles
import './styles.scss';

class ReportEmployerJobWisedata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configLine: {
        title: {
          text: "User Experience Designer", align: "left",
          style: {fontSize: "20px", marginBottm: "12px", color: "#656565", fontFamily: "Roboto", fontWeight: 500}
        },
        legend: {align: 'right', layout: 'vertical', verticalAlign: 'middle', itemMarginTop: 14},
        credits: {enabled: false},
        subtitle: {
          text: "", align: "left",
          style: {fontSize: "14px", marginBottm: "12px", color: "#656565"}
        },
        chart: {type: 'pie', plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, size: 180},
        plotOptions: {
          pie: {allowPointSelect: true, cursor: 'pointer', dataLabels: {enabled: false}, showInLegend: true, size: 240}
        },
        series: [{
          colorByPoint: true, innerSize: '80%',
          data: [{name: 'Applied', y: 12, color: '#8c9ae6'}, {name: 'In-Review', y: 10, color: '#ef769b'},
            {name: 'On-Hold', y: 33, color: '#f8c04c'}, {name: 'Shortlisted', y: 20, color: '#4ab1c0'},
            {name: 'Rejected', y: 20, color: '#8bd086'}, {name: 'Review Later', y: 20, color: '#ec7f55'},
            {name: 'Offered', y: 20, color: '#d376c9'}]
        }]
      }
    }
  }

  componentWillMount() {
    /**
     * updating config line details by data receives by props
     * @type {{title: {text: string, align: string, style: {fontSize: string, marginBottm: string, color: string, fontFamily: string, fontWeight: number}}, credits: {enabled: boolean}, subtitle: {text: string, align: string, style: {fontSize: string, marginBottm: string, color: string}}, legend: {layout: string, align: string, verticalAlign: string}, xAxis: {type: string, dateTimeLabelFormats: {month: string, year: string}, title: {text: string, style: {fontSize: string, color: string, fontFamily: string, fontWeight: number, paddingTop: string}}}, yAxis: {title: {text: string, style: {fontSize: string, color: string, fontFamily: string, fontWeight: number}}}, plotOptions: {series: {label: {connectorAllowed: boolean}}}, tooltip: {style: {background: string, color: string}, dateTimeLabelFormats: {day: string, month: string, week: string, year: string}}, series: *[]}|ReportEmployerWeekWisedata.state.configLine|{title, credits, subtitle, legend, xAxis, yAxis, plotOptions, tooltip, series}}
     */
    let configLine = this.state.configLine;
    configLine.title.text = this.props.data.name;
    configLine.series[0].data = this.props.data.data;
    this.setState({configLine: configLine})
  }

  render() {
    const {configLine} = this.state;
    return (
      <div className="report-employer-job-wise-data-card">
        <ReactHighcharts config={configLine}/>
      </div>
    );
  }
}

export default ReportEmployerJobWisedata;
