import {Application} from 'backbone.marionette';
import Backbone from 'backbone';
import View from './view';
import Controller from './controller';
import Router from './router';

export default Application.extend({
    initialize() {
        this.layout = new View();
        this.layout.render();
    },

    initRouter() {
        new Router({
            controller: new Controller({app: this})
        });
    },

    onStart() {
        this.initRouter();
        Backbone.history.start();
    }
});