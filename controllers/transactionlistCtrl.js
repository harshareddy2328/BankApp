(function () {
    app.controller("transactionlistCtrl", function (AclService,$scope, $location, $cookies, $cookieStore, app, api) {

        app.setTitle("Transaction Deatils");
        $scope.userPermissions=localStorage.getItem('permissions');
        setTimeout(function () {

            $scope.transactionStatus = api.getTransactionStatusList();
            $scope.transactionStatus.then(function mySucces(r) {
                console.log(r.data)
           
                    $scope.transactionStatus = r.data.data;
                
            });
            $scope.submit = function () {

                if (!$('#transactionForm').valid()) {
                    return false;
                }
                var request = {
                   "fromDate":$scope.date,
					"toDate":$scope.tdate,
				   "account":$scope.lead,
					"status":$scope.status,
				   "transactionId":$scope.transactionId
                };
                $.blockUI({
                    message: 'Please wait... we are processing your request',
                    baseZ: 15000
                });
                var promise = api.getTransactionList(request);
                promise.then(function mySucces(r) {
                    App.unblockUI();
                    if (r.data.statusCode === 200) {
                        $scope.TransactionList = r.data.data;
                        $scope.total = r.data.count;
    
                    } else {
                        $scope.TransactionList = [];
                        swal("Error!", "No data found..!", "error");
                    }
                    $.unblockUI();
                });
                // }
    
            }

            $scope.openTransactionUpdateModal= function(transactionId){
                $scope.tId = transactionId;
                $('#approveModal').modal('show');
            }
            $scope.approveTransaction = function(transactionId,comment){

                if (!$('#approveForm').valid()) {
                    return false;
                }
                var request ={
                    postedBy : localStorage.getItem('getEmail'),
                transactionId : $scope.tId,
                 status : $scope.updateStatus,
                 comments : $scope.updatecomments  
                }
                $.blockUI({
                    message: 'Please wait... we are processing your request',
                    baseZ: 15000
                });
                var promise = api.approveTransaction(request);
                promise.then(function mySucces(r) {
                    App.unblockUI();
                    if (r.data.statusCode === 200) {
                        swal("Done!", r.data.message, "success")
                    } else {
                        $scope.TransactionList = [];
                        swal("Error!", "No data found..!", "error");
                    }
                    $.unblockUI();
                });
            }

            $('#date,#tdate').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
            });
            $scope.resetFilter = function () {
                location.reload(true);
            }
            // $("#date").datepicker("setDate", new Date());
            // $("#tdate").datepicker("setDate", new Date());

        }, 100);
    })

})();