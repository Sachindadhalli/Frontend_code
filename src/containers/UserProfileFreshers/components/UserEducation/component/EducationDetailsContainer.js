// import React, { Component } from 'react';
// import uuid from 'uuid/v4';
// import EducationBlock from './EducationBlock';
// import { apiCall, FilterAlreadySelectedOnes } from '../../../../../Utilities';
// import { withStyles } from '@material-ui/core/styles';

// class EducationDetailsContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       originalEducationFormFields: [],
//       filteredQualification: [],
//       educationList: [
//         {
//           qualification: '',
//           start_date: '',
//           com_date: '',
//           major: '',
//           university: '',
//           institute: '',
//           grading: '',
//           marks: '',
//           board: '',
//           passing_out: '',
//           medium: '',
//           total_marks: '',
//         },
//       ],
//     };
//   }

//   allFormsRefs = {};

//   setFilteredQualification = () => {
//     const result = FilterAlreadySelectedOnes(
//       this.state.educationList,
//       this.state.originalEducationFormFields,
//       'qualification',
//     );
//     this.setState({
//       filteredQualification: result,
//     });
//   };
//   render() {
//     const { classes } = this.props;

//     const { educationList, checkForErrors, filteredQualification } = this.state;
//     return (
//       <div>
//         {this.state.educationList.map((educationItem, key) => (
//           <EducationBlock
//             onRef={ref => (this.allFormsRefs[key] = ref)}
//             educationFormFields={educationItem}
//             key={uuid()}
//             indexKey={key}
//             //checkForErrors={checkForErrors}
//             // onChange={data => {
//             //   this.changeQualificationData(data, key);
//             // }}
//             // checkedForErrors={error => {
//             //   this.errorsInForms[key] = error;
//             // }}
//             // removeQualification={this.removeQualification}
//             filteredQualification={filteredQualification}
//             setFilteredQualification={this.setFilteredQualification}
//           />
//         ))}
//       </div>
//     );
//   }
// }
// export default EducationDetailsContainer;

import React, { Component } from 'react';
import uuid from 'uuid/v4';
import EducationBlock from './EducationBlock';
import { apiCall, FilterAlreadySelectedOnes, handleLocalStorage } from '../../../../../Utilities';
import { withStyles } from '@material-ui/core/styles';
import { USER_PROFILE_EDUCATION } from '../../../../../../config/constants';
class EducationDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalEducationFormFields: [],
      filteredQualification: [],
      educationList: [
        {
          qualification: { key: 1, value: 'Graduation/Diploma' },
          start_date: '',
          com_date: '',
          major: '',
          university: '',
          institute: '',
          grading: '',
          marks: '',
          board: '',
          passing_out: '',
          medium: '',
          total_marks: '',
        },
      ],
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  // componentWillUnmount() {
  //   this.props.onRef(null);
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.props.onRef(this);
  // }

  allFormsRefs = {};

  setFilteredQualification = () => {
    const result = FilterAlreadySelectedOnes(
      this.state.educationList,
      this.state.originalEducationFormFields,
      'qualification',
    );
    this.setState({
      filteredQualification: result,
    });
  };
  checkForErrors() {
    console.log('container');
    let canSubmit = true;
    for (let child in this.allFormsRefs) {
      //debugger;
      if (this.allFormsRefs[child]) {
        let isItInvalid = this.allFormsRefs[child].checkForErrors();
        if (isItInvalid) canSubmit = false;
      }
    }
    // debugger;
    if (!canSubmit) {
      debugger;
      return;
    }
    //Integration
    let dataTobesend = {};
    let finalEducationList = [];
    for (let value of this.state.educationList) {
      let finalEducation = {};
      finalEducation.qualification = value.qualification.key;
      finalEducation.major = value.major.key || '';
      finalEducation.university = value.university.key || '';
      finalEducation.institute = value.institute.key || '';
      finalEducation.grading_system = value.grading.key || '';
      finalEducation.start_date = this.setdateFormat(value.start_date) || '';
      finalEducation.end_date = this.setdateFormat(value.com_date) || '';
      finalEducation.board = value.board || '';
      finalEducation.passed_year = value.passing_out || '';
      finalEducation.medium = value.medium || '';
      finalEducationList.push(finalEducation);
    }
    debugger;
    const token = handleLocalStorage('get', 'employeeLogin'); //token :to get the authorization
    const headers = {
      //header why
      authorization: token,
      'Content-Type': 'application/json',
    };
    //post call
    apiCall('post', finalEducationList, USER_PROFILE_EDUCATION, headers)
      .then(res => {
        if (res.status) {
          this.props.history.push({
            pathname: '/success-page',
          });
        } else {
          //console.log("Not uploaeded")
        }
      })
      .catch(e => {
        //console.log(e)
      });
  }
  setdateFormat(date) {
    return (
      new Date(date).getFullYear() +
      '-' +
      new Date(date).getMonth() +
      '-' +
      new Date(date).getDate()
    );
  }
  render() {
    const { classes } = this.props;

    const { educationList, checkForErrors, filteredQualification } = this.state;
    return (
      <div>
        {this.state.educationList.map((educationItem, key) => (
          <EducationBlock
            onRef={ref => (this.allFormsRefs[key] = ref)}
            educationFormFields={educationItem}
            key={uuid()}
            indexKey={key}
            //checkForErrors={checkForErrors}
            // onChange={data => {
            //   this.changeQualificationData(data, key);
            // }}
            // checkedForErrors={error => {
            //   this.errorsInForms[key] = error;
            // }}
            // removeQualification={this.removeQualification}
            filteredQualification={filteredQualification}
            setFilteredQualification={this.setFilteredQualification}
          />
        ))}
      </div>
    );
  }
}
export default EducationDetailsContainer;
