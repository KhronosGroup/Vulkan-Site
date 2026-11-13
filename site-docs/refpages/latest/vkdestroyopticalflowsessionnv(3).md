# vkDestroyOpticalFlowSessionNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyOpticalFlowSessionNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyOpticalFlowSessionNV - Destroy optical flow session object

To destroy an optical flow session object, call:

// Provided by VK_NV_optical_flow
void vkDestroyOpticalFlowSessionNV(
    VkDevice                                    device,
    VkOpticalFlowSessionNV                      session,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the device that was used for the creation of the optical
flow session.

* 
`session` is the optical flow session to be destroyed.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-device-parameter) VUID-vkDestroyOpticalFlowSessionNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-session-parameter) VUID-vkDestroyOpticalFlowSessionNV-session-parameter

 `session` **must** be a valid [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html) handle

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-pAllocator-parameter) VUID-vkDestroyOpticalFlowSessionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-session-parent) VUID-vkDestroyOpticalFlowSessionNV-session-parent

 `session` **must** have been created, allocated, or retrieved from `device`

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#vkDestroyOpticalFlowSessionNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
