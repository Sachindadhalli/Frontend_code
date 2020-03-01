//library dependency
import React, {Component} from 'react';

//custom components
import CollapsibleComponentWithEditSaveAndAdd
  from '../../../../components/ReusableComponents/CollapsibleComponentWithEditSaveAndAdd';
import EditProjects from "./EditProjects";
import ViewProjects from "./ViewProjects";

//styles
import './styles.scss';

//utilities

//icons


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false}
  }

  /**
   * add more button click event from collapsible component
   * whenever user click add more button, this event capture here from props
   */
  addMoreClickEvent = () => {
    console.log('addMoreClickEvent')
  };
  /**
   * cancel button click event from collapsible component
   * whenever user click cancel button, this event capture here from props
   */
  cancelClickEvent = () => {
    this.setState({edit: false});
    console.log('cancelClickEvent')
  };
  /**
   * save button click event from collapsible component
   * whenever user click save button, this event capture here from props
   */
  saveClickEvent = () => {
    this.setState({edit: false});
    console.log('saveClickEvent')
  };
  /**
   * edit button click event from collapsible component
   * whenever user click edit button, this event capture here from props
   */
  editClickEvent = () => {
    this.setState({edit: true});
    console.log('editClickEvent')
  };


  render() {
    const {edit} = this.state;
    return (
      <div>
        <CollapsibleComponentWithEditSaveAndAdd
          collapsibleTitle='Projects'
          isEditable={edit}
          addMore={true}
          addMoreClickEvent={() => this.addMoreClickEvent()}
          editClickEvent={() => this.editClickEvent()}
          saveClickEvent={() => this.saveClickEvent()}
          cancelClickEvent={() => this.cancelClickEvent()}
        >
          {edit ? <EditProjects/> : <ViewProjects/>}
        </CollapsibleComponentWithEditSaveAndAdd>
      </div>
    );
  }
}

export default Projects;
