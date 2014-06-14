/*global Orbit, animation */
function Planet(data) {

	var orbitCenterX = animation.width / 2 + data.orbitOffset.x;
	var orbitCenterY = animation.height / 2 + data.orbitOffset.y;

	this.name = data.name;
	//this.speed = data.orbitSpeed;
	this.period = 10000 / data.orbitSpeed;
	this.radius = data.radius;
	this.angularSpeed = data.angularSpeed;
	this.orbit = new Orbit(orbitCenterX, orbitCenterY, data.orbitRadiusX, data.orbitRadiusY);
	this.imgSrc = data.imgSrc;
	this.info = data.data;
}