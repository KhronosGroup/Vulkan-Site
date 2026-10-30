# Dynamic Rendering for Spatial Views

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/04_Dynamic_Rendering/01_introduction.html

## Table of Contents

- [Why Leverage Dynamic Rendering for XR?](#_why_leverage_dynamic_rendering_for_xr)
- [Why_Leverage_Dynamic_Rendering_for_XR?](#_why_leverage_dynamic_rendering_for_xr)

## Content

In our journey to integrate OpenXR with Vulkan 1.3, we have established a robust handshake and learned how to manage images that are actually owned by the XR runtime. However, having the images is only half the battle. We now need to render our stereo views into them. In our previous engine building series, we adopted **Dynamic Rendering** (via `VK_KHR_dynamic_rendering`) as our primary rendering path. Now, we’ll see why that decision was so critical for spatial computing.

For spatial computing, the dynamic rendering system we’ve already built offers three major advantages that a legacy render pass pipeline would struggle with:

**Reduced Submission Latency**: Since we’ve already bypassed the need for complex render pass and framebuffer objects, we can more quickly translate our view matrices (which we’ll predict in the next chapter) into command buffer submissions.

**Adaptive Viewports**: XR headsets often use asymmetric projections and non-parallel views. Our dynamic rendering path makes it trivial to reconfigure viewport and scissor states for each eye without needing to match them to a predefined static structure.

**Multiview Integration**: When we move to `VK_KHR_multiview` for single-pass stereo rendering, our existing dynamic rendering logic integrates seamlessly, allowing us to specify a `viewMask` directly in our `vk::RenderingInfo`.

In this chapter, we will apply our engine’s rendering logic to the unique requirements of spatial displays. We’ll start by looking at how to bind our XR swapchain images directly to our rendering session and then move on to managing the complex viewports required by modern headsets.

[Previous](../03_Runtime_Owned_Swapchains/05_incorporating_into_the_engine.html) | [Next](02_rendering_to_spatial_swapchains.html)
