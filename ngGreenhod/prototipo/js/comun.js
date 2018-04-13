function DAO(url) {
    var urlBase = url;

    this.getAll = function () {
        return $.ajax({
            url: urlBase,
            dataType: 'json',
        });
    };

    this.get = function (email) {
        return $.ajax({
            url: urlBase + '?email=' + email,
            dataType: 'json',
        });
    };

    this.add = function (datos) {
        return $.ajax({
            url: urlBase,
            method: 'POST',
            dataType: 'json',
            data: datos
        });
    };

    this.change = function (datos) {
        return $.ajax({
            url: urlBase,
            method: 'PUT',
            dataType: 'json',
            data: datos
        });
    };

    this.remove = function (email) {
        return $.ajax({
            url: urlBase + '?email=' + id,
            method: 'DELETE',
        });
    };

}

