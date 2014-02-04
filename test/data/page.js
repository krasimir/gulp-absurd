module.exports = function(api) {
	api.add({
		'.header': {
			'p': 'My name is <% this.data.name %>'
		}
	})
}