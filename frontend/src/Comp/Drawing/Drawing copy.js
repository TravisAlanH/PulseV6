import React, { useEffect } from "react";
import "./drawing.css";
import { fabric } from "fabric";

export default function Drawing() {
  useEffect(() => {
    var canvas = new fabric.Canvas("c", { selection: false });
    var grid = 50;
    var unitScale = 10;
    var canvasWidth = 100 * unitScale;
    var canvasHeight = 100 * unitScale;

    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);

    // create grid

    for (var i = 0; i < (canvasWidth / grid) * 2; i++) {
      canvas.add(
        new fabric.Line([(i * grid) / 2, 0, (i * grid) / 2, canvasHeight], {
          type: "line",
          stroke: "#ccc",
          selectable: false,
        })
      );
      canvas.add(
        new fabric.Line([0, (i * grid) / 2, canvasWidth, (i * grid) / 2], {
          type: "line",
          stroke: "#ccc",
          selectable: false,
        })
      );
    }

    // snap to grid

    // for (var key in canvas.on) {
    //   if (typeof canvas.on[key] === "function") {
    //     console.log(key);
    //   }
    // }

    canvas.on("object:moving", function (options) {
      var target = options.target;

      // Calculate the angle in radians
      var angle = (target.angle * Math.PI) / 180;

      // Snap the angle to 45-degree intervals
      var snapAngle = Math.PI / 4; // 45 degrees in radians
      var snappedAngle = Math.round(angle / snapAngle) * snapAngle;

      // Set the snapped angle back to degrees
      target.angle = (snappedAngle * 180) / Math.PI;

      // Calculate the new position after snapping
      var dx = target.left - options.target.left;
      var dy = target.top - options.target.top;
      var rotatedDx = dx * Math.cos(snappedAngle) - dy * Math.sin(snappedAngle);
      var rotatedDy = dx * Math.sin(snappedAngle) + dy * Math.cos(snappedAngle);

      // Snap the position to grid after rotation
      target.set({
        left: Math.round((options.target.left + rotatedDx) / grid) * grid,
        top: Math.round((options.target.top + rotatedDy) / grid) * grid,
      });

      canvas.renderAll();
    });

    canvas.on("object:modified", function (options) {
      // console.log(options.target.getLocalPointer());
      // for (var key in options.target) {
      //   if (typeof options.target[key] === "function") {
      //     console.log(key);
      //   }
      // }
      var newWidth = Math.round(options.target.getScaledWidth() / grid) * grid;
      var newHeight = Math.round(options.target.getScaledHeight() / grid) * grid;

      options.target.set({
        width: newWidth,
        height: newHeight,
        scaleX: 1,
        scaleY: 1,
      });
    });

    function addObjectCanvas(event) {
      var min = 99;
      var max = 9999999;

      var random = Math.floor(Math.random() * (max - min + 1)) + min;
      var id = new Date().getTime() + random;
      canvas.add(
        new fabric.Rect({
          left: 50,
          top: 50,
          width: 50,
          height: 50,
          type: "rectangle",
          fill: "#fab",
          stroke: "",
          originX: "left",
          originY: "top",
          id: id,
          hasControls: true,
          centeredRotation: true,
        })
      );
    }
    // export json string of array of objects in format {x,y, w, h, id}
    function exportAllObjects(event) {
      var objects = canvas.getObjects();
      var len = objects.length;
      var list = [];
      for (var i = 0; i < len; i += 1) {
        var item = objects[i];
        var tmp = {};
        if (item.type === "rectangle") {
          // console.info(item);
          tmp.x = Math.round(item.left) / unitScale;
          tmp.y = Math.round(item.top) / unitScale;
          tmp.w = Math.round(item.width) / unitScale;
          tmp.h = Math.round(item.height) / unitScale;
          tmp.id = item.id;
          list.push(tmp);
        }
      }
      //console.info(JSON.stringify(list));
      var zone = document.getElementById("zone");
      zone.value = JSON.stringify(list);
    }

    function deleteList(listItems) {
      if (listItems !== undefined) {
        var len = listItems.length;
        var list = [];
        for (var i = 0; i < len; i += 1) {
          var item = listItems[i];
          if (item.type === "rectangle") {
            list.push(item);
          }
        }
        len = list.length;
        for (var i = 0; i < len; i += 1) {
          canvas.remove(list[i]);
        }
      }
    }

    function deleteAllObjects(event) {
      var objects = canvas.getObjects();
      deleteList(objects);
    }

    function importList(listItems) {
      if (listItems !== undefined) {
        var len = listItems.length;
        for (var i = 0; i < len; i += 1) {
          var item = listItems[i];
          canvas.add(
            new fabric.Rect({
              left: item.x * unitScale,
              top: item.y * unitScale,
              width: item.w * unitScale,
              height: item.h * unitScale,
              type: "rectangle",
              fill: "#fab",
              stroke: "",
              originX: "left",
              originY: "top",
              id: item.id !== undefined ? item.id : "",
              hasControls: true,
              centeredRotation: true,
            })
          );
        }
        canvas.renderAll();
      }
    }

    function importObjectCanvas(event) {
      var zone = document.getElementById("zone");
      var objects = JSON.parse(zone.value);

      importList(objects);
    }

    var index = 0,
      duration = 500,
      time;
    function animateStateCanvas(event) {
      var zone = document.getElementById("zone");
      var frames = JSON.parse(zone.value);

      importList(frames[index]);

      time = setInterval(function () {
        if (index > frames.length - 1) {
          index = 0;
          importList(frames[index]);
        } else {
          canvas.clear();
          for (var i = 0; i < canvasWidth / grid; i++) {
            canvas.add(
              new fabric.Line([i * grid, 0, i * grid, canvasHeight], {
                type: "line",
                stroke: "#ccc",
                selectable: false,
              })
            );
            canvas.add(
              new fabric.Line([0, i * grid, canvasWidth, i * grid], { type: "line", stroke: "#ccc", selectable: false })
            );
          }
          index++;
          importList(frames[index]);
        }
      }, duration);
    }

    var addObject = document.getElementById("addnew");
    addObject.addEventListener("click", addObjectCanvas);

    var exportObjects = document.getElementById("export");
    exportObjects.addEventListener("click", exportAllObjects);

    var deleteObjects = document.getElementById("delete");
    deleteObjects.addEventListener("click", deleteAllObjects);

    var importObjects = document.getElementById("import");
    importObjects.addEventListener("click", importObjectCanvas);

    var animateStates = document.getElementById("animate");
    animateStates.addEventListener("click", animateStateCanvas);

    var stopAnimateStates = document.getElementById("stop");
    stopAnimateStates.addEventListener("click", function () {
      canvas.clear();
      for (var i = 0; i < canvasWidth / grid; i++) {
        canvas.add(
          new fabric.Line([i * grid, 0, i * grid, canvasHeight], { type: "line", stroke: "#ccc", selectable: false })
        );
        canvas.add(
          new fabric.Line([0, i * grid, canvasWidth, i * grid], { type: "line", stroke: "#ccc", selectable: false })
        );
      }
      index = 0;
      clearInterval(time);
    });

    document.addEventListener("keydown", function (event) {
      var keyPressed = event.keyCode;
      if (keyPressed == 46) {
        var activeObject = canvas.getActiveObject();
        if (activeObject !== null && activeObject.type === "rectangle") {
          canvas.remove(activeObject);
        }
      }
    });
  }, []);

  return (
    <div>
      <div class="buttons">
        <button id="addnew" className="orangeButton">
          Create
        </button>
        <button id="delete" className="orangeButton">
          Clear
        </button>
        <button id="export" className="orangeButton">
          Export
        </button>
        <button id="import" className="orangeButton">
          Import
        </button>
        <button id="animate" className="orangeButton">
          Animate
        </button>
        <button id="stop" className="orangeButton">
          Stop
        </button>
      </div>
      <textarea id="zone" rows="5"></textarea>
      <canvas id="c"></canvas>
    </div>
  );
}
