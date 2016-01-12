define(["jquery", "bootstrap", "async!//maps.google.com/maps/api/js?sensor=false"], function (jQuery) {
    return function () {
        try {
            jQuery(".carousel").carousel();
            var myOptions = {
                zoom: 14,
                center: new google.maps.LatLng(43.2571, -79.8589),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
        } catch (error) {}
        try {
            map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
            marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(43.2571, -79.8589)
            });
            infowindow = new google.maps.InfoWindow({
                content: "<b>Greg Douglas</b><br/>173 Victoria Ave<br/>L8L 5E7 Hamilton, ON"
            });
            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);
        } catch (error) {}
        jQuery("#inquiry").submit(function () {
            jQuery.ajax({
                url: "https://rich-hildred.rhcloud.com/Mailer/42e340db2a35b5136d587c035",
                dataType: "json",
                data: jQuery("#inquiry").serialize()
            }).done(function (oResponse) {
                jQuery("#result").html('<span style="font-weight: bold; padding-left: 1em;">Thank you for your inquiry, we will get back to you shortly.</span>');
                jQuery('#inquiry').trigger("reset");
            }).fail(function (sHtml) {
                jQuery("#result").css("color", "red").html(sHtml);
            });
            return false;

        });

    };
});
