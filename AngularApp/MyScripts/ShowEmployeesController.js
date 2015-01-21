app.controller('ShowEmployeesController', function ($scope, $location, SinglePageCRUDService, ShareData) {
 
    loadRecords();
 
    function loadRecords()
    {
        var promiseGetEmployees = SinglePageCRUDService.getEmployees();

        promiseGetEmployees.then(function (pl) { $scope.Employees = pl.data },
              function (errorPl) {
                  $scope.error = 'failure loading Employee', errorPl;
              });
    }


    $scope.addEmployee = function () {
        $location.path("/addemployee");
    }

    $scope.editEmployee = function (EmpNo) {
        ShareData.value = EmpNo;
        $location.path("/editemployee");
    }

    $scope.deleteEmployee = function (EmpNo) {
        ShareData.value = EmpNo;
        $location.path("/deleteemployee");
    }
});