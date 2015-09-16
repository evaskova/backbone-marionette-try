import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

export default LayoutView.extend({
    el: '.app',
    template: template,

    regions: {
        header: '.app-header',
        content: '.app-content'
    }
});