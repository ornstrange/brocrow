// Matter.js shorthands
const Engine			= Matter.Engine,
			Render 			= Matter.Render,
			Runner 			= Matter.Runner,
			Body				= Matter.Body,
			Events			= Matter.Events,
			Constraint	= Matter.Constraint,
			Compound		= Matter.Compound,
			Composite		= Matter.Composite,
			Composites	= Matter.Composites,
			Mouse				= Matter.Mouse,
			MouseConst	= Matter.MouseConstraint,
			World				= Matter.World,
			Sleeping		= Matter.Sleeping,
			Vector		  = Matter.Vector,
			Bodies			= Matter.Bodies;

// Window size
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

// Constants
const GRAVITY = 2.8;
const XVEL = 0.08;
const YVEL = 0.12;
const STAY = 1000;
const TIME_LIM = 5000;
const PEDE_HEIGHT = 600;
const PEDE_INIT = 500;
const PEDE_LIM = 50;
const PEDE_INC = 25;
const OFFVEL = {
  x: -100,
  y: -50
}

// Default values
let score = 0;
let touching = 0;
let timer = TIME_LIM;

// Uninitialized
let canvas, runner, engine, world, mouse, mouseConst, crow, kaw, lastDelta;

