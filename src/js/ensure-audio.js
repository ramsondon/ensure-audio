
export class EnsureAudio {

	constructor() {
		this.factory = window.AudioContext || window.webkitAudioContext;
	}

	isContextSupported() {
		return !! this.factory;
	}

	createAudioContext() {
		return new Promise((resolve, reject) => {
			if ( ! this.isContextSupported()) {
				reject(new Error('AudioContext not available'));
			}
			let factory = this.factory;
			resolve(new factory());
		});
	}

	getUserMedia(constraints) {
		if ( ! navigator.mediaDevices) {
			// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
			// Poly fill for other browsers
			navigator.mediaDevices = {
				getUserMedia: function(constraints) {

					// First get ahold of the legacy getUserMedia, if present
					let getUserMedia = navigator.webkitGetUserMedia
						|| navigator.mozGetUserMedia
						|| navigator.getUserMedia;

					// Some browsers just don't implement it - return a rejected promise with an error
					// to keep a consistent interface
					if ( ! getUserMedia) {
						return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
					}

					// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
					return new Promise(function(resolve, reject) {
						getUserMedia.call(navigator, constraints, resolve, reject);
					});
				}
			};
		}

		return navigator.mediaDevices.getUserMedia(constraints);
	}

}