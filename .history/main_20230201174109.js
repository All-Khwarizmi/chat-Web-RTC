let localStram ;
let remoteStream;


let init = async () => {
    localStram = await navigator.mediaDevices.getUserMedia({video: true, audio: true})

    document.getElementById("user-1").srcOb = localStram
}