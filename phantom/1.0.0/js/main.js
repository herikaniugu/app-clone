App.source.main = function() {

    // CLEAR
    Clear();

    // DEFINE
    App.value = {
        pull: {
            active: false,
            distance: 0,
            max: 120,
            threshold: 80
        },
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
    Inline().width(Type.FILL).align("center").into(Layout().width(Type.FILL).height(Type.FILL).padding(6, 12).into(application).weight(0)).include(function(head) {

        // AVATAR
        Block().padding(6).radius(50).back(Color.SHADOW).text("🧠").into(Layout().width(32).height(32).into(head));

        // NAME
        Layout().width(Type.FILL).align("left").padding(6).into(head).weight(1).include(function(name) {
            Block().size(12).color(Color.GRAY).text("@2026MwakaWangu").into(name);
            Block().size(16).text("MR SHITCOIN TZ").into(name);
        });

        // HISTORY
        var history = Block().into(Layout().padding(6).into(head));
        Vector(20, 20).view("0 0 24 24").child("path", function(attr) { attr("d", "M11.99,2C6.47,2 2,6.48 2,12s4.47,10 9.99,10C17.52,22 22,17.52 22,12S17.52,2 11.99,2zM12,20c-4.42,0 -8,-3.58 -8,-8s3.58,-8 8,-8s8,3.58 8,8S16.42,20 12,20zM17.23,14.94l-1.26,1.55L11,13V6h2v6L17.23,14.94z"); attr("fill", "white"); }).into(history);

        // SEARCH
        var search = Block().into(Layout().padding(6).into(head));
        Vector(20, 20).view("0 0 24 24").child("path", function(attr) { attr("d", "M15.5,14h-0.79l-0.28,-0.27C15.41,12.59 16,11.11 16,9.5 16,5.91 13.09,3 9.5,3S3,5.91 3,9.5 5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5zM9.5,14C7.01,14 5,11.99 5,9.5S7.01,5 9.5,5 14,7.01 14,9.5 11.99,14 9.5,14z"); attr("fill", "white"); }).into(search);
        search.clicked(function(value) {
        });
    });

    // =======================================================================================================================

    // MAIN
    App.view.main = Layout().width(Type.FILL).height(Type.FILL).overflowY(Type.AUTO).padding(6, 12).align("left").into(application).weight(1);

    // SPINNER
    var container = Layout().width(Type.FILL).height(0).align(Align.CENTER).style("transition: height 0.2s;").into(App.view.main);
    var spinner = Block().width(24).height(24).radius(50).margin(6).display(Type.NONE).border("4px solid #363636").borderTop("4px solid transparent").animation("spin 1s linear infinite").into(container);
    var touch = Device.touch(App.view.main.get()); Style().text("@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }");
    touch.down(function(e, input) {
        if (window.scrollY === 0) {
            App.value.pull.active = true;
            App.value.pull.distance = 0;
        }
    });
    touch.move(function(e, input) {
        if (!App.value.pull.active) return;
        var item = input.each[0];
        if (!item || !item.down) return;
        if (item.dy > 0) App.value.pull.distance += item.dy;
        // var height = Math.min(App.value.pull.distance * 0.5, App.value.pull.max);
        var raw = App.value.pull.distance * 0.5;
        var resistance = 1 - Math.min(raw / App.value.pull.max, 1);
        var height = Math.min(raw * resistance, App.value.pull.max);
        container.height(height);
        spinner.display(height > App.value.pull.threshold ? Type.BLOCK : Type.NONE);
        e.preventDefault();
    });
    touch.up(function() {
        if (!App.value.pull.active) return;
        App.value.pull.active = false;
        if (App.value.pull.distance * 0.5 > App.value.pull.threshold) {
            container.height(80);
            spinner.display(Type.BLOCK);
            Wait(function() {
                container.height(0);
                spinner.display(Type.NONE);
                Wait(function() { location.reload(); }, 500);
            });
        } else {
            container.height(0);
            spinner.display(Type.NONE);
        }
    });

    // BALANCE
    Block().size(24).text("$11,300.00").into(Layout().padding(6).into(App.view.main));

    // CHANGE
    Inline().width(Type.FILL).into(Layout().width(Type.FILL).into(App.view.main)).include(function(change) {

        // AMOUNT
        Block().size(12).padding(6).color(App.value.green).text("+$223.74").into(change);

        // PERCENTAGE
        Block().size(12).padding(2).margin(4).radius(6).color(App.value.black).back(App.value.green).font("bold").text("+1.98%").into(change);
    });

    // QUICK
    Inline().width(Type.FILL).into(Layout().padding(6, 3).width(Type.FILL).into(App.view.main)).include(function(quick) {
        ["Send", "Swap", "Receive", "Buy"].forEach((value) => {
            var view = Block().padding(6).margin(3).radius(12).back(App.value.dark).align("center").into(quick).weight(1);
            Vector(18, 18).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"); attr("fill", App.value.purple); }).into(view);
            Block().size(10).padding(3).color(Color.GRAY).text(value).into(view);
        })
    });

    // CASH BALANCE
    Inline().width(Type.FILL).align("center").padding(6).radius(12).back(App.value.dark).into(Layout().width(Type.FILL).padding(6).into(App.view.main)).include(function(cash) {

        // BALANCE
        Layout().width(Type.FILL).align("left").padding(6).into(cash).weight(1).include(function(balance) {
            Block().size(12).color(Color.GRAY).text("Cash Balance").into(balance);
            Block().size(16).padding(6, 0).text("$5,300.00").into(balance);
        });

        // DEPOSIT
        Button().size(10).padding(9).radius(6).back(App.value.darker).color("white").text("Add Cash").into(Layout().padding(6).into(cash));
    });

    // TOKENS
    Inline().width(Type.FILL).align("center").into(Layout().width(Type.FILL).padding(3, 6).into(App.view.main)).include(function(title) {
        Block().size(16).padding(3).text("Tokens").into(title);
        Block().size(12).padding(3).text(">").into(title);
    });

    // SECTION
    [
        { name: "Solana", symbol: "SOL", verified: true, quantity: 60.54, value: "$53,000", gain: "$0.00" },
        { name: "Ethereum", symbol: "ETH", verified: true, quantity: 0.0, value: "$0.00", gain: "$0.00" },
        { name: "Bitcoin", symbol: "BTC", verified: true, quantity: 0.0, value: "$0.00", gain: "$0.00" },
        { name: "Bitcoin", symbol: "BTC", verified: true, quantity: 0.0, value: "$0.00", gain: "$0.00" }
    ].forEach((each) => {
        Inline().width(Type.FILL).padding(6).radius(12).align("center").back(App.value.dark).into(Layout().width(Type.FILL).padding(6).into(App.view.main)).include(function(section) {

            // LOGO
            Block().width(32).height(32).radius(50).back(Color.BLACK).into(Layout().padding(6).into(section));

            // INFORMATION
            Layout().width(Type.FILL).align("left").padding(6).into(section).weight(1).include(function(information) {
                Block().size(12).text(each.name).into(information);
                Block().size(12).color(Color.GRAY).text([each.quantity, each.symbol].join(" ")).into(information);
            });

            // AMOUNT
            Layout().padding(6).align("right").into(section).include(function(amount) {
                Block().size(12).text(each.value).into(amount);
                Block().size(12).color(Color.GRAY).text(each.gain).into(amount);
            });
        });
    });

    // =======================================================================================================================

    // BOTTOM
    Inline().width(Type.FILL).padding(12, 16).into(Layout().width(Type.FILL).height(Type.FILL).into(application).weight(0)).include(function(bottom) {

        // HOME
        var home = Block().padding(12).into(bottom).weight(1);
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M12 3 4 9v12h5v-7h6v7h5V9z"); attr("fill", App.value.purple); }).into(home);
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
        Vector(24, 24).view("0 0 24 24").child("path", function(attr) { attr("d", "M15.5,14h-0.79l-0.28,-0.27C15.41,12.59 16,11.11 16,9.5 16,5.91 13.09,3 9.5,3S3,5.91 3,9.5 5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5zM9.5,14C7.01,14 5,11.99 5,9.5S7.01,5 9.5,5 14,7.01 14,9.5 11.99,14 9.5,14z"); attr("fill", Color.GRAY); }).into(explore);
        explore.clicked(function() {
            App.source.explore();
        });
    });
};