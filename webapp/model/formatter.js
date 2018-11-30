import formatter from 'simplifique/telaneg/base/model/formatter';

Object.assign(formatter, {
    isTipoAbrangenciaCentroRef: function(sTipoAbrangencia) {
        return sTipoAbrangencia == 'R';
    },
    exibirInformacoesAtuaisItemsButtonIcon: function(bExibir){
        if (bExibir)
            return "sap-icon://hide";
        return "sap-icon://show";
    },
});


export default formatter;
