import AgoraRTM from 'agora-rtm-sdk';

let localStram;
let remoteStream;

// Setting agora.io sdk
let APP_ID = 'ee05b22364cb444b817b53a9a90712ba';

let token = null;
let uid = String(Math.floor(Math.random() * 100000));

let client;
let channel;

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
  client.AgoraRTM.createInstance(APP_ID);
  await client.login({ uid, token });

  // index.html?room=234334
  channel = client.createChannel('main');
  await channel.join();

  channel.on('MemberJoined', handleUserJoined);

  localStram = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  document.getElementById('user-1').srcObject = localStram;

  createOffer();
};

let handleUserJoined = async (MemberId) => {
  console.log('New user Joined that channel:', MemberId);
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
    // TODO: We could do it using websockets but in this
    // Were going to use agora
  };

  // Creating offer
  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  console.log('Offer:', offer);
};

init();
