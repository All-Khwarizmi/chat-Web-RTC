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

// Connecting two peers together
// Creating ans sending offer
let createOffer = async () => {
  let peerConnection = new RTCPeerConnection();

  // Creating media for remote and attaching to the DOM
  remoteStream = new MediaStream();
  document.getElementById('user-2').srcObject = remoteStream;

  // Creating offer 
  let offer = await peerConnection.
};

init();
