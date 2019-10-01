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
import ReactEcharts from 'echarts-for-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import InfoIcon from '@material-ui/icons/Info';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
  card: {
    minWidth: 565,
    minHeight: 330,
    padding: 0,
    margin: '20 10',
    marginLeft: 0,
  },
  cardContent: {
    padding: 0,
  },
  cardHeader: {
    width: 40,
  },
  typography: {
    margin: theme.spacing(2),
    fontSize: 15,
    width: 300,
  },
});

class SolarCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heatmapAnchor: null,
      barchartAnchor: null,
    };

    this.handleHeatmapClick = this.handleHeatmapClick.bind(this);
    this.handleHeatmapClose = this.handleHeatmapClose.bind(this);
    this.handleBarchartClick = this.handleBarchartClick.bind(this);
    this.handleBarchartClose = this.handleBarchartClose.bind(this);
    this.getBarchartOption = this.getBarchartOption.bind(this);
    this.getHeatmapOption = this.getHeatmapOption.bind(this);
  }

  getHeatmapOption(data) {
    const months = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ];
    const years = ['2018', '2017'];

    let solarData = [
      [0, 0, Math.round(data[1][12])],
      [0, 1, Math.round(data[1][13])],
      [0, 2, Math.round(data[1][14])],
      [0, 3, Math.round(data[1][15])],
      [0, 4, Math.round(data[1][16])],
      [0, 5, Math.round(data[1][17])],
      [0, 6, Math.round(data[1][18])],
      [0, 7, 0],
      [0, 8, 0],
      [0, 9, 0],
      [0, 10, 0],
      [0, 11, 0],
      [1, 0, Math.round(data[1][0])],
      [1, 1, Math.round(data[1][1])],
      [1, 2, Math.round(data[1][2])],
      [1, 3, Math.round(data[1][3])],
      [1, 4, Math.round(data[1][4])],
      [1, 5, Math.round(data[1][5])],
      [1, 6, Math.round(data[1][6])],
      [1, 7, Math.round(data[1][7])],
      [1, 8, Math.round(data[1][8])],
      [1, 9, Math.round(data[1][9])],
      [1, 10, Math.round(data[1][10])],
      [1, 11, Math.round(data[1][11])],
    ];

    const solarValues = solarData.map(item => item[2]);
    const maxSolarValue = Math.max(...solarValues);

    solarData = solarData.map(function (item) {
      return [item[1], item[0], item[2] || '-'];
    });

    const option = {
      title: {
        text: 'Year-on-Year Average',
        show: true,
        left: 'center',
        top: -5,
      },
      toolbox: {
        feature: {
          saveAsImage: {
            pixelRatio: 2,
            title: 'Save As Image',
          },
        },
        right: 55,
        top: -5,
      },
      tooltip: {
        position: 'top',
      },
      animation: false,
      grid: {
        height: '70%',
        y: '10%',
      },
      xAxis: {
        type: 'category',
        data: months,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        data: years,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: maxSolarValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 1,
        inRange: {
          color: ['#adfff1', '#22c3aa', '#489795'],
        },
      },
      series: [
        {
          name: '☀️ Irradiance ☀️ (W/m²)',
          type: 'heatmap',
          data: solarData,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            color: 'rgb(128, 128, 0)',
          },
          tooltip: {
            position: 'bottom',
          },
        },
      ],
    };
    return option;
  }

  getBarchartOption(data) {
    if (data) {
      // const data1 = data[1].map(x => x.toNumber());
      const data1 = data[1];
      const xAxisData = data[0];

      const option = {
        title: {
          text: 'Monthly Average',
          show: true,
          left: 'center',
          top: -5,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              pixelRatio: 2,
              title: 'Save As Image',
            },
          },
          right: 55,
          top: -5,
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          name: '(W/m²)',
        },
        itemStyle: {
          color: '#489795',
        },
        series: [
          {
            name: '☀️ Irradiance ☀️ (W/m²)',
            type: 'bar',
            data: data1,
            animationDelay(idx) {
              return idx * 10;
            },
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate(idx) {
          return idx * 5;
        },
      };

      return option;
    }
    return {};
  }

  handleHeatmapClick(event) {
    this.setState({
      heatmapAnchor: event.currentTarget,
    });
  }

  handleBarchartClick(event) {
    this.setState({
      barchartAnchor: event.currentTarget,
    });
  }

  handleHeatmapClose() {
    this.setState({
      heatmapAnchor: null,
    });
  }

  handleBarchartClose() {
    this.setState({
      barchartAnchor: null,
    });
  }

  render() {
    const { classes, queryData, width } = this.props;
    const { heatmapAnchor, barchartAnchor } = this.state;
    const openHeatmap = Boolean(heatmapAnchor);
    const openBarchart = Boolean(barchartAnchor);

    const barchartOptions = this.getBarchartOption(queryData);
    const heatmapOptions = this.getHeatmapOption(queryData);

    const isSmallScreen = /xs|sm|md/.test(width);
    const rootStyle = {
      display: isSmallScreen ? 'initial' : 'flex',
    };

    return (
      <div style={{ ...rootStyle }}>
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton
                style={{ zIndex: 10 }}
                onClick={this.handleHeatmapClick}
              >
                <InfoIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.cardContent}>
            <ReactEcharts
              style={{ width: '100%', height: 350, marginTop: -50 }}
              option={heatmapOptions}
            />
          </CardContent>
        </Card>
        <Popover
          id="heatmap-popper"
          open={openHeatmap}
          anchorEl={heatmapAnchor}
          onClose={this.handleHeatmapClose}
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
            Heat Map: Year-on-Year Average Solar Irradiance
          </Typography>
        </Popover>

        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton
                style={{ zIndex: 10 }}
                onClick={this.handleBarchartClick}
              >
                <InfoIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.cardContent}>
            <ReactEcharts
              style={{ width: '100%', height: 330, marginTop: -50 }}
              option={barchartOptions}
            />
          </CardContent>
        </Card>
        <Popover
          id="barchart-popper"
          open={openBarchart}
          anchorEl={barchartAnchor}
          onClose={this.handleBarchartClose}
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
            Monthly Average Solar Irradiance
          </Typography>
        </Popover>
      </div>
    );
  }
}

SolarCharts.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  queryData: PropTypes.array.isRequired,
};

export default withWidth()(withStyles(styles)(SolarCharts));
