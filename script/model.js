var TableDataModel = Backbone.Model.extend({
    defaults: {
        selector: '#dataHolder',
        tableData: [],
        v_limit: 1000
    },
    saveValue: function(row, column, value) {
        var tableData = this.get('tableData');
        if (typeof tableData[row] === 'array') {
            tableData[row][column] = value;
        } else {
            tableData[row] = [];
            tableData[row][column] = value;
        }
        this.set({
            tableData: tableData
        });
    },
    initialize: function() {
        var view = new mainView({model: this});
        this.set({
            view: view
        })
    },
    export: function() {
        $('.controls-input textarea').val(JSON.stringify(this.get('tableData')));
    },
    import: function() {
        try{
            var data = JSON.parse($('.controls-input textarea').val());
        } catch(e) {
            alert(e.name + ' failed to parse data');
        }
        if (this.validate(data)) {
            this.set({
                tableData: data
            });
            var view = this.get('view');
            $('#main').html('');
            $('.popup').remove();
            this.set({
                view: new mainView({model: this})
            })
        }
    },
    validate: function(data) {
        //@todo implement validate
        return true
    },
    clear: function() {
        $('#main').html('');
        $('.popup').remove();
        this.set({
            tableData: []
        });
        this.set({
            view: new mainView({model: this})
        })
    },
    undo: function() {
        // @todo implement
    },
    redo: function() {
        // @todo implement
    }
});