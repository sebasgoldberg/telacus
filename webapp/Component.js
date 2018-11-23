import TelaNegComponent from "simplifique/telaneg/base/Component";
import models from "simplifique/telaneg/custos/model/models";

export default TelaNegComponent.extend("simplifique.telaneg.custos.Component", {

    metadata: {
        manifest: "json",
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

