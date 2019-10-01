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
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EnvironmentImpact from './EnvironmentImpact';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  slider: {
    padding: '22px 0px',
  },
  card: {
    minWidth: 450,
  },
  envCard: {
    minWidth: 850,
    minHeight: 180,
    marginTop: 20,
  },
  financeCard: {
    minWidth: 850,
    minHeight: 200,
    marginTop: 20,
  },
  textField: {
    marginLeft: 20,
    marginRight: 20,
  },
  cardContent: {
    margin: '0 20',
  },
  typography: {
    textAlign: 'center',
  },
  notUse: {
    margin: theme.spacing(1),
  },
});

function TabContainer(prop) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {prop.children}
    </Typography>
  );
}

class InfoWidgets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 50,
      tabValue: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  }

  render() {
    const { classes } = this.props;
    const { value, tabValue } = this.state;

    return (
      <div>
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography
                variant="h4"
                id="label"
                className={classes.typography}
              >
                What's your average monthly electric bill?
              </Typography>
              <Typography
                variant="subtitle1"
                id="subtitle1"
                className={classes.typography}
              >
                We use your bill to estimate how much electricity you use based
                on typical utility rates in your area.
              </Typography>

              <TextField
                id="filled-adornment-amount"
                className={classes.textField}
                variant="filled"
                label="Bill Price"
                value={Math.round(value * 5)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <div style={{ display: 'flex' }}>
                <span>$0</span>
                <Slider
                  classes={{ container: classes.slider }}
                  value={value}
                  aria-labelledby="label"
                  onChange={this.handleChange}
                />
                <span>$500</span>
              </div>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography
                variant="h4"
                id="label"
                className={classes.typography}
              >
                Your recommended solar installation size
              </Typography>
              <Typography
                variant="subtitle1"
                id="subtitle1"
                className={classes.typography}
              >
                This size will cover about 99% of your electricity usage. Solar
                installations are sized in kilowatts (kW).
              </Typography>

              <Typography variant="h4" id="label">
                {(value / 3).toFixed(2)} kW
              </Typography>
            </CardContent>
          </Card>
        </div>

        <Card className={classes.envCard}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h4" id="label" className={classes.typography}>
              Your potential environmental impact
            </Typography>
            <Typography
              variant="subtitle1"
              id="subtitle1"
              className={classes.typography}
            >
              Estimated annual environmental impact of the recommended solar
              installation size.
            </Typography>
            <EnvironmentImpact />
          </CardContent>
        </Card>

        <Card className={classes.financeCard}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h4" id="label" className={classes.typography}>
              Your potential environmental impact
            </Typography>
            <AppBar position="static" color="default">
              <Tabs
                value={tabValue}
                variant="fullWidth"
                onChange={this.handleTabChange}
                indicatorColor="primary"
              // centered
              >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
              </Tabs>
            </AppBar>
            {tabValue === 0 && <TabContainer>Item One</TabContainer>}
            {tabValue === 1 && <TabContainer>Item Two</TabContainer>}
            {tabValue === 2 && <TabContainer>Item Three</TabContainer>}
          </CardContent>
        </Card>
      </div>
    );
  }
}

InfoWidgets.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoWidgets);
