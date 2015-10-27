var mainView = Backbone.View.extend({
    mainSelector: '#main',
    model: null,
    options: {},
    template: _.template([
        '<%= controls %>',
        '<%= table %>'
    ].join('')),
    initialize: function(options) {
        _.map(options, function(v, k){
            this.options[k] = v;
        }.bind(this));
        this.render();
    },
    render: function() {
        var controlsView = new Controls;
        var tableView = new Table({
            v_limit: this.model.get('v_limit'),
            model: this.model
        });
        this.$el.html(this.template({
            controls: controlsView.$el.html(),
            table: tableView.$el.html()
        }));
        $(this.mainSelector).html(this.$el);
        this.delegateEvents();
        this.afterRender();
    },
    events: {
        'click .target': 'action',
        'click .uploadAction': 'uploadAction',
        'click .importAction': 'importAction',
        'click .clearTable': 'clearTable'
    },
    clearTable: function() {
        this.model.clear();
    },
    uploadAction: function() {
        this.model.export();
    },
    importAction: function() {
        this.model.import();
    },
    action: function(e) {
        var t = $(e.target);
        var column = t.data('n');
        var row = t.parents('tr').data('n');
        var curr_val = t.text();
        t.html('<textarea></textarea>');
        var h = $(e.target).height();
        t = t.find('textarea');
        t.focus().height(h - 2).val(curr_val);
        t.blur(function(){
            var value = t.val();
            this.model.saveValue(row, column, value);
            t.parents('td').text(value);
        }.bind(this));
    },
    afterRender: function() {
        $('.table-controls button')
            .popup({
                delay: {
                    show: 0,
                    hide: 0
                }
            })
        ;
    }
});