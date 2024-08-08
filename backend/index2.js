const scp2 = require("scp2");

const remoteFilePath = "/home/nate/pulse_mlt/mlt.json";
const localDirectory = "C:/Users/Travis/Desktop/PULSE/PulseV6/backend/JSON/data.json";

const remoteServer = {
  host: "10.34.3.72",
  username: "nate",
  password: "Sun2015*",
  path: "/home/nate/pulse_mlt/mlt.json",
};

function downloadFile(remoteFilePath, localDirectory, remoteServer) {
  console.log("Downloading file from remote server...");
  scp2.scp(
    {
      host: remoteServer.host,
      username: remoteServer.username,
      password: remoteServer.password,
      path: remoteFilePath,
    },
    localDirectory,
    function (err) {
      if (err) {
        console.error("Error during SCP download:", err);
      } else {
        console.log("File successfully downloaded to local directory");
      }
    }
  );
}

downloadFile(remoteFilePath, localDirectory, remoteServer);
