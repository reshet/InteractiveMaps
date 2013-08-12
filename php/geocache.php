<?php
    $action = $_REQUEST['action'];
    $address = $_REQUEST['address'];
    
    function loadCache(){
    	//echo "there";
    	$file = fopen("geocache2.csv", "r");
    	$members = array();
    	while (!feof($file)) {
    		$line = fgets($file);
    		//$line = str_replace(' ', '', $line);
    		$line_arr = split(";",$line);
    		//var_dump($line_arr);
    		if(count($line_arr)>2){

                $addr = $line_arr[0];
                $long = $line_arr[1];
                $lat = $line_arr[2];

                $members[$addr]['lat'] = $lat;
                $members[$addr]['long'] = $long;
            }
    	}
    	fclose($file);
    	return $members;
    }
    
    if($action == "gt"){
         $arr = loadCache();
         //var_dump($arr);
         //var_dump($address);
         if(array_key_exists($address,$arr) && $arr[$address]!= null){
            $long = $arr[$address]['long'];
            $lat = $arr[$address]['lat'];
            $lat = str_replace(' ', '', $lat);
            $lat = str_replace("\r", '', $lat);
            $lat = str_replace("\n", '', $lat);
            header('Content-type: application/json');
            echo '{"lb":'.$lat.',"mb":'.$long.'}';
            //"{'lb':50.467517,'mb':30.509281999999985}"
            //{"lb":50.4671272,"mb":30.50892859999999}
            //{"lb":50.4671272,"mb":30.50892859999999}
            //
            //echo "($lat,$long)";
            
         }else{
         	echo "Not in cache";
         }

    }else if($action == "pt"){
          $long = $_REQUEST['long'];
          $lat = $_REQUEST['lat'];
          $arr = loadCache();
          //var_dump($arr);
          if(!array_key_exists($address,$arr)){
             file_put_contents('geocache2.csv', "$address;$long;$lat\n",FILE_APPEND);
          }
           echo '{"lb":'.$lat.',"mb":'.$long.'}';
    }
    
    //echo $long." ".$lat." ".$address;
?>