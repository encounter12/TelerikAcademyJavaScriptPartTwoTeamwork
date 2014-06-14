/*jslint browser: true*/
/*global engine, Kinetic */

var animation = (function() {
    var stage,
        layer,
        backgroundLayer,
        kineticGroup,
        images = [],
        spaceBodies = [],
        anim = new Kinetic.Animation(AnimateFrame, layer),
        animation = new Animation();

    function Animation() {
        this.width = 1500;
        this.height = 1050;
        this.init = function(spaceObjects) {
            stage = new Kinetic.Stage({
                container: 'container',
                width: this.width,
                height: this.height
            });

            backgroundLayer = new Kinetic.Layer();
            layer = new Kinetic.Layer();

            stage.add(backgroundLayer);
            stage.add(layer);

            var backgroundImage = new Image();

            backgroundImage.onload = function() {
                var background = new Kinetic.Image({
                    x: 0,
                    y: 0,
                    image: backgroundImage,
                    width: 1500,
                    height: 1200
                });
                backgroundLayer.add(background);
                backgroundLayer.draw();
            };

            backgroundImage.src = 'images/background/deep-space-01.png';

            kineticGroup = new Kinetic.Group({
                draggable: true
            });

            for (var i = 0, len = spaceObjects.length; i < len; i += 1) {
                images.push(new Image());
                images[i].onload = createKineticImage;
                images[i].src = spaceObjects[i].imgSrc;
                images[i].spaceObject = spaceObjects[i];
            }

            layer.add(kineticGroup);
            layer.draw();

        };

        this.start = function() {
            anim.start();
        };

        this.stop = function() {
            anim.stop();
        };
    }

    function createKineticImage() {
        var kineticImage = new Kinetic.Image({
            x: stage.width() / 2,
            y: stage.height() / 2,
            image: this,
            width: this.spaceObject.radius,
            height: this.spaceObject.radius,
            offset: {
                x: this.spaceObject.radius / 2,
                y: this.spaceObject.radius / 2
            }
        });

        kineticImage.setAttr('spaceObject');
        kineticImage.spaceObject = this.spaceObject;
        kineticImage.addEventListener('click', engine.onObjectClick, false);
        spaceBodies.push(kineticImage);
        kineticGroup.add(kineticImage);
    }

    function AnimateFrame(frame) {
        for (var i = 0, len = spaceBodies.length; i < len; i += 1) {
            //planets orbiting around the Sun; a,b - ellipse radii
            spaceBodies[i].setX(spaceBodies[i].spaceObject.orbit.radiusX * Math.cos(frame.time * 2 * Math.PI / spaceBodies[i].spaceObject.period) + spaceBodies[i].spaceObject.orbit.centerX);
            spaceBodies[i].setY(spaceBodies[i].spaceObject.orbit.radiusY * Math.sin(frame.time * 2 * Math.PI / spaceBodies[i].spaceObject.period) + spaceBodies[i].spaceObject.orbit.centerY);

            //planets and Sun rotating on their axes
            var angleDiff = frame.timeDiff * spaceBodies[i].spaceObject.angularSpeed / 1000;
            spaceBodies[i].rotate(angleDiff);
        }

        layer.draw();
    }

    return animation;
})();