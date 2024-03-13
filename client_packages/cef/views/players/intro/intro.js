var intro = new Vue({
    el: "#intro",
    data: {
        opened: false,
    },
    methods: {
        keyUp(event) {
            if (!this.opened) return;

            if (event.keyCode == 13)
                mp.trigger("client.accounts.open");
        },

        open() {
            this.opened = true;
        },

        reset() {
            this.opened = false;
        }
    }
});

document.addEventListener('keyup', intro.keyUp);