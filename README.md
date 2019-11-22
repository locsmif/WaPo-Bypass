# WaPo-Bypass
Bypasses WaPo GDPR wall, soft paywall and removes Urchin Tracking Module query fragments.

You'll need to install one of Greasemonkey (preferred), Tampermonkey (closed source) or Violentmonkey (FOSS) to your browser.

Functioning code in anything other than Greasemonkey not guaranteed.

Add the following to your filters in uBlock Origin or variants:

    ||washingtonpost.com/*/identity-management/*

This will take care of the soft paywall.

uBlock Origin is available here: https://github.com/gorhill/uBlock
