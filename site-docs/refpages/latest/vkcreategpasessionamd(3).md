# vkCreateGpaSessionAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateGpaSessionAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateGpaSessionAMD - Create a new GPA session object

To create a GPA session object, call:

// Provided by VK_AMD_gpa_interface
VkResult vkCreateGpaSessionAMD(
    VkDevice                                    device,
    const VkGpaSessionCreateInfoAMD*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkGpaSessionAMD*                            pGpaSession);

* 
`device` is the logical device that creates the GPA session object.

* 
`pCreateInfo` is a pointer to a [VkGpaSessionCreateInfoAMD](VkGpaSessionCreateInfoAMD.html)
structure containing information about how the GPA session object is to
be created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pGpaSession` is a pointer to a handle in which the resulting GPA
session object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateGpaSessionAMD-device-parameter) VUID-vkCreateGpaSessionAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateGpaSessionAMD-pCreateInfo-parameter) VUID-vkCreateGpaSessionAMD-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkGpaSessionCreateInfoAMD](VkGpaSessionCreateInfoAMD.html) structure

* 
[](#VUID-vkCreateGpaSessionAMD-pAllocator-parameter) VUID-vkCreateGpaSessionAMD-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateGpaSessionAMD-pGpaSession-parameter) VUID-vkCreateGpaSessionAMD-pGpaSession-parameter

 `pGpaSession` **must** be a valid pointer to a [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkCreateGpaSessionAMD-device-queuecount) VUID-vkCreateGpaSessionAMD-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkGpaSessionAMD](VkGpaSessionAMD.html), [VkGpaSessionCreateInfoAMD](VkGpaSessionCreateInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkCreateGpaSessionAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
