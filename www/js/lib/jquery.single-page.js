define(["jquery", "triggeranalytics", "bootstrap", "history"], function (jQuery, analytics) {
    jQuery.fn.singlePage = function () {
        // Check the initial Position of the Sticky Header
        var stickyHeader = this;
        var stickyHeaderTop = stickyHeader.offset().top;
        var stickyHeaderHeight = this.outerHeight(true);

        // set the outline around the anchors in stickyheader off
        stickyHeader.find("a").css("outline", "none");

        // make youtube iframe show behind sticky header
        $('iframe').each(function () {
            var url = jQuery(this).attr("src");
            if (url.indexOf("?") > 0) {
                jQuery(this).attr({
                    "src": url + "&wmode=transparent",
                    "wmode": "Opaque"
                });
            } else {
                jQuery(this).attr({
                    "src": url + "?wmode=transparent",
                    "wmode": "Opaque"
                });
            }
        });

        //do scroll to top widget
        jQuery("body").on("click", ".scrollToTop", function(){
            jQuery('html, body').stop().animate({
                scrollTop: 0
            }, 1200);
            return false;
        });

        function toggleHeader(bFixed) {
            if (typeof bFixed == "undefined") bFixed = false;
            stickyHeader.width(stickyHeader.parent().width());
            var nTop = jQuery(window).scrollTop();
            if (bFixed || (nTop > stickyHeaderTop && stickyHeader.css("position") != "fixed")) {
                stickyHeader.css({
                    position: 'fixed',
                    top: '0px'
                });
                jQuery(".scrollToTop").show();
            } else if (nTop <= stickyHeaderTop && stickyHeader.css("position") == "fixed") {
                stickyHeader.css({
                    position: 'static',
                    top: '0px'
                });
                jQuery(".scrollToTop").hide();
            }
            return nTop;

        }

        jQuery(window).bind("scroll resize", function () {
            var nTop = toggleHeader();
            var aAnchors = stickyHeader.find('a');
            for (var n = aAnchors.length - 1; n >= 0; n--) {
                var sHref = aAnchors[n].href.split("/").pop().replace("index.html", "");
                if (sHref.length > 1) { // need to make sure there is something more than a pound sign here
                    var nDivTop = jQuery(sHref).offset().top;
                    if (nDivTop <= nTop + stickyHeaderHeight) {
                        makeActive(sHref);
                        return;
                    }

                }
            }
            makeActive(".");
        });

        function makeActive(sHref) {
            sHref = sHref.split("/").pop();
            stickyHeader.find(".active").removeClass("active");
            jQuery('a[href*="' + sHref + '"]').closest('li').addClass("active");
        }

        window.onhashchange = function () {
            var sPage = window.location.hash;
            if (sPage.split("/").pop() == "") sPage += ".";
            makeActive(sPage);
        };

        stickyHeader.find('a').click(function () {
            var nOffset = stickyHeaderHeight - 1;
            var sHash = jQuery(this).attr('href');
            var nDivOffset = jQuery(sHash).offset().top;
            var bFixed = stickyHeader.css('position') == "fixed";
            // first lets see if the stickyHeader is static
            if (!bFixed) nOffset *= 2;
            //Animate
            jQuery('html, body').stop().animate({
                scrollTop: nDivOffset - nOffset
            }, 1200);
            History.pushState(null, null, sHash);
            return false;
        });

        sHash = window.location.hash;
        toggleHeader();
        if (sHash != "") {
            makeActive(sHash);
            if (stickyHeaderTop < jQuery(sHash).offset().top) // we need to move out from under fixed header
                jQuery(window).scrollTop(jQuery(sHash).offset().top - stickyHeaderHeight);
        }
        require(["index.html"], function (page) {
            if (typeof page !== 'undefined') page();
        });
        analytics();
    };
});
