liveblogSyndication
    .directive('lbContactEdit', function() {
        return {
            templateUrl: 'scripts/liveblog-syndication/views/contacts-edit-form.html',
            scope: {
                contacts: '='
            },
            require:"^form",
            link: function(scope, elem, attrs, form) {
                if (!scope.contacts) {
                    scope.contacts = [{}];
                }

                scope.addContact = function() {
                    scope.contacts.push({});
                };

                scope.removeContact = function(index) {
                    scope.contacts.splice(index, 1);
                    scope.form.$setDirty();
                };
            }
        }
    });
