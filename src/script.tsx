import { render, Component } from 'preact';
import { useState } from 'preact/hooks';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

render(<App />, document.getElementById('app'));