import React, { Component } from 'react'
import './cusomContext.scss';

class CustomContext extends Component {

  state = {
    visible: false,
    x: 0,
    y: 0,
  }


  componentDidMount() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const clickX = e.clientX;
      const clickY = e.clientY;
      this.setState({ visible: true, x: clickX, y: clickY });
    })

    document.addEventListener('click', (e) => {
      e.preventDefault();
      this.setState({ visible: false, x: 0, y: 0 });
    });
  };

  returnMenu = (items) => {
    let myStyle = {
      'position': 'absolute',
      'top': `${this.state.y}px`,
      'left': `${this.state.x + 5}px`,
    }

    return (
      <div className="custom-context" id="text" style={myStyle}>
        {items.map((item, index, arr) => {
          if (arr.length -1 === index) {
            return <div key={index} className="custom-context-item-last">
              {item.label}
            </div>
          } else {
          <div key={index} className="custom-context-item">{item.label}</div>
          }
        })}
      </div>
    )
  }

  render() {
    return (
      <div id="cmenu">
        {this.state.visible ? this.returnMenu(this.props.items) : null}
      </div>
    );
  }
}

export default CustomContext;
