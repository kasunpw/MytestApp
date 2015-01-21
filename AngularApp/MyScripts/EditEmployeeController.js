app.controller("EditEmployeeController", function ($scope, $location,ShareData,SinglePageCRUDService) {
    $scope.selectedDepartment = undefined;
    $scope.selectedDesignation = undefined;
    getEmployee();

    function getEmployee() {
        
        var promiseGetEmployee = SinglePageCRUDService.getEmployee(ShareData.value);

        
        promiseGetEmployee.then(function (pl)
        {
            $scope.Employee = pl.data;
            $scope.departments = [{ departmentName: 'IT' }, { departmentName: 'Admin' }, { departmentName: 'HR' }, { departmentName: 'Finance' }, { departmentName: 'SM' }, { departmentName: 'Accts' }, { departmentName: 'DEV' }];
            $scope.designations = [{ designation: 'MGR' }, { designation: 'Lead' }, { designation: 'SSE' }, { designation: 'SE' }, { designation: 'Executive' }, { designation: 'CEO' }, { designation: 'MD' }, { designation: 'AO' }]
            $scope.selectedDepartment = $scope.departments.filter(function (el) {
                return (el.departmentName === pl.data.DeptName);
            }).map(function (el) {
                return el;
            })[0];
            $scope.selectedDesignation = $scope.designations.filter(function (el) {
                return (el.designation === pl.data.Designation);
            }).map(function (el) {
                return el;
            })[0];
        },
              function (errorPl) {
                  $scope.error = 'failure loading Employee', errorPl;
              });
    }

    $scope.save = function () {
        var Employee = {
            EmpNo: $scope.Employee.EmpNo,
            EmpName: $scope.Employee.EmpName,
            Salary: $scope.Employee.Salary,
            DeptName: $scope.Employee.DeptName,
            Designation: $scope.Employee.Designation
        };

        var promisePutEmployee = SinglePageCRUDService.put($scope.Employee.EmpNo,Employee);
        promisePutEmployee.then(function (pl)
        {
            $location.path("/showemployees");
        },
              function (errorPl) {
                  $scope.error = 'failure loading Employee', errorPl;
              });
    };

    $scope.cancelSave = function () {
        $location.path("/showemployees");
    }
});