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
import { t } from '@superset-ui/translation';
import { now } from '../../modules/dates';
import * as actions from '../actions/solarActions';

export default function (state = {}, action) {
  const actionHandlers = {
    [actions.SOLAR_UPDATE_STARTED]() {
      return {
        ...state,
        solarStatus: 'loading',
        solarStackTrace: null,
        solarAlert: null,
        solarUpdateEndTime: null,
        solarUpdateStartTime: now(),
        can_save: false,
        can_export: false,
        queryController: action.queryController,
      };
    },
    [actions.SOLAR_UPDATE_SUCCEEDED]() {
      return {
        ...state,
        solarStatus: 'success',
        queryResponse: action.queryResponse,
        can_export: true,
        can_save: true,
        solarUpdateEndTime: now(),
      };
    },
    [actions.SOLAR_UPDATE_TIMEOUT]() {
      return {
        ...state,
        solarStatus: 'failed',
        solarAlert:
          `${t('Query timeout')} - ` +
          t(
            `visualization queries are set to timeout at ${
            action.timeout
            } seconds. `,
          ) +
          t(
            'Perhaps your data has grown, your database is under unusual load, ' +
            'or you are simply querying a data source that is too large ' +
            'to be processed within the timeout range. ',
          ),
        solarUpdateEndTime: now(),
      };
    },
    [actions.SOLAR_UPDATE_STOPPED]() {
      return {
        ...state,
        solarStatus: 'stopped',
        solarAlert: t('Updating solar was stopped'),
        solarUpdateEndTime: now(),
      };
    },
    [actions.SOLAR_UPDATE_FAILED]() {
      return {
        ...state,
        solarStatus: 'failed',
        solarAlert: action.queryResponse
          ? action.queryResponse.error
          : t('Nextwork error'),
        solarUpdateEndTime: now(),
        queryResponse: action.queryResponse,
        solarStackTrace: action.queryResponse
          ? action.queryResponse.stacktrace
          : null,
      };
    },
    [actions.SAVE_SOLAR_DATA_SUCCESS]() {
      return {
        ...state,
        data: action.data,
      };
    },
    [actions.SAVE_SOLAR_DATA_FAILED]() {
      return {
        ...state,
        saveModalAlert: 'Failed to save slice',
      };
    },
    [actions.REQEUST_SOLAR_DATA_STARTED]() {
      return {
        ...state,
        sending: true,
      };
    },
    [actions.REQEUST_SOLAR_DATA_SUCCEEDED]() {
      return {
        ...state,
        sending: false,
        requestStatus: 'success',
      };
    },
    [actions.REQUEST_SOLAR_DATA_FAILED]() {
      return {
        ...state,
        requestStatus: 'failed',
      };
    },
  };

  if (action.type in actionHandlers) {
    return actionHandlers[action.type]();
  }

  return state;
}
