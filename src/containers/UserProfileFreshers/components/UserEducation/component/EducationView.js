import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import { withRouter } from 'react-router-dom';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import { CURRENCY } from '../../../../../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
import deleteIcon from '../../../../../../assets/media/icons/deleteIcon.svg';
import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import IconValueComponent from '../../../../../components/ReusableComponents/IconValueComponent/IconValueComponent';
import clock from '../../../../../../assets/media/icons/clock.svg';
import Moment from 'react-moment';

class EducationView extends React.Component {
    state = {
        desired_profile: [],
    };
    render() {
        const {
            rightHalf,
            year,
            month,
            dropdown,
            leftHalf,
            fullWidth,
            allDropDownWidth,
        } = this.props;
        const { year1, month1 } = this.state;
        const { education, classes } = this.props;
        console.log(education);
        return (
            <div className="main-div-experienced">
                <div>
                    {education && education.map((values, index) => {
                        return (
                            <div className="experiance-Education">
                                {values.qualification === '12' ? (
                                    <div className="higher-education">
                                        <Grid container spacing={16}>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent
                                                    label="Qualification"
                                                    value={
                                                        values.qualification + ' ( ' + values.board + values.end_date + ' )'
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent
                                                    label="Total Marks"
                                                    value={values.marks + '/' + '600'}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent label="Medium" value={values.medium} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : values.qualification === '10' ? (
                                    <div className="secondary-education">
                                        <Grid container spacing={16}>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent
                                                    label="Qualification"
                                                    value={'Below ' + values.qualification}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : (
                                            <div className="degree-education">
                                                <Grid container spacing={16}>
                                                    <Grid item xs={12} md={5}>
                                                        <LabelValueComponent
                                                            label="Qualification"
                                                            value={values.qualification ? values.qualification : '-'}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                        <LabelValueComponent
                                                            value={values.institute + ' ( ' + values.university + ')'}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item xs={12} md={5}>
                                                        <IconValueComponent
                                                            iconName={clock}
                                                            text={
                                                                <div>
                                                                    <Moment format="MMM YYYY">{new Date(values.start_date)}</Moment>
                                                                    {' - '}
                                                                    <Moment format="MMM YYYY">{new Date(values.end_date)}</Moment>
                                                                </div>
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                        <LabelValueComponent
                                                            type={'OnlyText'}
                                                            value={'CGPA : ' + values.marks}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )}
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
export default EducationView;