# vkSetLocalDimmingAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetLocalDimmingAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetLocalDimmingAMD - Set Local Dimming

The local dimming HDR setting may also be changed over the life of a
swapchain by calling:

// Provided by VK_AMD_display_native_hdr
void vkSetLocalDimmingAMD(
    VkDevice                                    device,
    VkSwapchainKHR                              swapChain,
    VkBool32                                    localDimmingEnable);

* 
`device` is the device associated with `swapChain`.

* 
`swapChain` handle to enable local dimming.

* 
`localDimmingEnable` specifies whether local dimming is enabled for
the swapchain.

Valid Usage (Implicit)

* 
[](#VUID-vkSetLocalDimmingAMD-device-parameter) VUID-vkSetLocalDimmingAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetLocalDimmingAMD-swapChain-parameter) VUID-vkSetLocalDimmingAMD-swapChain-parameter

 `swapChain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkSetLocalDimmingAMD-swapChain-parent) VUID-vkSetLocalDimmingAMD-swapChain-parent

 `swapChain` **must** have been created, allocated, or retrieved from `device`

Valid Usage

* 
[](#VUID-vkSetLocalDimmingAMD-localDimmingSupport-04618) VUID-vkSetLocalDimmingAMD-localDimmingSupport-04618

[VkDisplayNativeHdrSurfaceCapabilitiesAMD](VkDisplayNativeHdrSurfaceCapabilitiesAMD.html)::`localDimmingSupport`
**must** be supported

[VK_AMD_display_native_hdr](VK_AMD_display_native_hdr.html), `VkBool32`, [VkDevice](VkDevice.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkSetLocalDimmingAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
