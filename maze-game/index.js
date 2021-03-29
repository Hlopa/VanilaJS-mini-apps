'use strict';

document.addEventListener("DOMContentLoaded", function() {
	/*Use matter.js library

		Terminology
		world - obj that contains all the things 
		engine - reads current state of the wordr obj, calc changes
		runner - gets the engine and the world wort together. Runs about 60 times per seconds
		render - when engine update show all on thw screen
		body - a shape that we are displaying. Can be a circle, rectangle, oval, etc
*/

//Preaping matter.js

const width = 800;
const height = 600;

const {Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse} = Matter;
const engine = Engine.create();
const {world} = engine;
const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width,
		height
	}		
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
	mouse: Mouse.create(render.canvas)
}));


 
//Создание и показ фигур
//Walls
const walls = [
	Bodies.rectangle(400, 0, 800, 40, {isStatic: true}),
	Bodies.rectangle(400, 600, 800, 40, {isStatic: true}),
	Bodies.rectangle(0, 300, 40, 800, {isStatic: true}),
	Bodies.rectangle(800, 300, 40, 800, {isStatic: true})
];

World.add(world, walls);

//Random Shapes

for(let i=0; i<20;i++){
	if(Math.random() > 0.5){
	World.add(world, Bodies.rectangle(Math.random()*width, Math.random()*height, 50, 50))	
	} else {
		World.add(world, Bodies.circle(Math.random()*width, Math.random()*height, 35, {
			render: {
				fillStyle: 'green'
			}
		}))
	}
};

});

