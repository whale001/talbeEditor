var Table = Backbone.View.extend({
    options: {},
    template: _.template([
        '<div class="ui fluid container table-container">',
        '<table class="ui celled table main-table">' +
        '<thead>' +
        '<tr>' +
        '<th class="center aligned thin indexWidth"></th>',
        '<%= header %>' +
        '</tr>',
        '</thead>',
        '<tbody>' +
        '<%= table %>',
        '</tbody>',
        '</table>',
        '</div>'
    ].join('')),
    header_template: _.template([
        '<th class="center aligned thin"><%= label %></th>'
    ].join('')),
    row_template: _.template([
        '<tr class="thin" data-n="<%= n %>">' +
            '<td class="center aligned thin indexWidth"><%= n %></td>',
            '<%= cells %>',
        '</tr>'
    ].join('')),
    cell_template: _.template([
        '<td data-n="<%= n %>" class="target"><%= v %></td>'
    ].join('')),
    initialize: function(options) {
        _.map(options, function(v, k){
            this.options[k] = v;
        }.bind(this));
        this.render();
    },
    render: function() {
        var tableData = this.model.get('tableData');

        var charCodeRange = {
            start: 65,
            end: 90
        };
        var header = [];
        for (var cc = charCodeRange.start; cc <= charCodeRange.end; cc++) {
            header.push(this.header_template({
                label: String.fromCharCode(cc)
            }));
        }

        var cells = [];
        var n = 0;
        var data = [];
        var value = '';
        var table_arr = [];
        for (var i = 0; i < this.options.v_limit; i++) {
            cells = [];
            n = 0;

            data = tableData[i] != undefined ? tableData[i] : [];
            for (cc = charCodeRange.start; cc <= charCodeRange.end; cc++) {
                n++;
                value = data[n] != undefined ? data[n] : '';
                cells.push(this.cell_template({
                    n: n,
                    v: value
                }));
            }
            table_arr.push(this.row_template({
                cells: cells.join(''),
                n: i+1
            }));
        }
        this.$el.html(this.template({
            header: header.join(''),
            table: table_arr.join('')
        }));
        this.delegateEvents();
        return this;
    }
});