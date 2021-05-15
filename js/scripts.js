// ! -----------------------    VARIABLES
let lastScrollY;
let projectArray = Array.from($('.project'));
let portfolio = document.querySelector('.portfolio');
let competencesWrap = document.querySelector('.competences-wrapper');
let tNavWrap = document.querySelector('.nav__wrapper');
let timeline = document.querySelector('.timeline');
let gooey = document.querySelector('.gooey-menu');
let gooeyCheck = document.querySelector('.gooey-menu-checkbox');
let gooeyItemArr = document.querySelectorAll('.gooey-menu-item');

// todo: mettre adresse à jour quand sur serveur
let websiteRootUrl = 'http://127.0.0.1:5501';


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
    if (window.location.href.includes(websiteRootUrl + '/index.html')) {
        console.log('location : ', window.location.href);
        //? comportement de la navbar au scroll up/down
        currentScroll > lastScrollY ? $('.main-nav').addClass('on-scroll') : $('.main-nav').removeClass('on-scroll');

        //? comportement .competences quand arrive à timeline
        //* 1. reduction div compétences 
        if (currentScroll > competencesWrap.getBoundingClientRect().top + 1000) {
            competencesWrap.classList.add('next-timeline');
        } else {
            competencesWrap.classList.remove('next-timeline');
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

//? effet gooey menu
gooeyCheck.addEventListener('change', (event) => {

    if (event.target.checked) {
        //? déplacement du bouton
        gooey.style.bottom = '100px';
        gooey.style.left = '100px';
        gooey.style.animation = 'unset'
        setTimeout(() => {
            // ? déploiement des items de contact
            gooeyItemArr.forEach((item, i) => {
                let angle = ((3.14 - 6.28) / 2) + ((6.28 / 6) * (i - 1));
                let cos = Math.cos(angle) * 80;
                let sin = Math.sin(angle) * 80;
                item.style.transform = `translate3D(${cos}px, ${sin}px, 0)`
            });
        }, 300);
    } else {
        // ? depli des items de contact
        gooeyItemArr.forEach((item, i) => {
            item.style.transform = `translate3D(0px, 0px, 0)`
        });
        //? déplacement du bouton
        setTimeout(() => {
            gooey.style.bottom = '20px';
            gooey.style.left = '20px';
            gooey.style.animation = '1s ease-in-out infinite alternate gooey-bounce';
        }, 300);
    }
});