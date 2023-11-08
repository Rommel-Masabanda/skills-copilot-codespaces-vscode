function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'modules/skills/views/member.html',
        controller : 'SkillsMemberController',
        controllerAs : 'skillsMemberCtrl',
        binToController : true,
        scope: {
            member: '='
        }
    };
}