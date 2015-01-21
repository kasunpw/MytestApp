app.controller('AddEmployeeController', function ($scope, SinglePageCRUDService, $location) {
    $scope.EmpNo = 0;
    $scope.selectedDepartment = undefined;
    $scope.selectedDesignation = undefined;
    $scope.departments = [{ departmentName: 'IT' }, { departmentName: 'Admin' }, { departmentName: 'HR ' }, { departmentName: 'Finance' }, { departmentName: 'SM' }, { departmentName: 'Accts' }, { departmentName: 'DEV' }];
    $scope.designations = [{ designation: 'MGR' }, { designation: 'Lead' }, { designation: 'SSE' }, { designation: 'SE' }, { designation: 'Executive' }, { designation: 'CEO' }, { designation: 'MD' }]
    $scope.save = function () {
        var Employee = {
            EmpNo: $scope.EmpNo,
            EmpName: $scope.EmpName,
            Salary: $scope.Salary,
            DeptName: $scope.selectedDepartment.departmentName,
            Designation: $scope.selectedDesignation.designation
        };
     
        var promisePost = SinglePageCRUDService.post(Employee);


        promisePost.then(function (pl) {
            $scope.EmpNo = pl.data.EmpNo;
            //alert("EmpNo " + pl.data.EmpNo);
            var promiseGetEmployees = SinglePageCRUDService.getEmployees();

            promiseGetEmployees.then(function (pl) {
                $scope.Employees = pl.data;
                $location.path("/showemployees");
            },
                  function (errorPl) {
                      $scope.error = 'failure loading Employee', errorPl;
                  });
        },
              function (errorPl) {
                  $scope.error = 'failure loading Employee', errorPl;
              });

    };
    $scope.cancelSave = function () {
        $location.path("/showemployees");
    }
});