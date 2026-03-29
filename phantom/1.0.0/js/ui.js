(function(window) {
    var ui = new Object();
    ui.NAME = "USER INTERFACE"
    ui.VERSION = "1.0.0";
    ui.AUTHOR = "Heri Kaniugu";
    ui.preload = function(callback) {
        var array = ["a", "e", "i", "o", "u"];
        Preload(Resource(Path([App.VERSION, "image"]), "png").files(array)).image(function(total, count, name, image) {
            ui.image[name] = image;
            if (total == count && callback) callback(ui.image);
        });
    };
    ui.image = new Object();
    window.Extension("ui", ui);
}) (window);