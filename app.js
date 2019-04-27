const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const fill = document.getElementById("jsFill");
const brush = document.getElementById("jsBrush");
const saveBtn = document.getElementById("jsSave");

const defaultColor = "#2c2c2c";

const ctx = canvas.getContext("2d");
const CANVAS_SIZE = 700;

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(e) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    const beginPath = ctx.beginPath();
    ctx.moveTo(x, y);
    e.target.style.cursor = "default";
  } else {
    e.target.style.cursor = "crosshair";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(e) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const range = e.target.value;
  ctx.lineWidth = range;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Brush";
  }
}

function handleModeChange(e) {
  if (e.target === fill) {
    filling = true;
  } else if (e.target === brush) {
    filling = false;
  }
}

function handleContextMenu(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = "제목없음";
  link.click();
}

function init() {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
  }

  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );

  if (range) {
    range.addEventListener("input", handleRangeChange);
  }

  //   if (mode) {
  //     mode.addEventListener("click", handleModeClick);
  //   }

  if (fill) {
    fill.addEventListener("click", handleModeChange);
  }

  if (brush) {
    brush.addEventListener("click", handleModeChange);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }
}

init();
