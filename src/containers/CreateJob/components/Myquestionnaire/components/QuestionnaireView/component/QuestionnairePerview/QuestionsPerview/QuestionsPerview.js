// library dependencies
import React, {Component} from 'react';
import './style.scss';
import {Typography, TextField, FormControlLabel, Checkbox, Radio, withStyles} from '@material-ui/core';

// material ui style customizations
const styles = theme => ({
  root: {height: '19px', fontFamily: 'Roboto', fontSize: '16px', color: '#212121', marginTop: '-5px'},
});

class QuestionsPerview extends Component {

  /**
   * To control the view according to question Type and options
   * @param type
   * @param option
   * @param classes
   * @return a view according to question type
   */
  handleOption = (type, option, classes) => {
    switch (type) {
      case 'TextField':
        return (<TextField
          disabled={true}
        />);
      case 'CheckboxField':
        return (<div className="option-container">{
            option.map((value) => (
              <div className="option-content">
                <FormControlLabel
                  control={
                    <Checkbox
                      name={value}
                      defaultChecked={false}
                      disabled={true}
                      value={value}
                    />
                  }
                  label={<Typography className={classes.root}>{value}</Typography>}

                />
              </div>
            ))
          }
          </div>
        );
      case 'RadioField':
        return (<div className="option-container">{
            option.map((value) => (<div className="option-content">
                <FormControlLabel
                  control={
                    <Radio
                      defaultChecked={false}
                      disabled={true}
                      name={value}
                      // classes={{ root: classes.root }}
                    />
                  }
                  label={<Typography className={classes.root}>{value}</Typography>}
                  className={classes.checkbox}
                />
              </div>
            ))
          }
          </div>
        );
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <div className="my-questions-perview">
        <div className="question-name">{this.props.data.question}</div>
        {this.handleOption(this.props.data.type, this.props.data.options, classes)}
      </div>
    )
  }
}

export default withStyles(styles)(QuestionsPerview);
