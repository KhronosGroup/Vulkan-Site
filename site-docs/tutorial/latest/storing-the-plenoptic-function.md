# Storing the Plenoptic Function

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/14_LightField_Theory/01_introduction.html

## Content

To truly understand the future of spatial computing, we have to move beyond the idea of a simple "camera" looking at a "scene." In traditional rendering, we calculate the color of a pixel based on a single ray from the eye through a point on the image plane. But what if we could capture **all** the light flowing through a volume of space? This is the core of **Plenoptic** theory—from the Latin **plenus** (full) and the Greek **optikos** (of or relating to sight).

At its most fundamental level, the **Plenoptic Function** is a seven-dimensional (7D) description of every possible light ray in the universe. It describes the intensity of light at any position   , from any direction   , at any wavelength   , at any point in time   . While this is a beautiful mathematical construct, rendering or storing a 7D function is computationally impossible for real-time systems.

In this chapter, we are going to explore how we can simplify this monster into a manageable four-dimensional (4D) representation that we can actually store in Vulkan buffers. By assuming that light travels in straight lines through free space (the "Free Space Assumption"), and focusing on a static moment in time with a fixed set of colors, we can reduce our 7D function into a **4D LightField**.

This 4D LightField is the "Holy Grail" for high-end spatial displays. It allows us to render holographic images where your eyes can naturally focus at different depths (solving the Vergence-Accommodation Conflict, or **VAC**) and see different perspectives as you move your head, all without the need for expensive per-eye re-rendering. We will look at how to define these rays using the classic "Two-Plane Parametrization"—the **ST plane** (spatial position) and the **UV plane** (directional orientation)—and how to map this mathematical grid into a high-performance memory layout for the engine.

[Previous](../13_Warp_and_Blend/04_incorporating_into_the_engine.html) | [Next](02_4d_lightfield_representation.html)
