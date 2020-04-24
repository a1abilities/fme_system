import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IdleTimer from 'react-idle-timer'

import './styles.scss';

import {APP_TOKEN} from './api/Constants';

import App from './App';
 
class YourApp extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
  }
 
  render() {
    return (
      <div>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={1000 * 60 * 15} />

          <App />
        {/* your app here */}
      </div>
    )
  }
 
  _onAction(e) {
    // console.log('user did something', e)
    // console.log("current tie", new Date())

  }
 
  _onActive(e) {
    // console.log('user is active', e)
    // console.log('time remaining', this.idleTimer.getRemainingTime())
    // console.log("current tie", new Date())

    if( this.idleTimer.getRemainingTime() === 0) {
      APP_TOKEN.remove();
      window.location.reload()
    }
  }
 
  _onIdle(e) {
    // console.log('user is idle', e)
    // console.log('last active', this.idleTimer.getLastActiveTime())
    // console.log("current tie", new Date())

  }
}

ReactDOM.render(<YourApp />, document.getElementById('app'));

// import './myStyles.scss';

// class App extends React.Component {
//   state = {
//     CaptainKirkBio: {},
//     Foo: null, // Foo is out component
//   };

//   componentDidMount() {
//     this.onGetKirkBio();
//     import(/* webpackChunkName: 'Foo' */ './Foo').then(Foo => {
//       this.setState({ Foo: Foo.default });
//     });
//   }

//   onGetKirkBio = async () => {
//     try {
//       const result = await fetch('http://stapi.co/api/v1/rest/character/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: {
//           title: 'James T. Kirk',
//           name: 'James T. Kirk',
//         },
//       });
//       const resultJSON = await result.json();
//       const character = resultJSON.characters[0];
//       this.setState({ CaptainKirkBio: character });
//     } catch (error) {
//       // console.log('error', error);
//     }
//   };

//   render() {
//     const { CaptainKirkBio, Foo } = this.state;
//     return (
//       <div className="app">
//         <img alt="header" src="/dist/images/header.jpg" className="app-header" />
//         <p>
//           We are a most promising species, Mr. Spock, as predators go. Did you know that? I I
//           frequently have my doubts. I dont. Not any more. And maybe in a thousand
//           years or so will
//           be able to prove it.
//         </p>
//         <p>- Captain Kirk</p>
//         <section>
//           {Object.values(CaptainKirkBio).length === 0 ? (
//             <p>Loading User Information</p>
//           ) : (
//             <p style={{ wordBreak: 'break-all' }}>{JSON.stringify(CaptainKirkBio)}</p>
//           )}
//         </section>
//         {Foo ? <Foo /> : <p>Foo is loading</p>}
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));
