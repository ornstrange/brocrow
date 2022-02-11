class Pedestal {
  constructor({x, y, w, h} = {}, opts = {}) {
    this.w = w || PEDE_INIT;
    this.h = h || min(windowHeight / 1.5, PEDE_HEIGHT);
    this.x = x || windowWidth / 2;
    this.y = y || windowHeight - this.h / 2;

    this.createBody({
      label: "Pedestal",
      isStatic: true,
      ...opts
    });
  }

  createBody(opts = {}) {
    this.opts = {
      chamfer: {
        radius: this.w / 4
      },
      ...opts
    };

    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.opts);
    Composite.add(world, this.body);
  };

  updateWidth(width) {
    this.w = width;

    Composite.remove(world, this.body, true);

    this.createBody(this.opts);
  };

  draw() {
    let {x, y} = this.body.position;

    // Color
    push();
    fill('#000000');
    noStroke();

    // Body
    push();
    translate(x - this.w / 2, y - this.h / 2);
    scale(this.w, this.h);
    rect(0, 0, 1, 1, 0.25);
    pop();

    pop();
  }
};

