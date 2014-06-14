function Planet(data) {

    var orbitCenterX = engine.stage.width / 2 + data.orbitOffset.x;
    var orbitCenterY = engine.stage.height / 2 + data.orbitOffset.y;
    
    this.name = data.name;
    this.radius = data.radius;
    this.angularSpeed = data.angularSpeed;
    this.orbit = new Orbit(orbitCenterX, orbitCenterY, data.orbitRadiusX, data.orbitRadiusY);
    this.imgSrc = data.imgSrc;
    this.info = data.data;
}
