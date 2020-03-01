import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './style.scss';
import LabelValueComponent from '../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponent from '../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import ExperiencedBasicDetailsView from '../../UserProfileExperienced/components/ExperiencedBasicDetails/components/ExperiencedBasicDetailsView';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class UserBasicDetailsViewExperienced extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { basic_profile, fresher_experienced } = this.props;
        return (
            // <div className={'basic-user-view-container'}>
            //   <div className="save-details-header">
            //     <div className="save-discard">
            //       <CustomTag
            //         text="Edit"
            //         onClick={this.createItem}
            //         className="save"
            //         onclick={this.props.onclick}
            //       />
            //     </div>
            //     <div className="save-emp-details">
            //       <img src={dropdown} />
            //       <CustomTag text="Basic Details" className="save-basic-details" />
            //     </div>
            //   </div>
            //   <div className="hr-line" />
            //   <div className="first">
            //     <div className="second">
            //       <FormControl>
            //         <CustomTag text="Experience" className="exp" />
            //         <InputLabel> Fresher </InputLabel>
            //       </FormControl>
            //       <FormControl>
            //         <CustomTag text="Mobile Number" className="exp" />
            //         <InputLabel> 99999999 </InputLabel>
            //       </FormControl>
            //     </div>
            //   </div>
            // </div>
            <CollapsibleComponentUserProfile collapsibleTitle="Basic Details">
                <ExperiencedBasicDetailsView {...{
                    classes,
                    year,
                    month,
                    dropdown,

                }} />
            </CollapsibleComponentUserProfile >
        );
    }
}

export default UserBasicDetailsViewExperienced;
