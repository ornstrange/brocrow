// Matter setup
function matterSetup() {
  Matter.use('matter-collision-events'); // Collision plugin

	engine = Engine.create();

	world = engine.world;
	world.gravity.y = GRAVITY;

// 	runner = Runner.create
//   Runner.run(engine, runner); // Start the engine

  // Walls
  let floor = new Bodies.rectangle(windowWidth / 2, windowHeight + 200,
    windowWidth, 400, {isStatic: true});
  let ceil = new Bodies.rectangle(windowWidth / 2, -200,
    windowWidth, 400, {isStatic: true});
  let lwall = new Bodies.rectangle(-200, windowHeight / 2, 400,
    windowHeight, {isStatic: true});
  let rwall = new Bodies.rectangle(windowWidth + 200,
    windowHeight / 2, 400, windowHeight, {isStatic: true});
  Composite.add(engine.world, [floor, ceil, lwall, rwall]);
};

function addMouse() {
  mouseConst = MouseConst.create(engine, {
    mouse: mouse,
    collisionFilter: {
      category: 2,
      mask: 1
    }
  });
  World.add(world, mouseConst);
};

// Preload sounds
function preload() {
  soundFormats('wav');
  kaw = loadSound("Crow.wav");

  badKaw = loadSound("badCrow.mp3");
  badKaw.setVolume(0.7);
  reverb = new p5.Reverb();
  distort = new p5.Distortion();
  distort.process(badKaw, 0.4);
  reverb.process(badKaw, 4, 1.8);
};

// Main setup
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

	pixelDensity(1);

	textFont("Arial");
	textFont("Helvetica");

	matterSetup();
	// createObjects();
  crow = new Crow({x: 30, y: 30, ww: 110, wh: 20, bw:30, bh: 40}, {
    density: 0.0006,
    friction: 0.020
  });

  pede = new Pedestal();

  // let render = Render.create(
  //   {
  //     canvas: canvas.elt,
  //     engine: engine,
  //     options: {
  //       width: windowWidth,
  //       height: windowHeight,
  //     }
  //   }
  // );

  // Render.run(render);

	// mús drasl
	mouse = Mouse.create(canvas.elt);
	addMouse();

	// bæta events inn
	allEvents();
};

function update() {
  if (score > 0) {
    timer -= deltaTime;
  }

  if (timer < 0) {
    badKaw.play();
    timer = TIME_LIM;
    score = 0;
    pede.updateWidth(PEDE_INIT);
    Body.setVelocity(crow.body, OFFVEL);
  }

  lastDelta = lastDelta || deltaTime;
  Engine.update(engine, deltaTime, deltaTime / lastDelta);
  lastDelta = deltaTime;
};

// Draw loop
function draw() {
  update();

  background(255, 255, 255);

  drawScore();
  drawCountdown();

  crow.draw();
  pede.draw();
};

// Resize handler
function windowResized(ev) {
  windowHeight = ev.target.windowHeight;
  windowWidth = ev.target.windowWidth;
  resizeCanvas(windowWidth, windowHeight);
};

