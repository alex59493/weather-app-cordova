var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        navigator.splashscreen.hide();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};

app.initialize();

var appAngular = angular.module('app', ['ngRoute']);

appAngular.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl : 'partials/home.html'
        })
        .when('/about', {
            templateUrl : 'partials/about.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

appAngular.controller('NavCtrl', function($scope) {
    $scope.menu = 'home';
});

appAngular.controller('WeatherCtrl', function($scope, $http) {
    
    $scope.panel = 0;

    // $scope.city = ''

    $scope.search = function() {
        var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + $scope.city + '&appid=8864493f6cc5082458c8624919207fcd';

        $scope.loader = true;

        $http.get(url)
            .then(function(resp) {
                $scope.loader = false;
                $scope.weather = resp.data;
                $scope.panel = 1;
            })
            .catch(function() {
                $scope.loader = false;
                alert('Impossible de récupérer les données');
            });
    }

    $scope.Math = Math; // Inject a function to HTML template

    $scope.expand = function(e) {
        $elem = $(e.currentTarget); // the "$" is used to show that the element is a jQuery element
        $elem.addClass('row_active').siblings().removeClass('row_active'); // siblings() select all the elements who are on the same level
    }

    $scope.geolocate = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=8864493f6cc5082458c8624919207fcd';
            
            $scope.loader = true;
            
            $http.get(url)
                .then(function(resp) {
                    $scope.loader = false;
                    $scope.weather = resp.data;
                    $scope.panel = 1;
                })
                .catch(function() {
                    $scope.loader = false;
                    alert('Impossible de récupérer les données');
                });
        },
        function() {
            console.log('Geolocation doesnt work :/');
        });
    }

});