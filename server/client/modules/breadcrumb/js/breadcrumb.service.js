"use strict";

angular
	.module('RegistryApp.Breadcrumb')
	.service('BreadcrumbService', [
		function(){
			var that = this;

			this.list = [];

			this.setBreadcrumb = function(list){
				that.list = [];
				list.forEach(function(breadcrumbItem, index){
					that.list.push(breadcrumbItem);
					if(index !== list.length - 1){
						that.list.push({
							text: '/'
						});
					}
				});
			}
		}
	]);