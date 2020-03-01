import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import deleteIcon from '../../../../../../assets/media/icons/deleteIcon.svg';
import Grid from '@material-ui/core/Grid';


class EmploymentView extends React.Component {
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
        const { classes } = this.props;
        return (
            <div className={'basic-emp-container'}>

                <div className="fres-internship">Internship </div>
                <div className="internship-box">
                    <Grid container >
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="Junior Developer" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} className="row-padding">
                            <div>
                                <CustomTag text="5 months" className="field-heading" />
                            </div>
                            <div />
                            <CustomIcon
                                style={{ marginTop: '-20px' }}
                                icon={deleteIcon}
                                className="delete-icon"
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="Associate Tester" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} className="row-padding">
                            <div>
                                <CustomTag text="3 months" className="field-heading" />
                            </div>
                            <div />
                            <CustomIcon
                                style={{ marginTop: '-20px' }}
                                icon={deleteIcon}
                                className="delete-icon"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="fres-internship">Training </div>
                <div className="internship-box">
                    <Grid container>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="Summer Internship" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} className="row-padding">
                            <div>
                                <CustomTag text="5 months" className="field-heading" />
                            </div>
                            <div />
                            <CustomIcon
                                style={{ marginTop: '-20px' }}
                                icon={deleteIcon}
                                className="delete-icon"
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="Associate Tester" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} className="row-padding">
                            <div>
                                <CustomTag text="3 months" className="field-heading" />
                            </div>
                            <div />
                            <CustomIcon
                                style={{ marginTop: '-20px' }}
                                icon={deleteIcon}
                                className="delete-icon"
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default EmploymentView;