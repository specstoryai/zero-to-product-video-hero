---
theme: the-unnamed
layout: cover
background: '#161C2C'
title: 'Build a Product Video in a Day - Agentically'
info: |
  Learn how to create professional product videos using Remotion and Claude Code
  in just 2 hours instead of weeks.
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-up
mdc: true
themeConfig:
  color: "#F3EFF5"
  background: "#161C2C"
  
  code-background: "#0F131E"
  code-border: "#242d34"

  accents-teal: "#44FFD2"
  accents-yellow: "#FFE45E"
  accents-red: "#FE4A49"
  accents-lightblue: "#15C2CB"
  accents-blue: "#5EADF2"
  accents-vulcan: "#0E131F"
---

<style>
/* Make title font smaller on cover slide */
.cover h1 {
  font-size: 2.5em !important;
}

.cover h2 {
  font-size: 1.5em !important;
}

/* Custom styles for code blocks */
.shiki {
  background: #0F131E !important;
  border: 1px solid #242d34 !important;
}

/* Accent colors */
.text-accent-teal { color: #44FFD2; }
.text-accent-yellow { color: #FFE45E; }
.text-accent-red { color: #FE4A49; }
.text-accent-blue { color: #5EADF2; }
.bg-accent-blue { background-color: #5EADF2; }
</style>

# Build a Product Video in a Day
## Agentically

<div class="absolute bottom-5 right-5 text-sm opacity-70">
  Greg Ceccarelli • August 2025
</div>

---
layout: center
---

# The $10,000 Question

<div class="flex flex-col items-center justify-center">
  <div v-click class="text-4xl font-bold text-accent-red mb-8">
    Traditional agency quote: $10,000 for 30 seconds
  </div>
  
  <div v-click class="text-5xl font-bold text-accent-teal mb-4">
    I built 39 seconds in 2 hours for $0
  </div>
  
  <div v-click class="mt-8">
    <video 
      autoplay 
      muted 
      loop 
      class="rounded-lg shadow-2xl max-w-2xl"
      style="max-height: 300px"
    >
      <source src="/hero-video-preview.mp4" type="video/mp4">
    </video>
  </div>
</div>

<!--
Start with impact. This grabs attention immediately and sets up the value proposition.
Show the actual video they'll be learning to build.
-->

---
layout: about-me
helloMsg: Hello!
name: I'm Greg
imageSrc: /greg.png
position: left
job: Co-founder of SpecStory
line1: Previously CPO at Pluralsight
line2: Data at Dropbox, GitHub, Google
social1: "X: @gregce10"
social2: "greg@specstory.com"
social3: "specstory.com"
---

---
layout: default
---

# Why This Matters

<div class="grid grid-cols-2 gap-8 mt-10">
  <div v-click>
    <h2 class="text-accent-yellow mb-4">The Problem</h2>
    <ul>
      <li>90% of startups need product videos</li>
      <li>&lt;10% can afford professional production</li>
      <li>Traditional editing = weeks of learning</li>
      <li>Hire specialists or do without</li>
    </ul>
  </div>
  
  <div v-click>
    <h2 class="text-accent-teal mb-4">The Opportunity</h2>
    <div class="bg-code-background p-6 rounded-lg border border-code-border">
      <p class="text-xl text-accent-blue">
        What if you could code your videos<br/>
        like you code your apps?
      </p>
    </div>
  </div>
</div>

---
layout: default
---

# Traditional vs. The New Way

<div class="grid grid-cols-2 gap-8 mt-10">
  <div v-click>
    <h3 class="text-2xl mb-4 text-accent-red">Traditional Editing</h3>
    <div class="bg-code-background p-6 rounded-lg border border-code-border">
      <div class="text-6xl mb-4">🎨</div>
      <p class="text-lg mb-4">Paint pixels on a timeline</p>
      <ul class="text-sm">
        <li>• Keyframes</li>
        <li>• Render queues</li>
        <li>• Export → Wait → Repeat</li>
      </ul>
    </div>
  </div>
  
  <div v-click>
    <h3 class="text-2xl mb-4 text-accent-teal">Remotion + AI</h3>
    <div class="bg-code-background p-6 rounded-lg border border-code-border">
      <div class="text-6xl mb-4">🧩</div>
      <p class="text-lg mb-4">Write React components</p>
      <ul class="text-sm">
        <li>• Hot reload</li>
        <li>• Version control</li>
        <li>• Deploy → Ship → Scale</li>
      </ul>
    </div>
  </div>
</div>

<div v-click class="text-center mt-10 text-2xl font-bold text-accent-yellow">
  Videos are just functions of time
</div>

---
layout: center
---

# What is Remotion?

<div class="text-center">
  <h2 class="text-4xl font-bold mb-8 text-accent-blue">React for Videos</h2>
  
  <div class="bg-code-background p-8 rounded-lg border border-code-border max-w-3xl mx-auto">
    ```jsx
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 30], [0, 1]);
    
    // Frame 0: opacity = 0 (invisible)
    // Frame 15: opacity = 0.5 (half visible)  
    // Frame 30: opacity = 1 (fully visible)
    ```
  </div>
  
  <p v-click class="mt-8 text-xl">
    Every frame = React render at time T
  </p>
  
  <p v-click class="mt-4 text-2xl font-bold text-accent-teal">
    If you know React, you already know Remotion
  </p>
</div>

<!--
Core concept: Videos are React components rendered over time.
Simple example that everyone can understand.
-->

---
layout: default
---

# The Magic Formula

<div class="flex items-center justify-center h-full">
  <div class="text-center">
    <div class="flex items-center justify-center space-x-8 mb-12">
      <div v-click>
        <div class="w-32 h-32 bg-accent-blue rounded-lg flex items-center justify-center text-6xl font-bold">
          R
        </div>
        <p class="mt-2 font-bold">Remotion</p>
      </div>
      
      <div v-click class="text-6xl">+</div>
      
      <div v-click>
        <img src="/claude-logo.svg" class="w-32 h-32 bg-white rounded-lg p-4" />
        <p class="mt-2 font-bold">Claude Code</p>
      </div>
    </div>
    
    <div v-click class="bg-code-background p-6 rounded-lg border border-code-border max-w-2xl mx-auto">
      <h3 class="text-xl font-bold mb-4 text-accent-yellow">Natural Language → Video Changes</h3>
      <div class="text-left space-y-2">
        <p><span class="text-accent-blue">"make it bigger"</span> → logo size adjustment</p>
        <p><span class="text-accent-blue">"a little slower"</span> → timing refinement</p>
        <p><span class="text-accent-blue">"sorry it should count up from 90%"</span> → instant fix</p>
      </div>
    </div>
    
    <p v-click class="mt-8 text-xl text-accent-teal">
      Conversational development for visual creation
    </p>
  </div>
</div>

---
layout: default
---

# Real Results: What You Can Build

<div class="grid grid-cols-2 gap-6">
  <div v-click class="bg-code-background p-4 rounded-lg border border-code-border">
    <h3 class="font-bold mb-2 text-accent-blue">Product Demos</h3>
    <img src="/specstory-demo.jpg" class="w-full rounded" />
    <p class="text-sm mt-2">SpecStory hero video - 39 seconds, 2 hours</p>
  </div>
  
  <div v-click class="bg-code-background p-4 rounded-lg border border-code-border">
    <h3 class="font-bold mb-2 text-accent-teal">SaaS Intros</h3>
    <div class="bg-vulcan h-32 rounded flex items-center justify-center text-gray-500">Typeframes Screenshot</div>
    <p class="text-sm mt-2">Typeframes - Text to video at scale</p>
  </div>
  
  <div v-click class="bg-code-background p-4 rounded-lg border border-code-border">
    <h3 class="font-bold mb-2 text-accent-yellow">Music Visualizations</h3>
    <div class="bg-vulcan h-32 rounded flex items-center justify-center text-gray-500">Music Visualization</div>
    <p class="text-sm mt-2">Dynamic audio-reactive animations</p>
  </div>
  
  <div v-click class="bg-code-background p-4 rounded-lg border border-code-border">
    <h3 class="font-bold mb-2 text-accent-red">Personalized at Scale</h3>
    <div class="bg-vulcan h-32 rounded flex items-center justify-center text-gray-500">Personalized Video</div>
    <p class="text-sm mt-2">1000s of variants from one template</p>
  </div>
</div>

<p v-click class="text-center mt-8 text-xl font-bold text-accent-teal">
  From 0 to shipped in hours, not weeks
</p>

---
layout: default
---

# Core Remotion Concepts

<div class="bg-code-background p-6 rounded-lg border border-code-border">
  ```jsx
  // 1. Composition - Your video container
  <Composition
    id="HeroVideo"
    component={HeroAnimation}
    durationInFrames={1170}  // 39 seconds at 30fps
    fps={30}
    width={1920}
    height={1080}
  />
  
  // 2. Hooks - Access time information
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  
  // 3. Sequences - Organize your scenes
  <Series>
    <Series.Sequence durationInFrames={150}>
      <VideoIntro />
    </Series.Sequence>
    <Series.Sequence durationInFrames={120}>
      <TimeTransition />
    </Series.Sequence>
  </Series>
  ```
</div>

<p v-click class="text-center mt-8 text-xl text-accent-yellow">
  Think components, not keyframes
</p>

<!--
Interactive slide - go through each concept
Show how familiar React patterns apply to video
-->

---
layout: default
---

# The Development Experience

<div class="grid grid-cols-2 gap-8">
  <div>
    <h2 class="mb-6 text-accent-blue">Remotion Studio</h2>
    
    <div v-click class="mb-4">
      <span class="text-accent-teal text-xl">✅</span> <strong>Hot reload your video</strong>
      <p class="text-sm opacity-70 ml-7">Change code → See video update instantly</p>
    </div>

    <div v-click class="mb-4">
      <span class="text-accent-teal text-xl">✅</span> <strong>React DevTools</strong>
      <p class="text-sm opacity-70 ml-7">Debug frames like components</p>
    </div>

    <div v-click class="mb-4">
      <span class="text-accent-teal text-xl">✅</span> <strong>Version control</strong>
      <p class="text-sm opacity-70 ml-7">Git for your videos</p>
    </div>

    <div v-click class="mb-4">
      <span class="text-accent-teal text-xl">✅</span> <strong>No render queues</strong>
      <p class="text-sm opacity-70 ml-7">See changes immediately</p>
    </div>
  </div>
  
  <div v-click class="flex items-center">
    <div class="bg-code-background p-6 rounded-lg border border-code-border">
      <h3 class="text-xl font-bold mb-4 text-accent-yellow">Remotion Studio</h3>
      <p class="text-sm">
        A browser-based development environment where your video updates in real-time as you code.
      </p>
      <p class="text-sm mt-4 text-accent-blue">
        Think of it as localhost:3000 but for videos.
      </p>
    </div>
  </div>
</div>

<p v-click class="text-center mt-8 text-lg font-bold text-accent-teal">
  It's just like building a website
</p>

---
layout: center
---

# Getting Started in 3 Commands

<div class="text-center">
  <div class="bg-code-background p-8 rounded-lg border border-code-border text-2xl inline-block">
    ```bash
    npm init video
    npm start
    # Start building! 🚀
    ```
  </div>
  
  <p v-click class="mt-12 text-3xl font-bold text-accent-yellow">
    You're 3 commands away from your first video
  </p>
  
  <div v-click class="mt-8 grid grid-cols-2 gap-4 max-w-2xl mx-auto">
    <div class="bg-code-background p-4 rounded border border-code-border">
      <p class="font-bold text-accent-teal">Required:</p>
      <p>Basic React knowledge</p>
    </div>
    <div class="bg-code-background p-4 rounded border border-code-border">
      <p class="font-bold text-accent-red">Not Required:</p>
      <p>Video editing experience</p>
    </div>
  </div>
</div>

---
layout: center
---

# Let's Build Something Together!

<div class="text-center">
  <h2 class="text-3xl mb-8 text-accent-teal">Live Demo Time 🎬</h2>
  
  <div class="bg-code-background p-6 rounded-lg border border-code-border max-w-2xl mx-auto mb-8">
    <p class="text-xl mb-4">We'll make a simple change together:</p>
    <p class="text-2xl font-mono text-accent-blue">"make the logo bigger"</p>
  </div>
  
  <div v-click class="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
    <div class="bg-code-background p-4 rounded border border-code-border">
      <p class="font-bold mb-2 text-accent-yellow">GitHub Repo</p>
      <div class="w-32 h-32 mx-auto bg-white rounded flex items-center justify-center text-black font-mono text-xs">QR Code</div>
      <p class="text-xs mt-2">zero-to-product-video-hero</p>
    </div>
    <div class="bg-code-background p-4 rounded border border-code-border">
      <p class="font-bold mb-2 text-accent-yellow">Full Article</p>
      <div class="w-32 h-32 mx-auto bg-white rounded flex items-center justify-center text-black font-mono text-xs">QR Code</div>
      <p class="text-xs mt-2">gregceccarelli.com</p>
    </div>
  </div>
</div>

<!--
Transition to live coding
QR codes for instant access
Get everyone ready to code along
-->

---
layout: center
---

# Resources & Next Steps

<div class="max-w-3xl mx-auto">
  <div class="grid grid-cols-3 gap-6 mb-8">
    <div v-click class="bg-code-background p-6 rounded-lg border border-code-border">
      <div class="text-4xl mb-4">📚</div>
      <h3 class="font-bold mb-2 text-accent-blue">Learn</h3>
      <p class="text-sm">remotion.dev/docs</p>
    </div>
    <div v-click class="bg-code-background p-6 rounded-lg border border-code-border">
      <div class="text-4xl mb-4">🛠</div>
      <h3 class="font-bold mb-2 text-accent-yellow">Build</h3>
      <p class="text-sm">Claude Code + Remotion</p>
    </div>
    <div v-click class="bg-code-background p-6 rounded-lg border border-code-border">
      <div class="text-4xl mb-4">🚀</div>
      <h3 class="font-bold mb-2 text-accent-teal">Ship</h3>
      <p class="text-sm">Your first video this week</p>
    </div>
  </div>
  
  <div v-click class="bg-code-background p-6 rounded-lg border border-code-border">
    <h3 class="text-2xl font-bold mb-4 text-accent-yellow">What's Next in 2025?</h3>
    <p>Claude Opus 4 • Veo 3 • Sora • Even better tools</p>
    <p class="mt-4 text-xl font-bold text-accent-teal">The tools are only getting better</p>
  </div>
  
  <p v-click class="mt-8 text-3xl font-bold text-accent-teal text-center">
    Build your first video this week! 🎬
  </p>
</div>

---
layout: end
class: text-center
---

# Thank You!

<div class="text-center">
  <p class="text-2xl mb-8 text-accent-yellow">Questions? Let's discuss!</p>
  
  <div class="flex justify-center space-x-8">
    <div>
      <p class="font-bold text-accent-blue">GitHub</p>
      <p>@specstoryai</p>
    </div>
    <div>
      <p class="font-bold text-accent-teal">Website</p>
      <p>gregceccarelli.com</p>
    </div>
  </div>
</div>