import {arrayToString} from './utils';
import {TEMPLATES, SELECTORS} from './constants';


class CountryTable {
    constructor(callAjax, renderer, callback){
        this.lookup = this.lookup.bind(this);
        this.callback = callback;
        this.callAjax = callAjax;

        this.renderer = renderer;

        this.$errorWrapper = $(SELECTORS.ERROR_WRAPPER);
        this.$tableBody = $(SELECTORS.RESPONSE_TABLE_BODY);
        this.$tableWrapper = $(SELECTORS.RESPONSE_TABLE_WRAPPER);

        this.$tableBody.on('click', SELECTORS.CLICKABLE_ROW, this._countryRowHandler.bind(this));
    }

    lookup(searchDataType, searchData){
        this.$errorWrapper.empty();
        this.$tableBody.empty();
        this.$tableWrapper.hide();

        let url = "https://restcountries.eu/rest/v2/"+searchDataType+ "/"+ searchData+"?fields=name;alpha2Code;languages;region";
        this.callAjax(url, this._onLookupResponse.bind(this));
    }

    _onLookupResponse(error, info){
        if(error) {
            this._displayError(error);
        } else {
            this._displayTable(info);
        }
    }

    _displayError(error){
        let errorMessage;
        switch (error) {
            case 404:
                errorMessage = "Unfortunately, we could not find anything.Please adjust your search";
                break;
            case 500:
                errorMessage = "Unfortunately, there has been a server error.Please try again later";
                break;
            default :
                errorMessage = "Unfortunately, there has been an error.Please try again later";
        }
        let template = this.renderer.renderTemplate(TEMPLATES.ERROR, {errorMessage:errorMessage});
        this.$errorWrapper.append(template);
    }

    _displayTable(info){
        this.$tableWrapper.show();

        for(let i = 0; i < info.length; i++) {
            let langs = arrayToString(info[i].languages, 'name');
            let template = this.renderer.renderTemplate('tableRowTempl', {
                numD : i+1,
                nameD: info[i].name,
                isoD: info[i].alpha2Code,
                langD: langs,
                regionD: info[i].region
            });
            this.$tableBody.append(template);
        }
    }

    _countryRowHandler (evt) {
        let $targetRow = $(evt.target).parent();
        let iso = $targetRow.data('code');
        this.callback($targetRow, iso);
    }
}

export default CountryTable;