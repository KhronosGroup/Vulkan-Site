# vkCreateOpticalFlowSessionNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateOpticalFlowSessionNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateOpticalFlowSessionNV - Creates an optical flow session object

To create an optical flow session object, call:

// Provided by VK_NV_optical_flow
VkResult vkCreateOpticalFlowSessionNV(
    VkDevice                                    device,
    const VkOpticalFlowSessionCreateInfoNV*     pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkOpticalFlowSessionNV*                     pSession);

* 
`device` is the logical device that creates the optical flow session
object.

* 
`pCreateInfo` is a pointer to a
[VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html) structure containing parameters
specifying the creation of the optical flow session.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pSession` is a pointer to a [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html) handle
specifying the optical flow session object which will be created by this
function when it returns [VK_SUCCESS](VkResult.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateOpticalFlowSessionNV-device-parameter) VUID-vkCreateOpticalFlowSessionNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateOpticalFlowSessionNV-pCreateInfo-parameter) VUID-vkCreateOpticalFlowSessionNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html) structure

* 
[](#VUID-vkCreateOpticalFlowSessionNV-pAllocator-parameter) VUID-vkCreateOpticalFlowSessionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateOpticalFlowSessionNV-pSession-parameter) VUID-vkCreateOpticalFlowSessionNV-pSession-parameter

 `pSession` **must** be a valid pointer to a [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html) handle

* 
[](#VUID-vkCreateOpticalFlowSessionNV-device-queuecount) VUID-vkCreateOpticalFlowSessionNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html), [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#vkCreateOpticalFlowSessionNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
