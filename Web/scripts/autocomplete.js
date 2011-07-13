$.fn.userAutoComplete = function(url, selectionCallback)
{
	var textbox = $(this);
	textbox.autocomplete(
		{
			source: function(request, response) {
				$.ajax({
					url: url,
					dataType: "json",
					data: {
						term: request.term
					},
					success: function(data) {
						response($.map(data, function(item) {
							return {
								label: item.First + " " + item.Last,
								value: item.Id
							}
						}));
					}
				});
			},
			focus: function(event, ui) {
				textbox.val(ui.item.label);
				return false;
			},
			select: function(event, ui) {
				if (selectionCallback != undefined)
				{
					selectionCallback(ui);
					textbox.val('');
				}
				else
				{
					textbox.val(ui.item.label);
				}

				return false;
			}
		});
}