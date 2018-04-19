import React from 'react';

class Displayer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { badgeColor } = this.props;
    const { displayedTimer } = this.props;
    const { message } = this.props;
    const { progress } = this.props;

    return (
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <h2 className="mrgBtm">
            <span className={`badge ${badgeColor}`} style={{width: '100%'}}>
              <span className="badge badge-light" style={{fontSize: '40px', width: '200px', height: '60px', float: 'left'}}>{displayedTimer}</span> &nbsp;
              <p style={{display: 'inline-block', width: 'calc(100% - 200px)', whiteSpace: 'normal'}}>{message}</p>
            </span>
          </h2>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${progress}%` }}>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Displayer;
