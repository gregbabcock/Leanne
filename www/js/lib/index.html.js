define(["jquery", "bootstrap", "async!//maps.google.com/maps/api/js?sensor=false"], function(jQuery){
    return function(){
        jQuery(".carousel").carousel();
            var myOptions = {
            zoom: 14,
            center: new google.maps.LatLng(43.2579005,-79.8547259),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(43.2579005,-79.8547259)
        });
        infowindow = new google.maps.InfoWindow({
            content: "<b>Greg Babcock</b><br/>163 Victoria Ave N<br/>L8L 5E9 Hamilton, ON"
        });
        google.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
        });
        infowindow.open(map, marker);
        jQuery("#inquiry").submit(function(){
            jQuery.ajax({
                url:"https://rich-hildred.rhcloud.com/Mailer/4953dc8bd6100c7fc61abb1",
                dataType:"json",
                data: jQuery("#inquiry").serialize()
            }).done(function(oResponse){
                jQuery("#result").html(oResponse.result);
                jQuery('#inquiry').trigger("reset");
            }).fail(function(sHtml){
                jQuery("#result").css("color", "red").html(sHtml);
            });
            return false;

        });

    };
});
