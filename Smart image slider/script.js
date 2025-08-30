let images = [
    { img: "images/pic1.jpg", caption: "Beautiful Sunset" },
    { img: "images/pic2.jpg", caption: "Mountain View" },
    { img: "images/pic3.jpg", caption: "River Surrounded by Green Trees" },
];

let currentIndex = 0;
let autoPlayInterval;

const showSlide = (index) => {
    const slide = images[index];
    document.getElementById("slideImage").src = slide.img;
    document.getElementById("caption").innerText = `${slide.caption}`;
    document.getElementById("counter").innerText = `Slide ${index + 1} of ${images.length}`;
    document.getElementById("message").innerText = "";
    console.log(`Slide ${index + 1}: ${slide.caption}`);
};

const nextSlide = () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
    } else {
        document.getElementById("message").innerText = "This is the last slide";
        console.log("Message: This is the last slide.");
    }
};


const prevSlide = () => {
    if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
    } else {
        document.getElementById("message").innerText = "This is the first slide";
        console.log("Message: This is the first slide.");
    }
};


const addImage = () => {
    const url = document.getElementById("imgUrl").value;
    const caption = document.getElementById("imgCaption").value;
    if (url && caption) {
        images.push({ img: url, caption: caption });
        console.log(`New Image Added: ${caption}`);
        document.getElementById("imgUrl").value = "";
        document.getElementById("imgCaption").value = "";
        showSlide(images.length - 1);
        currentIndex = images.length - 1;
    } else {
        alert("Please enter both URL and Caption!");
    }
};


const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }, 3000);
    console.log("Auto Play Started");
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
    console.log("Auto Play Stopped");
};

showSlide(currentIndex);