$(document).ready(() => {
    let capsuleSelected = false;
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

    const fadeAnimation = () => {
        const fadeIns = document.querySelectorAll('.fade-in');

        fadeIns.forEach((fade, i) => {
            gsap.to(fade, {
                duration: 1,
                opacity: 1,
                ease: 'both.inOut',
                scrollTrigger: {
                    trigger: fade,
                    start: 'top 60%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });
        })
    }

    const btnToggle = () => {
        const capsule = $('.input-wrap').first();
        const btn = document.querySelector('.submit');
        if ((capsule.hasClass('selected') && $('.input-wrap.selected').length === 4) || $('.input-wrap.selected').length === 5) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    };

    const formReset = () => {
        $('.input-wrap').removeClass('selected');
        $('.hidden').removeClass('toggle');
        $('.overlay').fadeOut();
        $('#summary-element').fadeOut();
        $('.capsule span, .no-capsule span').html('______');
    }

    const determinePrice = () => {
        const options = $('#delivery-frequency .input-wrap');

        if (options.first().hasClass('selected')) {
            $('.final-price').html('$28.80 / mo');
        } else if (options.eq(1).hasClass('selected')) {
            $('.final-price').html('$19.20 / mo'); 
        } else {
            $('.final-price').html('$12.00 / mo');
        }
    }

    const scrollToSection = (index) => {
        
        const sections = document.querySelectorAll('fieldset');

        lenis.scrollTo(sections[index], 1000, 'easeInOutExpo');
    }
    
    function handleInputWrapClick() {
        // Toggle the 'selected' class on the clicked element
        $(this).siblings('.input-wrap').removeClass('selected');
        $(this).toggleClass('selected');

        // Find the next fieldset's hidden element and add the 'toggle' class
        const toggled = $(this).closest('fieldset').next().find('.hidden');
        toggled.addClass('toggle');

        // Find the first '.input-wrap' element
        const capsule = $('.input-wrap').first();
        const selectedValues = $('.input-wrap.selected');
        // Check if the parent fieldset's header is disabled
        const parentFieldset = $(this).closest('fieldset').next();
        if (parentFieldset.find('.fieldset-header').hasClass('disabled')) {
            // Slide down the hidden element with the 'toggle' class
            parentFieldset.find('.hidden.toggle').removeClass('toggle');
            $('.hidden').last().addClass('toggle');
            $('.hidden.toggle').last().slideDown();
        } else {
            parentFieldset.find('.hidden.toggle').slideDown();
        }

        // Check if the first '.input-wrap' element has the 'selected' class
        if (capsule.hasClass('selected')) {
            // Add 'disabled' class to '.fieldset-header' inside '#grind-type'
            $('#grind-type').find('.fieldset-header').addClass('disabled');
            $('.no-capsule').hide();
            $('.capsule').show();

            selectedValues.each((index, value) => {
                $('.capsule').find('span').eq(index).text($(value).find('label').text());
            });
        } else {
            // Remove 'disabled' class from '.fieldset-header' inside '#grind-type'
            $('#grind-type').find('.fieldset-header').removeClass('disabled');
            $('.no-capsule').show();
            $('.capsule').hide();

            selectedValues.each((index, value) => {
                $('.no-capsule').find('span').eq(index).text($(value).find('label').text());
            });
        }

        const lastActiveFieldset = $('fieldset:has(.input-wrap.selected)').last();
        const listItems = $('.steps li');

        listItems.each((index, item) => {
            if (index === lastActiveFieldset.index()) {
                $(item).addClass('active');
            } else {
                $(item).removeClass('active');
            }
        });

        btnToggle();
    }

    function handleCloseClick(e) {
        $(e.currentTarget).toggleAttr('aria-expanded', 'false', 'true');
        $(e.currentTarget).toggle();
        $('.open').toggleAttr('aria-expanded', 'true', 'false');
        $('.open').toggle();

        $('nav').css({
            'visibility': 'hidden',
            'opacity': '0'
        });
    }

    function handleWindowResize() {
        navClassToggle();

        if (window.innerWidth > 680) {
            $('nav').css({
                'visibility': 'visible',
                'opacity': '1'
            });
        }
    }

    function handleSubmitClick(e) {
        e.preventDefault();
        $('.overlay').fadeIn();
        $('#summary-element').fadeIn();

        const capsule = $('.capsule');
        const noCapsule = $('.no-capsule');
        const summaryP = $('.summary-p');

        if (capsule.css('display') === 'block') {
            summaryP.html(capsule.html());
        } else {
            summaryP.html(noCapsule.html());
        }

        determinePrice();
    }

    function handleDocumentClick(event) {
        if ($('.overlay').css('display') === 'block' && event.target.id !== 'summary-element' && !$(event.target).closest('.submit').length) {
            $('.overlay').fadeOut();
            $('#summary-element').fadeOut();
        }
    }

    function handleSummaryElementClick(e) {
        e.stopPropagation();
    }

    function handleCheckoutClick(e) {
        e.preventDefault();
        formReset();
    }

    
 





    //----------Event listeners-------------//


    $('.input-wrap').click(handleInputWrapClick);
    $('.close').on('click', handleCloseClick);
    $(window).on('resize', handleWindowResize);
    $('.submit').on('click', handleSubmitClick);
    $(document).on('click', handleDocumentClick);
    $('#summary-element').on('click', handleSummaryElementClick);
    $('.checkout').on('click', handleCheckoutClick);



    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
    console.log(e)
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
    })


    const listButtons = document.querySelectorAll('.steps a');
    listButtons.forEach((button, i) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(i);
        })
    })
    

    gsap.ticker.lagSmoothing(0)

    fadeAnimation();
    widthAnimation();
    initialAnimation();
    navClassToggle();
    scrollTriggers();
    scaleDown();
    btnToggle();
})