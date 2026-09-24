# vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV - Returns properties describing what cooperative matrix types are supported

To enumerate additional supported cooperative matrix types and operations,
call:

// Provided by VK_NV_cooperative_matrix2
VkResult vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkCooperativeMatrixFlexibleDimensionsPropertiesNV* pProperties);

* 
`physicalDevice` is the physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative matrix properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html) structures.

If `pProperties` is `NULL`, then the number of flexible dimensions
properties available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number flexible dimensions
properties available, at most `pPropertyCount` structures will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available flexible dimensions
properties were returned.

If the
[`cooperativeMatrixFlexibleDimensions`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixFlexibleDimensions)
feature is not supported, the implementation **must** advertise zero
properties.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html) structures

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

[VK_NV_cooperative_matrix2](VK_NV_cooperative_matrix2.html), [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
