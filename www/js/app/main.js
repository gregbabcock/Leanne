define(["jquery", "jquery.single-page", "jquery.includer"], function() {
    //the jquery.nav.js and jquery.footer.js plugins have been loaded.
    jQuery(function() {
        jQuery(".navbar").singlePage();
        jQuery("div[data-role='include']").includer();
    });
});
