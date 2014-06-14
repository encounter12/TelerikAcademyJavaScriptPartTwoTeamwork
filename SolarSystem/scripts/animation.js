/*jslint browser: true*/

var animation = (function() {
    var anim = new Animation();

    function Animation(spaceObjects, layer) {
        this.anim = new Kinetic.Animation(function(frame) {
            var bodies = spaceObjects.getChildren();

            for (var i = 0, len = bodies.length; i < len; i += 1) {
                //planets orbiting around the Sun; a,b - ellipse radii
                bodies[i].setX(bodies[i].orbit.radiusX() * Math.cos(frame.time * 2 * Math.PI / bodies[i].period) + bodies[i].orbit.x());
                bodies[i].setY(bodies[i].orbit.radiusY() * Math.sin(frame.time * 2 * Math.PI / bodies[i].period) + bodies[i].orbit.y());

                //planets and Sun rotating on their axes
                angleDiff = frame.timeDiff * bodies[i].angularSpeed / 1000;
                bodies[i].rotate(angleDiff);
            }

        }, layer);
    }

    this.init = function(spaceObjects) {

        for (var i = 0, len = spaceObjects.length; i < len; i++) {
            spaceObjects[i];
        };

    };

    Animation.prototype.start = function() {
        this.anim.start();
    };

    Animation.prototype.stop = function() {
        this.anim.stop();
    };

    return anim;

})();
