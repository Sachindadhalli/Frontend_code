//library dependency
import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SingleSelectDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {age: "", open: false}
  }

  /**
   * this function used to save values in state variable
   * @param event
   */
  handleChange = event => {
    this.setState({"age": event.target.value});
    this.props.selectedData(event.target.value, this.props.data.title)
  };

  /**
   * this function  used to close dropdown using assigning false to open in state
   */
  handleClose = () => this.setState({"open": false});

  /**
   * this function used to open dropdown using assigning true to open in state
   */
  handleOpen = () => this.setState({"open": true});

  render() {
    const {open, age} = this.state;
    return (
      <div style={{width: "100%"}}>
        <FormControl style={{display: "flex"}}>
          <lable
            style={{"font-size": "14px", "font-family": "Roboto", "color": "#656565"}}>{this.props.data.title}</lable>
          <Select
            open={open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'demo-controlled-open-select',
            }}
          >
            {this.props.data.values.map((data, index) => {
              return <MenuItem value={data} key={index}> {data}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default SingleSelectDropDown;
