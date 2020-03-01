import React, {Component} from 'react';
import './style.scss'
import ContactDetailsEdit from './components/ContactDetailsEdit';
import ContactDetailsPreview from './components/ContactDetailsPreview';

class ContactDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_view_mode: true,
    }
  }

  /**
   * on click of Edit button ,changing the view
   */
  changeViewMode = () => {
    this.setState({
      is_view_mode: !this.state.is_view_mode
    })
  };

  render() {
    const {contact_details} = this.props;
    return (
      <div className="contact-details  pt-sm-32 pb-sm-44 px-sm-44 pt-16 pb-24 px-20">
        {this.state.is_view_mode ?
          <ContactDetailsPreview onclick={this.changeViewMode} contact_details={contact_details}/>
          :
          <ContactDetailsEdit onclick={this.changeViewMode} contact_details={contact_details}/>
        }
      </div>
    );
  }
}


export default ContactDetails;
