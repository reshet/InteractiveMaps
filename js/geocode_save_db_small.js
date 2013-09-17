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

console.log("here");
var page = require('webpage').create();


function initialize() {
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
        phantom.exit();
    });


}

//initialize();
page.includeJs("vendor/jquery-1.9.1.min.js", function() {
    initialize();
    console.log("hhh");
    /*page.evaluate(function() {
        //console.log("$(\"#intro\").text() -> " + $("#intro").text());

    });*/
    //phantom.exit();
});

//phantom.exit();