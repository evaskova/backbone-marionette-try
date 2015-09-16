window.$ = window.jQuery = require('jquery');
import App from './application/application';
require('./css/style.less');

var app = new App();
app.start();



