$(document).ready(function(){ 
    $(".step_context").click(function(){
        $(this).parent().find(".plus02"). toggle();

        $(this).parent().siblings().find('.plus02').show();
    })

});