import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';
import Marker from './Marker.js';
import GoogleMap from './GoogleMap.js';
import SearchBox from './SearchBox.js';
import DUMMY_LOCATION_CENTER from './dummy_center.js';

class NewPostJobMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    this.setState({ places: place });
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (
      <Fragment>
        {mapApiLoaded && <SearchBox map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
        <GoogleMap
          defaultZoom={10}
          defaultCenter={DUMMY_LOCATION_CENTER}
          bootstrapURLKeys={{
            key: 'AIzaSyBzc7ZO-NXQLEOIkjYngOb9APg35c-WljM',
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {!isEmpty(places) &&
          places.map(place => (
            <Marker
              key={place.id}
              text={place.name}
              lat={place.geometry.location.lat()}
              lng={place.geometry.location.lng()}
            />
          ))}
        </GoogleMap>
      </Fragment>
    );
  }
}

export default NewPostJobMap;
