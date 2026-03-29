App.source.swap = function() {

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

        // TITLE
        Block().size(16).text("Swap").into(Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(head).weight(1));

        // FILTER
        var filter = Block().into(Layout().padding(6).into(head));
        Vector(20, 20).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", "white"); }).into(filter);
        filter.clicked(function(value) {
        });
    });

    // =======================================================================================================================

    // MAIN
    App.view.main = Layout().width(Type.FILL).height(Type.FILL).overflowY(Type.AUTO).padding(6).align(Align.LEFT).into(application).weight(1);

    // SWAP
    App.view.swap = Layout().width(Type.FILL).padding(6).into(App.view.main);

    // SEND
    Layout().width(Type.FILL).padding(6).radius(12).back(App.value.dark).into(App.view.swap).include(function(send) {

        // TITLE
        Block().size(12).color(Color.GRAY).text("You Pay").into(Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(send));

        // INPUT
        Inline().width(Type.FILL).into(Layout().into(send)).include(function(input) {

            // AMOUNT
            Input().size(18).padding(6, 0).back(App.value.dark).color(Color.GRAY).hint("0").into(Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(input).weight(1));

            // SYMBOL
            Inline().width(Type.FILL).radius(12).align(Align.CENTER).back(App.value.darker).cursor(Type.POINTER).into(Layout().padding(6).into(input)).include(function(symbol) {

                // LOGO
                Block().width(16).height(16).radius(50).back(Color.BLACK).into(Layout().padding(4).into(symbol));

                // NAME
                Block().size(12).color(Color.WHITE).text("SOL").into(Layout().padding(4).into(symbol));

                // DOWN
                Vector(12, 12).view("0 0 24 24").child("path", function(attr) { attr("d", "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"); attr("fill", Color.WHITE); }).into(Block().into(Layout().padding(4).into(symbol)));
            });
        });

        // BALANCE
        Inline().width(Type.FILL).into(Layout().into(send)).include(function(balance) {

            // SWAP
            Vector(12, 12).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", Color.GRAY); }).into(Layout().radius(50).back(App.value.darker).align(Align.LEFT).padding(4).into(balance));

            // BALANCE
            Block().size(12).color(Color.GRAY).align(Align.RIGHT).text("0 SOL").into(Layout().width(Type.FILL).padding(4).into(balance));
        });
    });

    // BUTTON
    Layout().padding(3).margin(-12).index(1).align(Align.CENTER).into(App.view.swap).include(function(button) {
        Vector(12, 12).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", Color.BLACK); }).into(Layout().padding(6).radius(50).back(App.value.purple).cursor(Type.POINTER).into(button));
    });

    // RECEIVE
    Layout().width(Type.FILL).padding(6).radius(12).back(App.value.dark).into(App.view.swap).include(function(receive) {

        // TITLE
        Block().size(12).color(Color.GRAY).text("You Receive").into(Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(receive));

        // INPUT
        Inline().width(Type.FILL).into(Layout().into(receive)).include(function(input) {

            // AMOUNT
            Input().size(18).padding(6, 0).back(App.value.dark).color(Color.GRAY).hint("0").into(Layout().width(Type.FILL).align(Align.LEFT).padding(6).into(input).weight(1));

            // SYMBOL
            Inline().width(Type.FILL).radius(12).align(Align.CENTER).back(App.value.darker).cursor(Type.POINTER).into(Layout().padding(6).into(input)).include(function(symbol) {

                // LOGO
                Block().width(16).height(16).radius(50).back(Color.BLACK).into(Layout().padding(4).into(symbol));

                // NAME
                Block().size(12).color(Color.WHITE).text("USDC").into(Layout().padding(4).into(symbol));

                // DOWN
                Vector(12, 12).view("0 0 24 24").child("path", function(attr) { attr("d", "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"); attr("fill", Color.WHITE); }).into(Block().into(Layout().padding(4).into(symbol)));
            });
        });

        // BALANCE
        Inline().width(Type.FILL).into(Layout().into(receive)).include(function(balance) {

            // BALANCE
            Block().size(12).color(Color.GRAY).align(Align.RIGHT).text("0 USDC").into(Layout().width(Type.FILL).padding(4).into(balance));
        });
    });

    // TOKENS
    Inline().width(Type.FILL).align(Align.CENTER).into(Layout().width(Type.FILL).padding(3, 6).into(App.view.main)).include(function(title) {
        Block().size(16).padding(3).text("Tokens").into(title);
        Block().size(16).padding(3, 6).color(Color.GRAY).text("Perps").into(title);
    });

    // FILTER
    Inline().width(Type.FILL).align(Align.CENTER).into(Layout().width(Type.FILL).padding(3, 6).into(App.view.main)).include(function(filter) {

        // SORT
        Inline().width(Type.FILL).padding(0, 2).radius(3).align(Align.CENTER).back(App.value.darker).cursor(Type.POINTER).into(Layout().padding(2).into(filter)).include(function(sort) {

            // NAME
            Block().size(12).color(Color.WHITE).text("Rank").into(Layout().padding(2).into(sort));

            // DOWN
            Vector(12, 12).view("0 0 24 24").child("path", function(attr) { attr("d", "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"); attr("fill", Color.WHITE); }).into(Block().into(Layout().padding(2).into(sort)));
        });

        // ASSET
        Inline().width(Type.FILL).padding(0, 2).radius(3).align(Align.CENTER).back(App.value.darker).cursor(Type.POINTER).into(Layout().padding(2).into(filter)).include(function(asset) {

            // NAME
            Block().size(12).color(Color.WHITE).text("Solana").into(Layout().padding(2).into(asset));

            // DOWN
            Vector(12, 12).view("0 0 24 24").child("path", function(attr) { attr("d", "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"); attr("fill", Color.WHITE); }).into(Block().into(Layout().padding(2).into(asset)));
        });

        // TIME
        Inline().width(Type.FILL).padding(0, 2).radius(3).align(Align.CENTER).back(App.value.darker).cursor(Type.POINTER).into(Layout().padding(2).into(filter)).include(function(time) {

            // NAME
            Block().size(12).color(Color.WHITE).text("24h").into(Layout().padding(2).into(time));

            // DOWN
            Vector(12, 12).view("0 0 24 24").child("path", function(attr) { attr("d", "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"); attr("fill", Color.WHITE); }).into(Block().into(Layout().padding(2).into(time)));
        });

    });

    // SECTION
    [
        { verified: false, name: "7", cap: "$3M", price: "$0.00300161", percentage: "+96,451.00%" },
        { verified: false, name: "FRKepstein", cap: "$391K", price: "$0.00000039", percentage: "+150.69%" },
        { verified: true, name: "pep", cap: "$158K", price: "$0.00015779", percentage: "+95.50%" }
    ].forEach((each) => {
        Inline().width(Type.FILL).align(Align.CENTER).into(Layout().width(Type.FILL).padding(6).into(App.view.main)).include(function(section) {

            // RANK
            Block().width(12).height(12).radius(50).back(Color.GRAY).into(Layout().padding(2).into(section));

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

    // =======================================================================================================================

    // BOTTOM
    Inline().width(Type.FILL).padding(12, 16).into(Layout().width(Type.FILL).height(Type.FILL).into(application).weight(0)).include(function(bottom) {

        // HOME
        var home = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 3 4 9v12h5v-7h6v7h5V9z"); attr("fill", Color.GRAY); }).into(home);
        home.clicked(function() {
        });

        // WALLET
        var wallet = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", Color.GRAY); }).into(wallet);

        // SWAP
        var swap = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", App.value.purple); }).into(swap);

        // CHAT
        var chat = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", Color.GRAY); }).into(chat);

        // EXPLORE
        var explore = Block().padding(12).cursor(Type.POINTER).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M15.5,14h-0.79l-0.28,-0.27C15.41,12.59 16,11.11 16,9.5 16,5.91 13.09,3 9.5,3S3,5.91 3,9.5 5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5zM9.5,14C7.01,14 5,11.99 5,9.5S7.01,5 9.5,5 14,7.01 14,9.5 11.99,14 9.5,14z"); attr("fill", Color.GRAY); }).into(explore);
    });
};