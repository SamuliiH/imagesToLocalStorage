let btn = document.getElementById('del');

btn.addEventListener('click', function() {
  let div = document.getElementById('divToDrop');
  div.innerHTML = "";
  if(localStorage.getItem('images')){
      localStorage.removeItem('images');
  }
})


 function drop(event) {
   event.preventDefault();
   event.stopPropagation();

   let files = event.dataTransfer.files;

   for(let i = 0; i < files.length; i++){
     const file = files[i];
     if(file.type.match('image.*')){
       const reader = new FileReader();

       reader.addEventListener('load', function() {

         if(localStorage.getItem('images')){
           let arr = JSON.parse(localStorage.getItem('images'));
           arr.push(this.result);
           localStorage.setItem('images', JSON.stringify(arr));

         }else{
           let firstItem = [this.result];
           localStorage.setItem('images', JSON.stringify(firstItem));

         }

         let img = document.createElement("img");
         let div = document.getElementById('divToDrop');

         img.setAttribute('src', this.result);
         img.setAttribute('height', '150px');
         img.setAttribute('width', '150px');
         div.appendChild(img);

       });
       reader.readAsDataURL(file);
     }

   }

  }


 function allowDrop(event){
   event.preventDefault();
   event.stopPropagation();
 }


window.onload = function () {
  if(localStorage.getItem('images')){

    let div = document.getElementById('divToDrop');

    let arr = JSON.parse(localStorage.getItem('images'));

    for(let i  = 0; i < arr.length; i++){

      let img = document.createElement("img");
      img.setAttribute('src', arr[i]);
      img.setAttribute('height', '150px');
      img.setAttribute('width', '150px');
      div.appendChild(img);

    }

  }
}
