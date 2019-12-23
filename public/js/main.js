function resetError() {
    $('input').next().next().text('')
}

$(document).ready(function () {
    // Register setting
    $('#submitRegister').click(function () {
        if ($('#check').is(":checked")) {
            resetError();
            const object = {};
            object.username = $('#username').val();
            object.password = $('#password').val();
            object.email = $('#email').val();
            object.name = $('#name').val();
            $.post('/users/register', object, (data, status) => {
                if (data === true) {
                    window.location.replace("/")
                } else {
                    for (const i in data) {
                        const field = $('#' + i);
                        const error = field.next().next();
                        error.show();
                        error.text(data[i])
                    }
                }
            })

        } else {
            $('#check').focus()
        }
    });
});