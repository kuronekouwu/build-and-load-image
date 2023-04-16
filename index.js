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

} catch (error) {
  core.setFailed(error.message);
}
