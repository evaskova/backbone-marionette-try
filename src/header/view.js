import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {Collection} from 'backbone';
import {Model} from 'backbone';

export default ItemView.extend({

    template: template,
    initialize() {
        this.collection = new Collection([
            {hash:"", label:"О себе"},
            {hash:"bikes", label:"Мото"},
            {hash:"advice", label:"Совет"}
        ]);
    },

    setActive(hash) {
        this.collection.invoke('set', 'active', false);
        this.collection.findWhere({hash:hash}).set({active:true});
        this.render();
    },

    templateHelpers() {
        return {
          items : this.collection.toJSON()
        };
      }
});
