import {arrayToString} from './utils';
import {TEMPLATES, SELECTORS} from './constants';

class InfoBlock {
    constructor(callAjax, renderer){
        this.lookup = this.lookup.bind(this);
        this.callAjax = callAjax;
        this.renderer = renderer;
        this.$activeBlock = false;
        this.$activeBlockInner = false;

    }

    lookup($targetContainer, iso){
// If $activeBlock exists and so does $activeBlockInner, close and remove.
// If $activeBlock exists and $activeBlockInner doesn't, that means the block is in a 'slow' close mode already, do nothing.
        if(this.$activeBlock) {
            if(this.$activeBlockInner){
                this.$activeBlockInner.slideUp('slow', () => {
                    this.$activeBlock.remove();
                    this.$activeBlock = false;
                });
                this.$activeBlockInner = false;
            }
        } else {
            let url = "https://restcountries.eu/rest/v2/alpha/"+ iso +"?fields=name;topLevelDomain;alpha2Code;alpha3Code;altSpellings;region;timezones;languages;numericCode;currencies";
            this.callAjax(url, this._onLookupResponse.bind(this, $targetContainer));
        }
    }

    _onLookupResponse($targetContainer, error, info){
        if(error) {
            this._displayError($targetContainer, error);
        } else {
            let currencies = info.currencies.map(elm => "EUR_" + elm.code).join(",");

            let url = "http://free.currencyconverterapi.com/api/v5/convert?q="+currencies+"&compact=y";
            this.callAjax(url, this._onCurrencyResponse.bind(this, $targetContainer, info));
        }
    }

    _onCurrencyResponse($targetContainer, info, error, exchange) {
        if(error) {
            this._displayError(error);
        } else {
            this._displayInfoBlock($targetContainer, info, exchange);
        }
    }

    _displayError($targetContainer, error){
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
        $targetContainer.append(template);
    }

    _displayInfoBlock($targetContainer, info, exchange){
        let exchangeRatesArr = [];
        let currency;
        let rate;

        for( let key in exchange) {
            currency = key.replace("EUR_","");
            rate = exchange[key].val;
            exchangeRatesArr.push("1EUR = "+rate+currency);
        }

        let exchangeRateStr = exchangeRatesArr.join(", ");

        let template = this.renderer.renderTemplate('countryInfoBlockTempl', {
            nameB : info.name,
            domainB : info.topLevelDomain,
            alpha2B: info.alpha2Code,
            alpha3B: info.alpha3Code,
            altSpelB: arrayToString(info.altSpellings),
            regionB: info.region,
            timezB: arrayToString(info.timezones),
            langB: arrayToString(info.languages, 'name'),
            numCodeB: info.numericCode,
            currB: arrayToString(info.currencies, 'name'),
            curToEurB: exchangeRateStr
        });

        this.$activeBlock = $(template);
        this.$activeBlockInner = this.$activeBlock.find(SELECTORS.INFO_BLOCK_INNER);

        $targetContainer.after(this.$activeBlock);
        this.$activeBlockInner.slideDown('slow');
    }

}

export default InfoBlock;