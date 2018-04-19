import React from 'react';

class Input extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { timerText } = this.props;
    const { inputValue } = this.props;
    const { inputFunction } = this.props;

    return (
      <div className="col-lg-3 col-md-6">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">{timerText}</span>
          </div>
          <input type="number" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={inputValue} onChange={inputFunction} />
        </div>
      </div>
    )
  }

}

export default Input;
