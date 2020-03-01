import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CollapsibleComponent from '../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../../components/ReusableComponents/IconValueComponent';
import Location from '../../../../../../assets/media/icons/location.svg';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import LanguageComponent from '../../../../../components/ReusableComponents/LanguageComponent';

class PersonalDetailsView extends React.Component {
  render() {
    const { classes, personal_details } = this.props;
    //console.log(personal_details, this.props)
    return (
      <div className="label-value-body">
        <div className="align-in-collapse">
          <div style={{ paddingBottom: '24px' }}>
            <IconValueComponent
              iconName={Location}
              text={personal_details.address ? personal_details.address : '-'}
            />
          </div>
          <div>
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent
                  label="Date of Birth"
                  value={personal_details.birth_date ? personal_details.birth_date : '-'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent
                  label="Gender"
                  value={personal_details.gender ? personal_details.gender : '-'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent
                  label="Marital Status"
                  value={
                    personal_details.marital_status !== null
                      ? personal_details.marital_status
                        ? 'Married'
                        : 'Single'
                      : '-'
                  }
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent
                  label="Permanent Residency For"
                  value={
                    personal_details.permanent_residency
                      ? personal_details.permanent_residency
                      : '-'
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent
                  label="Category"
                  value={personal_details.category ? personal_details.category : '-'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent
                  label="Differently Abled"
                  value={
                    personal_details.differently_abled !== null
                      ? personal_details.differently_abled
                        ? 'Yes'
                        : 'No'
                      : '-'
                  }
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={16}>
              <Grid item xs={12} md={12}>
                {personal_details.language && personal_details.language.length != 0 && false ? (
                  <LanguageComponent value={personal_details.language} />
                ) : (
                  <LanguageComponent
                    value={[
                      {
                        language: 'English', // name of language
                        read: true,
                        write: false,
                        speak: true,
                      },
                      {
                        language: 'Hindi', // name of language
                        read: true,
                        write: true,
                        speak: true,
                      },
                    ]}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
export default PersonalDetailsView;
