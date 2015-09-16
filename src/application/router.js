import {AppRouter} from 'backbone.marionette';

export default AppRouter.extend({
    appRoutes: {
        "": "about",
        "bikes": "bikes",
        "bikes/:id": "bikes",
        "advice": "advice"
    }

});