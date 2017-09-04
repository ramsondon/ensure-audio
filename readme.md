ensure-audio
============

this class helps to ensure a cross browser AudioContext and navigator.mediaDevices.getUserMedia() stream function

```json
{
	"dependencies": {
		"ensure-audio": "https://github.com/ramsondon/ensure-audio.git"
	}
}
```


```ecmascript 6
import { EnsureAudio } from 'ensure-audio';

let audio = new EnsureAudio();
audio.createAudioContext().then(
  ctx => console.log('context created', ctx), 
  err => console.error('audio context not available')
);

audio.getUserMedia({audio: true, video: true}).then(
  stream => console.log('stream', stream),
  err => console.log('usermedia not available'),
);
```