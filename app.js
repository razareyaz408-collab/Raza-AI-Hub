const prompt = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");

const loading = document.getElementById("loading");

const resultImage = document.getElementById("resultImage");

const downloadArea = document.getElementById("downloadArea");

const downloadBtn = document.getElementById("downloadBtn");

const themeBtn = document.getElementById("themeBtn");

generateBtn.addEventListener("click", generateImage);

themeBtn.addEventListener("click", () => {
document.body.classList.toggle("light");
});

async function generateImage(){

const text = prompt.value.trim();

if(text===""){
alert("Please enter image prompt.");
return;
}

loading.classList.remove("hidden");

resultImage.style.display="none";

downloadArea.classList.add("hidden");

generateBtn.disabled=true;
generateBtn.innerHTML="Generating...";

try{

const API_URL = "/.netlify/functions/generate";
  
const response = await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
prompt:text,
size:document.getElementById("size").value,
quality:document.getElementById("quality").value
})
});

const data=await response.json();

if(data.image){

resultImage.src=data.image;

resultImage.style.display = "block";

downloadBtn.href=data.image;

downloadArea.classList.remove("hidden");

}else{

alert(data.error || "Image generate failed.");

}

}catch(err){

alert("Server Error");

console.error(err);

}

loading.classList.add("hidden");

generateBtn.disabled=false;
generateBtn.innerHTML='<i class="fa-solid fa-image"></i> Generate Image';

}
