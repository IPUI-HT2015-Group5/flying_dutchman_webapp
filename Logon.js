/** Imports the users from the database and store it in an array */

$("form").submit(function(event){
    event.preventDefault();
        alert("test")
        var action = iou_get;
        var admins = ["jorass", "ervtod", "hirchr", "saskru", "svetor"];
        var PubAPI = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=" + action;

        localStorage.setItem("user", username);

        $.getJSON(PubAPI)
            .done(function (data) {
                $.each(data.payload, function (i, value) {

                    localStorage.setItem("assets", value.assets);
                    localStorage.setItem("firstName", value.first_name);
                    localStorage.setItem("lastName", value.last_name);

                    switch (value.type) {
                        case error:
                            alert(value.msg);

                        default:
                            if ($.inArray(username, admins) > -1){
                                window.location.href = 'admins.html';
                                return false;
                            } else {
                                window.location.href = 'customer.html';
                                return false;
                            }
                    }
                });
            });
});