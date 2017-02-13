var app=angular.module("TwitchStream",[]);
app.controller("Controller", function($scope,$http){

  var streamer= ["Freecodecamp", "GeoffStorbeck", "Terakilobyte",       "Habathcx","Notmichaelmcdonald","RobotCaleb","Medrybw","Comster404","Brunofin","Thomasballinger","Joe_at_underflow","Noobs2ninjas","Mdwasp","Beohoff","Xenocomagain","Papfirm1908","LotharHS","TSM_Dyrus","Nightblue3","Gripex90","olofmeister","ESL_SC2"];

  var callback = '/?callback=?';
	var url = 'https://wind-bow.hyperdev.space/twitch-api/';
  $scope.All=[];
  $scope.online=[];
  $scope.offline=[];


    
    streamer.forEach(function(stream){
      var temp={};
     
      $.getJSON(url+'streams/'+stream+callback).done( function(data) {
        var userstreaming= (data.stream ==null)?false:true;
          temp.name=stream;
          if (userstreaming) {
            
            temp.status= data.stream.channel.status;
             if(temp.status.length>30)
          temp.status = temp.status.substring(0,27) + '...';
            temp.viewers=data.stream.viewers;
       }
           
      $.getJSON(url+'users/'+stream+callback).done( function(data) {
      		  if(data.status ===404) { 
                // username does not exist
            temp.status="Account Closed" ;
            temp.ins=temp.status;
            }
        temp.logo =data.logo? data.logo:"http://res.cloudinary.com/dannycoder/image/upload/v1450656122/img-placeholder_kuedre.jpg";
        
            console.log(temp);
     
            
        $scope.All.push(temp);
                 
        if (userstreaming) {

           
          $scope.online.push(temp);
        } else {
          $scope.offline.push(temp);
        }
        $scope.result = $scope.All;
        $scope.$apply();
            
       });
    });
       });
  
$scope.showAll = function() {
      $scope.result = $scope.All;
   }
$scope.showonline = function() {
     $scope.result = $scope.online;
    }
$scope.showoffline = function() {
      $scope.result = $scope.offline;
    }

 });