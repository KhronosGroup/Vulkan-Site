# vkCreateCuFunctionNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateCuFunctionNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateCuFunctionNVX - Stub description of vkCreateCuFunctionNVX

There is currently no specification language written for this command.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
VkResult vkCreateCuFunctionNVX(
    VkDevice                                    device,
    const VkCuFunctionCreateInfoNVX*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCuFunctionNVX*                            pFunction);

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCuFunctionNVX-device-parameter) VUID-vkCreateCuFunctionNVX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateCuFunctionNVX-pCreateInfo-parameter) VUID-vkCreateCuFunctionNVX-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCuFunctionCreateInfoNVX](VkCuFunctionCreateInfoNVX.html) structure

* 
[](#VUID-vkCreateCuFunctionNVX-pAllocator-parameter) VUID-vkCreateCuFunctionNVX-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateCuFunctionNVX-pFunction-parameter) VUID-vkCreateCuFunctionNVX-pFunction-parameter

 `pFunction` **must** be a valid pointer to a [VkCuFunctionNVX](VkCuFunctionNVX.html) handle

* 
[](#VUID-vkCreateCuFunctionNVX-device-queuecount) VUID-vkCreateCuFunctionNVX-device-queuecount

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

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCuFunctionCreateInfoNVX](VkCuFunctionCreateInfoNVX.html), [VkCuFunctionNVX](VkCuFunctionNVX.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkCreateCuFunctionNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
