/*global Planet */
var solarSystem = (function() {
    var solarSystem = new SolarSystem();

    function SolarSystem() {
        this.spaceObjects = [];

        this.init = function(data) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.spaceObjects.push(new Planet(data[i]));
            }
        };
    }

    return solarSystem;
}());