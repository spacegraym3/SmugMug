
var smugMugWorker;

function startSmugMugWorker() {
	try {
		smugMugWorker = new Worker('lib/smugmug/SmugMugWorker.js');
	} catch (e) {
		console.log(e);
	}
	alert("SmugMugWorker started: " + smugMugWorker);
	smugMugWorker.addEventListener('message', 
		function(e) {
			console.log(e);
			console.log(e.data);
		}, 
		false
	);
	smugMugWorker.postMessage('Hello World'); // Send data to our worker.
}

function login() {
	smugMugWorker.postMessage({
		cmd: 'login', 
		username: 'spacegraym3@me.com',
		password: 'rakoshi'
	});
}


function getAlbumList() {
	smugMugWorker.postMessage({
		cmd: 'getAlbumList', 
		username: 'spacegraym3@me.com',
		password: 'rakoshi'
	});
}

function areWebWorkersSupported() {
    return (typeof(Worker) !== "undefined") ? true:false;
}

function areWebSocketSupported() {
    return (typeof(WebSocket) !== "undefined") ? true:false;
}