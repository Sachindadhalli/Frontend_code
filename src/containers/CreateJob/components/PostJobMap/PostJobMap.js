// library dependencies
import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

//style
import './style.scss';

//icon
import locationIcon from '../../../../../assets/media/icons/location.svg'

//custom component
import SaveAndCancelButton from '../../../../components/SaveAndCancelButton'
import SearchBox from './SearchBox'
import CustomIcon from '../../../../components/CustomIcon';

const AnyReactComponent = () => <CustomIcon icon={locationIcon}/>;

class PostJobMap extends Component {
  static defaultProps = {center: {lat: 59.95, lng: 30.33}, zoom: 11};

  constructor(props) {
    super(props);
    this.state = {
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
      places: [],
      current_position: this.props.selected_location,
    };
  }

  componentWillMount() {

    //updating the location,if previously not selected updating default location
    if (this.props.selected_location === null) {
      this.getLocation();
    } else {
      this.setState({current_position: this.props.selected_location})
    }
  }

  /**
   * To update the place on map
   * @param place
   */
  addPlace = (place) => {
    const currentLatAndLong = {
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng()
    };
    this.setState({current_position: currentLatAndLong});
  };

  /**
   * Updating the state after location selected from map
   * @param map
   * @param maps
   */
  apiLoaded = (map, maps) => {
    this.setState({
      mapsApiLoaded: true,
      mapInstance: map,
      mapsapi: maps,
    });
  };

  /**
   * getting position from map and updating state
   * @param position
   */
  setCurrentLatAndLong = (position) => {
    const currentLatAndLong = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.setState({current_position: currentLatAndLong})
  };

  /**
   * updating the selected location on map, if not selected updating default location
   */
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLatAndLong);
    } else {
      const defaultLoc = {
        lat: 19.141258099999998,
        lng: 72.93126690000001
      };
      this.setState({current_position: defaultLoc})
    }
  };

  /**
   * To updating the state after selected location on map
   * @param x
   * @param y
   * @param lat
   * @param lng
   * @param event
   */
  getLatitudeAndLongitude = ({x, y, lat, lng, event}) => {
    const newLocation = {lat: lat, lng: lng};
    this.setState({current_position: newLocation})
  };

  render() {
    const {mapsApiLoaded, mapInstance, mapsapi, current_position} = this.state;
    const {selected_location} = this.props;
    return (
      <div className="google-map-container">
        <div className="map-header-text">Please Choose a Location</div>
        {mapsApiLoaded && (<SearchBox map={mapInstance} mapApi={mapsapi} addplace={this.addPlace}/>)}
        {
          current_position ?
            <GoogleMapReact
              bootstrapURLKeys={{key: 'AIzaSyBzc7ZO-NXQLEOIkjYngOb9APg35c-WljM'}}
              defaultCenter={current_position}
              defaultZoom={this.props.zoom}
              onClick={this.getLatitudeAndLongitude}
              heatmapLibrary={true}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({map, maps}) => {
                this.apiLoaded(map, maps);
              }}
            >
              <AnyReactComponent
                lat={current_position.lat}
                lng={current_position.lng}
                text={"demo"}
              />
            </GoogleMapReact> : null
        }
        <SaveAndCancelButton cancelText="Cancel" saveText={"Save"}
                             onSave={() => this.props.setLatitudeAndLongitude(current_position)}
                             onCancel={this.props.toggleMapPop}/>

      </div>
    );
  }
}

export default PostJobMap;
