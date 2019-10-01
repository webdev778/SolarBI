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
/* eslint camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles, ThemeProvider } from '@material-ui/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#489795',
    },
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

const styles = tm => ({
  modal: {
    position: 'absolute',
    width: theme.spacing(60),
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    padding: theme.spacing(4),
  },
  button: {
    fontSize: '1.2em',
  },
  dialog: {
    width: '80%',
    padding: 10,
  },
  title: {
    fontSize: '1.6em',
  },
  resize: {
    fontSize: 20,
  },
  notUse: {
    margin: tm.spacing.unit,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class GoBackModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes, open, onClose, onBackClick } = this.props;
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Dialog
            classes={{ paper: classes.dialog }}
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogTitle
              disableTypography
              className={classes.title}
              id="form-dialog-title"
            >
              Not Save Warning
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ fontSize: '1.2em' }}>
                You haven't save the chart. Are you sure to go back?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.button}
                onClick={onBackClick}
                color="primary"
              >
                Yes
              </Button>
              <Button
                className={classes.button}
                onClick={onClose}
                color="primary"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    );
  }
}

GoBackModal.propTypes = propTypes;

export default withStyles(styles)(GoBackModal);
