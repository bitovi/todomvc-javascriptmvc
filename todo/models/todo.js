steal('./local_storage.js',function(LocalStorage) {

	// Basic Todo entry model
	// { text: 'todo', complete: false }
	var Todo = LocalStorage({
		storageName: 'todos-canjs'
	}, {
		// Returns if this instance matches a given filter
		// (currently `active` and `complete`)
		matches : function () {
			var filter = can.route.attr('filter');
			return !filter || (filter === 'active' && !this.attr('complete')) ||
				(filter === 'completed' && this.attr('complete'));
		}
	});

	// List for Todos
	Todo.List = can.Model.List({
		Observe: Todo
	},{
		completed: function () {
			var completed = 0;

			this.each(function (todo) {
				completed += todo.attr('complete') ? 1 : 0;
			});

			return completed;
		},

		remaining: function () {
			return this.attr('length') - this.completed();
		},

		allComplete: function () {
			return this.attr('length') === this.completed();
		}
	});

	return Todo;
});