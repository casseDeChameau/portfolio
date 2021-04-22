//? getter : get values from selected skills to compare them with data-filter values in each projects
var getFilter = function(category) {
    var filter = $(".filters-box ." + category + ":checked").map(function() {
        return '[data-filter*="' + this.value + '"]';
    }).get().join(",");
    filter = (filter.length > 0) ? filter : "";
    return filter;
}

//? on click on any skill logo, apply filter to show project concerned by selected skill(s)
$(".filters-box .skill").click(function(e) {
    //? add css class on selected skill(s)
    $(event.currentTarget).toggleClass('selected');
    //? toggle check state of hidden checkbox when skill selected 
    let checkbox = $((event.currentTarget)).find('input')
    if (checkbox.is(":checked")) {
        checkbox.prop("checked", false);
    } else {
        checkbox.prop("checked", true)
    }
    var all = $(".project");
    var selected = all.filter(getFilter("language"));
    console.log('selected:', selected);
    console.log('checked:', $('.filters-box :checked').length);
    if ($('.filters-box :checked').length > 0) {
        all.not(selected).hide();
        selected.show();
    } else {
        all.show();
    }
});