(function () {
    app.controller("customerDetailsCtrl", function (AclService,$scope, $location, $cookies, $cookieStore, app, api) {
        var lgc=this;
        
        app.setTitle("Customer Details");

    //   setTimeout(()=>{
        var customer=localStorage.getItem('customerInfo');
     
        $scope.req= JSON.parse(customer)
    
    // })
  
        
    $scope.logOut=function(){
        localStorage.removeItem('customerInfo')
        window.location.href="/customer-login"

    }
    
       
    $scope.accountTypeList=[]

  
    var promise = api.getAccountTypes();
    promise.then(function mySucces(r) {
        console.log(r)
        App.unblockUI();
        if (r.data.statusCode == 200) {
           $scope.accountTypeList=r.data.data;
          
        } else {
            // swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });
        
    $scope.accountServiceTypes=[]

  
    var promise = api.getserviceRequestTypes();
    promise.then(function mySucces(r) {
        console.log(r)
        App.unblockUI();
        if (r.data.statusCode == 200) {
           $scope.accountServiceTypes=r.data.data;
          
        } else {
            // swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });

    

    $scope.getBenficiarylist=[]

  
    var promise = api.getBenficiarylist($scope.req.token);
    promise.then(function mySucces(r) {
        console.log(r)
        App.unblockUI();
        if (r.data.statusCode == 200) {
           $scope.getBenficiarylist=r.data.data;
          
        } else {
            // swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });

    
    $scope.getserviceRequestlist=[]

  
    var promise = api.getserviceRequestlist($scope.req.token);
    promise.then(function mySucces(r) {
        console.log(r)
        App.unblockUI();
        if (r.data.statusCode == 200) {
           $scope.getserviceRequestlist=r.data.data;
          
        } else {
            // swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });

    $scope.getfundRequestlist=[]

  
    var promise = api.getfundRequestlist($scope.req.token);
    promise.then(function mySucces(r) {
        console.log(r)
        App.unblockUI();
        if (r.data.statusCode == 200) {
            console.log("s")
            console.log(r.data.data)
           $scope.getfundRequestlist=r.data.data;
          
        } else {
            // swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });

    $scope.getAccountlist=[]
  

    var promise = api.getAccountlistType($scope.req.token);
    promise.then(function mySucces(r) {

        App.unblockUI();

        if (r.data.statusCode == 200) {
            $scope.getAccountlist=r.data.data;
         

        } else {

            // swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });
    $scope.getBalancelist=[]
  

    var promise = api.getBalancelistType($scope.req.token);
    promise.then(function mySucces(r) {

        App.unblockUI();

        if (r.data.statusCode == 200) {
            $scope.getBalancelist=r.data.data;
            console.log($scope.getBalancelist)

        } else {

            // swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });

    $scope.approveTransaction=function(id){

        var req={
            "transactionId":id
        }
        
        swal({

            title: "Do you want to Approve ?",
            type: "info",
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Yes",
            cancelButtonClass: "btn-danger",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: true

        },

            function (isConfirm) {
                if (isConfirm) {
                    console.log(JSON.stringify(req))
                    App.blockUI({
                        boxed: !0,
                        zIndex: 20000
                    })
                    $.blockUI({
                        message: 'Please wait... we are processing your request',
                        baseZ: 15000
                    });
                    var promise = api.approveFunds(req);
                    promise.then(function mySucces(r) {
                
                        App.unblockUI();
                
                        if (r.data.statusCode == 200) {
                
                            lgc.token= r.data.data;
                            swal({
                              title: "OTP!",
                              text: "Please Enter OTP:",
                              type: "input",
                              // showCancelButton: true,
                              closeOnConfirm: false,
                              inputPlaceholder: "OTP"
                            }, function (inputValue) {
                              if (inputValue === false) return false;
                              if (inputValue === "") {
                
                                swal.showInputError("please enter OTP!");
                                return false
                              }
                
                              var request = {
                                "token": lgc.token,
                                "otp": inputValue
                            };
                            App.blockUI({
                                boxed: !0
                            });
                
                            var promise = api.customerLoginWithOtpAddFunds(request);
                
                            promise.then(function mySucces(r) {
                                App.unblockUI();
                                if (r.data.statusCode == 200) {
                                //   localStorage.setItem('customerInfo',  JSON.stringify(r.data.data));
                
                                //    window.open("/customer-details")
                                   location.reload(true)
                                } else {
                                  swal.showInputError("please enter Valid OTP!");
                                }
                            });
                             
                              // swal("Nice!", "You wrote: " + inputValue, "success");
                            });
                  
                
                        } else {
                
                            swal("Info!", r.data.message, "info");
                        }
                        $.unblockUI();
                    });
                } else {
                    // window.location.href='tel:'+toNumber;
                }
            });

          
       

    }


    $scope.withdrawFunds=function(){

        var req={
            "fromAccount":$scope.withdrawAccountType,
         
            "amount":$scope.withdrawAmount,
            "comments":$scope.withdrawComments
            }
          
       
    console.log(JSON.stringify(req))
    App.blockUI({
        boxed: !0,
        zIndex: 20000
    })
    $.blockUI({
        message: 'Please wait... we are processing your request',
        baseZ: 15000
    });
    var promise = api.withdrawFunds(req);
    promise.then(function mySucces(r) {

        App.unblockUI();

        if (r.data.statusCode == 200) {

            lgc.token= r.data.data;
            swal({
              title: "OTP!",
              text: "Please Enter OTP:",
              type: "input",
              // showCancelButton: true,
              closeOnConfirm: false,
              inputPlaceholder: "OTP"
            }, function (inputValue) {
              if (inputValue === false) return false;
              if (inputValue === "") {

                swal.showInputError("please enter OTP!");
                return false
              }

              var request = {
                "token": lgc.token,
                "otp": inputValue
            };
            App.blockUI({
                boxed: !0
            });

            var promise = api.customerLoginWithOtpAddFunds(request);

            promise.then(function mySucces(r) {
                App.unblockUI();
                if (r.data.statusCode == 200) {
                //   localStorage.setItem('customerInfo',  JSON.stringify(r.data.data));

                //    window.open("/customer-details")
                   location.reload(true)
                } else {
                  swal.showInputError("please enter Valid OTP!");
                }
            });
             
              // swal("Nice!", "You wrote: " + inputValue, "success");
            });
  

        } else {

            swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });
    }

    
    $scope.transferFundsRequest=function(){

        var req={
            "fromAccount":$scope.fundFromAccount,
            "toAccount":$scope.fundToAccount,
            "amount":$scope.fundAmount,
            "comments":$scope.fundComments
            }
          
       
    console.log(JSON.stringify(req))
    App.blockUI({
        boxed: !0,
        zIndex: 20000
    })
    $.blockUI({
        message: 'Please wait... we are processing your request',
        baseZ: 15000
    });
    var promise = api.createFundRequest(req);
    promise.then(function mySucces(r) {

        App.unblockUI();

        if (r.data.statusCode == 200) {

            swal("Success!", "Request Added successfully", "success");

        } else {

            swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });
    }
    $scope.transferFunds=function(){

        var req={
            "fromAccount":$scope.transfer,
            "toAccount":$scope.toAccount,
            "amount":$scope.transferAmount,
            "comments":$scope.transferComments
            }
          
       
    console.log(JSON.stringify(req))
    App.blockUI({
        boxed: !0,
        zIndex: 20000
    })
    $.blockUI({
        message: 'Please wait... we are processing your request',
        baseZ: 15000
    });
    var promise = api.transferAddFunds(req);
    promise.then(function mySucces(r) {

        App.unblockUI();

        if (r.data.statusCode == 200) {

            lgc.token= r.data.data;
            swal({
              title: "OTP!",
              text: "Please Enter OTP:",
              type: "input",
              // showCancelButton: true,
              closeOnConfirm: false,
              inputPlaceholder: "OTP"
            }, function (inputValue) {
              if (inputValue === false) return false;
              if (inputValue === "") {
                swal.showInputError("please enter OTP!");
                return false
              }

              var request = {
                "token": lgc.token,
                "otp": inputValue
            };
            App.blockUI({
                boxed: !0
            });

            var promise = api.customerLoginWithOtpAddFunds(request);

            promise.then(function mySucces(r) {
                App.unblockUI();
                if (r.data.statusCode == 200) {
                //   localStorage.setItem('customerInfo',  JSON.stringify(r.data.data));

                //    window.open("/customer-details")
                   location.reload(true)
                } else {
                  swal.showInputError("please enter Valid OTP!");
                }
            });
             
              // swal("Nice!", "You wrote: " + inputValue, "success");
            });
  

        } else {

            swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });
    }

    $scope.addFunds=function(){

        var req={
            "fromAccount":$scope.accountType,
            "amount":$scope.amount,
            "comments":$scope.comments
            }
       
    console.log(JSON.stringify(req))
    App.blockUI({
        boxed: !0,
        zIndex: 20000
    })
    $.blockUI({
        message: 'Please wait... we are processing your request',
        baseZ: 15000
    });
    var promise = api.customerAddFunds(req);
    promise.then(function mySucces(r) {

        App.unblockUI();

        if (r.data.statusCode == 200) {

            lgc.token= r.data.data;
            swal({
              title: "OTP!",
              text: "Please Enter OTP:",
              type: "input",
              // showCancelButton: true,
              closeOnConfirm: false,
              inputPlaceholder: "OTP"
            }, function (inputValue) {
              if (inputValue === false) return false;
              if (inputValue === "") {
                swal.showInputError("please enter OTP!");
                return false
              }

              var request = {
                "token": lgc.token,
                "otp": inputValue
            };
            App.blockUI({
                boxed: !0
            });

            var promise = api.customerLoginWithOtpAddFunds(request);

            promise.then(function mySucces(r) {
                App.unblockUI();
                if (r.data.statusCode == 200) {
                //   localStorage.setItem('customerInfo',  JSON.stringify(r.data.data));

                //    window.open("/customer-details")
                   location.reload(true)
                } else {
                  swal.showInputError("please enter Valid OTP!");
                }
            });
             
              // swal("Nice!", "You wrote: " + inputValue, "success");
            });
  

        } else {

            swal("Info!", r.data.message, "info");
        }
        $.unblockUI();
    });
    }

    $scope.getAccountHistory=[];
        $scope.transactionHistory=function(){
            var req={
                
                "account":$scope.accountInfo
                }
           
        console.log(JSON.stringify(req))
        App.blockUI({
            boxed: !0,
            zIndex: 20000
        })
        $.blockUI({
            message: 'Please wait... we are processing your request',
            baseZ: 15000
        });
        var promise = api.customerTransactionHistoryAccount(req);
        promise.then(function mySucces(r) {

            App.unblockUI();

            if (r.data.statusCode == 200) {
                $scope.getAccountHistory=r.data.data;
                console.log( $scope.getAccountHistory)

                // swal("Success!", "Added successfully", "success");

            } else {

                swal("Info!", r.data.message, "info");
            }
            $.unblockUI();
        });

        }
    
        $scope.addAccount=function(){

            var req={
                "token":$scope.req.token,
                "accountType":$scope.accountType
                }
           
        console.log(JSON.stringify(req))
        App.blockUI({
            boxed: !0,
            zIndex: 20000
        })
        $.blockUI({
            message: 'Please wait... we are processing your request',
            baseZ: 15000
        });
        var promise = api.customerAddAccount(req);
        promise.then(function mySucces(r) {

            App.unblockUI();

            if (r.data.statusCode == 200) {

                swal("Success!", "Added successfully", "success");

            } else {

                swal("Info!", r.data.message, "info");
            }
            $.unblockUI();
        });
        }

        


        $scope.addServiceRequest=function(){
    
            var req={
                    "token": $scope.req.token,
                    "comments":$scope.commentService,
                    "type":$scope.serviceType,
                   
                    }
               
            console.log(JSON.stringify(req))
            App.blockUI({
                boxed: !0,
                zIndex: 20000
            })
            $.blockUI({
                message: 'Please wait... we are processing your request',
                baseZ: 15000
            });
            var promise = api.saveCustomerServiceReq(req);
            promise.then(function mySucces(r) {

                App.unblockUI();

                if (r.data.statusCode == 200) {

                    swal("Success!", "Service added successfully", "success");

                } else {

                    swal("Info!", r.data.message, "info");
                }
                $.unblockUI();
            });
    
        }


        $scope.addBenificiary=function(){
    
            var req={
                    "customerToken": $scope.req.token,
                    "beneficiaryName":$scope.name,
                    "beneficiaryAccount":$scope.accountNumber,
                    "routingNumber":$scope.routingNumber,
                    "accountType":$scope.accountType
                    }
               
            console.log(JSON.stringify(req))
            App.blockUI({
                boxed: !0,
                zIndex: 20000
            })
            $.blockUI({
                message: 'Please wait... we are processing your request',
                baseZ: 15000
            });
            var promise = api.saveCustomerBeneficiary(req);
            promise.then(function mySucces(r) {

                App.unblockUI();

                if (r.data.statusCode == 200) {

                    lgc.token= r.data.data;
                    swal({
                      title: "OTP!",
                      text: "Please Enter OTP:",
                      type: "input",
                      // showCancelButton: true,
                      closeOnConfirm: false,
                      inputPlaceholder: "OTP"
                    }, function (inputValue) {
                      if (inputValue === false) return false;
                      if (inputValue === "") {
                        swal.showInputError("please enter OTP!");
                        return false
                      }
      
                      var request = {
                        "token": lgc.token,
                        "otp": inputValue
                    };
                    App.blockUI({
                        boxed: !0
                    });
      
                    var promise = api.customerLoginWithOtpBeneficiary(request);
      
                    promise.then(function mySucces(r) {
                        App.unblockUI();
                        if (r.data.statusCode == 200) {
                        //   localStorage.setItem('customerInfo',  JSON.stringify(r.data.data));
      
                        //    window.open("/customer-details")
                           location.reload(true)
                        } else {
                          swal.showInputError("please enter Valid OTP!");
                        }
                    });
                     
                      // swal("Nice!", "You wrote: " + inputValue, "success");
                    });
          

                } else {

                    swal("Info!", r.data.message, "info");
                }
                $.unblockUI();
            });
    
        }


     

    })


})();