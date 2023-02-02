let localStram;
let remoteStream;

let init = async () => {
  localStram = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  document.getElementById('user-1').srcObject = localStram;
};

init()

// Connecting 