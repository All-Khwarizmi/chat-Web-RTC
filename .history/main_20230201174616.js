let localStram;
let remoteStream;

//Getting local video and attaching it to the DOM
let init = async () => {
  localStram = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  document.getElementById('user-1').srcObject = localStram;
};

init()

// Connecting two peers together 
// Creating ans sending offer