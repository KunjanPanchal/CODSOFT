window.addEventListener("scroll",reveal);

function reveal(){
    var reveals = document.querySelectorAll(".reveal");
    for(var i =0; i<reveals.length;i++){
        var windowHeight =window.innerHeight;
        var revealTop =reveals[i].getBoundingClientRect().top;
        var revealPoint =300;

    if(revealPoint < windowHeight - revealTop){
        reveals[i].classList.add('active');
    }
    else{
        reveals[i].classList.remove('active');
    }

    }
}



const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.newArrival');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    let index = 0;

    function showSlide(i) {
        index = (i + slides.length) % slides.length;
        slider.style.transform = `translateX(${-index * 100}%)`;
    }

    prev.addEventListener('click', () => showSlide(index - 1));
    next.addEventListener('click', () => showSlide(index + 1));

    showSlide(index);