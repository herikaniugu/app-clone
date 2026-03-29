App.source.explore = function() {

    // CLEAR
    Clear();

    // DEFINE
    App.value = {
        black: Color.value(0x0D0D0D),
        dark: Color.value(0x1A1A1A),
        darker: Color.value(0x2A2A2A),
        purple: Color.value(0xA78BFA),
        green: Color.value(0x00FF9C),
        red: Color.value(0xFF4D4D),
        border: "1px solid #0f0f0f",
        elevation: "0 10px 20px rgba(0, 0, 0, 0.4)"
    };

    // APPLICATION
    var application = Main().width(Type.FILL).height(Type.FILL).align(Align.MIDDLE).back(App.value.black).select(Type.NONE).add();

    // ON
    Device.changed = function() {
        if (Mobile()) application.width(Type.FILL).height(Type.FILL).radius(0).border(0).elevation(0);
            else application.width(360).height(Height() * 0.8).radius(24).border(App.value.border).elevation(App.value.elevation);
    };

    // ALIGN
    Device.changed();

    // HEAD
    Inline().width(Type.FILL).align(Align.CENTER).into(Layout().width(Type.FILL).height(Type.FILL).padding(6, 12).into(application).weight(0)).include(function(head) {

        // AVATAR
        Block().padding(6).radius(50).back(Color.SHADOW).text("🧠").into(Layout().width(32).height(32).into(head));

        // INPUT
        Inline().width(Type.FILL).radius(6).back(App.value.dark).into(Layout().width(Type.FILL).padding(6).into(head).weight(1)).include(function(input) {

            // SEARCH
            var search = Block().into(Layout().padding(6).into(input));
            Vector(16, 16).view("0 0 24 24").child("path", function(attr) { attr("d", "M15.5,14h-0.79l-0.28,-0.27C15.41,12.59 16,11.11 16,9.5 16,5.91 13.09,3 9.5,3S3,5.91 3,9.5 5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5zM9.5,14C7.01,14 5,11.99 5,9.5S7.01,5 9.5,5 14,7.01 14,9.5 11.99,14 9.5,14z"); attr("fill", Color.GRAY); }).into(search);

            // TEXT
            Input().size(16).back(App.value.dark).color(Color.GRAY).hint("Sites, tokens, URL").into(Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(input).weight(1));
        });

        // ADD
        var add = Block().into(Layout().padding(6).into(head));
        Vector(20, 20).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", "white"); }).into(add);
    });

    // =======================================================================================================================

    // MAIN
    App.view.main = Layout().width(Type.FILL).height(Type.FILL).overflowY(Type.AUTO).padding(6).align(Align.LEFT).into(application).weight(1);

    // EXPLORE
    App.view.explore = Layout().width(Type.FILL).into(App.view.main);

    // SCROLL
    Inline().overflowX("scroll").into(App.view.explore).include(function(scroll) {

        // ARRAY
        ["Tokens", "Perps", "Lists"].forEach(function(each) {
            Inline().radius(6).back(App.value.dark).align(Align.CENTER).cursor(Type.POINTER).into(Layout().padding(6).into(scroll)).include(function(title) {
                Block().width(24).height(24).radius(6).back(App.value.darker).into(Block().padding(6).into(title));
                Block().size(12).padding(6).text(each).into(title);
            });
        });
    });

    // TOKENS
    Inline().width(Type.FILL).align("center").into(Layout().width(Type.FILL).padding(3, 6).into(App.view.main)).include(function(title) {
        Block().size(16).padding(3).text("Trending Tokens").into(title);
        Block().size(12).padding(3).text(">").into(title);
    });

    // SECTION
    Layout().width(Type.FILL).padding(6).radius(12).back(App.value.dark).into(Layout().width(Type.FILL).padding(6).into(App.view.main)).include(function(container) {
        [
            { verified: false, name: "7", cap: "$3M", price: "$0.00300161", percentage: "+96,451.00%" },
            { verified: false, name: "FRKepstein", cap: "$391K", price: "$0.00000039", percentage: "+150.69%" },
            { verified: true, name: "pep", cap: "$158K", price: "$0.00015779", percentage: "+95.50%" }
        ].forEach((each) => {
            Inline().width(Type.FILL).align(Align.CENTER).into(Layout().width(Type.FILL).padding(6).into(container)).include(function(section) {

                // LOGO
                Layout().width(32).height(32).into(Layout().padding(6).into(section)).include(function(logo) {
                    Block().width(32).height(32).radius(50).back(Color.GRAY).into(logo);
                    Block().width(12).height(12).radius(4).back(Color.GRAY).border(App.value.border).into(Panel().bottom(0).right(0).into(logo));
                });

                // NAME
                Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(section).weight(1).include(function(name) {
                    Block().size(12).text(each.name).into(name);
                    Block().size(12).color(Color.GRAY).text([each.cap, "MC"].join(" ")).into(name);
                });

                // PRICE
                Layout().padding(6).align("right").into(section).include(function(price) {
                    Block().size(12).text(each.price).into(price);
                    Block().size(12).color(App.value.green).text(each.percentage).into(price);
                });
            });
        });
    });

    // TOKENS
    Inline().width(Type.FILL).align("center").into(Layout().width(Type.FILL).padding(3, 6).into(App.view.main)).include(function(title) {
        Block().size(16).padding(3).text("Trending Perps").into(title);
        Block().size(12).padding(3).text(">").into(title);
    });

    // SECTION
    Layout().width(Type.FILL).padding(6).radius(12).back(App.value.dark).into(Layout().width(Type.FILL).padding(6).into(App.view.main)).include(function(container) {
        [
            { verified: false, name: "7", cap: "$3M", price: "$0.00300161", percentage: "+96,451.00%" },
            { verified: false, name: "FRKepstein", cap: "$391K", price: "$0.00000039", percentage: "+150.69%" },
            { verified: true, name: "pep", cap: "$158K", price: "$0.00015779", percentage: "+95.50%" }
        ].forEach((each) => {
            Inline().width(Type.FILL).align(Align.CENTER).into(Layout().width(Type.FILL).padding(6).into(container)).include(function(section) {

                // LOGO
                Layout().width(32).height(32).into(Layout().padding(6).into(section)).include(function(logo) {
                    Block().width(32).height(32).radius(50).back(Color.GRAY).into(logo);
                    Block().width(12).height(12).radius(4).back(Color.GRAY).border(App.value.border).into(Panel().bottom(0).right(0).into(logo));
                });

                // NAME
                Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(section).weight(1).include(function(name) {
                    Block().size(12).text(each.name).into(name);
                    Block().size(12).color(Color.GRAY).text([each.cap, "MC"].join(" ")).into(name);
                });

                // PRICE
                Layout().padding(6).align("right").into(section).include(function(price) {
                    Block().size(12).text(each.price).into(price);
                    Block().size(12).color(App.value.green).text(each.percentage).into(price);
                });
            });
        });
    });

    // =======================================================================================================================

    // BOTTOM
    Inline().width(Type.FILL).padding(12, 16).into(Layout().width(Type.FILL).height(Type.FILL).into(application).weight(0)).include(function(bottom) {

        // HOME
        var home = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 3 4 9v12h5v-7h6v7h5V9z"); attr("fill", Color.GRAY); }).into(home);
        home.clicked(function() {
            App.source.main();
        });

        // WALLET
        var wallet = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", Color.GRAY); }).into(wallet);

        // SWAP
        var swap = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", Color.GRAY); }).into(swap);
        swap.clicked(function() {
            App.source.swap();
        });

        // CHAT
        var chat = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", Color.GRAY); }).into(chat);

        // EXPLORE
        var explore = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M15.5,14h-0.79l-0.28,-0.27C15.41,12.59 16,11.11 16,9.5 16,5.91 13.09,3 9.5,3S3,5.91 3,9.5 5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5zM9.5,14C7.01,14 5,11.99 5,9.5S7.01,5 9.5,5 14,7.01 14,9.5 11.99,14 9.5,14z"); attr("fill", App.value.purple); }).into(explore);
        explore.clicked(function() {
            App.source.explore();
        });
    });
};