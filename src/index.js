// import SimpleReact from "./SimpleReact.js";
import SimpleReact from "./react";
import SimpleReactDom from "./react-dom";

function Counter() {
  const [count, setCount] = SimpleReact.useState(1);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}
SimpleReactDom.render(<Counter />, document.getElementById("root"));
