// SVG Generator for key slides
export function generateSVGs() {
  generateParadoxVisualization();
  generateProtocolComparison();
  generateArchitectureDiagram();
  generateIntegrationFlow();
}

// Slide 1: The Data Paradox
function generateParadoxVisualization() {
  const container = document.getElementById('paradox-svg');
  if (!container) return;

  const svg = `
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#32b8c6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d748 0;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ff5459;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#c0152f;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Left side: Monetization -->
      <g id="monetization" class="paradox-side">
        <circle cx="200" cy="200" r="120" fill="url(#gradient1)" opacity="0.2" />
        <circle cx="200" cy="200" r="90" fill="url(#gradient1)" opacity="0.4" />
        <circle cx="200" cy="200" r="60" fill="url(#gradient1)" opacity="0.8" />

        <!-- Icons representing data monetization -->
        <g transform="translate(200, 200)">
          <path d="M -30,-30 L 30,-30 L 30,30 L -30,30 Z" fill="none" stroke="#32b8c6" stroke-width="3" filter="url(#glow)"/>
          <circle cx="0" cy="-15" r="5" fill="#32b8c6"/>
          <circle cx="-15" cy="0" r="5" fill="#32b8c6"/>
          <circle cx="15" cy="0" r="5" fill="#32b8c6"/>
          <circle cx="0" cy="15" r="5" fill="#32b8c6"/>
          <!-- Connecting lines -->
          <line x1="0" y1="-15" x2="-15" y2="0" stroke="#32b8c6" stroke-width="2"/>
          <line x1="0" y1="-15" x2="15" y2="0" stroke="#32b8c6" stroke-width="2"/>
          <line x1="-15" y1="0" x2="0" y2="15" stroke="#32b8c6" stroke-width="2"/>
          <line x1="15" y1="0" x2="0" y2="15" stroke="#32b8c6" stroke-width="2"/>
        </g>

        <text x="200" y="350" text-anchor="middle" fill="#32b8c6" font-size="20" font-weight="600">Monetization</text>
        <text x="200" y="375" text-anchor="middle" fill="#626c71" font-size="14">Revenue Generation</text>
      </g>

      <!-- Right side: Protection -->
      <g id="protection" class="paradox-side">
        <circle cx="600" cy="200" r="120" fill="url(#gradient2)" opacity="0.2" />
        <circle cx="600" cy="200" r="90" fill="url(#gradient2)" opacity="0.4" />
        <circle cx="600" cy="200" r="60" fill="url(#gradient2)" opacity="0.8" />

        <!-- Shield icon -->
        <g transform="translate(600, 200)">
          <path d="M 0,-40 C 20,-40 35,-35 35,-20 L 35,20 C 35,35 20,45 0,50 C -20,45 -35,35 -35,20 L -35,-20 C -35,-35 -20,-40 0,-40 Z"
                fill="none" stroke="#ff5459" stroke-width="3" filter="url(#glow)"/>
          <path d="M -15,-5 L -5,5 L 15,-15" fill="none" stroke="#ff5459" stroke-width="3" stroke-linecap="round"/>
        </g>

        <text x="600" y="350" text-anchor="middle" fill="#ff5459" font-size="20" font-weight="600">Protection</text>
        <text x="600" y="375" text-anchor="middle" fill="#626c71" font-size="14">IP & Privacy</text>
      </g>

      <!-- Center: The Paradox -->
      <g id="paradox-center">
        <circle cx="400" cy="200" r="50" fill="#fcfcf9" stroke="#5e5240" stroke-width="2" opacity="0.9"/>
        <text x="400" y="210" text-anchor="middle" fill="#13343b" font-size="40" font-weight="700">⚖️</text>
        <text x="400" y="280" text-anchor="middle" fill="#13343b" font-size="18" font-weight="600">The Paradox</text>
      </g>

      <!-- Connection lines with arrows -->
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#a7a9a9" />
        </marker>
      </defs>
      <line x1="270" y1="200" x2="350" y2="200" stroke="#a7a9a9" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
      <line x1="450" y1="200" x2="530" y2="200" stroke="#a7a9a9" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
    </svg>
  `;

  container.innerHTML = svg;

  // Animate entrance
  setTimeout(() => {
    const sides = container.querySelectorAll('.paradox-side');
    sides.forEach((side, index) => {
      (side as HTMLElement).style.animation = `fadeInScale 0.6s ease-out ${index * 0.2}s forwards`;
    });
  }, 100);
}

// Slide 2: Protocol Comparison
function generateProtocolComparison() {
  const container = document.getElementById('protocol-comparison-svg');
  if (!container) return;

  const svg = `
    <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.1"/>
        </filter>
      </defs>

      <!-- API Box -->
      <g id="api-protocol">
        <rect x="20" y="50" width="250" height="200" rx="12" fill="#f5f5f5" stroke="#32b8c6" stroke-width="3" filter="url(#shadow)"/>
        <text x="145" y="85" text-anchor="middle" fill="#32b8c6" font-size="22" font-weight="700">Traditional APIs</text>

        <!-- Icon -->
        <g transform="translate(145, 140)">
          <rect x="-25" y="-25" width="50" height="50" rx="8" fill="none" stroke="#32b8c6" stroke-width="2.5"/>
          <circle cx="-10" cy="-10" r="3" fill="#32b8c6"/>
          <circle cx="10" cy="-10" r="3" fill="#32b8c6"/>
          <circle cx="-10" cy="10" r="3" fill="#32b8c6"/>
          <circle cx="10" cy="10" r="3" fill="#32b8c6"/>
          <line x1="-10" y1="-10" x2="10" y2="10" stroke="#32b8c6" stroke-width="1.5"/>
          <line x1="10" y1="-10" x2="-10" y2="10" stroke="#32b8c6" stroke-width="1.5"/>
        </g>

        <text x="145" y="220" text-anchor="middle" fill="#626c71" font-size="13">Point-to-Point</text>
      </g>

      <!-- DataSpace Box -->
      <g id="dataspace-protocol">
        <rect x="325" y="50" width="250" height="200" rx="12" fill="#f5f5f5" stroke="#a84b2f" stroke-width="3" filter="url(#shadow)"/>
        <text x="450" y="85" text-anchor="middle" fill="#a84b2f" font-size="22" font-weight="700">DataSpace</text>

        <!-- Icon -->
        <g transform="translate(450, 140)">
          <circle cx="-20" cy="0" r="18" fill="none" stroke="#a84b2f" stroke-width="2.5"/>
          <circle cx="20" cy="0" r="18" fill="none" stroke="#a84b2f" stroke-width="2.5"/>
          <circle cx="0" cy="0" r="12" fill="none" stroke="#a84b2f" stroke-width="2.5"/>
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#a84b2f" stroke-width="2"/>
        </g>

        <text x="450" y="220" text-anchor="middle" fill="#626c71" font-size="13">Federated</text>
      </g>

      <!-- MCP Box -->
      <g id="mcp-protocol">
        <rect x="630" y="50" width="250" height="200" rx="12" fill="#f5f5f5" stroke="#1d7480" stroke-width="3" filter="url(#shadow)"/>
        <text x="755" y="85" text-anchor="middle" fill="#1d7480" font-size="22" font-weight="700">MCP</text>

        <!-- Icon -->
        <g transform="translate(755, 140)">
          <circle cx="0" cy="-15" r="12" fill="none" stroke="#1d7480" stroke-width="2.5"/>
          <text x="0" y="-8" text-anchor="middle" fill="#1d7480" font-size="14" font-weight="600">AI</text>
          <path d="M -20,10 L -20,15 L 0,15 M 20,10 L 20,15 L 0,15" fill="none" stroke="#1d7480" stroke-width="2" stroke-linecap="round"/>
          <rect x="-25" y="10" width="10" height="10" rx="2" fill="none" stroke="#1d7480" stroke-width="2"/>
          <rect x="15" y="10" width="10" height="10" rx="2" fill="none" stroke="#1d7480" stroke-width="2"/>
        </g>

        <text x="755" y="220" text-anchor="middle" fill="#626c71" font-size="13">Natural Language</text>
      </g>

      <!-- Connecting arrows showing complementary nature -->
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#a7a9a9" opacity="0.5"/>
        </marker>
      </defs>
      <path d="M 270 150 Q 297 150 325 150" fill="none" stroke="#a7a9a9" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow)" opacity="0.5"/>
      <path d="M 575 150 Q 602 150 630 150" fill="none" stroke="#a7a9a9" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow)" opacity="0.5"/>
    </svg>
  `;

  container.innerHTML = svg;
}

// Slide 8/10: Architecture Diagram
function generateArchitectureDiagram() {
  const container = document.getElementById('architecture-svg');
  if (!container) return;

  const svg = `
    <svg viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="layer-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#32b8c6;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#1d7480;stop-opacity:0.9" />
        </linearGradient>
        <filter id="soft-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
        </filter>
      </defs>

      <!-- Layer 1: User Layer -->
      <g id="user-layer">
        <rect x="50" y="50" width="900" height="60" rx="8" fill="url(#layer-gradient)" filter="url(#soft-shadow)"/>
        <text x="500" y="85" text-anchor="middle" fill="white" font-size="20" font-weight="600">End User (Natural Language)</text>

        <g transform="translate(150, 80)">
          <circle cx="0" cy="0" r="15" fill="white" opacity="0.3"/>
          <circle cx="0" cy="0" r="10" fill="white"/>
          <circle cx="0" cy="-4" r="3" fill="#32b8c6"/>
          <path d="M -6,2 Q 0,8 6,2" fill="white" stroke="#32b8c6" stroke-width="1.5"/>
        </g>
      </g>

      <!-- Arrow down -->
      <path d="M 500 110 L 500 150" stroke="#a7a9a9" stroke-width="3" marker-end="url(#arrowhead2)"/>

      <!-- Layer 2: MCP Client -->
      <g id="mcp-layer">
        <rect x="50" y="150" width="900" height="60" rx="8" fill="#e6f7f9" stroke="#32b8c6" stroke-width="2" filter="url(#soft-shadow)"/>
        <text x="500" y="185" text-anchor="middle" fill="#13343b" font-size="20" font-weight="600">MCP Client (AI Agent)</text>
      </g>

      <!-- Arrow down -->
      <path d="M 500 210 L 500 250" stroke="#a7a9a9" stroke-width="3" marker-end="url(#arrowhead2)"/>

      <!-- Layer 3: Backend Services -->
      <g id="backend-layer">
        <rect x="50" y="250" width="900" height="60" rx="8" fill="#fff5e6" stroke="#a84b2f" stroke-width="2" filter="url(#soft-shadow)"/>

        <!-- Three service boxes -->
        <g id="services">
          <rect x="150" y="262" width="180" height="36" rx="6" fill="white" stroke="#a84b2f" stroke-width="1.5"/>
          <text x="240" y="285" text-anchor="middle" fill="#a84b2f" font-size="14" font-weight="600">DataSpace</text>

          <rect x="410" y="262" width="180" height="36" rx="6" fill="white" stroke="#a84b2f" stroke-width="1.5"/>
          <text x="500" y="285" text-anchor="middle" fill="#a84b2f" font-size="14" font-weight="600">Traditional APIs</text>

          <rect x="670" y="262" width="180" height="36" rx="6" fill="white" stroke="#a84b2f" stroke-width="1.5"/>
          <text x="760" y="285" text-anchor="middle" fill="#a84b2f" font-size="14" font-weight="600">Data Sources</text>
        </g>
      </g>

      <!-- Arrow down -->
      <path d="M 240 310 L 240 340 M 500 310 L 500 340 M 760 310 L 760 340"
            stroke="#a7a9a9" stroke-width="2" marker-end="url(#arrowhead2)"/>

      <!-- Layer 4: Data -->
      <g id="data-layer">
        <rect x="50" y="340" width="900" height="50" rx="8" fill="#e8f5e9" stroke="#21804d" stroke-width="2"/>
        <text x="500" y="370" text-anchor="middle" fill="#21804d" font-size="18" font-weight="600">Protected Data (IP + Privacy Controls)</text>
      </g>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#a7a9a9" />
        </marker>
      </defs>

      <!-- Side labels -->
      <text x="20" y="80" fill="#626c71" font-size="12" font-weight="600">UX</text>
      <text x="20" y="180" fill="#626c71" font-size="12" font-weight="600">Interface</text>
      <text x="20" y="280" fill="#626c71" font-size="12" font-weight="600">Backend</text>
      <text x="20" y="365" fill="#626c71" font-size="12" font-weight="600">Storage</text>
    </svg>
  `;

  container.innerHTML = svg;
}

// Slide 10: Integration Flow
function generateIntegrationFlow() {
  const container = document.getElementById('integration-svg');
  if (!container) return;

  const svg = `
    <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="flow-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#32b8c6" />
        </marker>
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#32b8c6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d7480;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Flow nodes -->
      <g id="flow-nodes">
        <!-- Node 1: User -->
        <circle cx="300" cy="50" r="35" fill="url(#flow-gradient)" filter="url(#soft-shadow)"/>
        <text x="300" y="57" text-anchor="middle" fill="white" font-size="16" font-weight="600">User</text>

        <!-- Arrow 1 -->
        <path d="M 300 85 L 300 135" stroke="#32b8c6" stroke-width="3" marker-end="url(#flow-arrow)"/>
        <text x="320" y="115" fill="#626c71" font-size="12" font-style="italic">Natural</text>
        <text x="320" y="128" fill="#626c71" font-size="12" font-style="italic">Language</text>

        <!-- Node 2: MCP Client -->
        <rect x="230" y="135" width="140" height="50" rx="8" fill="#e6f7f9" stroke="#32b8c6" stroke-width="2.5" filter="url(#soft-shadow)"/>
        <text x="300" y="165" text-anchor="middle" fill="#13343b" font-size="15" font-weight="600">MCP Client</text>

        <!-- Arrow 2 -->
        <path d="M 300 185 L 300 235" stroke="#32b8c6" stroke-width="3" marker-end="url(#flow-arrow)"/>
        <text x="320" y="215" fill="#626c71" font-size="12" font-style="italic">JSON-RPC</text>

        <!-- Node 3: MCP Server -->
        <rect x="230" y="235" width="140" height="50" rx="8" fill="#fff5e6" stroke="#a84b2f" stroke-width="2.5" filter="url(#soft-shadow)"/>
        <text x="300" y="265" text-anchor="middle" fill="#13343b" font-size="15" font-weight="600">MCP Server</text>

        <!-- Arrow 3 splits -->
        <path d="M 250 285 L 150 335" stroke="#a84b2f" stroke-width="2.5" marker-end="url(#flow-arrow)"/>
        <path d="M 350 285 L 450 335" stroke="#a84b2f" stroke-width="2.5" marker-end="url(#flow-arrow)"/>

        <text x="170" y="315" fill="#626c71" font-size="11" font-style="italic">OAuth 2.1</text>
        <text x="395" y="315" fill="#626c71" font-size="11" font-style="italic">API Calls</text>

        <!-- Node 4a: DataSpace -->
        <rect x="50" y="335" width="140" height="50" rx="8" fill="#e8f5e9" stroke="#21804d" stroke-width="2.5" filter="url(#soft-shadow)"/>
        <text x="120" y="365" text-anchor="middle" fill="#13343b" font-size="14" font-weight="600">DataSpace</text>

        <!-- Node 4b: APIs -->
        <rect x="410" y="335" width="140" height="50" rx="8" fill="#e8f5e9" stroke="#21804d" stroke-width="2.5" filter="url(#soft-shadow)"/>
        <text x="480" y="365" text-anchor="middle" fill="#13343b" font-size="14" font-weight="600">APIs</text>

        <!-- Arrow 4 -->
        <path d="M 120 385 L 120 435" stroke="#21804d" stroke-width="2.5" marker-end="url(#flow-arrow)"/>
        <path d="M 480 385 L 480 435" stroke="#21804d" stroke-width="2.5" marker-end="url(#flow-arrow)"/>

        <!-- Node 5: Data Sources -->
        <rect x="150" y="435" width="300" height="50" rx="8" fill="#1a686f" filter="url(#soft-shadow)"/>
        <text x="300" y="465" text-anchor="middle" fill="white" font-size="15" font-weight="600">Protected Data Sources</text>
      </g>

      <!-- Labels on sides -->
      <g id="labels" opacity="0.7">
        <text x="10" y="50" fill="#626c71" font-size="11" font-weight="600">UX Layer</text>
        <text x="10" y="160" fill="#626c71" font-size="11" font-weight="600">AI Layer</text>
        <text x="10" y="260" fill="#626c71" font-size="11" font-weight="600">Tool Layer</text>
        <text x="10" y="360" fill="#626c71" font-size="11" font-weight="600">Protocol Layer</text>
        <text x="10" y="460" fill="#626c71" font-size="11" font-weight="600">Data Layer</text>
      </g>

      <!-- Security/Privacy indicators -->
      <g id="security-indicators">
        <rect x="520" y="200" width="70" height="180" rx="6" fill="#fff0f0" stroke="#c0152f" stroke-width="1.5" opacity="0.8"/>
        <text x="555" y="220" text-anchor="middle" fill="#c0152f" font-size="11" font-weight="700">Security</text>
        <text x="555" y="235" text-anchor="middle" fill="#c0152f" font-size="11" font-weight="700">Layers</text>

        <!-- Security icons -->
        <g transform="translate(555, 260)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#c0152f" stroke-width="1.5"/>
          <path d="M -4,-2 L -1,2 L 4,-4" fill="none" stroke="#c0152f" stroke-width="1.5" stroke-linecap="round"/>
        </g>

        <text x="555" y="300" text-anchor="middle" fill="#626c71" font-size="9">OAuth</text>
        <text x="555" y="320" text-anchor="middle" fill="#626c71" font-size="9">ODRL</text>
        <text x="555" y="340" text-anchor="middle" fill="#626c71" font-size="9">Encryption</text>
        <text x="555" y="360" text-anchor="middle" fill="#626c71" font-size="9">Audit</text>
      </g>
    </svg>
  `;

  container.innerHTML = svg;
}
