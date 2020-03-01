//library dependency
import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {toast} from "react-toastify";

//custom components
import NonCreatableSingleSelectDropdown
  from "../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown";

//styles
import './styles.scss';


/**
 * drop down option values
 * @type {*[]}
 */
const view_dropdown_data = [{key: 1, value: 'Week wise'}, {key: 2, value: 'Job wise'}];
const week_dropdown_data = [{key: 1, value: '1 Week'}, {key: 2, value: '2 Week'}];
const job_dropdown_data = [{key: 1, value: 'All Job Posts'}, {key: 2, value: 'Java Developer'}, {
  key: 3,
  value: 'Backend Developer'
}, {key: 4, value: 'Frontend Developer'}, {key: 5, value: 'NodeJs Developer'}];
const job_dropdown_data1 = [{key: 1, value: 'All Job Posts'}];


class ReportEmployerSearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view_data: {key: 1, value: 'Week wise'},
      week_data: {key: 1, value: '1 Week'},
      job: {key: 1, value: 'All Job Posts'},
      job1: {key: 1, value: 'All Job Posts'},
      Export_value: "PDF"
    }
  }

  /**
   * this function used to set key and value of state variable
   * state variable defines by name and options defined by option
   * after updating store sending state data in props
   * @param option
   * @param name
   */
  setJobRole = (option, name) => {
    this.setState({
      [name]: {
        key: option.value,
        value: option.label
      }
    }, () => this.props.handleEmployerReportCardData(this.state))
  };

  /**
   * this function set export radio button field in state
   * after updating store sending state data in props
   * @param e
   */
  handleChange = (e) => {
    this.setState({"Export_value": e.target.value}, () => this.props.handleEmployerReportCardData(this.state))
  };

  /**
   * after clicking on export button this function calls
   * currently not developed
   * @constructor
   */
  ClickButton = () => {
    toast('Currently, this functionality is under development, Thanks for connecting with us!', {});
  };

  render() {
    const {Export_value, view_data, week_data, job, job1} = this.state;
    return (
      <div>
        {view_data.value !== "Job wise" ?
          <div className="report-employer-search-card">
            <div className="item-align1">
              <div className="item-align1-inside">
                <FormControl style={{"width": "100%"}}>
                  <label className="search-card-label-text">View Data</label>
                  <NonCreatableSingleSelectDropdown
                    name={"view_data"}
                    id={"view_data"}
                    isSearchable={false}
                    defaultValue={view_data ? {value: view_data["key"], label: view_data["value"]} : ''}
                    getSelectedOption={(option) => this.setJobRole(option, "view_data")}
                    options={view_dropdown_data}
                    isClearable={false}
                    error={""}
                  />
                  {false && <FormHelperText style={{color: "#f0582b"}}>{""}</FormHelperText>}
                </FormControl>
              </div>
              <div className="item-align1-inside">
                <FormControl style={{"width": "100%"}}>
                  <label className="search-card-label-text">Week</label>
                  <NonCreatableSingleSelectDropdown
                    name={"week_data"}
                    id={"week_data"}
                    isSearchable={false}
                    defaultValue={week_data ? {value: week_data["key"], label: week_data["value"]} : ''}
                    getSelectedOption={(option) => this.setJobRole(option, "week_data")}
                    options={week_dropdown_data}
                    isClearable={false}
                    error={""}
                  />
                  {false && <FormHelperText style={{color: "#f0582b"}}>{""}</FormHelperText>}
                </FormControl>
              </div>
            </div>
            <div className="item-align2">
              <FormControl style={{"width": "100%"}}>
                <label className="search-card-label-text">Job</label>
                <NonCreatableSingleSelectDropdown
                  name={"job"}
                  id={"job"}
                  isSearchable={false}
                  defaultValue={view_data.value === "Week wise" ? {
                    value: job1["key"],
                    label: job1["value"]
                  } : {value: job["key"], label: job["value"]}}
                  getSelectedOption={(option) => this.setJobRole(option, "job")}
                  options={view_data.value === "Week wise" ? job_dropdown_data1 : job_dropdown_data}
                  isClearable={false}
                  error={""}
                />
                {false && <FormHelperText style={{color: "#f0582b"}}>{""}</FormHelperText>}
              </FormControl>
            </div>
            <div className="item-align3">
              <FormControl style={{"float": "right"}}>
                <RadioGroup aria-label="position" name="position" value={Export_value} onChange={this.handleChange} row>
                  <FormControlLabel
                    value="PDF"
                    control={<Radio/>}
                    label="PDF"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Excel"
                    control={<Radio/>}
                    label="Excel"
                    labelPlacement="end"
                  />
                </RadioGroup>
                <button className={"shenzyn-btn filled-primary-button"} onClick={this.ClickButton}> Export</button>
              </FormControl>
            </div>
          </div> :
          <div className="report-employer-search-card">
            <div className="item-align4">
              <div className="item-align4-inside1">
                <FormControl style={{"width": "100%"}}>
                  <label className="search-card-label-text">View Data</label>
                  <NonCreatableSingleSelectDropdown
                    name={"view_data"}
                    id={"view_data"}
                    isSearchable={false}
                    defaultValue={view_data ? {value: view_data["key"], label: view_data["value"]} : ''}
                    getSelectedOption={(option) => this.setJobRole(option, "view_data")}
                    options={view_dropdown_data}
                    isClearable={false}
                    error={""}
                  />
                  {false && <FormHelperText style={{color: "#f0582b"}}>{""}</FormHelperText>}
                </FormControl>
              </div>
              <div className="item-align4-inside2">
                <FormControl style={{"width": "100%"}}>
                  <label className="search-card-label-text">Job</label>
                  <NonCreatableSingleSelectDropdown
                    name={"job"}
                    id={"job"}
                    isSearchable={false}
                    defaultValue={view_data.value === "Week wise" ? {
                      value: job1["key"],
                      label: job1["value"]
                    } : {value: job["key"], label: job["value"]}}
                    getSelectedOption={(option) => this.setJobRole(option, "job")}
                    options={view_data.value === "Week wise" ? job_dropdown_data1 : job_dropdown_data}
                    isClearable={false}
                    error={""}
                  />
                  {false && <FormHelperText style={{color: "#f0582b"}}>{""}</FormHelperText>}
                </FormControl>
              </div>
            </div>
            <div className="item-align3">
              <FormControl>
                <RadioGroup aria-label="position" name="position" value={Export_value} onChange={this.handleChange} row>
                  <FormControlLabel
                    value="PDF"
                    control={<Radio/>}
                    label="PDF"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Excel"
                    control={<Radio/>}
                    label="Excel"
                    labelPlacement="end"
                  />
                </RadioGroup>
                <button className={"shenzyn-btn filled-primary-button"} onClick={this.ClickButton}> Export</button>
              </FormControl>
            </div>
          </div>
        }

      </div>

    );
  }
}

export default ReportEmployerSearchCard;
