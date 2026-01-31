# amp-usage-userscript
### tracking credits so you don't have to.

the original settings page shows you individual nodes but doesn't actually give you a sum of everything. this script hijacks the network request, calculates the totals for you, and slaps a magenta overlay on your screen so you can see your total spend at a glance.

## installation
if you have tampermonkey or violentmonkey installed, just click the button below and it'll handle the rest.

<a href="https://raw.githubusercontent.com/pc-style/amp-usage-userscript/main/amp-usage.user.js">
  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHg9IjUiIHk9IjUiIHdpZHRoPSIxOTAiIGhlaWdodD0iNDAiIGZpbGw9ImJsYWNrIiBzdHJva2U9IiNmZjAwZmYiIHN0cm9rZS13aWR0aD0iMiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIiAvPgogIDxyZWN0IHg9IjgiIHk9IjguNSIgd2lkdGg9IjE4NCIgaGVpZ2h0PSIzMyIgZmlsbD0iYmxhY2siIHN0cm9rZT0iI2ZmMDAmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSIyIDQiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiNmZjAwZmYiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMWVtIj5bIGluc3RhbGwgc2NyaXB0IF08L3RleHQ+Cjwvc3ZnPg==" alt="install script" />
</a>

## what it does
* **intercepts data:** catches the `getPersonalCreditsUsage` response from the api.
* **calculates sums:** loops through the data to find the total `freeUSD` and `paidUSD` combined.
* **glitchy ui:** adds a "count credits" button in the corner that triggers a temporary magenta overlay.
* **auto-updates:** lives on github, so it'll check for updates automatically whenever you bump the version in the header.

## setup
1.  push your script as `amp-usage.user.js` to this repo.
2.  make sure the `@updateURL` and `@downloadURL` in your script point to the raw file link.
3.  refresh ampcode.com and look for the magenta button in the bottom right.

---
