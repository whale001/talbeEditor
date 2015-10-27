var router = Backbone.Router.extend({
    routes: {
        '*path':  'defaultRoute'

    },
    defaultRoute: function() {
        var model = new TableDataModel;
        new mainView({model: model});
    }
});

$(function(){
    new router;
    Backbone.history.start({pushState: true, root: "index.html"});
});