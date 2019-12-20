! function($) {
    "use strict";

    // function sideNav() {
    //     $(".side-nav .side-nav-menu li a").on("click", function(e) {
    //         $(this).parent().hasClass("open") ? $(this).parent().children(".dropdown-menu").slideUp(200, function() {
    //             $(this).parent().removeClass("open")
    //         }) : ($(this).parent().parent().children("li.open").children(".dropdown-menu").slideUp(200), $(this).parent().parent().children("li.open").children("a").removeClass("open"), $(this).parent().parent().children("li.open").removeClass("open"), $(this).parent().children(".dropdown-menu").slideDown(200, function() {
    //             $(this).parent().addClass("open")
    //         }))
    //     })
    // }

    // function sideNavToggle() {
    //     $(".side-nav-toggle").on("click", function(e) {
    //         $(".openSlide").toggleClass("is-collapsed"), e.preventDefault()
    //     })
    // }

    function perfectSB() {
        $(".scrollable").perfectScrollbar()
    }

    function cardPortletCtrl() {
        $("[data-toggle=card-refresh]").on("click", function(e) {
            var cardRefreshSelector = $(this).parents(".card");
            cardRefreshSelector.addClass("card-refresh"), window.setTimeout(function() {
                cardRefreshSelector.removeClass("card-refresh")
            }, 2e3), e.preventDefault(), e.stopPropagation()
        }), $("[data-toggle=card-delete]").on("click", function(e) {
            var cardDeleteSelector = $(this).parents(".card");
            cardDeleteSelector.addClass("animated zoomOut"), cardDeleteSelector.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
                cardDeleteSelector.remove()
            }), e.preventDefault(), e.stopPropagation()
        })
    }

    function init() {
        //sideNav(), sideNavToggle(), perfectSB(), cardPortletCtrl()
        perfectSB(), cardPortletCtrl()
    }
    
    init()

}(jQuery);