module.exports = function(request, response, next) {
    var startTime = +new Date();
    var stream = process.stdout;
    var duration = null;
    var req = request;

    response.on('finish', function() {
        duration = +new Date() - startTime;
        stream.write("This request (" + req + ") took " + duration + " ms\n\n");
    });

    next();
};