var utils = require('utils');
var serand = require('serand');

var queue = [];

var running = false;

exports.create = function (binary, done) {
    queue.push({
        binary: binary,
        done: done
    });
    if (running) {
        return;
    }
    running = true;
    async.eachLimit(queue, 5, function (binary, created) {
        var xhr = $('.fileupload', elem).fileupload('send', {
            paramName: 'photos',
            files: files,
            formData: {
                data: JSON.stringify(data)
            }
        });
        xhr.done(function (data, status, xhr) {
            done();
        }).fail(function (xhr, status, err) {
            done(err);
        }).always(function (data, status, xhr) {
        });
        $.ajax({
            method: 'POST',
            url: utils.resolve('apis:///v/binaries'),
            dataType: 'json',
            success: function (data) {
                ran(null, data);
            },
            error: function (xhr, status, err) {
                ran(err || status || xhr);
            }
        });
    }, function (err) {
        running = false;
        if (err) {
            return console.error(err);
        }
    });
};
