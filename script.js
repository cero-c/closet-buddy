const modelURL = "model/";
let model;

async function init() {
  model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");

  const video = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  console.log("model and camera ok");
}

document.getElementById("startButton").addEventListener("click", async () => {
  const video = document.getElementById("video");
  const prediction = await model.predict(video);
  prediction.sort((a, b) => b.probability - a.probability);

  document.getElementById("predictionResult").innerText =
    `🧠 ${prediction[0].className} (${(prediction[0].probability * 100).toFixed(1)}%)`;
});

window.addEventListener("load", init);
