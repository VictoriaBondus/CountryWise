import SearchArea from './SearchArea';
import CountryTable from './CountryTable';
import InfoBlock from './InfoBlock';
import Caller from './Caller';
import Renderer from './Renderer';


class Main {
    startUp(){
        this.caller = new Caller();
        this.renderer = new Renderer();

        this.infoBlock = new InfoBlock(this.caller.callAjax, this.renderer);
        this.countryTable = new CountryTable(this.caller.callAjax, this.renderer, this.infoBlock.lookup);
        this.searchArea = new SearchArea(this.countryTable.lookup);
    }
}

const app = new Main();

app.startUp();





