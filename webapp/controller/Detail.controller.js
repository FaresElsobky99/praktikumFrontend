sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/comp/smartchart/SmartChart",

], function (Controller, UIComponent, History, SmartChart) {
    'use strict'

    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        },
        onOpenDialog: function () {
            this.getOwnerComponent().openCreateOrder();
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            }
            else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("overview", {}, true);
            }
        },

        createOrder: function () {
            var oModel = this.getView().getModel();
            var oData = {
                OrderId: this.getView().byId("orderIdInput").getValue(),
                Werks: this.getView().byId("werksInput").getValue(),
                StartDate: this.getView().byId("startDatePicker").getValue(),
                EndDate: this.getView().byId("endDatePicker").getValue(),
                EnrgCons: parseFloat(this.getView().byId("enrgConsInput").getValue()),
                RnwEnrgCons: parseFloat(this.getView().byId("rnwEnrgConsInput").getValue()),
                WaterCons: parseFloat(this.getView().byId("waterConsInput").getValue()),
                CarbonFp: parseFloat(this.getView().byId("carbonFpInput").getValue())
            };

            oModel.create("/OrderSet", oData, {
                success: function () {
                    MessageToast.show("Order created successfully");
                },
                error: function (oError) {
                    MessageToast.show("Error creating order");
                }
            });
        }

    });
});