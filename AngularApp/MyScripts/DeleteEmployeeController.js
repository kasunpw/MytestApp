app.controller("DeleteEmployeeController", function ($scope, $location, ShareData, SinglePageCRUDService) {

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
                $location.path("/showemployee");
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