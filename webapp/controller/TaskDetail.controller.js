import formatter from 'simplifique/telaneg/custos/model/formatter';

sap.ui.controller("simplifique.telaneg.custos.controller.TaskDetail", {

    formatter: formatter,

    onExibirInformacoesAtuais: function() {
        let m = this.getView().getModel('view');
        let bExibirInformacoesAtuaisItems =
            m.getProperty('/ExibirInformacoesAtuaisItems');
        m.setProperty('/ExibirInformacoesAtuaisItems',
            !bExibirInformacoesAtuaisItems);
    },
});

