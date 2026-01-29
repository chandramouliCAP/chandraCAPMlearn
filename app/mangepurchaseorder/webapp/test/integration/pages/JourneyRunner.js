sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"sony/chandra/mangepurchaseorder/test/integration/pages/PurchaseOrderSetList",
	"sony/chandra/mangepurchaseorder/test/integration/pages/PurchaseOrderSetObjectPage",
	"sony/chandra/mangepurchaseorder/test/integration/pages/POItemsObjectPage"
], function (JourneyRunner, PurchaseOrderSetList, PurchaseOrderSetObjectPage, POItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('sony/chandra/mangepurchaseorder') + '/test/flp.html#app-preview',
        pages: {
			onThePurchaseOrderSetList: PurchaseOrderSetList,
			onThePurchaseOrderSetObjectPage: PurchaseOrderSetObjectPage,
			onThePOItemsObjectPage: POItemsObjectPage
        },
        async: true
    });

    return runner;
});

