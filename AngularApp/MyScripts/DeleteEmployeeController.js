app.controller("DeleteEmployeeController", function ($scope, $location, ShareData, SinglePageCRUDService, toaster) {

    getEmployee();
    function getEmployee() {

        var promiseGetEmployee = SinglePageCRUDService.getEmployee(ShareData.value);

        promiseGetEmployee.then(function (pl) {
            $scope.Employee = pl.data;
        },
              function (errorPl) {
                  $scope.error = 'failure loading Employee', errorPl;
              });
    }

    $scope.delete = function () {
        if (confirm("Click OK to continue?")) {
            var promiseDeleteEmployee = SinglePageCRUDService.delete(ShareData.value);

            promiseDeleteEmployee.then(function (pl) {
                toaster.pop('success', "", "Employee Deleted Successfully");
                $location.path("/showemployees");
            },
                  function (errorPl) {
                      $scope.error = 'failure loading Employee', errorPl;
                  });
        }
        
    };
    $scope.cancelDelete = function () {
        $location.path("/showemployees");
    }
});