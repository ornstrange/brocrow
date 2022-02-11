function allEvents() {
  collisionEvents();
	mouseEvents();
};

function mouseEvents() {
  Events.on(mouseConst, "mousedown", (ev) => {
    let pos = ev.mouse.position;
    let dist = {
      x: pos.x - crow.body.position.x,
      y: pos.y - crow.body.position.y
    }
    dist = Vector.normalise(dist);
    let vel = {
      x: dist.x * XVEL,
      y: max(dist.y * YVEL, -0.1)
    };
    Body.applyForce(crow.body, crow.body.position, vel);
	});
};

function collisionEvents() {
  Events.on(crow.body, 'onCollide', (ev) => {
    if (ev.pair.bodyB === pede.body && crow.body.position.y < pede.body.bounds.min.y) {
        touching = 0;
    }
  });
  Events.on(crow.body, 'onCollideActive', (ev) => {
    if (ev.pair.bodyB === pede.body && crow.body.position.y < pede.body.bounds.min.y) {
      touching += deltaTime;
      if (touching > STAY) {
        Body.setVelocity(crow.body, OFFVEL);
        if (pede.w > PEDE_LIM) {
          pede.updateWidth(pede.w - 25);
        }
        touching = 0;
        score += 1;
        timer = TIME_LIM;
        kaw.play();
      }
    }
  });
  Events.on(crow.body, 'onCollideOff', (ev) => {
    if (ev.pair.bodyB === pede.body && crow.body.position.y < pede.body.bounds.min.y) {
      touching = 0;
    }
  });
};

