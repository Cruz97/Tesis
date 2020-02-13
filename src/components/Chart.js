import React, { Component } from 'react';
import moment from 'moment';

export default class Chart extends Component {
  getData() {
    let indicator,
      item,
      data = {
        periodLabel: ''
      };
    const { periodType } = this.props;
    if (!periodType) {
      return {};
    }
    let period = null;
    const today = moment();
    switch (periodType) {
      case 'W':
        period = `${today.year()}_${today.isoWeek()}`;
        data.periodLabel = `Semana ${today.isoWeek()}`;
        break;
      case 'M':
        period = `${today.year()}_${today.month() + 1}`;
        data.periodLabel = `Mes ${today.month() + 1}`;
        break;
      case 'Y':
        period = `${today.year()}`;
        data.periodLabel = `Año ${today.year()}`;
        break;
    }
    indicator = this.props.data.find(item => item.period === period);
    if (indicator) {
      data.period = indicator.period;
      for (let i in indicator.items) {
        item = indicator.items[i];
        for (let k in item) {
          data[item.label + '_' + k.toUpperCase()] = item[k];
        }
      }
    }

    return data;
  }
}
