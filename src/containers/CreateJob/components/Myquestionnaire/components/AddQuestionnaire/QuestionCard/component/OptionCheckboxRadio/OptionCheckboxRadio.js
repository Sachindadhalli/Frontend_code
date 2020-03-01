//library dependencies
import React, {Component} from 'react';
import {FormControl, FormControlLabel, Radio, Checkbox, Input, InputAdornment, FormHelperText} from '@material-ui/core';

//style
import './style.scss';

//custom component
import CustomIcon from '../../../../../../../../../components/CustomIcon/CustomIcon';
import DeleteIcon from '../../../../../../../../../../assets/media/icons/deleteIcon.svg';

class OptionCheckboxRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * According to option ,changing the option type
   *
   * @param: type,option,props
   * @return: a view according to selected option
   * */
  addOption = (type, option, props) => {
    const {option_error0, option_error1, option_error2, option_error3, option_error4} = props;
    switch (type) {
      case 'Textbox':
        return (
          <div></div>
        );
      case 'Checkbox':
        return (
          <div className="option-grid">
            {option.map((value, index) => (
              <div className="option-item">
                <FormControl style={{marginTop: '-7px'}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={index}
                        name={value}
                        defaultChecked={false}
                        disabled={true}
                        value={value}
                      />
                    }
                  />
                </FormControl>

                <FormControl style={{marginLeft: '-20px'}}>
                  <Input
                    id={`option${index}`}
                    name={`option${index}`}
                    endAdornment={
                      <InputAdornment position="end">
                        <CustomIcon
                          iconStyle="delete-icon-style-pointer"
                          icon={DeleteIcon}
                          onclick={() => {
                            this.props.deleteOption(index);
                          }}
                        />
                      </InputAdornment>
                    }
                    onChange={e => this.props.inputChange(e, index)}
                    onBlur={e => this.props.inputChange(e, index)}
                    value={value}
                    error={index === 0 ? option_error0 : index === 1 ? option_error1 : index === 2 ?
                      option_error2 : index === 3 ? option_error3 : index === 4 ? option_error4 : ""}
                  />
                  {index === 0 ? (
                    <FormHelperText error={option_error0 !== ''} id="option_error0">
                      <span className="field_error"> {option_error0}</span>
                    </FormHelperText>

                  ) : index === 1 ? (
                    <FormHelperText error={option_error1 !== ''} id="option_error1">
                      <span className="field_error"> {option_error1}</span>
                    </FormHelperText>

                  ) : index === 2 ? (
                    <FormHelperText error={option_error2 !== ''} id="option_error2">
                      <span className="field_error"> {option_error2}</span>
                    </FormHelperText>

                  ) : index === 3 ? (
                    <FormHelperText error={option_error3 !== ''} id="option_error3">
                      <span className="field_error"> {option_error3}</span>
                    </FormHelperText>

                  ) : index === 4 ? (
                    <FormHelperText error={option_error4 !== ''} id="option_error4">
                      <span className="field_error"> {option_error4}</span>
                    </FormHelperText>

                  ) : (
                    <div/>
                  )}
                </FormControl>
              </div>
            ))}
            {this.props.addOptionDisabled ? null : (
              <div
                className="add-another-option "
                onClick={() => {
                  this.props.addAnotherOption();
                }}
              >
                + Add another option
              </div>
            )}
          </div>
        );

      case 'Radio button':
        return (
          <div className="option-grid">
            {option.map((value, index) => (
              <div className="option-item">
                <FormControl style={{marginTop: '-7px'}}>
                  <FormControlLabel
                    control={
                      <Radio
                        id={index}
                        defaultChecked={false}
                        disabled={true}
                        name={value}
                        // classes={{ root: classes.root }}
                      />
                    }
                  />
                </FormControl>

                <FormControl style={{marginLeft: '-20px'}}>
                  <Input
                    id={`Option${index}`}
                    name={`Option${index}`}
                    endAdornment={
                      <InputAdornment position="end">
                        <CustomIcon
                          icon={DeleteIcon}
                          iconStyle="delete-icon-style-pointer"
                          onclick={() => {
                            this.props.deleteOption(index);
                          }}
                        />
                      </InputAdornment>
                    }
                    onChange={e => this.props.inputChange(e, index)}
                    onBlur={e => this.props.inputChange(e, index)}
                    value={value}
                    error={index === 0 ? option_error0 : index === 1 ? option_error1 : index === 2 ?
                      option_error2 : index === 3 ? option_error3 : index === 4 ? option_error4 : ""}
                  />
                  {index === 0 ? (
                    <FormHelperText error={option_error0 !== ''} id="option_error0">
                      <span className="field_error"> {option_error0}</span>
                    </FormHelperText>

                  ) : index === 1 ? (
                    <FormHelperText error={option_error1 !== ''} id="option_error1">
                      <span className="field_error"> {option_error1}</span>
                    </FormHelperText>

                  ) : index === 2 ? (
                    <FormHelperText error={option_error2 !== ''} id="option_error2">
                      <span className="field_error"> {option_error2}</span>
                    </FormHelperText>

                  ) : index === 3 ? (
                    <FormHelperText error={option_error3 !== ''} id="option_error3">
                      <span className="field_error"> {option_error3}</span>
                    </FormHelperText>

                  ) : index === 4 ? (
                    <FormHelperText error={option_error4 !== ''} id="option_error4">
                      <span className="field_error"> {option_error4}</span>
                    </FormHelperText>

                  ) : (
                    <div/>
                  )}
                </FormControl>
              </div>
            ))}

            {this.props.addOptionDisabled ? null : (
              <div
                className="add-another-option "
                onClick={() => {
                  this.props.addAnotherOption();
                }}
              >
                {' '}
                + Add another option{' '}
              </div>
            )}
          </div>
        );
    }
  };

  render() {
    return <div
      className="Option-radio-checkbox-txt">{this.addOption(this.props.type, this.props.options, this.props)}</div>;
  }
}

export default OptionCheckboxRadio;
