import React from 'react';

class Button extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { btnClassName } = this.props;
    const { btnFunction } = this.props;
    const { btnText } = this.props;

    return (
      <button type="button" className={btnClassName} onClick={btnFunction} style={{width: '90px'}}>
        <b>{btnText}</b>
      </button>
    )
  }

}

export default Button;
