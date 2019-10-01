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
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  row: {
    display: 'table',
  },
  middleLeft: {
    display: 'table-cell',
    alignItems: 'left',
    verticalAlign: 'middle',
  },
  topCenter: {
    display: 'table-cell',
    paddingLeft: 30,
    alignItems: 'center',
    verticalAlign: 'top',
  },
  middleCenter: {
    display: 'table-cell',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  bottomCenter: {
    display: 'table-cell',
    paddingLeft: 30,
    alignItems: 'center',
    verticalAlign: 'bottom',
  },
  typography: {
    textAlign: 'center',
  },
  notUse: {
    margin: theme.spacing(1),
  },
});


function EnvironmentImpact() {
  const { classes } = this.props;

  return (
    <div>
      <div className={classes.row}>
        <div className={classes.topCenter}>
          <Typography id="subtitle1" variant="subtitle1">Carbon dioxide</Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.middleLeft}>
          <img
            alt=""
            style={{ width: 50, marginRight: 4 }}
            // eslint-disable-next-line
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4IDU4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OCA1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiM1NTYwODA7IiBkPSJNNDUsMTUuNWwtNC0xMEgxN2wtNCwxMEgzLjc5OUMxLjcwMSwxNS41LDAsMTcuMjAxLDAsMTkuMjk5djI5LjM2OEMwLDUwLjc4NCwxLjcxNiw1Mi41LDMuODMzLDUyLjUgIGg1MC4zMzNjMi4xMTcsMCwzLjgzMy0xLjcxNiwzLjgzMy0zLjgzM1YxOS4yOTljMC0yLjA5OC0xLjcwMS0zLjc5OS0zLjc5OS0zLjc5OUg0NXoiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojNDI0QTYwO3N0cm9rZTojMkIzMTNEO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgY3g9IjI5IiBjeT0iMzEuNSIgcj0iMTciLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojNzM4M0JGOyIgY3g9IjI5IiBjeT0iMzEuNSIgcj0iMTEiLz4KPHJlY3QgeD0iNiIgeT0iMTAuNSIgc3R5bGU9ImZpbGw6IzM4NDU0RjsiIHdpZHRoPSI0IiBoZWlnaHQ9IjUiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRUZDRTRBOyIgY3g9IjUxIiBjeT0iMjIuNSIgcj0iMyIvPgo8cGF0aCBzdHlsZT0iZmlsbDojODc5QUQ4OyIgZD0iTTMyLDMxLjVjMCwzLjU5NSwxLjQxOCw2Ljc3OCwzLjYsOC43ODVjMi42NjctMi4wMDcsNC40LTUuMTksNC40LTguNzg1cy0xLjczMy02Ljc3OC00LjQtOC43ODUgIEMzMy40MTgsMjQuNzIyLDMyLDI3LjkwNSwzMiwzMS41eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojODc5QUQ4OyIgZD0iTTE4LDMxLjVjMCwzLjU5NSwxLjczMyw2Ljc3OCw0LjQsOC43ODVjMi4xODItMi4wMDcsMy42LTUuMTksMy42LTguNzg1cy0xLjQxOC02Ljc3OC0zLjYtOC43ODUgIEMxOS43MzMsMjQuNzIyLDE4LDI3LjkwNSwxOCwzMS41eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNTU2MDgwOyIgZD0iTTI5LDQzLjVjLTYuNjE3LDAtMTItNS4zODMtMTItMTJzNS4zODMtMTIsMTItMTJzMTIsNS4zODMsMTIsMTJTMzUuNjE3LDQzLjUsMjksNDMuNXogTTI5LDIxLjUgIGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHM0LjQ4NiwxMCwxMCwxMHMxMC00LjQ4NiwxMC0xMFMzNC41MTQsMjEuNSwyOSwyMS41eiIvPgo8Y2lyY2xlIHN0eWxlPSJmaWxsOiM0Njc0RTg7IiBjeD0iMzAuNSIgY3k9IjI4IiByPSIzLjUiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojQkY0RDkwOyIgY3g9IjI4IiBjeT0iMjkuNSIgcj0iMiIvPgo8Y2lyY2xlIHN0eWxlPSJmaWxsOiNCQ0NFRjc7IiBjeD0iMjUiIGN5PSIyNy41IiByPSIyIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
          />
        </div>
        <div className={classes.middleCenter}>
          <Typography id="subtitle2" variant="h4">2</Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.bottomCenter}>
          <Typography id="subtitle3" variant="subtitle1">Carbon dioxide</Typography>
        </div>
      </div>
    </div>
  );
}

EnvironmentImpact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnvironmentImpact);
