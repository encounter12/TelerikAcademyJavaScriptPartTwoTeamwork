/*global Kinetic, Data, solarSystem */
var engine = (function() {
	var engine = new Engine(),
		isRunning = true;

	// The Engine is Singleton 
	function Engine() {
		
		// Initialize engine and graphics (to be called ONLY ONCE!!!)
		this.init = function() {
			solarSystem.init(Data.collection);
			animation.init(SolarSystem.spaceObjects);
		};

		// Handle all onClick events, must be added to all celestialObjects as default onClick
		this.onClickHandler = function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;

			if (this.isRunning()) {
				this.stop();
			} else {
				this.start();
			}

			target.togleDisplayInfo();
		};
	}

	// To be shure that all elements are loaded before start the engine
	window.onload = function() {
		engine.init();
		engine.start();
	};

	// Make engine a global variable
	return engine;
})();