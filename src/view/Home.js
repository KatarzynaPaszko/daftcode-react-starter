import React from 'react';
import PropTypes from 'prop-types';

import './Home.sass';

Object.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerText: 'Timer',
      timerStartText: 'Odliczaj od',
      timerEndText: 'do',
      startState: '',
      stopState: '',
      currentState: '',
      isPaused: false,
      startStopButton: 'Start',
      reastartButton: 'Zrestartuj',
      displayedTimer: '--:--:--',
      message: "Uruchom Timer."
    };
    this.reastartTimer = this.reastartTimer.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.toHHMMSS = this.toHHMMSS.bind(this);

  }
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  handleChangeFrom(event) {
    this.setState({startState: Number(event.target.value)});
  }
  handleChangeTo(event) {
    this.setState({stopState: Number(event.target.value)});
  }
  reastartTimer(){
    clearInterval(this.intervalId);
    // this.setState({currentState: this.state.startState});
    this.setState({displayedTimer: '--:--:--' });
    this.setState({message: 'Timer zrestartowany'});
    this.setState({startStopButton: 'Start'})
    this.setState({isPaused: !this.state.isPaused})
    this.setState({currentState: this.state.startState});
  }
  startStopTimer(){

    if (this.state.startState ==='') {
      this.setState({message: 'Wpisz wartość od jakiej należy zacząć odliczanie!'})
      return;
    }
    if (this.state.stopState ==='') {
      this.setState({message: 'Wpisz wartość kiedy zakończyć odliczanie!'})
      return;
    }
    if (this.state.currentState === '') {
      this.setState({currentState: this.state.startState});
    }
    this.setState({isPaused: !this.state.isPaused})
    if (this.state.isPaused === true ) {
      clearInterval(this.intervalId);
      this.setState({startStopButton: 'Start'})
      this.setState({message: 'Timer wstrzymany'});
    } else {
      this.setState({startStopButton: 'Stop'})
      this.setState({message: 'Odliczanie trwa'});
      this.intervalId = setInterval(function() {
        if (this.state.currentState === this.state.stopState) {
          this.setState({message: 'Zakończono odliczanie'});
          return;
        } else if (this.state.currentState > this.state.stopState) {
          this.setState({
            currentState: Number(this.state.currentState) - 1

          })
        } else {
          this.setState({
            currentState: Number(this.state.currentState) + 1
          })
        }
        this.setState({displayedTimer: this.state.currentState.toHHMMSS() });
      }.bind(this), 1000);
    }
  }

  render() {
    const { timerText } = this.state;
    const { timerStartText } = this.state;
    const { timerEndText } = this.state;
    const { startState } = this.state;
    const { startStopButton } = this.state;
    const { reastartButton } = this.state;
    const { displayedTimer } = this.state;
    const { message } = this.state;


    const { username } = this.props;

    return (
      <div>
        <h2 className="welcome" style={{marginBottom: '30px'}}>
          {timerText}
          <span className="username">{`: ${username}`}</span>
        </h2>
        <div className="container">
          <div className="row">

            <div className="col-3">
              <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-lg">{timerStartText}</span>
                </div>
                <input type="number" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={this.state.startState} onChange={this.handleChangeFrom} />
              </div>
            </div>

            <div className="col-3">
              <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-lg">{timerEndText}</span>
                </div>
                <input type="number" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={this.state.stopState} onChange={this.handleChangeTo} />
              </div>
            </div>

          </div>
          <br></br>


          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-lg btn-success" onClick={this.startStopTimer}>
                <b>{startStopButton}</b>
              </button>
              &nbsp;
              <button type="button" className="btn btn-lg btn-danger" onClick={this.reastartTimer}>
                <b>{reastartButton}</b>
              </button>
            </div>
          </div>
          <br></br>

          <div className="row">
            <div className="col-6">
              <h2>
                <span className="badge badge-primary" style={{width: '100%'}}>
                  <span className="badge badge-light" style={{fontSize: '40px', width: '200px', height: '60px', float: 'left'}}>{displayedTimer}</span> &nbsp;
                  <p style={{display: 'inline-block', maxWidth: '50%', whiteSpace: 'normal'}}>{message}</p>

                </span>
              </h2>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
