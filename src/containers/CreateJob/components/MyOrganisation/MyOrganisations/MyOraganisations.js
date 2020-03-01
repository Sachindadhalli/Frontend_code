// library dependencies
import React, { Component } from 'react';

//custom component
import CustomComponents from '../../../../../components/CustomComponents/CustomComponents'

//style
import './style.scss';

class MyOrganisations extends Component {

  componentWillMount(){ this.getData(); }

  render() {
      return (
          <div className="my-organisation">
            <form className="my-organisation" onSubmit={handleSubmit(this.saveData)}>
              <div className="advertise-delete-save">
                  <Field
                      name={''}
                      label=" Add Organisation"
                      type="FormLabel"
                      styleClass={{field: "advertise"}}
                      component={CustomComponents}
                  />
              </div>
              <div className="delete-all-information-root">
              <Field
                  name="organisation_name"
                  label="Organisation Name"
                  type="TextField"
                  component={CustomComponents}
                  styleClass = {{root: "half-width"}}
                  />
                 <Field
                      name="organisation_descreption"
                      label="Organisation Description"
                      type="TextField"
                      component={CustomComponents}
                      styleClass = {{root: "half-width margin-right"}}
                  />
              <Field
                      name="website_name"
                      label="Website Name"
                      type="TextField"
                      component={CustomComponents}
                      styleClass = {{root: "half-width margin-right"}}
                  />
              </div>
              <SaveAndCancelButton cancelText="Cancel" saveText="Next" onSave={this.saveData} onCancel={this.getInitialisedData} />
          </form>
          </div>
      );
  }
  }

export default MyOrganisations
