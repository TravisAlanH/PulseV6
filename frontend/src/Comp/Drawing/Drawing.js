import React from "react";
import "./drawing.css";
import Draggable from "react-draggable";

export default function Drawing() {
  const [width, setWidth] = React.useState(10);
  const [height, setHeight] = React.useState(10);

  React.useEffect(() => {
    document.getElementById("GRIDDiv").style.width = width * 25 + "px";
    document.getElementById("GRIDDiv").style.height = height * 25 + "px";
  }, [width, height]);

  return (
    <div>
      <label>width ft:</label>
      <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
      <label>height ft:</label>
      <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      <div id="GRIDDiv" className="outline-2 grid overflow-hidden">
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          // position={null}
          grid={[25, 25]}
          scale={1}
          bounds={document.getElementById("GRIDDiv")}
          // onStart={this.handleStart}
          // onDrag={this.handleDrag}
          // onStop={this.handleStop}
        >
          <div className="handle border-[1px] w-[200px] h-[200px] bg-slate-300">
            <div>Drag from here</div>
          </div>
        </Draggable>

        <Draggable
          id={"Drag1"}
          axis="both"
          handle=".handle1"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
          cancel=".just-name"
          // onStart={this.handleStart}
          // onDrag={this.handleDrag}
          // onStop={this.handleStop}
        >
          <div className="handle1 border-[1px] w-[100px] h-[100px] bg-white wall" id={"Drag1"}>
            <input
              type="number"
              className="just-name"
              onChange={(e) => {
                e.preventDefault();
                document.getElementById("Drag1").style.width = e.target.value + "px";
              }}
            />
          </div>
        </Draggable>
      </div>
    </div>
  );
}
