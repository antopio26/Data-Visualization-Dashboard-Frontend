const {app, BrowserWindow} = require('electron');  
const url = require('url');
const path = require('path');   
	
function onReady () {  
	options = {width: 900, height: 6700, titleBarStyle: 'default'};

	win = new BrowserWindow(options);

	win.loadURL(url.format({      
		pathname: path.join(
			__dirname,
			'dist/3-d-visualization-frontend/index.html'),       
		protocol: 'file:',      
		slashes: true     
	}));

	win.setTitle('');
}

app.on('ready', onReady);