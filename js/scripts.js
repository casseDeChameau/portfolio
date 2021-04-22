// ! -----------------------    VARIABLES
let lastScrollY;
let projectArray = Array.from($('.project'));
let portfolio = document.querySelector('.portfolio');

// ! -----------------------    FUNCTIONS
function showProjectInfosOnMobile() {
    projectArray.forEach((p) => {
        let projectTop = portfolio.offsetTop + p.offsetTop;
        let projectBot = projectTop + p.offsetHeight;
        let currentMiddle = scrollY + (window.innerHeight / 2);
        if (projectTop < currentMiddle && projectBot > currentMiddle) {
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
    //? réduction taille navbar si sur home page
    // todo: mettre adresse à jour quand sur serveur
    if (window.location.href == 'http://127.0.0.1:5501/index.html') {
        currentScroll > lastScrollY ? $('.main-nav').addClass('on-scroll') : $('.main-nav').removeClass('on-scroll');

        if (currentScroll > ($('.skills-logos').offset().top - 50)) {
            //? masque la navbar lorsqu'on est sur la partie gallery
            $('.main-nav').addClass('on-gallery');
            $('.skills-logos').addClass('on-top');
        } else {
            $('.main-nav').removeClass('on-gallery');
            $('.skills-logos').removeClass('on-top');
        }
        //? affiche les infos des projets au scroll à défaut du hover en mobile
        showProjectInfosOnMobile();

    } else {
        //! effet pour toute autre page que index
        currentScroll > lastScrollY ? $('.main-nav').addClass('on-project-scroll') : $('.main-nav').removeClass('on-project-scroll');
    }

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
})