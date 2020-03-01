//library dependencies
import React from "react";
import Picky from "react-picky";

//styles
import "react-picky/dist/picky.css";
import "./style.scss";

//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';

class CheckboxMultiSelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: props.hasOwnProperty('defaultValue') && props.defaultValue ? props.defaultValue : [],
      dropdownOptions: []
    };
  }

  /**
   * on change in search field,filter the result
   * @param inputValue
   * @returns {Promise<void>}
   */
  onFilterChange = async (inputValue) => {
    if (this.props.hasOwnProperty('apiUrl')) {
      const headers = {
        authorization: handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
      };
      try {
        const queryParams = this.props.queryParams;
        queryParams.search = inputValue;
        const responseData = await apiCall('get', queryParams, this.props.apiUrl, headers);
        this.setState({dropdownOptions: responseData.data});
      } catch (e) {
      }
    } else {
      try {
        const filtered = this.props.options.filter((s) => s.value.toLowerCase().includes(inputValue.toLowerCase()));
        this.setState({dropdownOptions: filtered});
      } catch (e) {
      }
    }
  };

  componentWillMount() {
    this.onFilterChange('');
  }

  /**
   * @function used to select multiple values,updating the state and call back to parent
   * @param value
   */
  selectMultipleOption = (value) => {
    this.setState({arrayValue: value});
    this.props.onMultiOptionsChange(value);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      arrayValue: nextProps.hasOwnProperty('defaultValue') ? nextProps.defaultValue : []
    });
  }

  render() {
    return (
      <div>
        <Picky
          value={this.state.arrayValue}
          options={this.state.dropdownOptions}
          onChange={this.selectMultipleOption}
          filterDebounce={200}
          valueKey="key"
          labelKey="value"
          placeholder={""}
          multiple={true}
          className={this.props.hasOwnProperty('error') && this.props.error ? "picky-dropdown-wrapper picky-dropdown-wrapper-error" : "picky-dropdown-wrapper"}
          includeSelectAll={true}
          filterPlaceholder={"Search here"}
          getFilterValue={this.onFilterChange}
          includeFilter={true}
          numberDisplayed={this.props.hasOwnProperty('numberDisplayed') && this.props.numberDisplayed}
        />
      </div>
    );
  }
}

export default CheckboxMultiSelectDropdown;
