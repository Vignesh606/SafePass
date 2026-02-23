SafePass: Interactive Password Resilience Tool
The Problem
Most password checkers are "dumb"—they just check for a capital letter and a number. SafePass acts as a security mentor, using mathematical entropy to simulate real-world brute-force resilience.

The Tech Stack

Engine: JavaScript (ES6+) implementing Shannon Entropy.


Logic: Regex-based pattern recognition for character diversity.


Styling: Tailwind CSS for a high-performance, responsive UI.

Architecture: 100% Client-side. Zero data transmission. Privacy-first.


Mathematical Foundation
We calculate password strength using the Shannon Entropy formula:
E = \log_2(L^N)

Where L is the character pool size and N is the string length. This allows us to estimate cracking time against modern NVIDIA RTX 40-series hardware.


How to Run
Clone the repo.

Open index.html in any modern browser.

No npm install required. Zero dependencies.
