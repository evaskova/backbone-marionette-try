import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default ItemView.extend({
    initialize() {
      this.model = new Model();
    },
    template: template,
    className: 'advice',
    ui: {
        input: "#advice-input",
        btn: "#advice-send-btn"
    },

    events: {
        'click @ui.btn': 'onSend'
    },

    onSend: function (e) {
        var text = $(this.ui.input).val();

        if (text) {
            this.model.set({text: text});
            this.render();
        }
    }
});