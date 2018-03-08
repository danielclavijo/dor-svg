var seats = [];

var svgBlank = (
    '<div class="seat-wrapper">' +
    '<svg class="blank" height="24" viewBox="0 0 24 24" width="24" xmlns=\
    "http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\
    </svg>' +
    '</div>'
);

var svgSeat = (
    '<div class="seat-wrapper">' +
    '<svg class="seat" fill="rgb(0, 148, 100)" height="24" \
    viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" \
    xmlns:xlink="http://www.w3.org/1999/xlink">\
    <defs><path d="M0 0h24v24H0V0z" id="a"/></defs>\
    <clipPath id="b"> <use overflow="visible" xlink:href="#a"/></clipPath>\
    <path clip-path="url(#b)" d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 \
    10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"/>\
    </svg>' +
    '</div>'
);


$(document).ready(function(){

    seatingInfo();
    drawCinema();

    $("#hourForm").on('change',function(){
        var seatsOfMovie = seats[0];

        if($("#hourForm").val() == "1"){
            seatsOfMovie = seatsOfMovie["hora1"];
        }
        if($("#hourForm").val() == "2"){
            seatsOfMovie = seatsOfMovie["hora2"];
        }

        var seatsTemp = $(".seat");
        seatsTemp.removeClass('unavailable buying');
        for(var i = 0; i < seatsOfMovie.length; i++){
                seatsTemp.eq(seatsOfMovie[i]).addClass('unavailable');
        }
    });
});

function seatingInfo(){

    $.getJSON("data/seats.json", function(data){

        for(let key in data){
            if(data.hasOwnProperty(key)){
                seats.push(data[key]);
            }
        }
    });

}

function drawCinema(){
    $("#cine").html("");
    var cinema = $("#cine");

    var pasillos = [4, 9];

    var index = 1;
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 14; j++){
            if(pasillos.indexOf(j) !== -1){
                cinema.append(svgBlank);
            } else{
                $(svgSeat).attr('id', index).appendTo(cinema);
                index++;
            }
        }
        cinema.append("<br></br>");
    }

    $(".seat-wrapper").click(function(){
    if($("#hourForm").val() != null){
        var seat = $(this).find('.seat');
        if(seat.hasClass('unavailable')){
            alert("Este sitio ya está ocupado");
        } else {
            seat.toggleClass('buying');
            seatsBuying = $(".buying").length;
            price = seatsBuying * 6;
            $("#numBuying").text(seatsBuying);
            $("#priceBuying").text(price);
        }
    } else{
        alert("Eliga una hora");
    }
});
}
