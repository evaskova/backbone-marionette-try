import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import BikesView from './list/view';
import DescriptionView from './description/view';

export default LayoutView.extend({
    initialize() {
        this.collection.fetch();
    },

    template: template,
    className: 'bikes',

    regions: {
        list: '.bikes-list',
        description: '.bikes-description'
    },

    setActive(id) {
        this.active = id;
        this.activeRender();
    },

    getActiveModel() {
        return this.collection.get(this.active);
    },

    setActiveCollection() {
        if(this.collection.isEmpty()) {
            return;
        }
        this.collection.invoke('set', 'active', false);
        if (this.active) {
            this.getActiveModel().set({active: true});
        }
    },

    collectionEvents: {
        "sync": "activeRender"
    },

    activeRender() {
        this.setActiveCollection();
        this.render();
    },

    onRender() {
        var bikesView = new BikesView({collection: this.collection});
        this.list.show(bikesView);

        var descriptionView = new DescriptionView({model: this.getActiveModel()});
        this.description.show(descriptionView);
    }
});