//library dependency
import React, { Component } from 'react';
import uuid from 'uuid/v4';

//custom components
import CollapsibleComponentWithEditSaveAndAdd from '../../../../components/ReusableComponents/CollapsibleComponentWithEditSaveAndAdd';
import EditEducation from "./EditEducation";
import ViewEducation from "./ViewEducation";

//styles
import './styles.scss';

//utilities
import { apiCall, FilterAlreadySelectedOnes, handleLocalStorage } from "../../../../Utilities";
import { EMPLOYEE_EDUCATION_DETAILS } from "../../../../../config/constants";

//icons



class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit:false,
      qualification_list:[{
          qualification: { value: 'Graduation/Diploma', key: 1 } ,
          major: '',
          specialization: '',
          gradingsystem: '',
          institute: '',
          university: '',
          startdate: '',
          enddate: '',
          marks: '',
          board: '',
          medium: '',
          passoutyear: '',
          is_edit:true
      }],
      filtered_qualification:[],
      original_qualification:[],
    }
  }

  setFilteredQualification = () => {
    const result = FilterAlreadySelectedOnes(this.state.qualification_list,this.state.original_qualification,'qualification');
    this.setState({ filtered_qualification: result })
  };

  componentWillMount(){
    const token = handleLocalStorage('get', 'employerLogin');
    this.headers = {
      'authorization': token,
      'Content-Type': 'application/json',
    };
    apiCall('get', {"format":"json"}, EMPLOYEE_EDUCATION_DETAILS, this.headers).then(response => {
      this.setState(
        {
          filtered_qualification : response.data,
          original_qualification : response.data
        },
        () => {
          this.setFilteredQualification()
        },
      );
    });
  }

  addNewQualification = () => {
    const qualification_list = [...this.state.qualification_list];
    if(qualification_list.length >= 6) return 0;
    qualification_list.push({
      qualification: this.state.filtered_qualification[0],
      major: '',
      specialization: '',
      gradingsystem: '',
      institute: '',
      university: '',
      startdate: '',
      enddate: '',
      marks: '',
      board: '',
      medium: '',
      passoutyear: '',
      is_edit: true
    });
    this.setState({ qualification_list }, () => { this.setFilteredQualification(); });
  };

  updateQualificationData = (data, key) => {
    const qualification = [...this.state.qualification_list];
    qualification.splice(key, 1, data);
    this.setState({ qualification_list: qualification });
  };

  removeQualification = (key) => {
    if (this.state.qualification_list.length >= 2) {
      const qualification_list = [...this.state.qualification_list];
      qualification_list.splice(key, 1);
      this.setState({ qualification_list }, () => { this.setFilteredQualification(); });
    }
  };

  changeQualificationMode=(mode, index)=>{
    const { qualification_list }=this.state;
    qualification_list[index].is_edit=mode;
    this.setState({qualification_list})
  };

  renderQualificationBlock=(qualification, index)=>{
    if(qualification.is_edit){
      return(
        <EditEducation
          qualification={qualification}
          key={uuid()}
          indexKey={index}
          filteredQualification = {this.state.filtered_qualification}
          setFilteredQualification={this.setFilteredQualification}
          changeQualificationMode={()=>this.changeQualificationMode(false, index)}
        />)
    }else{
      return(
        <ViewEducation
          qualification={qualification}
          key={uuid()}
        />)
    }
  };

  /**
   * add more button click event from collapsible component
   * whenever user click add more button, this event capture here from props
   */
  addMoreClickEvent=()=>{
    console.log('addMoreClickEvent')
  };
  /**
   * cancel button click event from collapsible component
   * whenever user click cancel button, this event capture here from props
   */
  cancelClickEvent=()=>{
    this.setState({edit:false});
    console.log('cancelClickEvent')
  };
  /**
   * save button click event from collapsible component
   * whenever user click save button, this event capture here from props
   */
  saveClickEvent=()=>{
    this.setState({edit:false});
    console.log('saveClickEvent')
  };
  /**
   * edit button click event from collapsible component
   * whenever user click edit button, this event capture here from props
   */
  editClickEvent=()=>{
    this.setState({edit:true});
    console.log('editClickEvent')
  };

  render() {
    const { qualification_list } = this.state;
    return (
      <div>
        <CollapsibleComponentWithEditSaveAndAdd
          collapsibleTitle='Education'
          isEditable={true}
          addMore={true}
          addMoreClickEvent={()=>this.addNewQualification()}
          editClickEvent={()=>this.editClickEvent()}
          saveClickEvent={()=>this.saveClickEvent()}
          cancelClickEvent={()=>this.cancelClickEvent()}
        >
          {
            qualification_list.map((qualification, key) => this.renderQualificationBlock(qualification, key))
          }
        </CollapsibleComponentWithEditSaveAndAdd>
      </div>
    );
  }
}

export default Education;
