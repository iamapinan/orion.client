/*******************************************************************************
 * @license
 * Copyright (c) 2015 IBM Corporation, Inc. and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 * Contributors:
 *   IBM Corporation - Initial API and implementation
 ******************************************************************************/
/* eslint-env amd */
define([
], function() {

    /**
     * @description Computes the content assist proposals
     * @param {Object} ternserver The server to send requests to
     * @param {Object} args The arguments from the original request 
     * @param {Function} callback The function to call back to once the request completes or fails
     * @since 9.0
     */
    function computeProposals(ternserver, args, callback) {
        if(ternserver) {
	       ternserver.request({
	           query: {
	           type: "completions",  //$NON-NLS-1$
	           file: args.meta.location,
	           types: true, 
	           origins: true,
	           urls: true,
	           docs: true,
	           end: args.params.offset,
	           sort:true,
	           includeKeywords: args.params.keywords
	           },
	           files: args.files}, 
	           function(error, comps) {
	               if(error) {
	               		callback({request: 'completions', error: error.message, message: 'Failed to compute proposals'}); //$NON-NLS-1$
	               } else if(comps && comps.completions) {
               			callback({request: 'completions', proposals: comps.completions}); //$NON-NLS-1$
	               } else {
	               		callback({request: 'completions', proposals:[]}); //$NON-NLS-1$
	               }
	           });
	       
	   } else {
	       callback({request: 'completions', message: 'Failed to compute proposals, server not started'}); //$NON-NLS-1$
	   }
    }
    
	return {
	    computeProposals: computeProposals
	};
});
