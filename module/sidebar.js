$(document).ready(function() {
    $("#profileBar").on("click", function(e) {
        e.stopPropagation(); 
        $("#profileDropdown").toggleClass("hidden");
    });


    $(document).on("click", function() {
        $("#profileDropdown").addClass("hidden");
    });

    $("#profileDropdown").on("click", function(e) {
        e.stopPropagation();
    });
});