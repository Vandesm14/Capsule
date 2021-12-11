import { render, Component } from 'preact';

import db from './lib/db';

class App extends Component {
  state = {
    viewer: [],
    key: '',
    value: ''
  }

  componentDidMount() {
    this.update();
  }

  add = () => {
    db.set(this.state.key, this.state.value);
    this.update();
  };

  remove = () => {
    db.del(this.state.key);
    this.update();
  };

  update = () => {
    console.log('state was updated to:', db.entries());
    this.setState({
      viewer: db.entries()
    });
  }

  render({}, { viewer }) {
    return (
      <div>
        <h1>db</h1>
        <div>
          <h2>viewer</h2>
          <pre>{JSON.stringify(viewer, null, 2)}</pre>
        </div>
        <div>
          <h2>add</h2>
          <div>
            <input
              type="text"
              placeholder="key"
              onInput={e => this.setState({ key: e.target.value })}
            />
            <input
              type="text"
              placeholder="value"
              onInput={e => this.setState({ value: e.target.value })}
            />
            <button onClick={this.add}>Add</button>
          </div>
        </div>
        <div>
          <h2>remove</h2>
          <div>
            <input
              type="text"
              placeholder="key"
              onInput={e => this.setState({ key: e.target.value })}
            />
            <button onClick={this.remove}>Remove</button>
          </div>
        </div>
      </div>
    )
  };
};

// @ts-expect-error: preact is different from react
render(<App />, document.getElementById('app'));