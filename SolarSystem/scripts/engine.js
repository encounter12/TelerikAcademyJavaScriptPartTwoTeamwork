/*global Data, solarSystem, animation */
var engine = (function() {
	var engine = new Engine(),
		isRunning = true;

	function Engine() {

		// To be called ONLY ONCE!!!
		this.init = function() {
			solarSystem.init(Data.collection);
			animation.init(solarSystem.spaceObjects);
			document.getElementById('start').addEventListener('click', this.onBtnStartClick, false);
			document.getElementById('stop').addEventListener('click', this.onBtnStopClick, false);
		};

		// Handle all onClick events, must be added to all celestialObjects as default onClick
		this.onObjectClick = function() {
			if (isRunning) {
				return;
			}

			animation.displayInfo(this);
		};

		this.onBtnStartClick = function() {
			isRunning = true;
			animation.start();
		};

		this.onBtnStopClick = function() {
			isRunning = false;
			animation.stop();
		};
	}

	// To be shure that all elements are loaded before start the engine
	window.onload = function() {
		engine.init();
	};

	// Make engine a global variable
	return engine;
})();