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
import { Map, Marker, GoogleApiWrapper, Circle } from './google_maps_react';
import ReactEcharts from 'echarts-for-react';

const defaultProps = {
  center: {
    lat: 40.854885,
    lng: -87.081807,
  },
  zoom: 11,
};

class SolarBI extends React.Component {


  constructor(props) {
    super(props);
    const results = props.data;
    this.state = {
      center: { lat: results.lat, lng: results.lng },
      zoom: defaultProps.zoom,
      options: this.getOption(),
      radius: results.radius,
    };
    this.placeChanged.bind(this.placeChanged());
    this.getOption.bind(this.getOption());
  }


  placeChanged(place) {
    if (place) {
      this.setState({
        center: place.geometry.location,
        zoom: 16,
      });
    }
  }

  getOption() {
    const processed_data = this.props.data.data;
    const data1 = processed_data[1];
    const xAxisData = processed_data[0];


    const option = {
      title: {
        text: 'Solar Irradiance Data',
      },
      legend: {
        data: ['☀️ Irradiance ☀️ (W/m²)'],
        align: 'left',
      },
      toolbox: {
        showTitle: false,
        feature: {
          saveAsImage: {
            pixelRatio: 2,
          },
        },
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        name: '(W/m²)',
      },
      series: [{
        name: '☀️ Irradiance ☀️ (W/m²)',
        type: 'bar',
        data: data1,
        animationDelay(idx) {
          return idx * 10;
        },
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate(idx) {
        return idx * 5;
      },
    };

    return option;
  }

  componentDidMount() {
    const results = this.props.data;
    this.setState({
      center: { lat: results.lat, lng: results.lng },
      options: this.getOption(),
      radius: results.radius,
    });
  }

  render() {
    return (
      <div >

        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807,
          }}
          center={this.state.center}
        >
          <Marker
            position={this.state.center}
            name={'Current location'}
          />
          <Circle
            radius={this.state.radius * 1000}
            center={this.state.center}
            strokeColor="transparent"
            strokeOpacity={0}
            strokeWeight={5}
            fillColor={'#FF0000'}
            fillOpacity={0.2}
          />
        </Map>
        <ReactEcharts
          option={this.state.options}
          style={{ position: 'relative', width: '100%', height: '50%' }}
        />

      </div>
    );
  }
}


export default GoogleApiWrapper({
  apikey: '',
})(SolarBI);
