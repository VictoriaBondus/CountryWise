import {SELECTORS} from './constants';


class Caller {
    constructor(){
        this.$spinner = $(SELECTORS.SPINNER);
        this.$backdrop = $(SELECTORS.BACKDROP);
        this.callAjax = this.callAjax.bind(this);
    }

    callAjax(url, callback) {
        this.$spinner.show();
        this.$backdrop.show();


        $.ajax({
            url: url,
            error: (xhr) => {
                this.$spinner.hide();
                this.$backdrop.hide();
                callback(xhr.status, false);
            }
        })
        .done((info) => {
            this.$spinner.hide();
            this.$backdrop.hide();
            callback(false, info);
        });
    }
}

export default Caller;