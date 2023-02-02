import AgoraRTM from 'agora-rtm-sdk';

let localStram;
let remoteStream;

// Setting agora.io sdk
let APP_ID = 'ee05b22364cb444b817b53a9a90712ba';

let token = null;
let uid = String(Math.floor(Math.random() * 100000));

// Params for login
let options = {
    uid: "",
    token: ""
}

// Your app ID
const appID = 'ee05b22364cb444b817b53a9a90712ba';
// Your token
options.token = token

// Initialize client
const client = AgoraRTM.createInstance(appID)

// Client Event listeners
// Display messages from peer
client.on('MessageFromPeer', function (message, peerId) {

    document.getElementById("log").appendChild(document.createElement('div')).append("Message from: " + peerId + " Message: " + message)
})
// Display connection state changes
client.on('ConnectionStateChanged', function (state, reason) {

    document.getElementById("log").appendChild(document.createElement('div')).append("State changed To: " + state + " Reason: " + reason)

})

let channel = client.createChannel("demoChannel")

channel.on('ChannelMessage', function (message, memberId) {

    document.getElementById("log").appendChild(document.createElement('div')).append("Message received from: " + memberId + " Message: " + message)

})
// Display channel member stats
channel.on('MemberJoined', function (memberId) {

    document.getElementById("log").appendChild(document.createElement('div')).append(memberId + " joined the channel")

})
// Display channel member stats
channel.on('MemberLeft', function (memberId) {

    document.getElementById("log").appendChild(document.createElement('div')).append(memberId + " left the channel")

})

// Button behavior
window.onload = function () {

    // Buttons
    // login
    document.getElementById("login").onclick = async function () {
        options.uid = document.getElementById("userID").value.toString()
        await client.login(options)
    }

    // logout
    document.getElementById("logout").onclick = async function () {
        await client.logout()
    }

    // create and join channel
    document.getElementById("join").onclick = async function () {
        // Channel event listeners
        // Display channel messages
        await channel.join().then (() => {
            document.getElementById("log").appendChild(document.createElement('div')).append("You have successfully joined channel " + channel.channelId)
        })
    }

    // leave channel
    document.getElementById("leave").onclick = async function () {

        if (channel != null) {
            await channel.leave()
        }

        else
        {
            console.log("Channel is empty")
        }

    }

    // send peer-to-peer message
    document.getElementById("send_peer_message").onclick = async function () {

        let peerId = document.getElementById("peerId").value.toString()
        let peerMessage = document.getElementById("peerMessage").value.toString()

        await client.sendMessageToPeer(
            { text: peerMessage },
            peerId,
        ).then(sendResult => {
            if (sendResult.hasPeerReceived) {

                document.getElementById("log").appendChild(document.createElement('div')).append("Message has been received by: " + peerId + " Message: " + peerMessage)

            } else {

                document.getElementById("log").appendChild(document.createElement('div')).append("Message sent to: " + peerId + " Message: " + peerMessage)

            }
        })
    }

    // send channel message
    document.getElementById("send_channel_message").onclick = async function () {

        let channelMessage = document.getElementById("channelMessage").value.toString()

        if (channel != null) {
            await channel.sendMessage({ text: channelMessage }).then(() => {

                document.getElementById("log").appendChild(document.createElement('div')).append("Channel message: " + channelMessage + " from " + channel.channelId)

            }

            )
        }
    }
}


/* 
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
 */