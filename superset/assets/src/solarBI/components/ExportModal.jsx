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
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles, ThemeProvider } from '@material-ui/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import HelpIcon from '@material-ui/icons/Help';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { requestSolarData } from '../actions/solarActions';

const propTypes = {
  address: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  solarBI: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  requestSolarData: PropTypes.func.isRequired,
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#0063B0',
    },
    secondary: {
      main: '#DBD800',
    },
  },
});


const styles = tm => ({
  border: {
    border: '1px solid #0063B0',
    borderRadius: 12,
    margin: 40,
  },
  button: {
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
  closeBtn: {
    marginRight: 40,
  },
  contentHr: {
    display: 'block',
    width: '95%',
    height: 1,
    border: 0,
    borderTop: '1px solid #AFDEDF',
    margin: '2em auto 0',
    padding: 0,
  },
  costOutput: {
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWeight: 500,
    backgroundColor: '#EEEFF0',
    borderRadius: 12,
    lineHeight: '18px',
    marginTop: '25px',
    marginLeft: '30px',
    '& fieldset': {
      borderRadius: 12,
    },
  },
  dates: {
    display: 'flex',
  },
  dateLabel: {
    color: '#0063B0',
    display: 'block',
    marginBottom: 5,
  },
  dateWrapper: {
    width: 220,
    textAlign: 'center',
  },
  dialog: {
    borderRadius: 12,
    maxWidth: 800,
    padding: 10,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginLeft: 250,
  },
  dollar: {
    '& p': {
      fontSize: 16,
    },
  },
  endText: {
    marginLeft: '15px',
    '& fieldset': {
      borderRadius: 12,
    },
  },
  lengthLabel: {
    fontSize: '1.6rem',
    color: '#0063B0',
    width: '10%',
    float: 'left',
    borderBottom: 'none',
    marginLeft: '15px',
    marginRight: '30px',
    marginTop: '45px',
  },
  formControl: {
    marginBottom: '5px',
    width: '90%',
    display: 'inline-block',
    margin: theme.spacing(2),
    '& svg': {
      fontSize: '1.5em',
    },
  },
  formControlLabel: {
    fontSize: '1.5rem',
    color: '#0063B0',
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
  head: {
    textAlign: 'center',
    height: 50,
    background: 'linear-gradient(.25turn, #10998C, #09809D, #0063B0)',
    backgroundColor: 'white',
    marginTop: -10,
    marginLeft: -10,
    width: 810,
    color: 'white',
    paddingTop: 15,
  },
  iconButton: {
    padding: '5 12',
    height: 40,
    marginLeft: 20,
    marginTop: 15,
  },
  labelFocused: {
    color: '#0063B0 !important',
  },
  loading: {
    width: 60,
    margin: 0,
    marginRight: '10px',
  },
  resolutionLabel: {
    fontSize: '1.6rem',
    color: '#0063B0',
    width: '10%',
    float: 'left',
    borderBottom: 'none',
    marginTop: '35px',
    marginRight: '45px',
  },
  costLabel: {
    fontSize: '1.6rem',
    color: '#0063B0',
    width: '10%',
    float: 'left',
    borderBottom: 'none',
    marginTop: '35px',
    marginLeft: '15px',
  },
  startText: {
    marginLeft: '10px',
    '& fieldset': {
      borderRadius: 12,
    },
  },
  title: {
    color: '#0063B0',
    fontSize: '1.6em',
    textAlign: 'center',
    paddingBottom: 0,
  },
  titleHr: {
    display: 'block',
    width: 159,
    height: 1,
    border: 0,
    borderTop: '1px solid #AFDEDF',
    margin: '1em auto 2em',
    padding: 0,
  },
  textLabel: {
    fontSize: '16px',
  },
  textInput: {
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWeight: 500,
    backgroundColor: '#EEEFF0',
    borderRadius: 12,
    lineHeight: '18px',
  },
  typeGroup: {
    flexDirection: 'row',
    width: '70%',
    float: 'left',
  },
  typeLabel: {
    fontSize: '1.6rem',
    color: '#0063B0',
    width: '10%',
    float: 'left',
    borderBottom: 'none',
    marginTop: '35px',
    marginRight: '45px',
  },
  typography: {
    margin: theme.spacing(2),
    fontSize: 15,
    width: 300,
  },
  resolutionGroup: {
    flexDirection: 'row',
    width: '80%',
    float: 'left',
  },
  notUse: {
    margin: tm.spacing.unit,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ExportModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      type: 'dni',
      startDate: '2017-01-01',
      endDate: '2018-01-01',
      resolution: 'hourly',
      cost: (16).toFixed(2),
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleResolutionChange = this.handleResolutionChange.bind(this);
    this.handleRequestData = this.handleRequestData.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleQuestionClose = this.handleQuestionClose.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.dateDiff = this.dateDiff.bind(this);
  }

  calculateCost() {
    const timeCost = {
      years: 5,
      months: 0.42,
      days: 0.01,
    };
    const gran = {
      monthly: 5,
      weekly: 7.5,
      daily: 9,
      hourly: 11,
    };
    const type = {
      dni: 0,
      ghi: 0,
      both: 0,
    };
    const dt1 = new Date(this.state.startDate);
    const dt2 = new Date(this.state.endDate);
    const diff = this.dateDiff(dt1, dt2);
    let result = diff.days * timeCost.days + diff.months * timeCost.months +
      diff.years * timeCost.years;
    let granularity;
    switch (this.state.resolution) {
      case 'hourly':
        granularity = gran.hourly;
        break;
      case 'daily':
        granularity = gran.daily;
        break;
      case 'weekly':
        granularity = gran.weekly;
        break;
      case 'monthly':
        granularity = gran.monthly;
        break;
      default:
        granularity = 0;
    }
    let t;
    switch (this.state.type) {
      case 'dni':
        t = type.dni;
        break;
      case 'ghi':
        t = type.ghi;
        break;
      case 'both':
        t = type.both;
        break;
      default:
        t = 0;
    }
    result = result + granularity + t;
    result = result.toFixed(2);
    // console.log(result)
    this.setState({ cost: result });
  }

  dateDiff(dt1, dt2) {
    const ret = { days: 0, months: 0, years: 0 };
    if (dt1 === dt2) return ret;
    if (dt1 > dt2) {
      const dtmp = dt2;
      // eslint-disable-next-line no-param-reassign
      dt2 = dt1;
      // eslint-disable-next-line no-param-reassign
      dt1 = dtmp;
    }

    /*
     * First get the number of full years
     */

    const year1 = dt1.getFullYear();
    const year2 = dt2.getFullYear();

    const month1 = dt1.getMonth();
    const month2 = dt2.getMonth();

    const day1 = dt1.getDate();
    const day2 = dt2.getDate();

    /*
     * Set initial values bearing in mind the months or days may be negative
     */
    ret.years = year2 - year1;
    ret.months = month2 - month1;
    ret.days = day2 - day1;

    /*
     * Now we deal with the negatives
     */

    /*
     * First if the day difference is negative
     * eg dt2 = 13 oct, dt1 = 25 sept
     */
    if (ret.days < 0) {
      /*
       * Use temporary dates to get the number of days remaining in the month
       */
      const dtmp1 = new Date(dt1.getFullYear(), dt1.getMonth() + 1, 1, 0, 0, -1);

      const numDays = dtmp1.getDate();

      ret.months -= 1;
      ret.days += numDays;

    }

    /*
     * Now if the month difference is negative
     */
    if (ret.months < 0) {
      ret.months += 12;
      ret.years -= 1;
    }

    return ret;
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value }, () => {
      this.calculateCost();
    });
  }

  handleStartDateChange(event) {
    this.setState({ startDate: event.target.value }, () => {
      this.calculateCost();
    });
  }

  handleEndDateChange(event) {
    this.setState({ endDate: event.target.value }, () => {
      this.calculateCost();
    });
  }

  handleResolutionChange(event) {
    this.setState({ resolution: event.target.value }, () => {
      this.calculateCost();
    });

  }

  handleQuestionClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleQuestionClose() {
    this.setState({ anchorEl: null });
  }

  handleRequestData() {
    const sDate = new Date(this.state.startDate);
    const eDate = new Date(this.state.endDate);
    if (sDate > eDate) {
      alert('Start date cannot be later than end date!'); // eslint-disable-line no-alert
    } else if (new Date(sDate) < new Date('1990-01-01') ||
      new Date(eDate) > new Date('2019-07-31')) {
      alert('Available date: 01/01/1990 ~ 31/07/2019.'); // eslint-disable-line no-alert
    } else {
      const queryData = {
        lat: this.props.solarBI.queryResponse.data.lat + '',
        lng: this.props.solarBI.queryResponse.data.lng + '',
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        type: this.state.type,
        resolution: this.state.resolution,
        datasource_id: this.props.solarBI.queryResponse.form_data.datasource_id,
        datasource_type: this.props.solarBI.queryResponse.form_data.datasource_type,
        viz_type: this.props.solarBI.queryResponse.form_data.viz_type,
        radius: this.props.solarBI.queryResponse.radius,
        spatial_address: { ...this.props.solarBI.queryResponse.form_data.spatial_address },
        address_name: this.props.address.slice(0, -11),
      };
      this.props.onHide();
      this.props.requestSolarData(queryData)
        .then(() => {
          window.location = '/solar/list';
        });
    }
  }

  render() {
    const { classes, open, onHide, solarBI } = this.props;
    const { startDate, endDate, anchorEl } = this.state;
    const openAnchor = Boolean(anchorEl);

    return (
      <div>
        <ThemeProvider theme={theme}>
          <Dialog
            classes={{ paper: classes.dialog }}
            fullWidth
            open={open || solarBI.sending}
            onClose={onHide}
            TransitionComponent={Transition}
            keepMounted
          >
            <div className={classes.head}>{this.props.address.slice(0, -11)}</div>
            <div className={classes.border}>
              <DialogTitle
                disableTypography
                className={classes.title}
                id="form-dialog-title"
              >
                Options
              </DialogTitle>
              <hr className={classes.titleHr} />
              <DialogContent>
                <FormLabel classes={{ root: classes.lengthLabel, focused: classes.labelFocused }} component="legend">Length</FormLabel>
                <div className={classes.dates}>
                  <div className={classes.dateWrapper}>
                    <span className={classes.dateLabel}>Start</span>
                    <TextField
                      error={new Date(startDate) > new Date(endDate) || new Date(startDate) < new Date('1990-01-01')}
                      id="date"
                      type="date"
                      value={startDate}
                      placeholder="yyyy-mm-dd"
                      variant="outlined"
                      onChange={this.handleStartDateChange}
                      className={classes.startText}
                      InputProps={{
                        classes: { input: classes.textInput },
                      }}
                    // InputLabelProps={{
                    //   FormLabelClasses: {
                    //     root: classes.textLabel,
                    //   },
                    // }}
                    />
                  </div>

                  <div className={classes.dateWrapper}>
                    <span className={classes.dateLabel}>End</span>
                    <TextField
                      error={new Date(startDate) > new Date(endDate) || new Date(endDate) > new Date('2019-07-31')}
                      id="date"
                      type="date"
                      value={endDate}
                      placeholder="yyyy-mm-dd"
                      variant="outlined"
                      onChange={this.handleEndDateChange}
                      className={classes.endText}
                      InputProps={{
                        classes: { input: classes.textInput },
                      }}
                    // InputLabelProps={{
                    //   FormLabelClasses: {
                    //     root: classes.textLabel,
                    //   },
                    // }}
                    />
                  </div>
                  <IconButton
                    aria-label="More"
                    // aria-owns={openAnchor ? 'long-menu' : undefined}
                    // aria-haspopup="true"
                    className={classes.iconButton}
                    onClick={this.handleQuestionClick}
                  >
                    <HelpIcon />
                  </IconButton>
                  <Popover
                    id="heatmap-popper"
                    open={openAnchor}
                    anchorEl={anchorEl}
                    onClose={this.handleQuestionClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography className={classes.typography}>
                      Available date: 01/01/1990 ~ 31/07/2019.
                      Both Start and End date are inclusive.
                    </Typography>
                  </Popover>
                </div>
                <hr className={classes.contentHr} />
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel classes={{ root: classes.typeLabel, focused: classes.labelFocused }} component="legend">Type</FormLabel>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    className={classes.typeGroup}
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                  >
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="dni" control={<Radio color="secondary" />} label="DNI" labelPlacement="bottom" />
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="ghi" control={<Radio color="secondary" />} label="GHI" labelPlacement="bottom" />
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="both" control={<Radio color="secondary" />} label="Download both" labelPlacement="bottom" />
                  </RadioGroup>
                </FormControl>
                <hr className={classes.contentHr} />
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel classes={{ root: classes.resolutionLabel, focused: classes.labelFocused }} component="legend">Resolution</FormLabel>
                  <RadioGroup
                    aria-label="resolution"
                    name="resolution"
                    className={classes.resolutionGroup}
                    value={this.state.resolution}
                    onChange={this.handleResolutionChange}
                  >
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="hourly" control={<Radio color="secondary" />} label="Hourly" labelPlacement="bottom" />
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="daily" control={<Radio color="secondary" />} label="Daily" labelPlacement="bottom" />
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="weekly" control={<Radio color="secondary" />} label="Weekly" labelPlacement="bottom" />
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="monthly" control={<Radio color="secondary" />} label="Monthly" labelPlacement="bottom" />
                    <FormControlLabel classes={{ label: classes.formControlLabel }} value="annual" control={<Radio color="secondary" />} label="Annual" labelPlacement="bottom" />
                  </RadioGroup>
                </FormControl>
                <hr className={classes.contentHr} />
                <div>
                  <FormLabel classes={{ root: classes.costLabel, focused: classes.labelFocused }} component="legend">Approx Cost</FormLabel>
                  <TextField
                    id="cost"
                    variant="outlined"
                    disabled
                    className={classes.costOutput}
                    value={this.state.cost}
                    InputProps={{
                      classes: { input: classes.textInput },
                      startAdornment: <InputAdornment className={classes.dollar} position="start">$</InputAdornment>,
                    }}
                  />
                </div>
              </DialogContent>
            </div>
            <DialogActions>
              {solarBI.sending ?
                (<img className={classes.loading} alt="Loading..." src="/static/assets/images/loading.gif" />) :
                (<Button className={classes.button} onClick={this.handleRequestData} color="primary">Request</Button>)
              }

              <Button
                className={classNames(classes.button, classes.closeBtn)}
                disabled={solarBI.sending}
                onClick={onHide}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    );
  }
}

ExportModal.propTypes = propTypes;

const mapStateToProps = state => ({
  solarBI: state.solarBI,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { requestSolarData },
  )(ExportModal),
);
