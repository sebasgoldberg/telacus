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

    tipoItemTooltip: function(bIsDerivado, bIsTransferido, bIsGenerico) {
        switch (true) {
            case bIsDerivado:
                return "Item Derivado";
            case bIsTransferido:
                return "Item Transferido";
            case bIsGenerico:
                return "Item Genérico";
            default:
                return "Item Normal";
        }
    },

    tipoItemIcon: function(bIsDerivado, bIsTransferido, bIsGenerico) {
        switch (true) {
            case bIsDerivado:
                return "sap-icon://factory";
            case bIsTransferido:
                return "sap-icon://shipping-status";
            case bIsGenerico:
                return "sap-icon://tree";
            default:
                return "sap-icon://product";
        }
    },
});


export default formatter;
