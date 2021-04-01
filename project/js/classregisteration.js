$(".box1-2").hide();
$('button').on('click', function () {
    $(".box1-2").show();
    var classname = $(this).parent('#classdesc').find("#classname").eq(0);
    var nameclone = classname.clone()
        .css({
            'font-size':'15px',
            'display': 'block',
            'text-align': 'center',
            'margin': '10px',
        }).appendTo($('#registeration'));
    /*$("#registerclass").append('<br/>' + nameclone.text());*/
});