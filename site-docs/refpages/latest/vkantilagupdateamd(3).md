# vkAntiLagUpdateAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAntiLagUpdateAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAntiLagUpdateAMD - Provide information to reduce latency

To lower latency, call:

// Provided by VK_AMD_anti_lag
void vkAntiLagUpdateAMD(
    VkDevice                                    device,
    const VkAntiLagDataAMD*                     pData);

* 
`device` is the logical device

* 
`pData` is a pointer to a [VkAntiLagDataAMD](VkAntiLagDataAMD.html) structure
containing latency reduction parameters.

This command should be executed immediately before the application processes
user input.
If `pData` is not `NULL` and
[VkAntiLagDataAMD](VkAntiLagDataAMD.html)::`pPresentationInfo` is not `NULL`, this command
**should** be executed again before [vkQueuePresentKHR](vkQueuePresentKHR.html), with
`pPresentationInfo` set to matching values.

Valid Usage

* 
[](#VUID-vkAntiLagUpdateAMD-antiLag-10061) VUID-vkAntiLagUpdateAMD-antiLag-10061

The [`antiLag`](../../../../spec/latest/chapters/features.html#features-antiLag) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkAntiLagUpdateAMD-device-parameter) VUID-vkAntiLagUpdateAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAntiLagUpdateAMD-pData-parameter) VUID-vkAntiLagUpdateAMD-pData-parameter

 `pData` **must** be a valid pointer to a valid [VkAntiLagDataAMD](VkAntiLagDataAMD.html) structure

[VK_AMD_anti_lag](VK_AMD_anti_lag.html), [VkAntiLagDataAMD](VkAntiLagDataAMD.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkAntiLagUpdateAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
