async function generateImage() {

  const text = prompt.value.trim();

  if (!text) {
    alert("Please enter image prompt.");
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
      encodeURIComponent(text);

    resultImage.src = imageUrl;

    resultImage.onload = () => {
      loading.classList.add("hidden");
      resultImage.style.display = "block";
      downloadBtn.href = imageUrl;
      downloadArea.classList.remove("hidden");
      generateBtn.disabled = false;
      generateBtn.innerHTML =
        '<i class="fa-solid fa-image"></i> Generate Image';
    };

    resultImage.onerror = () => {
      throw new Error("Image load failed");
    };

  } catch (err) {

    loading.classList.add("hidden");
    generateBtn.disabled = false;
    generateBtn.innerHTML =
      '<i class="fa-solid fa-image"></i> Generate Image';

    alert("Image generate failed.");
    console.error(err);
  }
}
