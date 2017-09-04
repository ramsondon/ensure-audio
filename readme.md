ensure-audio
============

this class helps to ensure a cross browser AudioContext and navigator.mediaDevices.getUserMedia() stream function

EnsureAudio is implemented in ES6 so you may need to use a transpiler or webpack.

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

audio.getUserMedia().then(
  stream => console.log('stream', stream),
  err => console.log('usermedia not available'),
);
```