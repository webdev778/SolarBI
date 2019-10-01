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
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import GoBackModal from './GoBackModal';

const styles = theme => ({
  close: {
    float: 'right',
    fontSize: 15,
    color: '#A4AFB7',
    width: 32,
    height: 32,
    '&:hover': {
      textDecoration: 'none',
      opacity: 1,
    },
    '&:before': {
      position: 'absolute',
      left: '15px',
      content: ' ',
      height: 33,
      width: 2,
      backgroundColor: '#333',
      transform: 'rotate(45deg)',
    },
    '&:after': {
      position: 'absolute',
      left: '15px',
      content: ' ',
      height: 33,
      width: 2,
      backgroundColor: '#333',
      transform: 'rotate(-45deg)',
    },
  },
  exportBtn: {
    marginLeft: 60,
  },
  root: {
    marginBottom: 20,
  },
  notUse: {
    margin: theme.spacing(1),
  },
});

class CloseButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      showExportModal: false,
      showGoBackModal: false,
    };

    this.onBackClick = this.onBackClick.bind(this);
    this.toggleGoBackModal = this.toggleGoBackModal.bind(this);

  }

  onBackClick() {
    if (this.props.solar_new) {
      this.props.onBackClick(false);
    } else {
      this.props.onBackClick(true);
    }
  }

  toggleGoBackModal() {
    this.setState({ showGoBackModal: !this.state.showGoBackModal });
  }

  render() {
    const { classes, solar_new } = this.props;
    return (
      <div className={classes.root}>
        <a
          onClick={solar_new ? this.toggleGoBackModal : this.onBackClick}
          className={classes.close}
        >
          &#10005;
        </a>
        <GoBackModal
          onBackClick={this.onBackClick}
          open={this.state.showGoBackModal}
          onClose={this.toggleGoBackModal}
        />
      </div>
    );
  }
}

CloseButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
  solar_new: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CloseButton);
