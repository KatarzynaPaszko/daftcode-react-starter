import React from 'react';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { timerText } = this.props;
    const { username } = this.props;

    return (
      <h2 className="welcome mrgBtm">
        {timerText}
        <span className="username">{`: ${username}`}</span>
      </h2>
    )
  }

}

export default Header;
