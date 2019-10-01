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
import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Button from 'src/components/Button';


const propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onPlaceChanged: PropTypes.func.isRequired,
};

const styles = tm => ({
  textField: {
    marginLeft: tm.spacing.unit,
    marginRight: tm.spacing.unit,
    width: 750,
  },
  button: {
    margin: '4px',
    fontSize: '13px',
  },
  card: {
    minHeight: 200,
    height: 200,
    borderRadius: 12,
  },
  fab: {
    width: 60,
    height: 60,
    marginLeft: 20,
  },
  icon: {
    margin: tm.spacing.unit,
  },
  input: {
    margin: '50 40',
    height: 60,
    width: '70%',
    backgroundColor: '#f6f6f6',
    borderRadius: '3em',
    border: '1px solid dimgray',
  },
  inputFocused: {
    width: '70%',
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  },
  saved: {
    display: 'block',
    margin: 'auto',
    marginTop: -10,
    width: 180,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 16,
    color: '#0063B0',
    cursor: 'pointer',
  },
  searchBtn: {
    width: '18%',
    height: 60,
    padding: '0 16px',
    minWidth: 30,
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
    // '&:focus': {
    //   outline: 'none !important',
    // },
    // '&:active': {
    //   color: '#FFB2B2',
    // },
  },
});

class LocationSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
    };

    this.onSearchClick = this.onSearchClick.bind(this);
  }

  /*eslint-disable */
  componentDidMount() {
    if (typeof google === 'undefined') {
      return;
    }

    const { places } = google.maps;
    const options = {
      componentRestrictions: { country: 'AU' },
    };

    const input = this.locationSearch;

    if (input) {
      if (!input._autocomplete) {
        input._autocomplete = new places.Autocomplete(input, options);
        input._autocomplete.addListener(
          'place_changed',
          (() => {
            this.handlePlaceSelect(input._autocomplete.getPlace());
          }).bind(input._autocomplete)
        );
      }
    }
  }
  /* eslint-enable */

  onChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onSearchClick() {
    const { onPlaceChanged } = this.props;
    return onPlaceChanged(this.state.address);
  }

  handlePlaceSelect(addressObject) {
    if (addressObject) {
      this.setState({
        address: addressObject,
      });
    }
  }

  render() {
    const { classes, width } = this.props;
    const isSmallScreen = /xs|sm|md/.test(width);

    return (
      <Card className={classes.card}>
        <CardContent>
          <Input
            autoFocus
            id="inputBox"
            className={classes.input}
            placeholder=""
            classes={{ focused: classes.inputFocused }}
            inputRef={ref => (this.locationSearch = ref)} // eslint-disable-line no-return-assign
            onChange={this.onChange.bind(this, 'address')}
            inputProps={{
              style: {
                fontSize: 18,
                fontFamily: 'Montserrat, sans-serif',
                paddingLeft: 10,
              },
            }}
            disableUnderline
          />
          {isSmallScreen ?
            <Fab
              id="searchFab"
              size="medium"
              color="secondary"
              aria-label="Search"
              className={classes.fab}
              onClick={this.onSearchClick}
            >
              <Search />
            </Fab>
            :
            <Button
              variant="contained"
              aria-label="Search"
              color="primary"
              className={classes.searchBtn}
              onClick={this.onSearchClick}
            >
              SEARCH
            </Button>
          }
          <a className={classes.saved} href="/solar/list">See saved searches</a>
        </CardContent>
      </Card>
    );
  }
}

LocationSearchBox.propTypes = propTypes;

export default withWidth()(withStyles(styles)(LocationSearchBox));

