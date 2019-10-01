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
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.GoogleApi = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var GoogleApi = exports.GoogleApi = function GoogleApi(opts) {
    opts = opts || {};

    if (!opts.hasOwnProperty('apiKey')) {
      throw new Error('You must pass an apiKey to use GoogleApi');
    }

    var apiKey = opts.apiKey;
    var libraries = opts.libraries || ['places'];
    var client = opts.client;
    var URL = opts.url || 'https://maps.googleapis.com/maps/api/js';

    var googleVersion = opts.version || '3.31';

    var script = null;
    var google = typeof window !== 'undefined' && window.google || null;
    var loading = false;
    var channel = null;
    var language = opts.language;
    var region = opts.region || null;

    var onLoadEvents = [];

    var url = function url() {
      var url = URL;
      var params = {
        key: apiKey,
        callback: 'CALLBACK_NAME',
        libraries: libraries.join(','),
        client: client,
        v: googleVersion,
        channel: channel,
        language: language,
        region: region
      };

      var paramStr = Object.keys(params).filter(function (k) {
        return !!params[k];
      }).map(function (k) {
        return k + '=' + params[k];
      }).join('&');

      return url + '?' + paramStr;
    };

    return url();
  };

  exports.default = GoogleApi;
});