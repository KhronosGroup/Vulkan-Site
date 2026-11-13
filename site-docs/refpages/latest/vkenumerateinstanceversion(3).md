# vkEnumerateInstanceVersion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumerateInstanceVersion.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumerateInstanceVersion - Query instance-level version before instance creation

To query the version of instance-level functionality supported by the
implementation, call:

// Provided by VK_VERSION_1_1
VkResult vkEnumerateInstanceVersion(
    uint32_t*                                   pApiVersion);

* 
`pApiVersion` is a pointer to a `uint32_t`, which is the version
of Vulkan supported by instance-level functionality, encoded as
described in [Version Numbers](../../../../spec/latest/chapters/extensions.html#extendingvulkan-coreversions-versionnumbers).

|  | The intended behavior of [vkEnumerateInstanceVersion](#) is that an
| --- | --- |
implementation **should** not need to perform memory allocations and **should**
unconditionally return [VK_SUCCESS](VkResult.html).
The loader, and any enabled layers, **may** return
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html) in the case of a failed memory allocation. |

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateInstanceVersion-pApiVersion-parameter) VUID-vkEnumerateInstanceVersion-pApiVersion-parameter

 `pApiVersion` **must** be a valid pointer to a `uint32_t` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_1](VK_VERSION_1_1.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#vkEnumerateInstanceVersion).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
