sap.ui.define([],function(){"use strict";return c;function c(u){var U=u&&u.services&&u.services.Container&&u.services.Container.adapter&&u.services.Container.adapter.config&&u.services.Container.adapter.config.userProfile,l=U&&U.defaults&&U.defaults.languageBcp47,s=U&&U.defaults&&U.defaults.language;if(l){sap.ui.getCore().getConfiguration().setLanguage(l,s);}}});
