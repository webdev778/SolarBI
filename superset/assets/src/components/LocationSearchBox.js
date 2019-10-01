/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

export default class LocationSearchBox extends React.Component {
    // componentDidMount() {
    //   if (typeof google === 'undefined') {
    //     console.warn('Google Places was not initialized. LocationSearchBox will not function.');
    //     return;
    //   }
    //
    //   const { country, onPlaceChanged } = this.props;
    //   const { places } = google.maps;
    //
    //   let options;
    //
    //   if (country) {
    //     options = {
    //       componentRestrictions: { country }
    //     };
    //   }
    //
    //   const input = this.locationSearch;
    //
    //   if (!input.autoComplete) {
    //     input.autoComplete = new places.Autocomplete(input, options);
    //
    //     input.autoComplete.addListener('place_changed', (() => {
    //       onPlaceChanged && onPlaceChanged(input.autoComplete.getPlace());
    //     }).bind(input.autoComplete));
    //   }
    // }

    // render() {
    //   return (
    //       <TextField autoComplete={new google.maps.places.Autocomplete(this.props.value)} placeholder="Search nearby"/>
    //   );
    // }


    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange(address) {
        this.setState({ address });
    };

    handleSelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }

}

