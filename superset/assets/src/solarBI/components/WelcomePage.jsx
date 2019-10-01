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
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    marginTop: -19,
  },
  title: {
    backgroundImage: 'url("/static/assets/images/welcome_background.png")',
    height: 350,
  },
  topLine1: {
    height: 2,
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundImage: 'linear-gradient(to right, #FAD961, #00736A, #FAD961)',
  },
  topLine2: {
    height: 2,
    backgroundImage: 'linear-gradient(to right, #FAD961, #00736A, #FAD961)',
  },
  head: {
    textAlign: 'center',
    paddingTop: 60,
    fontSize: '4rem',
    fontWeight: 400,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 300,
    lineHeight: 2,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 17,
    height: 50,
  },
  solarAssets: {
    display: 'flex',
    alignItems: 'center',
    width: 900,
    margin: 'auto',
    padding: 20,
  },
  row: {
    display: 'table',
    marginLeft: 100,
    width: 400,
  },
  col: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  number: {
    fontSize: '4em',
  },
  step: {
    fontSize: '1.5em',
  },
  explain: {
    fontSize: '1.1em',
  },
  solarMap: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
});

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClickGo = this.handleClickGo.bind(this);
  }

  handleClickGo() {
    window.location = '/solar/add';
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {/* <div className={classes.topLine1} />
        <div className={classes.topLine2} /> */}
        <div className={classes.title}>
          <p className={classes.head}>SolarBI</p>
          <p className={classes.subtitle}>
            Welcome to SolarBI, let's start by finding the solar irradiation on
            your project's location
          </p>
          <div style={{ textAlign: 'center' }}>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={this.handleClickGo}
            >
              let's go
            </Button>
          </div>
        </div>

        <div style={{ backgroundColor: 'white' }}>
          <p className={classes.head}>How SolarBI Works</p>
          <p className={classes.subtitle}>
            Your own personalized solar project estimator, powered by Empower
            Analytics
          </p>
          <div className={classes.solarAssets}>
            <img
              src="/static/assets/images/solarBI_1.jpeg"
              alt="search for location"
              style={{ marginLeft: 80, width: 270 }}
            />
            <div className={classes.row}>
              <div className={classes.col}>
                <p className={classes.number}>1</p>
                <p className={classes.step}>Search for your project location</p>
                <p className={classes.explain}>
                  We use Google maps, satellite Solar Irradiation data and local
                  weather data to create a personalized solar plan.
                </p>
              </div>
            </div>
          </div>

          <div className={classes.solarAssets}>
            <img
              src="/static/assets/images/solarBI_2.png"
              alt="personalize your solar analysis"
              style={{ marginLeft: 80, width: 270 }}
            />
            <div className={classes.row}>
              <div className={classes.col}>
                <p className={classes.number}>2</p>
                <p className={classes.step}>Personalize your solar analysis</p>
                <p className={classes.explain}>
                  Adjust your energy consumption details to fine-tune potential
                  savings, optimal number of solar panels and forecast of
                  potential profit.
                </p>
              </div>
            </div>
          </div>

          <div className={classes.solarAssets}>
            <img
              src="/static/assets/images/solarBI_3.png"
              alt="personalize your solar analysis"
              style={{ marginLeft: 80, width: 270 }}
            />
            <div className={classes.row}>
              <div className={classes.col}>
                <p className={classes.number}>3</p>
                <p className={classes.step}>
                  Understand financial opportunities
                </p>
                <p className={classes.explain}>
                  Cost benefit analysis of loan, lease, and purchase options for
                  your solar project based on your results.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className={classes.head}>Country-wide solar potential</p>
        <div
          style={{
            backgroundColor: 'white',
            marginTop: 30,
            marginBottom: 200,
            width: '100%',
          }}
        >
          <img
            className={classes.solarMap}
            src="/static/assets/images/aus_map.png"
            alt="solar map"
          />
        </div>
      </div>
    );
  }
}

WelcomePage.propTypes = propTypes;

export default withStyles(styles)(WelcomePage);
