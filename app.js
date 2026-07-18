const prompt = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const resultImage = document.getElementById("resultImage");
const downloadArea = document.getElementById("downloadArea");
const downloadBtn = document.getElementById("downloadBtn");
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

generateBtn.addEventListener("click", generateImage);

async function generateImage() {

  const text = prompt.value.trim();

  if (!text) {
    alert("Please enter a prompt.");
    return;
  }

  loading.classList.remove("hidden");
  resultImage.style.display = "none";
  downloadArea.classList.add("hidden");

  generateBtn.disabled = true;
  generateBtn.innerHTML = "Generating...";

  try {

    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(text) +
      "?width=1024&height=1024&seed=" + Date.now();

    resultImage.onload = () => {
      loading.classList.add("hidden");
      resultImage.style.display = "block";
      downloadArea.classList.remove("hidden");
      downloadBtn.href = imageUrl;

      generateBtn.disabled = false;
      generateBtn.innerHTML =
        '<i class="fa-solid fa-image"></i> Generate Image';
    };

    resultImage.onerror = () => {
      loading.classList.add("hidden");
      generateBtn.disabled = false;
      generateBtn.innerHTML =
        '<i class="fa-solid fa-image"></i> Generate Image';

      alert("Image could not be loaded.");
    };

    resultImage.src = imageUrl;

  } catch (err) {

    loading.classList.add("hidden");
    generateBtn.disabled = false;
    generateBtn.innerHTML =
      '<i class="fa-solid fa-image"></i> Generate Image';

    alert("Something went wrong.");
    console.error(err);
  }
}
