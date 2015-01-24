"use strict";angular.module("recommenuCmsApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ngDragDrop","restangular","underscore","flow","angular-loading-bar"]).config(["$routeProvider","$locationProvider","$httpProvider","RestangularProvider",function(a,b,c,d){c.defaults.useXDomain=!0,delete c.defaults.headers.common["X-Requested-With"],d.setBaseUrl("https://recommenu-staging-api.herokuapp.com"),d.configuration.requestSuffix="&",d.setRequestSuffix("/"),d.addResponseInterceptor(function(a,c){b.html5Mode(!0);var d;return"getList"===c?(d=a.results,d.meta=a):d=a,d}),a.when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/entries",{templateUrl:"views/entrygrid.html",controller:"EntrygridCtrl"}).when("/menus",{templateUrl:"views/addmenu.html",controller:"AddmenuCtrl"}).when("/sections",{templateUrl:"views/addsection.html",controller:"AddsectionCtrl"}).when("/company",{templateUrl:"views/addcompany.html",controller:"AddcompanyCtrl"}).when("/user",{templateUrl:"views/adduser.html",controller:"AdduserCtrl"}).otherwise({redirectTo:"/login"})}]),angular.module("recommenuCmsApp").factory("menu",["Restangular",function(a){var b=a.all("menus");return{loadActiveMenu:function(a){return b.getList({company:a})},createMenu:function(a){return b.post(a)},isAddingMenu:!1,menus:[],activeMenu:null,loadedMenu:!1}}]),angular.module("recommenuCmsApp").factory("auth",["Restangular",function(a){var b=a.all("api-token-auth/");return{login:function(a,c){return b.post(JSON.stringify({username:a,password:c}))},registerToken:function(b){a.setDefaultHeaders({"content-type":"application/json",Authorization:"Token "+b})},isLogged:!1,isNotFirstTime:!1}}]),angular.module("recommenuCmsApp").controller("LoginCtrl",["$scope","$location","$cookies","auth","client","menu","section","entry",function(a,b,c,d,e,f,g,h){a.$watch(function(){return d.isLogged},function(b){a.isLogged=b}),a.$watch(function(){return e.clients},function(b){a.companies=b}),a.user="",a.pw="",a.logging="",a.myCompany=null,a.signIn=function(b,f){void 0!==b&&void 0!==f?(a.logging="Connecting...",d.login(b,f).then(function(b){d.registerToken(b.token),e.getCompanies().then(function(b){d.isLogged=!0,e.clients=b,d.isNotFirstTime=c.isNotFirstTime||!1,console.log(d.isNotFirstTime),a.user="",a.pw="",a.logging=""},function(a){console.log(a),window.alert("Server ERROR!")})},function(b){a.logging="Denied, Try Again",a.user="",a.pw="",console.log(b)})):a.logging="Please Enter a User Name and Password"},a.selectClient=function(){null!==a.myCompany?(e.selectCompany(a.myCompany).then(function(a){f.menus=a,f.loadedMenu=!0,0===f.menus.length?b.path("/menus/"):(f.activeMenu=a[0],f.sections=g.restangularizeSections(f.activeMenu.sections),f.activeMenu.sections.length>0?(g.activeSection=f.activeMenu.sections[0],g.activeSection.entries=h.restangularizeEntries(g.activeSection.entries),b.path("/entries/")):(g.activeSection=null,g.creatingSection=!0,b.path("/sections/")))},function(a){window.alert("Server ERROR!"),console.log(a)}),d.hasSelectedClient=!0,a.selectLog="Loading..."):a.selectLog="Please select a client!"}}]),angular.module("recommenuCmsApp").controller("HeaderCtrl",["$scope","$location","$cookies","auth","client","menu",function(a,b,c,d,e,f){a.$watch(function(){return d.isLogged},function(b){a.needsLogout=b}),a.logout=function(){d.isLogged=!1,e.selectedClient=null,b.path("/login"),f.loadedMenu=!1,c.isNotFirstTime=!0}}]),angular.module("recommenuCmsApp").factory("client",["Restangular","menu",function(a,b){var c=a.all("companies/");return{getCompanies:function(){return c.getList()},selectCompany:function(a){return this.selectedClient=a,b.loadActiveMenu(a.id)},createCompany:function(a){return c.post(a)},clients:null,selectedClient:null}}]);var underscore=angular.module("underscore",[]);underscore.factory("_",function(){return window._}),angular.module("recommenuCmsApp").controller("EntrygridCtrl",["$q","$scope","section","entry","slider","auth","entryPricing",function(a,b,c,d,e,f,g){b.$watch(function(){return c.activeSection},function(a){null!==a&&(b.section=a,b.firstEntry=a.entries[0],b.activeTemplate=c.activeSectionTemplate)}),b.$watch(function(){return f.isNotFirstTime},function(a){b.isFirst=!a}),b.isEditingItems=!1,b.saveItems=function(){for(var a=b.section.entries.length-1;a>=0;a--)b.section.entries[a].order=a+1;d.saveAllEntries(b.section.entries).then(function(){console.log("Success!")},function(a){console.log(a),window.alert("Server ERROR!")})},b.addSlider=function(a){e.postSlider({entry:a.url,category:" ",average_score:"0",sliders:[]}).then(function(b){console.log(b),a.slider_templates.push(b)},function(a){console.log(a),window.alert("Server ERROR!")})},b.removeSlider=function(a,b,c){console.log(a),console.log(b),e.deleteSlider(b).then(function(b){console.log(b),a.slider_templates.splice(c,1)},function(a){console.log(a),window.alert("Server ERROR!")})},b.addEntry=function(){d.postEntry({name:" ",section:b.section.url,price:"",image:"",description:"",slider_templates:[],entry_prices:[],order:b.section.entries.length}).then(function(a){b.section.entries.push(a),console.log(a),b.addExtraPricing(a)},function(a){console.log(a),window.alert("Server ERROR!")})},b.removeEntry=function(a,c){d.deleteEntry(a).then(function(a){console.log(a),b.section.entries.splice(c,1)},function(a){console.log(a),window.alert("Server ERROR!")})},b.addExtraPricing=function(a){g.postEntryPrice({text:" ",price:" ",entry:a.url}).then(function(b){console.log(b),a.entry_prices.push(b)},function(a){console.log(a)})},b.removePricing=function(a,b,c){g.deleteEntryPrice(b).then(function(){a.entry_prices.splice(c,1)},function(a){console.log(a)})},b.encode={encodeImage:function(a,b){var c=new FileReader;c.readAsDataURL(a.file),c.onloadend=function(){console.log(c.result);var a=c.result.slice(c.result.indexOf("base64,")+7);b.image=a,console.log(b.image)}},errorUploading:function(a,b){console.log(a,b)}}}]),angular.module("recommenuCmsApp").controller("AddmenuCtrl",["$scope","$location","menu","client","section",function(a,b,c,d,e){a.$watch(function(){return c.isAddingMenu},function(b){a.addStarted=b}),a.title="",a.description="",a.footer="",a.createMenu=function(){""===a.title?window.alert("ENTER A TITLE"):c.createMenu({name:a.title,company:d.selectedClient.url,description:a.description,sections:[]}).then(function(a){c.menus.push(a),c.loadedMenu=!0,c.activeMenu=a,e.creatingSection=!0,b.path("/sections/")},function(a){console.log(a),window.alert("Server ERROR!")})}}]),angular.module("recommenuCmsApp").controller("AddsectionCtrl",["$scope","$location","section","menu","auth","sectionPricing",function(a,b,c,d,e,f){a.$watch(function(){return c.activeSection},function(b){null!==b?(a.section=b,a.isEditing=!0):(a.section={},a.section_prices=[{price:"",text:""}],a.isEditing=!1)}),a.$watch(function(){return d.activeMenu},function(b){null!==b&&(a.menuTitle=b.name)}),a.$watch(function(){return e.isNotFirstTime},function(b){a.isFirst=!b}),a.section={},a.section_prices=[{price:"",text:""}],a.isEditing=!1,a.hasExtraPricing="No",a.selectedTemplate="regular",a.willPostExtraPricing=!1,a.addExtraPricing=function(){a.section_prices.push({price:"",text:""})},a.newExtraPricing=function(){a.willPostExtraPricing=!0},a.clearPricing=function(){a.willPostExtraPricing=!1},a.removePricing=function(b){a.section_prices.splice(b,1)},a.createSection=function(){""===a.section.title?window.alert("ENTER A TITLE"):(a.section_prices=a.willPostExtraPricing===!1?[]:a.section_prices,a.section.menu=d.activeMenu.url,a.section.entries=[],a.section.order=d.activeMenu.sections.length,a.section.section_prices=[],c.postNewSection(a.section).then(function(e){d.activeMenu.sections.push(e),c.activeSection=e,c.creatingSection=!1,c.activeTemplate=a.selectedTemplate,f.saveSectionPricesToSection(a.section_prices,e).then(function(a){console.log(a),b.path("/entries/")},function(a){console.log(a)})},function(a){console.log(a),window.alert("Server ERROR!")}))},a.updateSection=function(){""===a.section.title?window.alert("ENTER A TITLE"):(a.section_prices=a.willPostExtraPricing===!1?[]:a.section_prices,c.updateSection(a.section).then(function(a){console.log(a),c.activeSection=a,b.path("/entries/")},function(a){console.log(a),window.alert("Server ERROR!")}))},a.removeSection=function(){c.deleteSection(c.activeSection).then(function(){console.log("Success!"),d.sections.splice(c.activeSection.order,1),c.activeSection=d.activeMenu.sections[0],b.path("/entries/")},function(a){console.log(a),window.alert("Server ERROR!")})}}]),angular.module("recommenuCmsApp").factory("section",["$http","$q","Restangular","sectionPricing",function(a,b,c,d){var e=c.all("sections");return{creatingSection:!1,activeSection:null,activeSectionTemplate:"normal",postNewSection:function(a){return e.post(a)},restangularizeSections:function(a){for(var b in a)a[b].section_prices=d.restangularizeSectionPricing(a[b].section_prices);return c.restangularizeCollection(null,a,"sections")},updateSection:function(a){return a.put()},deleteSection:function(a){return a.remove()},saveAllSections:function(a){for(var c=[],d=0;d<a.length;d++){console.log(a[d]);var e=b.defer();a[d].put().then(e.resolve,e.reject),c.push(e.promise)}return b.all(c)}}}]),angular.module("recommenuCmsApp").controller("sidebarCtrl",["$scope","$location","menu","section","entry",function(a,b,c,d,e){a.$watch(function(){return c.loadedMenu},function(b){a.menus=c.menus,a.loadedMenu=b}),a.$watch(function(){return d.creatingSection},function(b){a.isCreatingSection=b}),a.menus=[],a.loadedMenu=c.loadedMenu,a.count=0,a.addMenu=function(){c.isAddingMenu=!0},a.addSection=function(){b.path("/sections/"),d.creatingSection=!0,d.activeSection=null},a.loadActiveSection=function(a){b.path("/entries/"),void 0===a.entries.route&&(a.entries=e.restangularizeEntries(a.entries)),d.activeSection=a},a.editNewSection=function(){b.path("/sections/"),d.activeSection=null},a.sectionArranged=function(){for(var b=!1,c=a.menus[0].sections.length-1;c>=0;c--)a.menus[0].sections[c].order!==c+1&&(b=!0);a.hasChanged=b},a.saveOrderedChanges=function(){for(var b=a.menus[0].sections.length-1;b>=0;b--)a.menus[0].sections[b].order=b+1;d.saveAllSections(a.menus[0].sections).then(function(){console.log("success!!!")},function(a){console.log(a)})}}]).directive("sidebar",function(){return{templateUrl:"views/sidebar.html",restrict:"E"}}),angular.module("recommenuCmsApp").factory("entry",["$q","Restangular","slider","entryPricing",function(a,b,c,d){var e=b.all("entries");return{restangularizeEntries:function(a){for(var e in a)a[e].slider_templates=c.restangularizeSliders(a[e].slider_templates),a[e].entry_prices=d.restangularizeEntryPricing(a[e].entry_prices);return b.restangularizeCollection(null,a,"entries")},restangularizeEntry:function(a){return b.restangularizeEntry(null,a,"entries")},postEntry:function(a){return e.post(a)},updateEntry:function(a){return a.patch()},deleteEntry:function(a){return a.remove()},saveAllEntries:function(b){for(var c=[],d=0;d<b.length;d++){console.log(b[d]);var e=a.defer();b[d].put().then(e.resolve,e.reject),c.push(e.promise)}return a.all(c)}}}]),angular.module("recommenuCmsApp").factory("slider",["Restangular",function(a){var b=a.all("slider_templates");return{postSlider:function(a){return b.post(a)},deleteSlider:function(a){return a.remove()},updateSlider:function(a){return a.patch()},restangularizeSliders:function(b){return a.restangularizeCollection(null,b,"slider_templates")}}}]),angular.module("recommenuCmsApp").directive("ngReallyClick",[function(){return{restrict:"A",link:function(a,b,c){b.bind("click",function(){var b=c.ngReallyMessage;b&&window.confirm(b)&&a.$apply(c.ngReallyClick)})}}}]),angular.module("recommenuCmsApp").controller("AddcompanyCtrl",["$scope","$location","client","menu",function(a,b,c,d){a.createCompany=function(){a.url&&a.name&&a.contact&&a.address&&a.zip&&a.city&&a.menuUrl?c.createCompany({name:a.name,website:a.url,city:a.city,contact_name:a.contact,zip_code:a.zip,address1:a.address,menu_url:a.menuUrl}).then(function(a){c.clients.push(a),c.selectCompany(a).then(function(a){console.log(a),d.menus=a,d.loadedMenu=!0,b.path("/user/")},function(a){console.log(a),window.alert("Server ERROR!")})},function(a){console.log(a),window.alert("Server ERROR!")}):window.alert("FILL OUT ALL FORMS")}}]),angular.module("recommenuCmsApp").controller("AdduserCtrl",["$scope","$location","user",function(a,b,c){a.createUser=function(){a.fName&&a.lName&&a.email&&a.password&&a.username?a.password!==a.matchPassword?window.alert("Passwords do not match!"):c.createUser({username:a.username,email:a.email,first_name:a.fName,last_name:a.lName,password:a.password}).then(function(a){console.log(a),b.path("/menus/")},function(a){console.log(a),window.alert("Server ERROR!")}):window.alert("FILL OUT ALL FORMS")}}]),angular.module("recommenuCmsApp").factory("user",["Restangular",function(a){var b=a.all("users");return{createUser:function(a){return b.post(a)}}}]),angular.module("recommenuCmsApp").factory("entryPricing",["$q","Restangular",function(a,b){var c=b.all("entry_prices");return{saveEntryPrices:function(b,d){for(var e=[],f=b.length-1;f>=0;f--){var g=a.defer();b[f].entry=d.url,c.post(b[f]).then(g.resolve,g.reject),e.push(g.promise)}return a.all(e)},postEntryPrice:function(a){return c.post(a)},deleteEntryPrice:function(a){return a.remove()},restangularizeEntryPricing:function(a){return b.restangularizeCollection(null,a,"entry_prices")}}}]),angular.module("recommenuCmsApp").factory("sectionPricing",["$q","Restangular",function(a,b){var c=b.all("section_prices");return{saveSectionPricesToSection:function(b,d){for(var e=[],f=b.length-1;f>=0;f--){var g=a.defer();b[f].section=d.url,c.post(b[f]).then(g.resolve,g.reject),e.push(g.promise)}return a.all(e)},restangularizeSectionPricing:function(a){return b.restangularizeCollection(null,a,"section_prices")}}}]);