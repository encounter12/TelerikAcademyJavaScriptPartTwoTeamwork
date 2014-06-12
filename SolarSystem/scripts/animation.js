function Animation() {

    var anim;

    function start(solarSystem, layer) {
        var anim = new Kinetic.Animation(function (frame) {
            var bodies = solarSystem.spaceObjects;

            for (var i = 0, len = bodies.length; i < len; i += 1) {
                //planets orbiting around the Sun
                bodies[i].setX(bodies[i].distanceToSun * Math.cos(frame.time * 2 * Math.PI / bodies[i].period) + bodies[i].orbit.x());
                bodies[i].setY(bodies[i].distanceToSun * Math.sin(frame.time * 2 * Math.PI / bodies[i].period) + bodies[i].orbit.y());
                
                //planets rotating on their axes
                angleDiff = frame.timeDiff * bodies[i].angularSpeed / 1000;
                bodies[i].rotate(angleDiff);
            }

            //Sun rotating on its axis
            angleDiff = frame.timeDiff * sun.angularSpeed / 1000;
            sun.rotate(angleDiff);

        }, layer);

        anim.start();
    }

    function stop() {
        anim.stop();
    }
}