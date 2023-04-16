const core = require("@actions/core");
const github = require("@actions/github");
const cp = require("child_process");

const cpCfg = {
  stdio: "inherit",
  maxBuffer: 50 * 1024 * 1024,
};

try {
  // Get config
  const imageRef = core.getInput("image", { required: false });
  const imageTag = core.getInput("version",  { required: false });
  const tcpURL = core.getInput("url", { required: true });

  // Get docker info
  cp.execSync("docker info", cpCfg);
  // Create image
  let imageName = "";
  if (!imageRef) {
    imageName += `${github.context.payload.repository.full_name.replace(
      "/",
      "-"
    )}-${github.context.sha.substring(0, 7)}:${imageTag || 'latest'}`;
  }else{
    imageName += `${imageRef}:${imageTag || 'latest'}`
  }
  // Build image command
  console.log('Your image: ' + imageName)
//   cp.execSync(`docker build `)


  //   // `who-to-greet` input defined in action metadata file
  //   const nameToGreet = core.getInput("who-to-greet");
  //   console.log(`Hello ${nameToGreet}!`);
  //   const time = new Date().toTimeString();
  //   core.setOutput("time", time);

  //   // Test docker version
  //   console.log("DOCKER VERSION IS");
  //   cp.execSync("docker info", {
  //     stdio: "inherit",
  //     maxBuffer: 50 * 1024 * 1024,
  //   });

  //   // Get the JSON webhook payload for the event that triggered the workflow
  //   //   const payload = JSON.stringify(github.context.payload, undefined, 2)
  //   //   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
