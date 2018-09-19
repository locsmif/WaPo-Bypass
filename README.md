# WaPo-Bypass
Bypasses WaPo GDPR wall, soft paywall and removes Urchin Tracking Module query fragments.

You'll need to install one of Greasemonkey (outdated), Tampermonkey (closed source) or Violentmonkey (FOSS) to your browser.

I recommend Violentmonkey: https://violentmonkey.github.io/get-it/

Add the following to your filters in uBlock Origin or variants:

    ||washingtonpost.com/*/identity-management/*

This will take care of the soft paywall.

uBlock Origin is available here: https://github.com/gorhill/uBlock
