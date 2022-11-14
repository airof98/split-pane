import "./App.css";
import SplitPane from "./splitPane";
import Pane from "./pane";
//import SplitPane, { Pane } from "react-split-pane-next";

function App() {
  return (
    <SplitPane split={"vertical"}>
      <Pane width={300}>
        <input />
        <button>hello</button>
      </Pane>
      <Pane width={"100%"} style={{ background: "green" }}>
        <button>test</button>
      </Pane>
    </SplitPane>
  );
}

export default App;
