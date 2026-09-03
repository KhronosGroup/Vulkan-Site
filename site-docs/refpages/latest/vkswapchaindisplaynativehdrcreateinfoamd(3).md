# VkSwapchainDisplayNativeHdrCreateInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainDisplayNativeHdrCreateInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainDisplayNativeHdrCreateInfoAMD - Structure specifying display native HDR parameters of a newly created swapchain object

If the `pNext` chain of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) includes a
`VkSwapchainDisplayNativeHdrCreateInfoAMD` structure, then that
structure includes additional swapchain creation parameters specific to
display native HDR support.

The `VkSwapchainDisplayNativeHdrCreateInfoAMD` structure is defined as:

// Provided by VK_AMD_display_native_hdr
typedef struct VkSwapchainDisplayNativeHdrCreateInfoAMD {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           localDimmingEnable;
} VkSwapchainDisplayNativeHdrCreateInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`localDimmingEnable` specifies whether local dimming is enabled for
the swapchain.

If the `pNext` chain of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) does not include
this structure, the default value for `localDimmingEnable` is
[VK_TRUE](VK_TRUE.html), meaning local dimming is initially enabled for the swapchain.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-sType-sType) VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_DISPLAY_NATIVE_HDR_CREATE_INFO_AMD](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

Valid Usage

* 
[](#VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-localDimmingEnable-04449) VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-localDimmingEnable-04449

It is only valid to set `localDimmingEnable` to [VK_TRUE](VK_TRUE.html) if
[VkDisplayNativeHdrSurfaceCapabilitiesAMD](VkDisplayNativeHdrSurfaceCapabilitiesAMD.html)::`localDimmingSupport`
is supported

[VK_AMD_display_native_hdr](VK_AMD_display_native_hdr.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainDisplayNativeHdrCreateInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
