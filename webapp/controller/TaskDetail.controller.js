import formatter from 'simplifique/telaneg/custos/model/formatter';
import JSONModel from "sap/ui/model/json/JSONModel";

sap.ui.controller("simplifique.telaneg.custos.controller.TaskDetail", {

    formatter: formatter,

    onInit : function () {
        this.getView().setModel(new JSONModel({
            ExibirInformacoesAtuaisItems: false,
            }), 'view_ext');
    },

    onExibirInformacoesAtuais: function() {
        let m = this.getView().getModel('view_ext');
        let bExibirInformacoesAtuaisItems =
            m.getProperty('/ExibirInformacoesAtuaisItems');
        m.setProperty('/ExibirInformacoesAtuaisItems',
            !bExibirInformacoesAtuaisItems);
    },
});

