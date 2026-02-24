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
sceen shots of the project:
<img width="1850" height="942" alt="image" src="https://github.com/user-attachments/assets/4c65e4f9-1917-416f-bbcd-467f0d8286e3" />
with password init 
<img width="1819" height="952" alt="image" src="https://github.com/user-attachments/assets/5a930d3d-1538-4326-857c-56befe8d4324" />


