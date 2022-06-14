const electron = require('electron');

const { ipcRenderer } = electron;

document.getElementsByClassName('video-form')[0].addEventListener('submit', (event) => {
    event.preventDefault();
    const file = document.getElementsByClassName('video-input')[0].files[0];
    const { path } = file; //get the path from the file object

    /*'video:submit' and 'video:metadata' are channels. The send method fires an event. */
    ipcRenderer.send('video:submit', path); // send the file path on channel 'video:submit'

    /*listening to an event (fired by a send method but this time from webContents) on 'video:metadata' channel*/
    ipcRenderer.on('video:metadata', (event, duration) => {
        document.getElementsByClassName('video-info')[0].innerHTML = 'video duration: ' + duration + 'seconds';
    });
});

document.getElementsByClassName('create-window-button')[0].addEventListener('click', (event) => {
    event.preventDefault();
    ipcRenderer.send('window:create');
})