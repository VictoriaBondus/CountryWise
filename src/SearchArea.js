import {SELECTORS} from './constants';

const REGION_VAL = 'region';
const SELECT_DEFAULT_VALUE = 'Choose the region';

class SearchArea {
    constructor(callback){
        this.callback = callback;

        this.$regionInput = $(SELECTORS.REGION_INPUT);
        this.$searchInput = $(SELECTORS.SEARCH_INPUT);
        this.$inputWindow =  this.$searchInput;

        $(SELECTORS.RADIO_CONTAINER).on('click','[type=radio]', this.radioHandler.bind(this));
        $(SELECTORS.SEARCH_BUTTON).on('click', this.searchHandler.bind(this))
    }

    radioHandler(evt){
        const $target = $(evt.target);

        if($target.val()===REGION_VAL){
            this.$inputWindow = this.$regionInput;
            this.$regionInput.show();
            this.$searchInput.hide();
        } else {
            this.$inputWindow = this.$searchInput;
            this.$regionInput.hide();
            this.$searchInput.show();
        }
    }

    searchHandler() {
        let searchDataType = $(SELECTORS.CHECKED_INPUT_RADIO).val();
        let searchData = this.$inputWindow.val();

        if(searchData === "" || searchData === SELECT_DEFAULT_VALUE) {
            return;
        }

        this.callback(searchDataType, searchData);
    }
}

export default SearchArea;