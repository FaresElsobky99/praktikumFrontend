sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment",
], function (ManagedObject, Fragment) {
    "use strict"

    return ManagedObject.extend("sap.ui.walkthrough.controller.CreateOrder", {

        constructor: function (oView) {
            this._oView = oView
        },

        exit: function () {
            delete this._oView;
        },



        open: function () {
            var oView = this._oView;

            // create the dialog lazily
            if (!oView.byId("CreateOrder")) {
                var oFragmentController = {
                    //Call onCloseDialog when dialog is closed
                    onCloseDialog: function () {
                        console.log("onCloseDialog");
                        oView.byId("CreateOrder").close();
                    },
                    onSubmit: function () {
                        console.log("onSubmit");
                        oView.byId("CreateOrder").close();

                        var orderId = oView.byId("orderIdInput").getValue();
                        var werks = oView.byId("werksInput").getValue();
                        var startDate = oView.byId("startDatePicker").getValue();
                        var endDate = oView.byId("endDatePicker").getValue();
                        var enrgCons = oView.byId("enrgConsInput").getValue();
                        var rnwEnrgCons = oView.byId("rnwEnrgConsInput").getValue();
                        var waterCons = oView.byId("waterConsInput").getValue();
                        var carbonFp = oView.byId("carbonFpInput").getValue();

                        // Construct your order data object
                        var orderData = {
                            OrderId: orderId,
                            Werks: werks,
                            StartDate: startDate,
                            EndDate: endDate,
                            EnrgCons: parseFloat(enrgCons),
                            RnwEnrgCons: parseFloat(rnwEnrgCons),
                            WaterCons: parseFloat(waterCons),
                            CarbonFp: parseFloat(carbonFp)
                        };

                        console.log("Order Data ----- ", orderData);

                    },
                };

                // load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.CreateOrder",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // connect dialog to the root view of the component (models, lifecycle)
                    oView.addDependent(oDialog);
                    // forward compact/cozy style into dialog
                    oDialog.open();
                });
            } else {
                oView.byId("CreateOrder").open();
            }
        }
    });
});