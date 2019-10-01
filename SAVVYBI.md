<!--
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
-->

# SavvyBI

## Vertical Menu

* Edit HTML in `base.html`, `basic.html`, `navbar.html` and `navbar_right.html` files
* Create one file called `menu.less` in  `./superset/assets/stylesheets/less/cosmo` and import it in  `superset/assets/stylesheets/less/index.less` file (for CSS style)

## Change Logo
* Save file `SavyBI-Logo-White.png` in `/incubator-superset/docs/images/`
* Update file `config.py` at line **101** to `APP_ICON = '/static/assets/images/SavyBI-Logo-White.png'`

## Add PowerBI

* Update `superset/assets/src/explore/visTypes.jsx` to add new chart

```
powerBI_report: {....} ,
powerBI_report_visual: {....},
powerBI_report_dashboard: {...},
powerBI_report_title: {....}
```

* Add new control in file `superset/assets/src/explore/controls.jsx`

```
token: {...} ,
report_id{...}
```

* Update `superset/static/assets/src/visualizations/index.js`

```
export const VIZ_TYPES = { ....
powerBI_report: 'powerBI_report',
powerBI_report_visual: 'powerBI_report_visual',
powerBI_report_dashboard: 'powerBI_report_dashboard',
powerBI_report_title: 'powerBI_report_title',}

const vizMap = { ....
[VIZ_TYPES.powerBI_report]: () => loadVis(import(/* webpackChunkName: "line_chart" */ './embedded_powerbi.js')),
[VIZ_TYPES.powerBI_report_dashboard]: () => loadVis(import(/* webpackChunkName: "embedded_powerbi_dashboard" */ './embedded_powerbi_dashboard.js')),
[VIZ_TYPES.powerBI_report_title]: () => loadVis(import(/* webpackChunkName: "line_chart" */ './embedded_powerbi_title.js')),
[VIZ_TYPES.powerBI_report_visual]: () => loadVis(import(/* webpackChunkName: "line_chart" */ './embedded_powerbi_visual.js')), }
```

* Add new class in file `superset/viz.py`

```
class EmbedPowerBIViz(BaseViz): ...
class EmbedPowerBIViz_Visual(BaseViz): ...
```

## Add Line Chart & Area Chart

* Update `superset/assets/src/explore/visTypes.jsx`

```
area_chart: {...}
line_chart{...}
```

* Create `line_chart.js` and `area_chart.js` files. We will add our custom code into those two files.

* Update `superset/static/assets/src/visualizations/index.js`

```
export const VIZ_TYPES = { ....
line_chart: 'line_chart',
area_chart: 'area_chart',}

const vizMap = { …
[VIZ_TYPES.line_chart]: () => loadVis(import(/* webpackChunkName: "line_chart" */ './line_chart.js')),
[VIZ_TYPES.area_chart]: () => loadVis(import(/* webpackChunkName: "line_chart" */ './area_chart.js')),}
```

## Add Australia Map

Official instruction  https://superset.incubator.apache.org/visualization.html#you-need-to-add-a-new-country

* Download `australia.geojson` from https://github.com/codeforamerica/click_that_hood/blob/master/public/data/australia.geojson
* Save `australia.geojson` in `superset/assets/src/visualizations/CountryMap/countries/australia.geojson`
* Add `Australia` into file `superset/assets/src/explore/controls.jsx` as bellow
```
select_country: {
  type: 'SelectControl',
  label: t('Country Name'),
  default: 'Australia',
  choices: [
    'Australia',
    'Belgium',
    'Brazil',
    'China',
    'Egypt',
    'France',
    'Germany',
    'India',
    ...
```
