$(document).ready (function () {

    var template_html = $("#giorno-template").html();
    var template_function = Handlebars.compile(template_html);

    var dataIniziale = "2018-01-01";
    var momentIniziale = moment(dataIniziale);
    console.log(momentIniziale);

    // visualizzo il primo mese sul calendario
    stampaMese(momentIniziale);

    // intercetto il click sul tasto next
    $ ("#next").click (function() {
        // scorro il mese facendo +1
        momentIniziale.add(1, "months");
        console.log(momentIniziale.format("DD MMMM YYYY"));
        // visualizzo il calendario aggiornato
        stampaMese(momentIniziale);
    })

    // intercetto il click sul tasto previous
    $ ("#previous").click (function() {
        // scorro il mese facendo -1
        momentIniziale.subtract(1, "months");
        console.log(momentIniziale.format("DD MMMM YYYY"));
        // visualizzo il calendario aggiornato
        stampaMese(momentIniziale);
    })

    function stampaMese (dataMese) {
        // resetto il calendario
        $("#calendario").empty();

        // del mese iniziale prendo i giorni del mese
        var giorniMese = dataMese.daysInMonth();
        var meseTestuale = dataMese.format("MMMM");

        //  sostutisco il titolo mese
        $ ("#mese-corrente").text(meseTestuale);

        // con un ciclo for disegno i giorni del mese
        for (var i = 1; i <= giorniMese; i++) {
            var context = {
                day: i + " " + meseTestuale
            };
            var html_finale = template_function(context);
            $("#calendario").append(html_finale);
        }

        // chiamata AJAX per le festività
        $.ajax ({
            "url": "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
            "data": {
                "year": 2018,
                "month": 0
            },
            "method": "GET",
            "success": function(data) {
                console.log(data);
            },
            "error": function() {
                alert("Error");
            }
        });























    }

})
