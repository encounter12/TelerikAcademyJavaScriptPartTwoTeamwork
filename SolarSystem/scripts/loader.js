/*global CelestialBody, Orbit */

// To get the objects from Data.collection as space objects (or celestial objects, or whatever) use:
// var loader = new Loader(Data.collection, centerX, centerY);
// var selestialObjects = loader.load();
// Where centerX and centerY are the center of the container (the stage)
// ... i.e. centerX = stage.width() / 2, centerY = stage.height() / 2

// var Loader = function (collection, containerWidth, containerHeight) {
var Loader = function (collection, centerX, centerY) {
    'use strict';
    this.load = function () {
        var celestialBodies = [],
            length = collection.length,
            celestialBody,
            orbit,
            i,
            orbitCenterX,
            orbitCenterY,
            orbitRadiusX,
            orbitRadiusY,
            name,
            radius,
            angularSpeed,
            orbitSpeed;

        for (i = 0; i < length; i += 1) {
            orbitCenterX = centerX + collection[i].orbitOffset.x;
            orbitCenterY = centerY + collection[i].orbitOffset.y;
            orbitRadiusX = collection[i].orbitRadiusX;
            orbitRadiusY = collection[i].orbitRadiusY;

            orbit = new Orbit(orbitCenterX, orbitCenterY, orbitRadiusX, orbitRadiusY);

            name = collection[i].name;
            radius = collection[i].radius;
            angularSpeed = collection[i].angularSpeed;
            orbitSpeed = collection[i].orbitSpeed;

            // Примерен конструктор за планетите и слънцето:
            celestialBody = new CelestialBody(name, radius, angularSpeed, orbitSpeed, orbit);
            // х и у могат да се вземaт от орбитата
            // периода - от скоростта
            // офсетa за картинката - от радиуса

            celestialBody.imgSrc = collection[i].imgSrc;
            // В 'celestialBody.imgSrc', 'imgSrc' трябва да се прекръсти на това, което ще бъде за картинката
            // в планетата, ако е различно.

            // Data is in this format to make it easier to make a .toString() method for the planets in which the info
            // can be stiched together any way we see fit (if that's ever needed).
            // We can otherwise just use celestialBody.data.info in which there is some Wikipedia text.
            celestialBody.data = {
                radius: collection[i].data.radius,
                dayLength: collection[i].data.dayLength,
                closestToSun: collection[i].data.closestToSun,
                farthestFromSun: collection[i].data.farthestFromSun,
                timeToOrbitSun: collection[i].data.timeToOrbitSun,
                info: collection[i].data.info,
            };

            celestialBodies.push(celestialBody);
        }

        return celestialBodies;
        // celestialBodies[0] -> the Sun
        // celestialBodies[n != 0] -> the planets
    };
};
