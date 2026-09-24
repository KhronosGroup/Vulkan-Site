# vkGetPhysicalDeviceCooperativeVectorPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceCooperativeVectorPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceCooperativeVectorPropertiesNV - Returns properties describing what cooperative vector types are supported

To enumerate the supported cooperative vector type combinations, call:

// Provided by VK_NV_cooperative_vector
VkResult vkGetPhysicalDeviceCooperativeVectorPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkCooperativeVectorPropertiesNV*            pProperties);

* 
`physicalDevice` is the physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative vector properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html) structures.

If `pProperties` is `NULL`, then the number of cooperative vector
properties available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the user to
the number of elements in the `pProperties` array, and on return the
variable is overwritten with the number of structures actually written to
`pProperties`.
If `pPropertyCount` is less than the number of cooperative vector
properties available, at most `pPropertyCount` structures will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available cooperative vector
properties were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

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

[VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeVectorPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
