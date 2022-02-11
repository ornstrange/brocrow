class Crow {
  constructor({x, y, bw, bh, ww, wh} = {}, opts = {}) {
    x = x || 0;
    y = y || 0;

    this.bw = bw || 50;
    this.bh = bh || 50;
    this.ww = ww || 50;
    this.wh = wh || 50;

    opts = {
      collisionFilter: {
        category: 2,
        mask: 1
      },
      chamfer: {
        radius: this.bw / 4
      },
      ...opts
    };

    this.lwing = Bodies.rectangle(x - this.ww / 4, y, this.ww / 2, this.wh, {
      label: "Crow Left Wing",
      ...opts
    });
    this.rwing = Bodies.rectangle(x + this.ww / 4, y, this.ww / 2, this.wh, {
      label: "Crow Right Wing",
      ...opts
    });
    this.body = Bodies.rectangle(x, y, this.bw, this.bh, {
      label: "Crow Body",
      ...opts
    });

    this.lwconst = Constraint.create({
      bodyA: this.body,
      bodyB: this.lwing,
      pointA: {x: -this.bw / 4, y: 0.0},
      pointB: {x: this.ww / 8, y: 0.0},
      stiffness: 0.08
    });

    this.rwconst = Constraint.create({
      bodyA: this.body,
      bodyB: this.rwing,
      pointA: {x: this.bw / 4, y: 0.0},
      pointB: {x: -this.ww / 8, y: 0.0},
      stiffness: 0.08
    });

    this.wconst = Constraint.create({
      bodyA: this.lwing,
      bodyB: this.rwing,
      pointA: {x: -this.ww / 4, y: 0.0},
      pointB: {x: this.ww / 4, y: 0.0},
      stiffness: 0.8
    });

    Composite.add(world, [
      this.lwing, this.rwing, this.body, this.lwconst, this.rwconst, this.wconst
    ]);
  }

  draw() {
    // Color
    push();
    fill('#000000');
    noStroke();

    // Body
    let b = this.body.position;
    push();
    translate(b.x, b.y);
    rotate(this.body.angle);
    translate(-this.bw / 2, -this.bh / 2);
    scale(this.bw, this.bh);
    rect(0, 0, 1, 1, 0.25);
    pop();

    // Wings
    let lw = this.lwing.position;
    push();
    translate(lw.x, lw.y);
    rotate(this.lwing.angle);
    translate(-this.ww / 4, -this.wh / 2);
    scale(this.ww / 2, this.wh);
    rect(0, 0, 1, 1, 0.25);
    pop();

    let rw = this.rwing.position;
    push();
    translate(rw.x, rw.y);
    rotate(this.rwing.angle);
    translate(-this.ww / 4, -this.wh / 2);
    scale(this.ww / 2, this.wh);
    rect(0, 0, 1, 1, 0.25);
    pop();

    pop();
  }
};

