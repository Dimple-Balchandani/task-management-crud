angular.module('myApp', ['ngMaterial','ngMessages','ngAnimate','ui.bootstrap'])
.controller('myCtrl',['$scope','$mdDialog','$timeout','$interval' ,
function($scope,$mdDialog,$timeout,$interval) {
$scope.tasks = [];

$scope.addRow = function(){	
		
	$scope.state = 'Running';
	$scope.date = Date.now();
	$scope.actions = 'Cancel';
	$scope.errortext = "";
              
       	if($scope.task_name!=null && $scope.owner!=null )
	{
	$scope.tasks.push({ 'task_name':$scope.task_name, 'owner': $scope.owner,'date':$scope.date,'state':$scope.state, 'actions':$scope.actions,'myStyle_success':$scope.myStyle_success,'myStyle_info':$scope.myStyle_info,'myStyle_warning':$scope.myStyle_warning,'myStyle_danger':$scope.myStyle_danger });
	} 
	else {
            $scope.errortext = "The fields cannot be left empty";
        } 
  };
}])
.controller('taskCtrl',['$scope','$mdDialog','$timeout','$interval' ,
function($scope,$mdDialog,$timeout,$interval) {
	$scope.state = 'Running';
	$scope.flag = false;
	$scope.pr1=0;
	$scope.pr2=0;
	$scope.pr3=0;
	$scope.pr4=0;

 $scope.clear = function(name){
 	
 		var pointer = -1;		
		var Arr = eval( $scope.tasks );
		for( var i = 0; i < Arr.length; i++ ) {
			if( Arr[i].task_name === name ) {
				pointer = i;
				break;
			}
		  }
		$scope.tasks.splice( pointer, 1 );
			
	};


	  $scope.myStyle_success = {
	    "width": "0%"
	  };
	  $scope.myStyle_info = {
	    "width": "0%"
	  };
	  $scope.myStyle_warning = {
	    "width": "0%"
	  };
	  $scope.myStyle_danger = {
	    "width": "0%"
	  };
  
  function update(){
  	$scope.myStyle_success.width = $scope.pr1 + "%";
  	$scope.myStyle_info.width = $scope.pr2 + "%";
  	$scope.myStyle_warning.width = $scope.pr3 + "%";
  	$scope.myStyle_danger.width = $scope.pr4 + "%";
  }

$scope.indexFunc= function(index){
   	$scope.intervalFunc = $interval(function(){
            $scope.tasks[index].state='Running';
            $scope.flag=false;
            if($scope.pr4 ==100)
		{
		$scope.tasks[index].state='Completed';
		$interval.cancel($scope.intervalFunc);
		}
            if($scope.pr1 < 100){
              	$scope.pr1 += 10;
            }
            else if($scope.pr2 < 100){
            	$scope.pr2 += 5;
            	if($scope.pr2 == 50 && index==2)
            	{
             	$scope.tasks[index].state='Failed';	
             	$interval.cancel($scope.intervalFunc);
             	$scope.flag=true;
             	
             	}
            }
            else if($scope.pr3 < 100){
            	$scope.pr3 += 20;
            }
            else if($scope.pr4 < 100){
            	
            	$scope.pr4 += 10;

            }

            update();
		}, 500);
   };
   $scope.resume = function(index){
			
   	$scope.indexFunc(index);
	}
 	
 $scope.my_action=function(index){
 	
 	if($scope.tasks[index].actions=="Cancel")
 		return 0;
 	else if($scope.tasks[index].actions=="Clear") 
 		return 1;
 	else
 		return -1;
 }

 $scope.cancel = function(index){	
	
	$interval.cancel($scope.intervalFunc);
	$scope.tasks[index].state = 'Canceled';
  	$scope.tasks[index].actions='Clear';
  	
  };  	

}]);	





  
