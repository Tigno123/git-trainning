// DOM Ready

$(function() {

    $(window).load(function() {

        Pace.on("hide", function() {
            $('#wrap, .splashIntro').css('opacity', 1).addClass('show');
        });

        Pace.on('done', function() {
            $('#wrap, .splashIntro').css('opacity', '1').addClass('show');
        });


        if (!$.cookie("smokehaus-welcome")) {
            $(".splashIntro").show();
            $.cookie("smokehaus-welcome", 1, {
                expires: 1,
                path: '/',
                domain: 'smokehaus.com.au'
            });   
        } else { 
            $.cookie("smokehaus-welcome", 1, {
                expires: 1,
                path: '/',
                domain: 'smokehaus.com.au'
            });   
        }  


        $('select').chosen({
            disable_search: true
        });

        $('.splashIntro, .added_notify').on('click', function() {
            $(this).fadeOut('fast');
        });

        if (Modernizr.touch) {
            $('.splashIntro').html('<img class="animated bounceInDown" src="wp-content/themes/smokehaus/img/splashTouch.png">');
            $('.showMobile').show();
        } else {
            $('.splashIntro').html('<img class="animated bounceInDown" src="wp-content/themes/smokehaus/img/splashDesktop.png">');
        }

        $('.splashIntro img').css('top', $(window).height() / 2 - 200 + 'px');



        /* when product quantity changes, update quantity attribute on add-to-cart button */
        $("form.cart").on("change", "input.qty", function() {
            if (this.value === "0")
                this.value = "1";

            $(this.form).find("button[data-quantity]").attr("data-quantity", this.value);
        });

        $("form.cart").on("change", "input.qty", function() {
            $(this.form).find("button[data-quantity]").attr("data-quantity", this.value);
        });

        $(document.body).on("adding_to_cart", function() {
            //$("a.added_to_cart").remove();
        });

        $('button.single_add_to_cart_button').on('click', function() {
            $(this).css('width', $(this).outerWidth());
            $(this).html('<i class="fa fa-spinner fa-spin"></i>');
        });

        $("body").bind("added_to_cart", function() {

            function isEmpty(el) {
                return !$.trim(el.html());
            }
            if (isEmpty($('.add_to_bag_message'))) {
                var messages = Array('Good Choice, In Your Bag!', 'Yum!, We Love that One! Added To Your Bag!', 'Nice One! In Your Bag');
                var message = messages[Math.floor(Math.random() * messages.length)];
            } else {
                var message = $('.add_to_bag_message').html();
            }


            $('<div class="added_notify"><p class="animated bounceInDown">' + message + '</p></div>').prependTo('body').delay(2000).fadeOut('fast');
            $('.quantity.buttons_added').hide();
        });



        $('.weight').html(function(i) {
            var weight = $(this).text();
            if (weight > 999) {
                var output = weight / 1000 + 'kg';
            } else {
                var output = weight + 'g';
            }
            $('.weight').html(output);
        });

        $('#weight_needed option').each(function() {
            $(this).html(function(i) {
                var weight = $(this).text();
                if (weight < 1) {
                    var output = weight * 1000 + 'g';
                } else {
                    var output = weight + 'kg';
                }
                $(this).html(output);
            });
        });

        $('.cart_item').each(function() {
            $(this).find('dd.variation-Qtykg p').text(function() {
                $(this).html(function(i) {
                    var weight = $(this).text();
                    if (weight < 1) {
                        var output = weight * 1000 + 'g';
                    } else {
                        var output = weight + 'kg';
                    }
                    $(this).html(output);
                });
            });
        });

        $('.cart_item').each(function() {
            weightVariation = $(this).find('dd.variation-Qtykg p').text();
            if (weightVariation) {
                productWithWeight = $(this).find('td.product-name > a').text();
                $(this).find('td.product-name > a').text(productWithWeight + ' (' + weightVariation + ')');
                $(this).find('dl.variation').hide();
            }
        });


        $('.navTrigger').on('click', function() {
            if ($(this).next().hasClass('active')) {
                $(this).next().removeClass('active');
            } else {
                $(this).next().addClass('active');
            }
        });

        $('.closeNav').on('click', function() {
            $(this).parent().removeClass('active');
        });

        $('li:first-child').addClass('first');
        $('li:last-child').addClass('last');

        $(".owl-carousel").owlCarousel({
            autoPlay: false,
            stopOnHover: true,
            addClassActive: true,
            lazyLoad: true,
            items: 5,
            itemsDesktop: [1620, 4],
            itemsDesktopSmall: [1150, 3],
            itemsTablet: [800, 2],
            itemsMobile: [560, 1],
            afterMove: function(elem) {
                var that = $(elem).find('.owl-item');
                that.each(function() {
                    if (!$(this).hasClass("active")) {
                        $(this).find('.productInfo').removeClass('show animated bounceInUp');
                        $(this).find('.tapWrap').removeClass('bounceOutDown bounceInUp');
                    } else {
                        $(this).find('.tapWrap').addClass('bounceInUp');
                    }
                });
            }
        });

        var owl = $('.owl-carousel').data('owlCarousel');

        $(document.documentElement).keyup(function(event) {
            // handle cursor keys
            if (event.keyCode == 37) {
                owl.prev();
            } else if (event.keyCode == 39) {
                owl.next();
            }
        });


        if (Modernizr.touch) {
            $('.showMobile').show();
            $('.owl-item').each(function() {
                $(this).find('.tap').on('click', function() {
                    $(this).parent().removeClass('bounceInUp').addClass('bounceOutDown').prev().children('div.productInfo').addClass('show animated bounceInUp').removeClass('hide');
                });
            });
        }


        if (!Modernizr.touch) {
            $('.owl-item').hover(function() {
                $(this).removeClass('fade').addClass('hover').siblings().addClass('fade');
            }, function() {
                $(this).siblings().andSelf().removeClass('fade hover');
            });
        }


        $('.owl-item').each(function() {
            var button = $(this).find('.single_add_to_cart_button');
            var weight = $(this).find('#_measurement_needed').val();
            if (weight) {
                if (weight < 1) {
                    var output = weight * 1000 + 'g';
                } else {
                    var output = weight + 'kg';
                }
                button.html(button.html() + ' (' + output + ')');
            }
        });



        var headerHeight = $('header').height();
        var footerHeight = $('footer').height();

        $('#container').css('min-height', $(window).height() - headerHeight - footerHeight + 'px');

        $('.splashIntro').height($(document).height());

        var owlHeight = $('#container').height();
        $('.owl-item').height(owlHeight);

        // SVG fallback
        // toddmotto.com/mastering-svg-use-for-a-retina-web-fallbacks-with-png-script#update
        if (!Modernizr.svg) {
            var imgs = document.getElementsByTagName('img');
            for (var i = 0; i < imgs.length; i++) {
                if (/.*\.svg$/.test(imgs[i].src)) {
                    imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
                }
            }
        }

    });

});


$(document).ajaxSuccess(function() {
    $("select").trigger('chosen:updated');
    $('select').chosen({
        disable_search: true
    });
    $('.splashIntro, .added_notify').on('click', function() {
        $(this).fadeOut('fast');
    });
});

Raven.config('https://d36001132ffb4cf6bca61576abeb25b1@app.getsentry.com/40114').install();