import SimpleReact from "./SimpleReact.js";

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
SimpleReact.render(<Counter />, document.getElementById("root"));
