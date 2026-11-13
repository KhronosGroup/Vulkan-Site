# vkGetPhysicalDeviceCooperativeMatrixPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceCooperativeMatrixPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceCooperativeMatrixPropertiesNV - Returns properties describing what cooperative matrix types are supported

To enumerate the supported cooperative matrix types and operations, call:

// Provided by VK_NV_cooperative_matrix
VkResult vkGetPhysicalDeviceCooperativeMatrixPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkCooperativeMatrixPropertiesNV*            pProperties);

* 
`physicalDevice` is the physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative matrix properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html) structures.

If `pProperties` is `NULL`, then the number of cooperative matrix
properties available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of cooperative matrix
properties available, at most `pPropertyCount` structures will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available cooperative matrix
properties were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html) structures

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

[VK_NV_cooperative_matrix](VK_NV_cooperative_matrix.html), [VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeMatrixPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
