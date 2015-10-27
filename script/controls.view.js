var Controls = Backbone.View.extend({
    template: _.template([
        '<div class="ui fluid container table-controls">' +
            '<div class="ui small basic icon buttons">',
        '<button data-content="Clear table" class="ui button clearTable"><i class="file icon"></i></button>',
        //'<button data-content="Undo" class="ui button"><i class="undo icon"></i></button>',
        //'<button data-content="Redo" class="ui button"><i class="undo redo icon"></i></button>',
'<button data-content="Export to textarea" class="ui button uploadAction"><i class="upload icon"></i></button>',
'<button data-content="Import from textarea" class="ui button importAction"><i class="download icon import-icon"></i></button>',
'</div>' +

    '<div class="ui form">',
            '<div class="field controls-input">',
                '<textarea rows="1"></textarea>',
            '</div>',
        '</div>',
        '</div>'
    ].join('')),
    initialize: function(options) {
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});