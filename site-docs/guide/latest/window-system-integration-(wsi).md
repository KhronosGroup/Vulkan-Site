# Window System Integration (WSI)

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/wsi.html

## Table of Contents

- [Surface](#_surface)
- [Swapchain](#_swapchain)
- [Pre-Rotation](#_pre_rotation)

## Content

Since the Vulkan API can be used without displaying results, WSI is provided through the use of [optional Vulkan extensions](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html). Most implementations will include WSI support. The WSI design was created to abstract each platform’s windowing mechanism from the core Vulkan API.

![wsi_setup](_images/wsi_setup.png)

The `VkSurfaceKHR` object is platform agnostic and designed so the rest of the Vulkan API can use it for all WSI operations. It is enabled using the `VK_KHR_surface` extension.

Each platform that supports a Vulkan Surface has its own way to create a `VkSurfaceKHR` object from its respective platform-specific API.

* 
Android - [vkCreateAndroidSurfaceKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateAndroidSurfaceKHR)

* 
DirectFB - [vkCreateDirectFBSurfaceEXT](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateDirectFBSurfaceEXT)

* 
Fuchsia - [vkCreateImagePipeSurfaceFUCHSIA](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateImagePipeSurfaceFUCHSIA)

* 
iOS - [vkCreateIOSSurfaceMVK](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateIOSSurfaceMVK)

* 
macOS - [vkCreateMacOSSurfaceMVK](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateMacOSSurfaceMVK)

* 
Metal - [vkCreateMetalSurfaceEXT](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateMetalSurfaceEXT)

* 
VI - [vkCreateViSurfaceNN](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateViSurfaceNN)

* 
Wayland - [vkWaylandSurfaceCreateInfoKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkWaylandSurfaceCreateInfoKHR)

* 
QNX - [vkCreateScreenSurfaceQNX](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCreateScreenSurfaceQNX.html)

* 
Windows - [vkCreateWin32SurfaceKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateWin32SurfaceKHR)

* 
XCB - [vkCreateXcbSurfaceKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateXcbSurfaceKHR)

* 
Xlib - [vkCreateXlibSurfaceKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateXlibSurfaceKHR)

* 
Direct-to-Display - [vkCreateDisplayPlaneSurfaceKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateDisplayPlaneSurfaceKHR)

Once a `VkSurfaceKHR` is created there are various [capabilities](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceCapabilitiesKHR), [formats](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceFormatsKHR), and [presentation modes](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfacePresentModesKHR) to query for.

The `VkSwapchainKHR` object provides the ability to present rendering results to a surface through an array of `VkImage` objects. The swapchain’s various [present modes](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentModeKHR) determine how the presentation engine is implemented.

![wsi_engine](_images/wsi_engine.png)

Khronos' [sample and tutorial](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/performance/swapchain_images) explain different considerations to make when creating a swapchain and selecting a presentation mode.

Mobile devices can be rotated, therefore the logical orientation of the application window and the physical orientation of the display may not match. Applications need to be able to operate in two modes: `portrait` and `landscape`. The difference between these two modes can be simplified to just a change in resolution. However, some display subsystems always work on the “native” (or “physical”) orientation of the display panel. Since the device has been rotated, to achieve the desired effect the application output must also rotate.

In order for your application to get the most out of Vulkan on mobile platforms, such as Android, implementing pre-rotation is a must. There is a [detailed blog post from Google](https://android-developers.googleblog.com/2020/02/handling-device-orientation-efficiently.html?m=1) that goes over how to handle the surface rotation by specifying the orientation during swapchain creation and also comes with a [standalone example](https://github.com/google/vulkan-pre-rotation-demo). The [Vulkan-Samples](https://github.com/KhronosGroup/Vulkan-Samples) also has both a [great write up](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/performance/surface_rotation) of why pre-rotation is a problem as well as [a sample to run](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/performance/surface_rotation) that shows a way to solve it in the shader. If using an Adreno GPU powered device, Qualcomm suggests making use of the [VK_QCOM_render_pass_transform](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_QCOM_render_pass_transform.html) extension to implement pre-rotation.
