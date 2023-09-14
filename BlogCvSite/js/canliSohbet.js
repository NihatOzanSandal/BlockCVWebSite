$(function () {
    var data = [];
    var div = "";
    var kim = "";
    var ben = "";
    var kullanici = [];

    var socket = io('https://medipolvize2022nihatozansandal.glitch.me:443');

    socket.emit('baslat', data, function (id) {
        console.log(id);
        ben = id;
    });

    $("#gonder").click(function () {
        var ad = $("#ad").val();
        var tx = $("#yazi").val();
        //onclick="document.getElementById('yazi').value = ''";
        socket.emit("mesaj", { id: ben, ad: ad, tx: tx });
    });

    socket.on('sohbet', function (mesaj) {
        if (mesaj.id == ben) {
            div = "right";
            kim = "other-message float-right";
        }
        else {
            div = "left";
            kim = "my-message";
        }
        //var html = '<div class="message-data text-'+div+'"><span class="message-data-time float-'+div+'"> '+mesaj.ad+'</span></div><div class="message other-message float-'+div+'">'+mesaj.tx+'</div>';
        var html = '<div class="message-data text-' + div + '"><span class="message-data-time float-' + div + '"> ' + mesaj.ad + '</span></div><div class="message ' + kim + '">' + mesaj.tx + '</div>';

        //$("#sohbetler").append('<div class="balon ' + div + '">' + mesaj.ad + ' / ' + mesaj.tx + '</div> <div style="clear:both"></div>');
        $("#sohbetler").append(html);
        var katilimcilar = ' <li class="clearfix"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"><div class="about"><div class="name">' + mesaj.ad + '</div><div class="status"> <i class="fa fa-circle online"></i> online now </div></div></li>';
        if (mesaj.id != kullanici[mesaj.id]) {
            kullanici[mesaj.id] = mesaj.id
            $("#katilimcilar").append(katilimcilar);
        }
        console.log("sohbet: " + mesaj.id + " / " + mesaj.ad + " / " + mesaj.tx);
    });
});
