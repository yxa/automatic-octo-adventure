System.register(["@angular/platform-browser-dynamic", "@angular/core", '@angular/common', '@angular/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var platform_browser_dynamic_1, core_1, common_1, http_1, http_2;
    var Registration, RegistrationForm, App;
    function skuValidator(control) {
        if (!control.value.match(/^123/)) {
            return { invalidSku: true };
        }
    }
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            }],
        execute: function() {
            Registration = (function () {
                function Registration(obj) {
                    this.name = obj && obj.name || null;
                    this.email = obj && obj.email || null;
                    this.organizationNumber = obj && obj.organizationNumber || null;
                    this.numberOfEmployees = obj && obj.numberOfEmployees || null;
                    this.typeOfOrganization = obj && obj.typeOfOrganization || null;
                }
                return Registration;
            }());
            RegistrationForm = (function () {
                function RegistrationForm(fb, http) {
                    this.http = http;
                    this.organizationTypes = ['1', '2'];
                    this.registrationForm = fb.group({
                        'name': ['', common_1.Validators.compose([common_1.Validators.required])],
                        'email': ['', common_1.Validators.compose([common_1.Validators.required])],
                        'organizationNumber': ['', common_1.Validators.compose([common_1.Validators.required])],
                        'numberOfEmployees': ['', common_1.Validators.compose([common_1.Validators.required])],
                        'typeOfOrganization': ['', common_1.Validators.compose([common_1.Validators.required])]
                    });
                    this.name = this.registrationForm.controls['name'];
                    this.email = this.registrationForm.controls['email'];
                    this.organizationNumber = this.registrationForm.controls['organizationNumber'];
                    this.numberOfEmployees = this.registrationForm.controls['numberOfEmployees'];
                    this.typeOfOrganization = this.registrationForm.controls['typeOfOrganization'];
                }
                RegistrationForm.prototype.makePost = function (registrationRequest) {
                    var _this = this;
                    console.log("request: ", registrationRequest);
                    this.loading = true;
                    this.http.post('http://www.mocky.io/v2/5185415ba171ea3a00704eed', JSON.stringify({
                        body: 'bar',
                        title: 'foo',
                        userId: 1
                    }))
                        .subscribe(function (res) {
                        _this.data = res.json();
                        _this.loading = false;
                    });
                };
                RegistrationForm.prototype.onSubmit = function (value) {
                    console.log('you submitted value: ', value);
                    this.makePost(new Registration(value));
                };
                RegistrationForm = __decorate([
                    core_1.Component({
                        selector: 'registration-form',
                        pipes: [common_1.JsonPipe],
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        template: "\n  <div class=\"ui raised segment\">\n    <h2 class=\"ui header\">Registration</h2>\n    <form [ngFormModel]=\"registrationForm\" (ngSubmit)=\"onSubmit(registrationForm.value)\" class=\"ui form\">\n      <div class=\"field\" [class.error]=\"!name.valid && name.touched\">\n        <label for=\"name\">Name</label>\n        <input type=\"text\" id=\"name\" placeholder=\"SKU\" [ngFormControl]=\"name\">\n        \n        <label for=\"email\">Email</label>\n        <input type=\"text\" id=\"email\" placeholder=\"SKU\" [ngFormControl]=\"email\">\n        \n        <label for=\"organizationNumber\">OrganizationNumber</label>\n        <input type=\"text\" id=\"organizationNumber\" placeholder=\"SKU\" [ngFormControl]=\"organizationNumber\">\n        \n        <label for=\"numberOfEmployees\">NumberOfEmployees</label>\n        <input type=\"number\" id=\"numberOfEmployees\" placeholder=\"SKU\" [ngFormControl]=\"numberOfEmployees\">\n        \n        <label for=\"typeOfOrganization\">TypeOfOrganization</label>\n        <select [ngFormControl]=\"typeOfOrganization\" id=\"typeOfOrganization\">\n           <option *ngFor=\"let organizationType of organizationTypes; let i = index\" [selected]=\"i == 0\">{{organizationType}}</option>\n        </select>\n      </div>\n      <button type=\"submit\" class=\"ui button\">Submit</button>\n    </form>\n    \n    <div *ngIf=\"loading\">loading...</div>\n    <pre>{{data | json}}</pre>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http])
                ], RegistrationForm);
                return RegistrationForm;
            }());
            App = (function () {
                function App() {
                }
                App = __decorate([
                    core_1.Component({
                        selector: 'registration',
                        directives: [RegistrationForm],
                        template: "<div><registration-form></registration-form></div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            }());
            platform_browser_dynamic_1.bootstrap(App, [http_2.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=app.js.map