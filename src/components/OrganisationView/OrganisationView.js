//library dependencies
import React, { Component } from 'react';

//style
import './style.scss';

//icons
import edit from '../../../assets/media/icons/edit.svg';
import deleteicon from '../../../assets/media/icons/deleteIcon.svg';

//custom components
import CustomIcon from './../CustomIcon/CustomIcon';
 
export default class OrganisationView extends Component{
        render(){
        return(
            <div className="Organisation-container">
               <div className="heading">
                
                company
                
                <div className="icons">
                    <div> <CustomIcon icon={edit} style={{ cursor: 'pointer',paddingRight:'24px' }} ></CustomIcon></div>
                    <div><CustomIcon icon={deleteicon} style={{ cursor: 'pointer',paddingRight:'24px' }} ></CustomIcon></div>
              </div>
              </div>
             <div className="content">
                    company detailsasjhjfkhjkasfhjhasfjhjasfhjkhadjhadvjkhadjkh
                    afshjasfhasfuihuihuafhdsuifh
                    asfjasiojasojofajsiofj
            </div>
            <div className="footer">
               <label>websiteName</label> 
            </div>
         </div>  
       );
    }
}
