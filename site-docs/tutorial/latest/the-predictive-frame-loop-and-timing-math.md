# The Predictive Frame Loop and Timing Math

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/05_Predictive_Frame_Loop/01_introduction.html

## Table of Contents

- [The Rhythm of Spatial Computing](#_the_rhythm_of_spatial_computing)
- [The_Rhythm_of_Spatial_Computing](#_the_rhythm_of_spatial_computing)
- [Why Timing Math Matters](#_why_timing_math_matters)
- [Why_Timing_Math_Matters](#_why_timing_math_matters)

## Content

In a traditional desktop application, the engine’s main loop is often governed by simple vertical synchronization (**VSync**). We render as fast as possible, and the monitor displays the result when its scanline allows. However, in spatial computing, this "render and display" model is insufficient. If the user’s head moves even slightly between the time we start rendering and the time the photons hit their retinas, the scene will appear to swim or lag, causing immediate discomfort or motion sickness.

To solve this, OpenXR uses a **Predictive Frame Loop**. Instead of rendering the **current** state of the world, we render what the world **will** look like when the display actually strobes.

The OpenXR frame loop is a conversation between our engine and the XR runtime. It’s not just about when to draw; it’s about predicting the future. This conversation is built on three pillars:

**Strict Pacing**: The runtime dictates the exact heartbeat of the application via `xrWaitFrame`. This is not just a frame limit; it’s a synchronization point that aligns our engine with the display’s actual refresh cycle.

**Predicted Display Time**: Every frame we process comes with a `predictedDisplayTime`. This is the most important number in our engine. It tells us exactly when the user will see the frame we are currently building.

**Simulation Alignment**: We must use this predicted time to advance our physics, animations, and—most crucially—our head tracking. We don’t ask where the head **is**; we ask where the head **will be** at `predictedDisplayTime`.

In this chapter, we will transition our engine’s main loop from its legacy `glfwWindowShouldClose` logic to the OpenXR frame lifecycle. We will learn how to:

* 
Synchronize our CPU and GPU work with the XR runtime’s heartbeat.

* 
Utilize predicted timing data to calculate accurate view and projection matrices.

* 
Understand the "Swim" effect and how predictive math eliminates it.

By the end of this chapter, your engine will no longer be "reacting" to user movement; it will be "anticipating" it, providing the smooth, low-latency experience that defines high-quality spatial computing.

[Previous](../04_Dynamic_Rendering/04_incorporating_into_the_engine.html) | [Next](02_xr_lifecycle.html)
