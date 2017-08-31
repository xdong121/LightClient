(function () {
    'use strict';

    angular.module('Legacy.features.scrum.project', [
        'Legacy.features.scrum.project.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('scrum.newProject', {
                url: '/scrum-newProject',
                templateUrl: 'app/features/scrum/project/newProject/newProject.html',
                title: '新建项目',
                controller: "NewProjectController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 0
                }
            })
            .state('scrum.projectList', {
                url: '/scrum-projectList',
                templateUrl: 'app/features/scrum/project/projectList/projectList.html',
                title: '项目列表',
                controller: "ProjectListController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1
                }
            });
    }

})();