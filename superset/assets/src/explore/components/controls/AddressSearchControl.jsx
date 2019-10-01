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
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import ControlHeader from '../ControlHeader';

const propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  choices: PropTypes.array,
};

const defaultProps = {
  onChange: () => { },
  animation: true,
  choices: [],
};

export default class AddressSearchControl extends React.Component {
  constructor(props) {
    super(props);
    const v = props.value || {};
    this.state = {
      type: 'latlong',
      latCol: v.latCol,
      lonCol: v.lonCol,
      address: '',
      value: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.onChange(null, []);
  }

  setType(type) {
    this.setState({ type });
  }

  handleChange(address) {
    this.setState({ address });
    this.props.onChange(address, []);
  }

  handleSelect(address) {
    this.setState({ address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        const value = {
          lat: latLng.lat,
          lon: latLng.lng,
          latCol: 'longitude',
          lonCol: 'latitude',
          type: this.state.type,
        };

        this.setState({ value });
        this.props.onChange(value, []);
      })
      .catch(error => error);
  }

  render() {
    return (
      <div>
        <ControlHeader {...this.props} />
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
                style={{ width: '100%' }}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
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
      </div>
    );
  }
}

AddressSearchControl.propTypes = propTypes;
AddressSearchControl.defaultProps = defaultProps;
