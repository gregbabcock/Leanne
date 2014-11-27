define(["jquery", "underscore"], function (jQuery) {
    jQuery.fn.includer = function () {
        for (var n = 0; n < this.length; n++) {
            jQuery.get(this[n].id + ".html")
                .done(function (sTemplate) {
                    var fTemplate = _.template(sTemplate);
                    jQuery('#' + this.url.replace(".html","")).html(fTemplate({}));
                })
                .fail(function (xHr, sText) {
                    console.log(sText);
                    console.log(sText);
                });
        }
    };
    return this;
});
