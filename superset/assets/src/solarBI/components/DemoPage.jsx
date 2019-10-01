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
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


const propTypes = {
  classes: PropTypes.object.isRequired,
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#EDEEEF',
    },
    secondary: {
      main: '#0165AE',
      background: 'linear-gradient(.25turn, #10998C, #09809D, #0063B0)',
    },
  },
});

const styles = tm => ({
  button: {
    // fontSize: '1.2em',
    // width: '18%',
    margin: '10 10',
    height: 40,
    padding: '0 16px',
    minWidth: 115,
    borderRadius: 60,
    color: 'white',
    backgroundColor: '#0063B0',
    border: 'none',
    fontSize: 16,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    '&:hover': {
      color: 'white',
      backgroundColor: '#034980',
    },
  },
  cardFlex: {
    marginTop: 90,
    minHeight: 290,
    height: 290,
    borderRadius: 12,
    fontFamily: 'Montserrat',
  },
  cardInitial: {
    marginTop: 160,
    marginBottom: 30,
    minHeight: 290,
    height: 530,
    borderRadius: 12,
  },
  contentFlex: {
    display: 'flex',
    padding: 0,
  },
  contentInitial: {
    display: 'initial',
  },
  head: {
    textAlign: 'center',
    height: 50,
    background: 'linear-gradient(.25turn, #10998C, #09809D, #0063B0)',
    backgroundColor: 'white',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 15,
  },
  indicator: {
    background: 'linear-gradient(.25turn, #10998C, #09809D, #0063B0)',
  },
  tab: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    minWidth: 50,
    width: 120, // a number of your choice
  },
  tabActive: {
    color: 'white',
    background: 'linear-gradient(.25turn, #10998C, #09809D, #0063B0)',
  },
  tabDefault: {
    color: '#abadb0',
    backgroundColor: '#EDEEEF',
  },
  textWrapper: {
    display: 'flex',
  },
  text: {
    color: '#0063B0',
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
  textField: {
    marginLeft: tm.spacing.unit,
    marginRight: tm.spacing.unit,
    width: 750,
  },
});

class DemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Card className={classes.cardFlex}>
          <CardContent className={classes.contentFlex}>
            <div className={classes.demo}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  classes={{ indicator: classes.indicator }}
                >
                  <Tab className={value === 0 ? classes.tabActive : classes.tabDefault} classes={{ root: classes.tab }} label="VIC" />
                  <Tab className={value === 1 ? classes.tabActive : classes.tabDefault} classes={{ root: classes.tab }} label="NSW" />
                  <Tab className={value === 2 ? classes.tabActive : classes.tabDefault} classes={{ root: classes.tab }} label="QLD" />
                  <Tab className={value === 3 ? classes.tabActive : classes.tabDefault} classes={{ root: classes.tab }} label="NT" />
                  <Tab className={value === 4 ? classes.tabActive : classes.tabDefault} classes={{ root: classes.tab }} label="SA" />
                  <Tab className={value === 5 ? classes.tabActive : classes.tabDefault} classes={{ root: classes.tab }} label="WA" />
                  <Tab className={value === 6 ? classes.tabActive : classes.tabDefault} classes={{ root: classes.tab }} label="TAS" />
                </Tabs>
              </AppBar>
              {value === 0 && <TabContainer>
                <div className={classes.textWrapper}>
                  <p className={classes.text}>Read one of our case studies:</p>
                  <Button className={classes.button}>WIND FARM</Button>
                  <Button className={classes.button}>SOLAR FARM</Button>
                  <Button className={classes.button}>LARGE BUILDING</Button>
                </div>
              </TabContainer>}
              {value === 1 && <TabContainer>
                <p className={classes.text}>Read one of our case studies:</p>
              </TabContainer>}
              {value === 2 && <TabContainer>
                <p className={classes.text}>Read one of our case studies:</p>
              </TabContainer>}
              {value === 3 && <TabContainer>
                <p className={classes.text}>Read one of our case studies:</p>
              </TabContainer>}
              {value === 4 && <TabContainer>
                <p className={classes.text}>Read one of our case studies:</p>
              </TabContainer>}
              {value === 5 && <TabContainer>
                <p className={classes.text}>Read one of our case studies:</p>
              </TabContainer>}
              {value === 6 && <TabContainer>
                <p className={classes.text}>Read one of our case studies:</p>
              </TabContainer>}
            </div>
          </CardContent>
        </Card>

        <Card className={classes.cardFlex}>
          <CardContent
            className={classes.contentFlex}
          >
            <div className={classes.head}>VIC</div>
          </CardContent>
        </Card>
      </MuiThemeProvider>
    );
  }
}

DemoPage.propTypes = propTypes;

export default withStyles(styles)(DemoPage);
