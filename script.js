$(document).ready(() => {

    //----------Functions-------------//
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
        if(window.innerWidth > 680) {
            headerNavBtns.forEach(btn => {
                btn.classList.add('footer_nav--btn');
            })
        } else {
            headerNavBtns.forEach(btn => {
                btn.classList.remove('footer_nav--btn');
            })
        }
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

    

    
    navClassToggle();
})