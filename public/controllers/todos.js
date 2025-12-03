myApp.controller("todosController", function($scope, $http) {
   $scope.tasks = [];

   $scope.loadTasks = () => {
      // Make an Ajax call to our GET endpoint

      $http.get("/api/todos",
      {
         headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt")}
      })
      .then(result => {
         $scope.tasks = result.data;
      }).catch(err => {
         alert(err.data.message);
      })
   }

   // Add Task
   $scope.addTask = () => {
      let newTask = {
         task: $scope.task
      }

      // Do a POST Ajax request to add the new task
      $http.post("/api/todos", newTask,
      {
         headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt")}
      })
      .then(result => {
         $scope.tasks.push(result.data);
         $scope.task = "";
      }).catch(err => {
         alert(err.data.message);
      })
   }


   // Delete Task
   $scope.removeTask = id => {
      $http.delete(`/api/todos/${id}`,
      {
         headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt")}
      })
      .then(result => {
         for(let i = 0; i < $scope.tasks.length; i++) {
            if ($scope.tasks[i]._id === result.data._id) {
               $scope.tasks.splice(i, 1);
            }
         }
      }).catch(err => {
         alert(err.data.message);
      })
   }


   // Edit Task
   $scope.editTask = id => {
      let modTask = {
         task: prompt("Enter new task")
      }

      $http.patch(`/api/todos/${id}`, modTask, 
      {
         headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt")}
      })
      .then(result => {
         let foundTask = $scope.tasks.find(task => task._id === result.data._id);
         if (foundTask) {
            foundTask.task = result.data.task;
         }
      }).catch(err => {
         alert(err.data.message);
      })
   }

   // Logout

   $scope.logout = () => {
      sessionStorage.removeItem("jwt");
      window.location = "#!/";
   }
})