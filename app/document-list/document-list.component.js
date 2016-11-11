'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('documentList').
  component('documentList', {
    templateUrl: 'document-list/document-list.template.html',
    controller: ['Document', 'Upload', '$uibModal', '$timeout',
      function DocumentListController(Document, Upload, $uibModal, $timeout) {
     
		var vm = this;
		vm.f = null;
		vm.getDocuments = Document.getDocuments().then(function(response){
			vm.documents = response;
		});
		
		vm.uploadFiles = function(file, errFiles) {
			vm.f = file;
			vm.errFile = errFiles && errFiles[0];
			
			if (file) {
				file.upload = Upload.upload({
					url: 'http://localhost/api/public/upload',
					data: {file: file}
				});

				file.upload.then(function (response) {
					$timeout(function () {
						vm.documents.push(response.data);
					});
					
				}, function (response) {
					if (response.status > 0) {
						vm.errorMsg = 'Error: ' + response.data.message;
					} 
				});
			}   
		};
		
		
		/* OPEN MODAL */
		vm.open = function(id, filename){
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title-top',
				ariaDescribedBy: 'modal-body-top',
				templateUrl: 'document-list/document.template1.html',
				size: 'lg',
				controller: function(Document, $scope) {
					Document.getDocument(id).then(function(response){
						$scope.document = response;
						$scope.name = filename;
					});
				}
			});
		};
		
     
      }
    ]
  });
