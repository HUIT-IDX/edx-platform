(function(define) {
    define(['jquery', 'backbone', 'gettext'], function($, Backbone, gettext) {
        'use strict';

        return Backbone.View.extend({

            el: '#discovery-form',
            events: {
                'submit form': 'submitForm'
            },

            initialize: function() {
                this.$searchField = this.$el.find('input');
                this.$searchButton = this.$el.find('button');
                this.$message = this.$el.find('#discovery-message');
                this.$loadingIndicator = this.$el.find('#loading-indicator');
            },

            submitForm: function(event) {
                event.preventDefault();
                this.doSearch();
            },

            doSearch: function(term) {
                if (term !== undefined) {
                    this.$searchField.val(term);
                } else {
                    term = this.$searchField.val();
                }
                this.trigger('search', $.trim(term));
            },

            clearSearch: function() {
                this.$searchField.val('');
            },

            showLoadingIndicator: function() {
                this.$loadingIndicator.removeClass('hidden');
            },

            hideLoadingIndicator: function() {
                this.$loadingIndicator.addClass('hidden');
            },

            showFoundMessage: function(count) {
                var msg = ngettext(
                    'Đang xem %s khóa học',
                    'Đang xem %s khóa học',
                    count
                );
                this.$message.html(interpolate(msg, [count]));
            },

            showNotFoundMessage: function(term) {
                if (term) {
                    var msg = interpolate(
                        gettext('Chúng tôi không tìm thấy kết quả nào cho "%s".'),
                        [_.escape(term)]
                    );
                    this.$message.html(msg);
                }
                this.clearSearch();
            },

            showErrorMessage: function(error) {
                this.$message.text(gettext(error || 'Có lỗi xảy ra, vui lòng thử lại.'));
            }

        });
    });
}(define || RequireJS.define));
