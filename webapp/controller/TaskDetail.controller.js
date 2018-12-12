import formatter from 'simplifique/telaneg/custos/model/formatter';
import JSONModel from "sap/ui/model/json/JSONModel";
import Decimal from "sap/ui/model/odata/type/Decimal";

sap.ui.controller("simplifique.telaneg.custos.controller.TaskDetail", {

    formatter: formatter,

    onInit : function () {
        this.getView().setModel(new JSONModel({
            ExibirInformacoesAtuaisItems: false,
            }), 'view_ext');
    },

    getMinPeriodoApuracao: function() {
        return new Date();
    },

    onExibirInformacoesAtuais: function() {
        let m = this.getView().getModel('view_ext');
        let bExibirInformacoesAtuaisItems =
            m.getProperty('/ExibirInformacoesAtuaisItems');
        m.setProperty('/ExibirInformacoesAtuaisItems',
            !bExibirInformacoesAtuaisItems);
    },

    expandRow: function(oRow) {
        return new Promise( (resolve, reject) => {
            let v = this.getView();
            let oTreeTable = v.byId('treeTable');
            let iRowIndex = oRow.getIndex();
            if (oTreeTable.isExpanded(iRowIndex))
                resolve();
            else{
                oTreeTable.expand(iRowIndex);
                let bc = oTreeTable.getContextByIndex(iRowIndex);
                let oItem = bc.getObject();
                let oInterval = setInterval( () => {
                    // Obtemos o contexto da seguinte linha.
                    let bc = oTreeTable.getContextByIndex(iRowIndex+1);
                    if (!bc)
                        return;
                    let oSeguinteItem = bc.getObject();
                    if (oSeguinteItem.Pai !== oItem.Item)
                        return;
                    resolve();
                    clearInterval(oInterval);
                }, 200 );
            }
        });
    },

    /**
     * @pre oRow esta espandida.
     */
    getBindingContextsFilhosRow: function(oRow) {
        let aBindingContexts = [];
        let v = this.getView();
        let oTreeTable = v.byId('treeTable');
        let iRowIndex = oRow.getIndex();
        let bc = oTreeTable.getContextByIndex(iRowIndex);
        let oItem = bc.getObject();
        for (;;){
            iRowIndex++;
            let bc = oTreeTable.getContextByIndex(iRowIndex);
            if (!bc)
                break;
            let oSeguinteItem = bc.getObject();
            if (oSeguinteItem.Nivel <= oItem.Nivel)
                break;
            if (oSeguinteItem.Pai === oItem.Item)
                aBindingContexts.push(bc);
        }
        return aBindingContexts;
    },

    onChangeReplicarEmFilhos: async function(oEvent) {
        let oSource = oEvent.getSource();
        let bc = oSource.getBindingContext();
        let bIsGenerico = bc.getProperty('IsGenerico');
        if (!bIsGenerico)
            return;
        let sValue = oEvent.getParameters().value;
        let sRelativePath = oSource.getBinding('value').getPath();
        let oRow = oSource.getParent().getParent();
        oSource.setBusy(true);
        await this.expandRow(oRow);
        oSource.setBusy(false);
        let fValue;
        let dValue;
        try {
            dValue = new Decimal().parseValue(sValue, "string");
            fValue = parseFloat( dValue );
        } catch (e) {
            if (e.ParseException == "ParseException")
                return;
            throw e;
        }
        if (isNaN(fValue))
            return;
        let aBindingContexts = this.getBindingContextsFilhosRow(oRow);
        let m = this.getView().getModel();
        aBindingContexts
            .map( bc => bc.getPath() )
            .forEach( sPath => m.setProperty(`${sPath}/${sRelativePath}`,dValue) );
    },

});

