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
    global.arePathsEqual = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * Compares two path arrays of LatLng objects.
   */

  var arePathsEqual = exports.arePathsEqual = function arePathsEqual(pathA, pathB) {
    if (pathA === pathB) {
      return true;
    }
    if (!Array.isArray(pathA) || !Array.isArray(pathB)) {
      return false;
    }
    if (pathA.length !== pathB.length) {
      return false;
    }
    for (var i = 0; i < pathA.length; ++i) {
      if (pathA[i] === pathB[i]) {
        continue;
      }
      if (!isValidLatLng(pathA[i]) || !isValidLatLng(pathB[i])) {
        return false;
      }
      if (pathB[i].lat !== pathA[i].lat || pathB[i].lng !== pathA[i].lng) {
        return false;
      }
    }
    return true;
  };

  /**
   * Helper that checks whether an array consists of objects
   * with lat and lng properties
   * @param {object} elem the element to check
   * @returns {boolean} whether or not it's valid
   */
  var isValidLatLng = function isValidLatLng(elem) {
    return elem !== null && (typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) === 'object' && elem.hasOwnProperty('lat') && elem.hasOwnProperty('lng');
  };
});