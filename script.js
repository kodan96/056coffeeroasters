$(document).ready(() => {

    //----------Functions-------------//


    gsap.registerPlugin(ScrollTrigger);

    $.fn.toggleAttr = function(attr, value1, value2) {
        return this.each(function() {

            $(this).attr(attr, $(this).attr(attr) == value1? value2 : value1);

        })
    }

    $('.open').on('click', (e) => {

        $(e.currentTarget).toggleAttr('aria-expanded', 'false', 'true');
        $(e.currentTarget).toggle();
        $('.close').toggleAttr('aria-expanded', 'true', 'false');
        $('.close').toggle();

        $('nav').css({

            'visibility': 'visible',
            'opacity': '1'
            
        })
    })

    const navClassToggle = () => {
        const headerNavBtns = document.querySelector('header').querySelectorAll('a')
        if(window.innerWidth >= 680) {
            headerNavBtns.forEach(btn => {
                btn.classList.add('footer_nav--btn');
            })
        } else {
            headerNavBtns.forEach(btn => {
                btn.classList.remove('footer_nav--btn');
            })
        }
    }

    const initialAnimation = () => {
        const tl = gsap.timeline()
        const header = $('header');
        const hero = $('.hero');
        const slideUps = $('.slide-up');

        tl.to(hero, {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: 'power2.inOut'
        })

        slideUps.each((index, slideUp) => {
            tl.to(slideUp, {
                duration: .5,
                y: 0,
                opacity: 1,
                delay: 0.2 * index,
                ease: 'power2.inOut'
            })
        })



        tl.to(header, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.inOut'
        })
    }

    const scrollTriggers = () => {
        const slideUpScrolls = document.querySelectorAll('.slide-up-scroll');
        const tl = gsap.timeline();

        slideUpScrolls.forEach((slide, i) => {
            gsap.to(slide, {
                opacity: 1,
                y: 0,
                ease: 'power2.inOut',
                duration: .5,
                scrub: 1,
                scrollTrigger: {
                    trigger: slide,
                    start: 'top 80%',
                    end: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    const scaleDown = () => {
        const scales = document.querySelectorAll('.scale-down');

        scales.forEach((scale, i) => {
            gsap.to(scale, {
                duration: 1,
                opacity: 1,
                scale: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: scale,
                    start: 'top 95%',
                    end: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        })
    }

    const widthAnimation = () => {
        const width = document.querySelector('.width');

        gsap.to(width, {
            duration: 1,
            opacity: 1,
            width: '67%',
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: width,
                start: 'top 80%',
                end: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

    }
 





    //----------Event listeners-------------//

    $('.close').on('click', (e) => {

        $(e.currentTarget).toggleAttr('aria-expanded', 'false', 'true');
        $(e.currentTarget).toggle();
        $('.open').toggleAttr('aria-expanded', 'true', 'false');
        $('.open').toggle();

        $('nav').css({

            'visibility': 'hidden',
            'opacity': '0'
            
        })
    })

    $(window).on('resize', () => {
        navClassToggle();

        if(window.innerWidth > 680) {
            $('nav').css({
                'visibility': 'visible',
                'opacity': '1'
            })
        }
    })

    
    widthAnimation();
    initialAnimation();
    navClassToggle();
    scrollTriggers();
    scaleDown();
})