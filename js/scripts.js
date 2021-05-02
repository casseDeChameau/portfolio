// ! -----------------------    VARIABLES
let lastScrollY;
let projectArray = Array.from($('.project'));
let portfolio = document.querySelector('.portfolio');
let competencesWrap = document.querySelector('.competences-wrapper');
let competencesCont = document.querySelector('.competences-container');
let competences = document.querySelector('.competences');
let timeline = document.querySelector('.timeline');
// todo: mettre adresse à jour quand sur serveur
let homePageUrl = 'http://127.0.0.1:5501/';


// ! -----------------------    FUNCTIONS
function showProjectInfosOnMobile() {
    projectArray.forEach((p) => {
        let projectTop = portfolio.offsetTop + p.offsetTop;
        let projectBot = projectTop + p.offsetHeight;
        let currentMiddle = scrollY + (window.innerHeight / 2);
        if ((projectTop - (window.innerHeight / 4)) < currentMiddle && (projectBot + (window.innerHeight / 6)) > currentMiddle) {
            p.classList.add('show-info');
        } else {
            p.classList.remove('show-info');
        }
    });
}

// ! -----------------------    APPLICATIONS
//? effet liés au scroll
window.addEventListener('scroll', () => {
    let currentScroll = scrollY;
    //! ---------------------------    sur home page
    if (window.location.href.includes(homePageUrl)) {
        //? comportement de la navbar au scroll up/down
        currentScroll > lastScrollY ? $('.main-nav').addClass('on-scroll') : $('.main-nav').removeClass('on-scroll');

        // console.log(scrollY, $('.competences-wrapper').offset().top);

        //? comportement .competences quand arrive à timeline
        //* 1. reduction div compétences 
        if (currentScroll > competencesWrap.getBoundingClientRect().top + 1000) {
            competencesWrap.classList.add('next-timeline');
        } else {
            competencesWrap.classList.remove('next-timeline');
        }
        //* 2. affichage nav timeline
        if (currentScroll > competencesWrap.getBoundingClientRect().top + 1500) {
            setTimeout(() => {
                timeline.classList.add('show-timeline-nav');
            }, 1000);
        } else if (currentScroll > competencesWrap.getBoundingClientRect().bottom - window.innerHeight) {
            timeline.classList.remove('show-timeline-nav');
        }




        //? masque la navbar lorsqu'on est sur la partie gallery
        if (currentScroll > ($('.skills-logos').offset().top - 50)) {
            $('.main-nav').addClass('on-gallery');
            $('.skills-logos').addClass('on-top');
        } else {
            $('.main-nav').removeClass('on-gallery');
            $('.skills-logos').removeClass('on-top');
        }
        //? affiche les infos des projets au scroll à défaut du hover en mobile
        showProjectInfosOnMobile();

    }
    //! ------------------------------- PAS sur homepage
    else {
        currentScroll > lastScrollY ? $('.main-nav').addClass('on-project-scroll') : $('.main-nav').removeClass('on-project-scroll');
    }
    //? enregistre la dernière position pour savoir direction du scroll 
    lastScrollY = currentScroll;
});

//? burger menu clic
$('.burger-ico').click(() => {
    $('.burger-menu').toggleClass('on-click');
});

//? project flèche bas clic
$('.all-proj').click(() => {
    $('.proj-thumbnails').toggleClass('on-click')
    $('.all-proj').toggleClass('on-click')
});

//? timeline plugin -  SMOOTH SCROLLING SECTIONS

$('a[href*=#]:not([href=#])').click(function() {
    // $('.timeline-plug-in a href').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
        location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                // $('.timeline-plug-in').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});
// let timelineNavLink = Array.from(document.querySelector('.timeline-plug-in nav a'));
// console.log(timelineNavLink);
// $('.timeline-plug-in nav a').click(() => {

// })