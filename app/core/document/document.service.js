'use strict';

angular.
  module('core.document').factory('Document', ['$resource', '$http', '$sce', function($resource, $http, $sce) {
		
	var _getDocuments = function(){ 		
		return $http.get('http://localhost/api/public/documents')
			.then(function (response) {
				return response.data;
		  });		  
	};
	
	var _getDocument = function( documentId ){
		return $http.get('http://localhost/api/public/document/'+documentId,{responseType: 'arraybuffer'})
			.then(function (response) {
				var file = new Blob([response.data], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL(file);
				var document = $sce.trustAsResourceUrl(fileURL);				
				return document;
		  });
	};
	
	/* public */
	return {
		getDocuments: function(){
			return _getDocuments();
		},
        getDocument: function( documentId ){
			return _getDocument( documentId );
		}
	};
}
]);
