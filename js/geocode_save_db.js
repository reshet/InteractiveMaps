/**
 * Created with IntelliJ IDEA.
 * User: reshet
 * Date: 9/15/13
 * Time: 5:23 PM
 * To change this template use File | Settings | File Templates.
 */
var url_data = 'http://survey-archive.com/InteractiveMaps/js/addresses_geo3.json';
//var url_fixer = "http://localhost/MSS/FixGeocodeSaveTransport.php";
var url_fixer = "http://survey-archive.com/MSS/FixGeocodeSaveTransport.php";
//var cache_url = 'http://localhost/InteractiveMaps/php/geocache.php';
function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(50.468869,30.526886),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);

    var image = {
        url: 'img/mic_small.png',
        size: new google.maps.Size(30, 30),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(0, 30),
        opacity:0.5
    };
    var shape = {
        coord: [1, 1, 1, 30, 30, 30, 30 , 1],
        type: 'poly'
    }
    $.getJSON(url_data, function(data) {
        //alert(data);
        //console.log("some");
        var total_addresses = 0;
        var nice_addresses = 0;

        $.each(data, function(elem,val) {
            //alert(val)
            var g_addr = val["geocoded_address"]
            var address = val["address"]
            var lat = val["lat"]
            var lng = val["lng"]
            var var_code = val["var_code"]
            var task_id = val["task_id"]
            var int_id = val["int_id"]
            var loc_type = val["loc_type"]
            total_addresses++;
            if(loc_type=="NO" ||loc_type!="APPROXIMATE") nice_addresses++
            // var myLatLng = new google.maps.LatLng(lat,lng);
            /* var beachMarker = new google.maps.Marker({
             position: myLatLng,
             map: map,
             icon: image,
             shape:shape,
             title: var_code+": "+address+"; anket "+task_id+"; int "+int_id+"; loc "+loc_type
             });*/
            //if(elem < 2){
            $.ajax({
                    type:"POST",
                    url:url_fixer,
                    data:{
                        base_var_code:var_code,lat:lat,lng:lng,task_id:task_id,int_id:int_id,
                        formatted:g_addr,loc_type:loc_type
                    },
                    success:function(data){
                        console.log(total_addresses+" "+ data);
                    }
                }
            );
            //}

        });
        console.log((nice_addresses/total_addresses*100)+"%");
    });


}

phantom.exit();