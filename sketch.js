let circ;
let running;
var k = 1
var start = 1
var longest = 0
var returnsToZero = 0
// states = (Array(100 - prob * 100).fill(-1)).concat((Array(prob * 100).fill(1)))
function setup() {
  canvas = createCanvas(800, 800);
  syntax = createElement("h2", "p0, Enter a function in relation to n ")
  syntax.position(20, 5)
  syntax.style("color", '#bab1b1')
  input = createInput("0,1/(n+1)");
  input.position(20, 65);
  button = createButton("setup")
  button.position(20, 90)
  button.mousePressed(calc)
  stepButton = createButton("Step")
  stepButton.mousePressed(step)
  runButton = createButton("Run")
  runButton.mousePressed(run)
  stopButton = createButton("stop")
  stopButton.mousePressed(stop)
  noLoop();
}
function stop() {
  running = false
}
async function run() {
  running = true
  while (running) {
    step()
    await new Promise(r => setTimeout(r, 100))
  }
}
function nextStep(currentStep, probFunction, p0) {
  if (currentStep == 0) {
    states = (Array(100 - p0 * 100).fill(currentStep + 1)).concat((Array(p0 * 100).fill(0)))
    return random(states)
  }
  else {
    prob = parseFloat(probFunction(currentStep).toFixed(4))
    console.log(prob)
    l1 = parseInt(10_000 - prob * 10_000)
    l2 = parseInt(prob * 10_000)
    states = (Array(l1).fill(currentStep + 1)).concat((Array(l2).fill(0)))
    return random(states)
  }
}

function step() {
  [p0, f] = input.value().split(',')
  probFunction = new Function("n", `return ${f}`)
  k = nextStep(k, probFunction, parseFloat(p0))
  console.log(k)
  if (k > longest) { longest = k }
  if (k == 0) {
    returnsToZero += 1
    coordinateSytem(1)
    start = 1
    circ = circle(333, 290, 10)
  }
  else {
    if ((k % 25) == 0) {
      coordinateSytem(k)
      start = k
      circ = circle(40 + ((k - 1) % 25) * 30, 350, 10)
    }
    else {
      coordinateSytem(start)
      circ = circle(40 + ((k - 1) % 25) * 30, 350, 10)
    }
  }

}
function calc() {
  k = 1
  ps = input.value()
  coordinateSytem(1)

}
function coordinateSytem(c) {
  strokeWeight(2)
  background(0)
  fill(255)
  //HORIZONTAL axis
  line(10, 400, 800, 400)
  //HORIZONTAL
  s = c
  text(0, 330, 300, 100, 100)
  text(`Visits to Zero: ${returnsToZero}`, 450, 50, 100, 100)
  text(`Longest Run: ${longest}`, 450, 80, 100, 100)
  for (var i = 30; i < 800; i += 30) {
    // line(i + 10, 395, i + 10, 405)

    text(s.toString(), i + 10 - 5, 380, 100, 100)
    s += 1
  }
}
function draw() {

}
