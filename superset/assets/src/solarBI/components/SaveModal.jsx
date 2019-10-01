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
import { connect } from 'react-redux';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { saveSolarData } from '../actions/solarActions';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#0063B0',
    },
  },
});

const propTypes = {
  onHide: PropTypes.func.isRequired,
  can_overwrite: PropTypes.bool,
  form_data: PropTypes.object.isRequired,
  slice: PropTypes.object,
  saveSolarData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
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

class SaveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveToDashboardId: null,
      newDashboardName: '',
      newSliceName: '',
      dashboards: [],
      alert: false,
      action: props.can_overwrite ? 'overwrite' : 'saveas',
      addToDash: 'noSave',
      vizType: props.form_data.viz_type,
    };

    this.handleClose = this.handleClose.bind(this);
    this.saveOrOverwrite = this.saveOrOverwrite.bind(this);
  }

  onChange(name, event) {
    switch (name) {
      case 'newSliceName':
        this.setState({ newSliceName: event.target.value });
        break;
      case 'saveToDashboardId':
        this.setState({ saveToDashboardId: event.value });
        this.changeDash('existing');
        break;
      case 'newDashboardName':
        this.setState({ newDashboardName: event.target.value });
        break;
      default:
        break;
    }
  }

  changeAction(action) {
    this.setState({ action });
  }

  changeDash(dash) {
    this.setState({ addToDash: dash });
  }

  saveOrOverwrite(gotodash) {
    this.setState({ alert: false });
    const sliceParams = {};

    let sliceName = null;
    sliceParams.action = this.state.action;
    if (this.props.slice && this.props.slice.slice_id) {
      sliceParams.slice_id = this.props.slice.slice_id;
    }
    if (sliceParams.action === 'saveas') {
      sliceName = this.state.newSliceName;
      if (sliceName === '') {
        this.setState({ alert: true });
        return;
      }
      sliceParams.slice_name = sliceName;
    } else {
      sliceParams.slice_name = this.props.slice.slice_name;
    }

    this.props
      .saveSolarData(this.props.form_data, sliceParams)
      .then(() => {
        // Go to new slice url or dashboard url
        if (gotodash) {
          // window.location = data.slice.slice_url;
          window.location = '/solar/list';
        }
      });
    this.props.onHide();
  }

  handleClose() {
    this.setState({ alert: false });
    this.props.onHide();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Dialog
            classes={{ paper: classes.dialog }}
            open={this.props.open}
            onClose={this.props.onHide}
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogTitle
              disableTypography
              className={classes.title}
              id="form-dialog-title"
            >
              Save Chart
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ fontSize: '1.2em' }}>
                To save the chart, please enter a name here.
              </DialogContentText>
              <TextField
                error={this.state.alert}
                autoFocus
                margin="dense"
                id="name"
                label="Chart Name"
                fullWidth
                onChange={this.onChange.bind(this, 'newSliceName')}
                InputLabelProps={{
                  style: {
                    fontSize: '1.2em',
                  },
                }}
                InputProps={{
                  style: {
                    fontSize: '1.2em',
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.button}
                onClick={() => this.saveOrOverwrite(true)}
                color="primary"
              >
                Save
              </Button>
              <Button
                className={classes.button}
                onClick={this.handleClose}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    );
  }
}

SaveModal.propTypes = propTypes;

function mapStateToProps() {
  return {

  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { saveSolarData },
  )(SaveModal),
);
