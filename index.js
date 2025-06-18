export default function showSlide(slideIndex) {
  let currentSlideID = slideIndex;
  const dotContainer = document.querySelector(".dotClick-container");
  const prevController = document.querySelector(".prev");
  const nextController = document.querySelector(".next");

  // Modify the displayed silde and controlling dots
  function updateSlideDisplay() {
    const slides = document.querySelectorAll(".singleSlide");
    const dots = document.querySelectorAll(".dot");

    // Make all slides invisible initially
    for (let index = 0; index < slides.length; index++) {
      slides[index].style.display = "none";
    }
    // Make all dots not selected
    for (let index = 0; index < dots.length; index++) {
      if (dots[index].classList.contains("active")) {
        dots[index].classList.remove("active");
      }
    }

    // Make sure currentSlideID not bigger than the last ID number, and loop back to 1
    if (currentSlideID > slides.length) {
      currentSlideID = 1;
    }
    // Make sure currentSlideID not smaller than 1, and loop back to the last ID number
    if (currentSlideID < 1) {
      currentSlideID = slides.length;
    }

    // Make the current slide visible and make the current dot selected
    slides[currentSlideID - 1].style.display = "block";
    dots[currentSlideID - 1].classList.add("active");
  }

  // Display an automatic slideshow (increase the currentSlideID every 5 second)
  function displaySlides() {
    currentSlideID += 1;
    updateSlideDisplay();
    setTimeout(displaySlides, 5000); // Change image every 5 seconds
  }

  // Change the slide based on the Previous/Next slide control
  function changeSlides(moveNum) {
    currentSlideID += moveNum;
    updateSlideDisplay();
  }

  function handlePrevClick() {
    changeSlides(-1);
  }

  function handleNextClick() {
    changeSlides(1);
  }

  // Previous slide controls
  /* Don't write prevController.addEventListener("click", displaySlides(-1));
     displaySlides(-1) is a function call, handlePrevClick is a function reference */
  prevController.addEventListener("click", handlePrevClick);

  // Next slide controls
  nextController.addEventListener("click", handleNextClick);

  // Change the slide based on the index of Dots controls
  dotContainer.addEventListener("click", (event) => {
    if (event.target.matches(".dot")) {
      const dotClicked = event.target;
      currentSlideID = parseInt(dotClicked.dataset.dotid, 10);
      updateSlideDisplay();
    }
  });

  // Display the image automatically from the first slide
  displaySlides();
}
