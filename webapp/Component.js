import TelaNegComponent from "cp/simplifique/telaneg/Component";
import models from "simplifique/custos/model/models";

export default TelaNegComponent.extend("simplifique.custos.Component", {

    metadata: {
        customizing: {
            "sap.ui.viewExtensions": {
                "cp.simplifique.telaneg.view.TaskList": {
                    "Columns": {
                        className: "sap.ui.core.Fragment",
                        fragmentName: "simplifique.custos.view.TaskList.Columns",
                        type: "XML"
                    },
                    "Cells": {
                        className: "sap.ui.core.Fragment",
                        fragmentName: "simplifique.custos.view.TaskList.Cells",
                        type: "XML"
                    }
                },
            },
        },
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function() {

        // call the base component's init function
        TelaNegComponent.prototype.init.apply(this, arguments);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
    }

});

