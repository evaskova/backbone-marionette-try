import {Object} from 'backbone.marionette';
import IndexView from '../index/view';

import BikesView from '../bikes/view';
import BikesCollection from '../bikes/list/collection';

import AdviceView from '../advice/view';

import HeaderView from '../header/view';

export default Object.extend({
    initialize(options) {
        this.app = options.app;
        this.app.layout.header.show(new HeaderView());
    },

    about() {
        this.app.layout.header.currentView.setActive('');
        this.app.layout.content.show(new IndexView());
    },

    bikes(id) {
        this.app.layout.header.currentView.setActive('bikes');
        if (!(this.app.layout.content.currentView instanceof BikesView)) {
            var view = new BikesView({
                collection: new BikesCollection()
            });
            this.app.layout.content.show(view);
        }
        this.viewBike(id);
    },

    viewBike(id) {
        this.app.layout.content.currentView.setActive(id);
    },

    advice() {
        this.app.layout.header.currentView.setActive('advice');
        this.app.layout.content.show(new AdviceView());
    }
});


