/*global $,location*/
// splash.js

$(function() {
    if (location.pathname === '/' || location.pathname === '/about') {
        var $splash = $('<div/>', {class: 'splash'}),
            $splashBg = $('<div/>', {class: 'splash-bg'}),
            $splashBody = $('<div/>', {class: 'splash-body'}),
            $splashButton = $('<button/>', {class: 'splash-button'}),
            $quote = $('<blockquote/>', {class: 'splash-quote'}),
            $cite = $('<cite/>', {class: 'splash-cite'})

            $splash
                .append($splashBg.append($splashBody))
                .append($splashButton)

            $quote.html('When we try to pick anything out by itself, we find it hitched to everything else in the universe.').append($cite.html('John Muir')).appendTo($splashBody)

        $('body').append($splash)
        $splashButton.click(function() {
            $splash.addClass('fade-out').delay(250).queue(function(n) {
                $splash.remove()
                n()
            })
        })
    }
})
