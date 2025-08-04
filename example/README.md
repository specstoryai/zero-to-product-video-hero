# tny.dev Remotion Video

This is a Remotion video project showcasing tny.dev's MCP (Model Context Protocol) integration for AI-powered link shortening.

## Video Overview

The video is a 30-second promotional piece highlighting:
- AI-first link shortening with natural language commands
- MCP integration with Claude Desktop
- Real-time analytics and global reach
- Developer-friendly pricing ($9/month)

### Scenes

1. **Opening Scene (0-3s)**: Logo animation with "Link Shortening with Agents" tagline and MCP Ready badge
2. **Installation Scene (3-6.5s)**: Three installation methods (Claude Desktop Extension, NPM Package, GitHub)
3. **Claude Demo (6.5-15s)**: Natural language shortening demonstration showing real conversation flow
4. **Analytics Scene (15-21.5s)**: Real-time analytics dashboard with charts and global reach visualization
5. **Closing CTA (21.5-30s)**: "Start Building Today" with pricing and feature list

## Setup

1. Install dependencies:
```bash
cd remotion
npm install
```

2. Start the Remotion Studio:
```bash
npm start
```

3. Preview the video in your browser at http://localhost:3000

## Rendering

To render the final video:

```bash
# Standard render (30fps)
npm run build

# High quality render (60fps recommended for smooth animations)
npx remotion render src/index.tsx TnyDevMCP out/video.mp4 --quality=100 --fps=60

# Maximum quality for production
npx remotion render src/index.tsx TnyDevMCP out/video.mp4 --quality=100 --fps=60 --video-bitrate=8M --pixel-format=yuv420p
```

### Render Options

- Output format: MP4 (H.264)
- Resolution: 1920x1080 (Full HD)
- Frame rate: 30fps (60fps recommended for smoother animations)
- Duration: 30 seconds (900 frames)

## Project Structure

```
remotion/
├── src/
│   ├── index.tsx          # Entry point
│   ├── Root.tsx           # Composition definition
│   ├── MainVideo.tsx      # Main video orchestrator
│   ├── components/        # Reusable UI components
│   │   ├── Typography.tsx # Text components
│   │   ├── Button.tsx     # Button component
│   │   ├── Card.tsx       # Card component
│   │   ├── Icons.tsx      # Icon components
│   │   ├── Logo.tsx       # Logo component
│   │   └── URLInput.tsx   # URL input component
│   └── scenes/            # Video scenes
│       ├── OpeningScene.tsx
│       ├── InstallationScene.tsx
│       ├── ClaudeDemo.tsx
│       ├── AnalyticsScene.tsx
│       └── ClosingCTA.tsx
├── public/
│   ├── tny.svg                  # tny.dev logo (SVG)
│   ├── tnydev.png               # tny.dev logo (PNG)
│   ├── claude.png               # Claude logo
│   ├── person.png               # User avatar
│   ├── mcp.png                  # MCP logo
│   └── noun-world-map-597572.svg # World map for analytics
├── package.json
└── tsconfig.json
```

## Design System

The video uses tny.dev's design system with enhanced typography:
- **Colors**: Black (#000000), white (#FFFFFF), purple (#7C3AED)
- **Typography**: 
  - Geist Sans for headings/body with tight letter-spacing
  - Geist Mono for code and technical content
  - Uppercase labels with widest letter-spacing for section headers
- **Border radius**: 10px (matching tny.dev brand)
- **Animations**: Spring physics for smooth, natural motion
- **Text hierarchy**: Editorial-style with uppercase labels and bold headings

## Customization

To modify the video:

1. **Change duration**: Edit `durationInFrames` in `Root.tsx`
2. **Adjust scene timing**: Modify frame values in `MainVideo.tsx`
3. **Update content**: Edit text and animations in individual scene files
4. **Change styling**: Update components in the `components/` folder

## Key Features

- **Spring animations** for smooth, natural motion (especially in charts and UI elements)
- **Frame-based animations** for deterministic rendering
- **Editorial typography** with uppercase labels and tight letter-spacing
- **Purple-accented UI** with stroked message bubbles in Claude demo
- **Responsive design tokens** for consistent styling
- **Series composition** instead of TransitionSeries for precise timing control

## Performance Tips

For smooth playback:
1. Render at 60fps for best results
2. Use `--pixel-format=yuv420p` for better compatibility
3. Higher bitrate (8M) for crisp text and animations
4. Spring physics configured for natural motion curves