import { h, render, Component } from 'preact';

class App extends Component {
  state = {
    done: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ done: true }), 1000);
  }

  render({}, { done }) {
    return (
      <p>
        {done ? 'Done!' : 'Not done yet'}
      </p>
    );
  }
}

render(<App />, document.getElementById('app'));