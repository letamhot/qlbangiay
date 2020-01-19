
$(document).ready(() => {
    $('.menu').click(() => {
        $('ul').toggleClass('active');
        $('.navbar-vertical').toggleClass('box-shadow');
    });

    $('.navbar-vertical').mouseleave(() => {
        $('ul').removeClass('active');
        $('.navbar-vertical').removeClass('box-shadow');
    });
});