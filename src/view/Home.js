import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';
import Displayer from './Displayer';
import Header from './Header';

import './Home.sass';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startState: '',
      stopState: '',
      currentState: '',
      isPaused: false,
      startStopButton: 'Start',
      displayedTimer: '--:--:--',
      message: "Uruchom Timer.",
      badgeColor: 'badge-primary',
      btnColor: 'btn-success',
      progress: '0',
    }
    this.toHHMMSS = this.toHHMMSS.bind(this);

  }
  // static propTypes = {
  //   username: PropTypes.string.isRequired,
  // }

  handleChangeFrom = (event) => {
    this.setState({startState: Number(event.target.value)});
  }
  
  handleChangeTo = (event) => {
    this.setState({stopState: Number(event.target.value)});
  }

  reastartTimer = () => {
    clearInterval(this.intervalId);
    this.setState({displayedTimer: '--:--:--' });
    this.setState({message: 'Timer zrestartowany'});
    this.setState({badgeColor: 'badge-primary'});
    this.setState({startStopButton: 'Start'});
    this.setState({btnColor: 'btn-success'});
    this.setState({isPaused: !this.state.isPaused});
    this.setState({currentState: this.state.startState});
    this.setState({progress: '0'});
  }

  startStopTimer = () => {
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
      this.setState({badgeColor: 'badge-primary'});
    }
    this.setState({isPaused: !this.state.isPaused})
    if (this.state.isPaused === true ) {
      clearInterval(this.intervalId);
      this.setState({startStopButton: 'Start'})
      this.setState({btnColor: 'btn-success'});
      this.setState({message: 'Timer wstrzymany'});
    } else {
      this.setState({startStopButton: 'Stop'});
      this.setState({btnColor: 'btn-info'});
      this.setState({message: 'Odliczanie trwa'});
      this.intervalId = setInterval(function() {
        if (this.state.currentState === this.state.stopState) {
          this.setState({message: 'Zakończono odliczanie'});
          this.setState({badgeColor: 'badge-success'});
          return;
        } else if (this.state.currentState > this.state.stopState) {
          this.setState({currentState: Number(this.state.currentState) - 1});
          this.setState({progress: (((Number(this.state.currentState)-Number(this.state.stopState))*100)/(Math.abs(Number(this.state.stopState)-Number(this.state.startState))))});
        } else {
          this.setState({currentState: Number(this.state.currentState) + 1});
          this.setState({progress: (((Number(this.state.currentState)-Number(this.state.startState))*100)/(Math.abs(Number(this.state.stopState)-Number(this.state.startState))))});
        }
        this.setState({displayedTimer: this.state.currentState.toHHMMSS() });
      }.bind(this), 1000);
    }
  }

  render() {
    const { startStopButton, startState, stopState, btnColor, displayedTimer, progress, message, badgeColor } = this.state;
    const { username } = this.props;


    return (
      <div className="container">
        <Header timerText='Timer' username={username}/>
        <div className="row mrgBtm">
          <Input timerText='Odliczaj od' inputValue={startState} inputFunction={this.handleChangeFrom} />
          <Input timerText='do' inputValue={stopState} inputFunction={this.handleChangeTo} />
        </div>
        <div className="row mrgBtm">
          <div className="col-lg-6 col-md-12">
            <Button btnClassName={btnColor} btnFunction={this.startStopTimer} btnText={startStopButton}/>&nbsp;
            <Button btnClassName="btn-danger" btnFunction={this.reastartTimer} btnText='Zrestartuj'/>
          </div>
        </div>
        <Displayer badgeColor={badgeColor} displayedTimer={displayedTimer} message={message} progress={progress}/>
      </div>
    );
  }
}

export default Home;


// funkcja zamieniająca ilość sekund na format "godziny/minuty/sekundy"
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
