const searchImg = document.getElementById("search-img");
const searchImgBtn = document.getElementById("search-img-btn");
const sliderDuration = document.getElementById("slider-duration");
const createSlider = document.getElementById("create-slider");
const mainImgBox = document.getElementById("main-img-box");
const showImg = document.getElementById("show-img");
const mainSlider = document.getElementById("main-slider");
const sliders = [];


const KEY = "27455979-a6b3522c6fd57252fcdd47309";

const showImages = (images) => {
    // console.log(images);
    mainImgBox.classList.remove("d-none");
    showImg.innerHTML = "";
    images.forEach(img => {
        let div = document.createElement("div");
        div.className = "cards";
        div.innerHTML = `<img onclick="selectImage(event, '${img.webformatURL}')" src="${img.webformatURL}" class="card-img-top" alt="">`;
        showImg.appendChild(div);
    })
}
const getImages = (search) => {
    fetch(`https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&pretty=true`)
        .then(res => res.json())
        .then(data => showImages(data.hits));
}
searchImgBtn.addEventListener('click', function () {
    let search = searchImg.value;
    if(search.length > 0){
        getImages(search);
    }
    else{
        alert("Please enter search keyword");
    }
});


const selectImage = (event, img) => {
    let element = event.target;
    element.classList.add('added');

    let item = sliders.indexOf(img);
    if (item === -1) {
        sliders.push(img);
        element.style.border = "2px solid gray";
    } else {
        alert('Hey, Already added !')
    }
}

var timer;
let imgTag = document.getElementById("img-tag");
const createSliderFunc = () => {
    mainSlider.classList.remove("d-none");
    if (sliders.length < 2) {
        alert('Select at least 2 image.')
        return;
    }
    imgTag.src = sliders;
    mainSlider.classList.remove("d-none");
    console.log(sliders);
    showImg.innerHTML = "";

    let duration = sliderDuration.value || 1000;
    timer = setInterval(next, duration);
}
createSlider.addEventListener('click', createSliderFunc);


let count = 0;
const next = (timer) => {
    clearInterval(timer);
    count++;
    if(count >= sliders.length){
        count = 0;
        imgTag.src = sliders[count];
    }
    else{
        imgTag.src = sliders[count];
    }
}

const previous = (timer) => {
    clearInterval(timer);
    count--;
    if(count < 0){
        count = sliders.length - 1;
        imgTag.src = sliders[count];
    }
    else{
        imgTag.src = sliders[count];
    }
}
