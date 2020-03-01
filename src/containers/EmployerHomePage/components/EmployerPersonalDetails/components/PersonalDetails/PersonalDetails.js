import React, { Component } from 'react';
import './style.scss'
import PersonalDetailEdit from './components/PersonalDetailEdit'
import PersonalDetailPreview from './components/PersonalDetailPreview';

class  PersonalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_view_mode: true
        }
    }

  /**
   * on click of edit button, changing the view
   */
    changeViewMode = () => {
        this.setState({
            is_view_mode: !this.state.is_view_mode
        })
    };

    render() {
        const {is_view_mode} = this.state;
        const {basic_details, toast} = this.props;
        return (
            <div className="personal-details pt-sm-32 pb-sm-44 px-sm-44 pt-16 pb-24 px-20">
                {is_view_mode ? 
                <PersonalDetailPreview onclick={this.changeViewMode} basic_details={basic_details} toast={toast}/> 
                : 
                <PersonalDetailEdit onclick={this.changeViewMode} basic_details={basic_details} toast={toast} />}
             </div>   
        );
    }
}

export default PersonalDetails
