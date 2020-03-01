//library dependencies
import React, {Component} from 'react'
import {Checkbox, FormControl, FormControlLabel, Input, InputLabel, Select, withStyles} from '@material-ui/core';

//style
import './style.scss';

//utilities
import {customIndexOf, commaSeperated} from '../../Utilities/';

//custom component
import customisedMaterial from '../../styles/customisedMaterial';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

//customised material ui select component
const MenuProps = {
  PaperProps: {
    style: {maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250, marginTop: 50,},
  },
};
//customised material ui style
const styles = theme => ({
  ...customisedMaterial,
  label: {fontSize: '20px', fontWeight: '500'},
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  label2: {fontSize: '16px'},
  icon: {height: '39px', width: '38px', color: '#b1b1b1', top: '-5px', right: '-4px'},
});

class SelectSpecialization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.specialisationData,
      menu_data: this.props.dataSource,
      open: false,
      value: [
        {is_parent: 'any', parent_key: 4, key: 1, value: 'Any developer'}
      ],
      total_data: [
        {parent_key: 4, key: 0, is_parent: 'any', value: "Any ICWA"},
        {parent_key: 5, key: 0, is_parent: 'any', value: "Any Company Secretary (C.S.)"},
        {parent_key: 10, key: 0, is_parent: 'any', value: "Any Master of Commerce (M.Com.)"},
        {is_parent: 'parent', parent_key: 4, key: 4, value: "ICWA"},
        {is_parent: 'child', parent_key: 4, key: 155, value: "ICWA"},
        {is_parent: 'child', parent_key: 4, key: 156, value: "Other"},
        {is_parent: 'parent', parent_key: 5, key: 5, value: "Company Secretary (C.S.)"},
        {is_parent: 'child', parent_key: 5, key: 153, value: "CS"},
        {is_parent: 'child', parent_key: 5, key: 154, value: "Other"},
        {is_parent: 'parent', parent_key: 10, key: 10, value: "Master of Commerce (M.Com.)"},
        {is_parent: 'child', parent_key: 10, key: 184, value: "Commerce"},
        {is_parent: 'child', parent_key: 10, key: 185, value: "Other"},


      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    //on change in value,receiving value in props
    this.setState({
      name: nextProps.specialisationData,
      menu_data: nextProps.dataSource
    })
  }

  /**
   * On click of checkbox in Drop Down options,updating selected value in state
   * @param e
   * @param data
   */
  onCheckboxChange = (e, data) => {
    const menu_data = this.state.menu_data;
    let selectedValues = this.state.name && JSON.parse(JSON.stringify(this.state.name)) || [];
    if (e.target.checked) {
      if (data.is_parent === 'any') {
        menu_data.filter(value => {
          if (data.parent_key === value.parent_key)
            selectedValues.push(value)
        })
      } else {
        selectedValues.push(data);
      }
    }
    else {
      let previousSelected = this.state.name;
      if (data.is_parent == 'any') {
        const newUnselectedValue = [];
        previousSelected.map((value, index) => {
          if (!(data.parent_key === value.parent_key)) {
            newUnselectedValue.push(value);
          }
        })
        selectedValues = newUnselectedValue;
      }
      else {
        const newUnselectedValue = [];
        previousSelected.map((value, index) => {
          if (!(data.key === value.key) && value.is_parent == 'child') {
            newUnselectedValue.push(value);
          }
        });
        selectedValues = newUnselectedValue;
      }
    }
    const {name, onChange} = this.props;
    onChange(name, selectedValues)
  };

  /**
   * @function using to get a unique array
   * @param arr
   * @param comp
   * @returns {*}
   */
  getUnique = (arr, comp) => {
    const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
    return unique;
  };
  /**
   * @function using to remove the selected value which is not required
   * @param value
   * @returns {*}
   */
  removeUnwantedData = (value) => {
    let new_array = value;
    let filter_any = value.filter(values => values.is_parent === "any")
    let parent_arry = this.getUnique(filter_any, 'parent_key');
    parent_arry.map((values, index) => {
      new_array = new_array.filter(val => val.parent_key !== values.parent_key)
    });
    new_array = new_array.filter(val => val.is_parent !== "any")
    parent_arry.forEach(data => {
      new_array.push(data);
    });
    return new_array
  };

  render() {
    const {classes, label, showError, disable} = this.props;
    const dummyData = this.state.menu_data
    return (
      <div className="specialization">
        <FormControl
          className="half_form_specialisation"
          error={showError != ""}
        >
          <InputLabel shrink
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
          >{label}</InputLabel>
          <Select
            multiple
            displayEmpty={false}
            disabled={disable}
            value={this.state.name}
            input={<Input id="select-multiple-checkbox"/>}
            renderValue={selected => commaSeperated(this.removeUnwantedData(this.state.name))}
            MenuProps={MenuProps}
            classes={{icon: classes.icon}}
          >

            {
              dummyData && dummyData.map((data, index_here) => {
                if (data.is_parent === 'parent') {
                  return (<div style={{
                    padding: '10px',
                    borderBottom: 'solid 1.2px #dbdbdb',
                    opacity: '0.4',
                    width: '100%'
                  }}>{data.value}</div>);
                }
                else {
                  return (<FormControl style={{display: 'block', marginLeft: '20px'}}>
                    <FormControlLabel
                      label={data.value}
                      key={index_here}
                      control={
                        <Checkbox
                          checked={customIndexOf(this.state.name, data) > -1}
                          onChange={(e) => this.onCheckboxChange(e, data)}/>
                      }>
                    </FormControlLabel>
                  </FormControl>);

                }

              })}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(SelectSpecialization);
