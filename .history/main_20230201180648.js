let localStram;
let remoteStream;

// Stunt Servers

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

//Getting local video and attaching it to the DOM
let init = async () => {
  localStram = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  document.getElementById('user-1').srcObject = localStram;

  createOffer();
};

// Connecting two peers together
// Creating ans sending offer
let createOffer = async () => {
  let peerConnection = new RTCPeerConnection(servers);

  // Creating media for remote and attaching to the DOM
  remoteStream = new MediaStream();
  document.getElementById('user-2').srcObject = remoteStream;

  //Get local tracks and add to connection
  localStram.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStram);
  });

  // Listenning for peer adding track
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  // Creating Ice candidate
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log('New ICE candidate:', event.candidate);
    }

    // Here is where we have to send it to the peer = SIGNALING
    // @params TODO: We could do it using websockets but in this
  };

  // Creating offer
  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  console.log('Offer:', offer);
};

init();
