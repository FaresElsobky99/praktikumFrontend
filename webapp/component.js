sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "./controller/CreateOrder"
], function (UIComponent, JSONModel, ResourceModel, CreateOrder) {
    'use strict'

    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // set data model on view
            var oData = {
                recipient: {
                    name: "UI5"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            this._CreateOrder = new CreateOrder(this.getRootControl());

            this.getRouter().initialize();
        },

        exit: function () {
            this._CreateOrder.destroy();
            delete this._CreateOrder;
        },

        openCreateOrder: function () {
            this._CreateOrder.open();
        }
    });
}); 