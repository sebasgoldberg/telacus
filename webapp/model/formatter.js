import formatter from 'simplifique/telaneg/base/model/formatter';

function isTipoAbrangenciaCentroRef(sTipoAbrangencia){
    return sTipoAbrangencia == 'R';
}

function isCustoBrutoEnabled(sTipoAbrangencia, bIsNegociacaoEditavel, bIsDerivado, bIsTransferido){
    return isTipoAbrangenciaCentroRef(sTipoAbrangencia) &&
        bIsNegociacaoEditavel && !bIsDerivado && ! bIsTransferido;
}

Object.assign(formatter, {

    exibirInformacoesAtuaisItemsButtonIcon: function(bExibir){
        if (bExibir)
            return "sap-icon://hide";
        return "sap-icon://show";
    },

    isCustoBrutoEnabled: isCustoBrutoEnabled,

    isDespesasAcessoriasEnabled: isCustoBrutoEnabled,
});


export default formatter;
