import React, { Component } from 'react';
import CustomIcon from '../'

class LandingPageCardWithButton extends Component {
    render() {
        return (
             <div className="card-with-button-main-container">
                 <div className="card-with-button-icon-and-title">
                        <div className="card-with-button-icon">

                        </div>
                        <div className="card-with-button-title">
                            Citica
                        </div>
                 </div>
                 <div>
                    Raw denim you probably haven't heard of them jean shorts Austin. 
                    Nesciunt tofu stumptown aliqua, retro synth master cleanse. 
                    Mustache cliche tempor, williamsburg carles vegan helvetica.
                 </div>
                 <div className="landing-page-text-field-button">
                    <div className="landig-page-text-field-button-text">Notify</div>
                    <CustomIcon icon={} iconStyle="landing-page-custom-icon" />
                 </div>
             </div>
        );
    }
}
