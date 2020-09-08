import React, { Component } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './style.scss';

const now = new Date();

const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

export default class RangeSample extends Component {
  state = {
    value: [yesterdayBegin, todayEnd],
  };


  onChange = value => {
    console.log(value);
    this.setState({value})
  }

  render() {
    return (
      <div className="Sample">
      <header>
        <h1>daterange-picker example</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <DateRangePicker 
            calendarAriaLabel="Toggle Calendar"
            clearAriaLabel="clear value"
            dayAriaLabel="day"
            onChange={this.onChange}  
            value={this.state.value}
            
          />
        </main>
      </div>
    </div>
    )
  }
}

// 이 라이브러리는 조금 그렇다. 데이터를 다 포함하는게 아니라 그냥 처음과 끝의 날짜를 기준으로 렌더링을 한다. 
