
// ==UserScript==
// @name         AmpCode Credit Usage Interceptor
// @namespace    pcstyle
// @version      1.4
// @description  Intercepts fetch request, fixes decimals, and shows sums in UI
// @author       pcstyle
// @match        https://ampcode.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/pc-style/amp-usage-userscript/main/amp-usage.user.js
// @downloadURL  https://raw.githubusercontent.com/pc-style/amp-usage-userscript/main/amp-usage.user.js
// ==/UserScript==

(function() {
    'use strict';

    let lastData = null;

    // hijacking fetch because sveltekit is weird
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const response = await originalFetch(...args);

        if (args[0] && typeof args[0] === 'string' && args[0].includes('getPersonalCreditsUsage')) {
            const clone = response.clone();
            clone.json().then(json => {
                try {
                    // the result comes back stringified inside the json :D
                    lastData = JSON.parse(json.result);
                } catch (e) {
                    console.error('data is broken and i cant figure out how to parse it', e);
                }
            });
        }
        return response;
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(val / 100);
    };

    const displayResults = () => {
        if (!lastData) {
            alert("nothing captured yet. maybe refresh the page on the settings tab?");
            return;
        }

        let freeTotal = 0;
        let paidTotal = 0;

        lastData.forEach(node => {
            if (node && typeof node === 'object') {
                if (typeof node.freeUSD === 'number') freeTotal += node.freeUSD;
                if (typeof node.paidUSD === 'number') paidTotal += node.paidUSD;
            }
        });

        showSafeOverlay(freeTotal, paidTotal);
    };

    const showSafeOverlay = (free, paid) => {
        const combined = free + paid;

        // ughhh making this trusted html compliant so it doesnt explode
        const overlay = document.createElement('div');
        const textWrapper = document.createElement('div');
        textWrapper.style.whiteSpace = 'pre';
        textWrapper.textContent = `free: ${formatCurrency(free)}\npaid: ${formatCurrency(paid)}\nsum:  ${formatCurrency(combined)}`;

        Object.assign(overlay.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#000',
            color: '#ff00ff',
            border: '2px solid #ff00ff',
            padding: '15px',
            fontFamily: 'monospace',
            zIndex: '10000',
            boxShadow: '0 0 10px #ff00ff',
            pointerEvents: 'none',
            textTransform: 'lowercase'
        });

        overlay.appendChild(textWrapper);
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.transition = "opacity 0.5s";
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 500);
        }, 3000);
    };

    // slapping the trigger button onto the screen
    const btn = document.createElement('button');
    btn.textContent = "count credits";
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        background: '#1a1a1a',
        color: '#ff00ff',
        border: '1px solid #ff00ff',
        padding: '8px 12px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        textTransform: 'lowercase'
    });

    btn.onclick = displayResults;
    document.body.appendChild(btn);
})();
