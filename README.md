move is up-down |/|

const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');

imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    uploadedImage.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');

imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageBlob = new Blob([e.target.result], { type: file.type });
    const imageURL = URL.createObjectURL(imageBlob); 
    uploadedImage.src = imageURL;
  };

  if (file) {
    reader.readAsArrayBuffer(file); 
  }
});