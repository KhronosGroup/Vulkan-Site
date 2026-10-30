# vkGetPhysicalDeviceCooperativeMatrixProperties2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceCooperativeMatrixProperties2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceCooperativeMatrixProperties2EXT - Returns properties describing what cooperative matrix types are supported

To enumerate the supported cooperative matrix types and operations, call:

// Provided by VK_EXT_cooperative_matrix_maintenance1
VkResult vkGetPhysicalDeviceCooperativeMatrixProperties2EXT(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceCooperativeMatrixInfo2EXT* pCooperativeMatrixInfo,
    uint32_t*                                   pPropertyCount,
    VkCooperativeMatrixProperties2EXT*          pProperties);

* 
`physicalDevice` is the physical device.

* 
`pCooperativeMatrixInfo` is a pointer to a
[VkPhysicalDeviceCooperativeMatrixInfo2EXT](VkPhysicalDeviceCooperativeMatrixInfo2EXT.html) structure describing
which cooperative matrix properties to query.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative matrix properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeMatrixProperties2EXT](VkCooperativeMatrixProperties2EXT.html) structures.

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

The implementation **must** not return `pPropertyCount` equal to `0` for
the following parameters, when
[VkPhysicalDeviceCooperativeMatrixInfo2EXT](VkPhysicalDeviceCooperativeMatrixInfo2EXT.html)::`flags` does not
contain [VK_COOPERATIVE_MATRIX_SATURATING_ACCUMULATION_BIT_EXT](VkCooperativeMatrixFlagBitsEXT.html):

* 
`scope` equals [VK_SCOPE_SUBGROUP_KHR](VkScopeKHR.html) and `subgroupSize` is
`0`

* 
`scope` equals [VK_SCOPE_SUBGROUP_KHR](VkScopeKHR.html) and `subgroupSize` is
equal to [VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)::`subgroupSize`

* 
if the [](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixWorkgroupScope)[VkPhysicalDeviceCooperativeMatrix2FeaturesNV](VkPhysicalDeviceCooperativeMatrix2FeaturesNV.html)::`cooperativeMatrixWorkgroupScope`
feature is supported: `scope` equals [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html),
`invocations` is any power of two between
[VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)::`subgroupSize` and
[    `cooperativeMatrixWorkgroupScopeMaxWorkgroupSize`](../../../../spec/latest/chapters/limits.html#limits-cooperativeMatrixWorkgroupScopeMaxWorkgroupSize) inclusive, and
`subgroupSize` is either `0` or equal to
[VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)::`subgroupSize`

For each of the above required parameters, at least one property **must** be
returned for each of the following combinations of component types:

* 
`AType` and `BType` are [VK_COMPONENT_TYPE_FLOAT16_KHR](VkComponentTypeKHR.html),
`CType` and `ResultType` are either both
[VK_COMPONENT_TYPE_FLOAT16_KHR](VkComponentTypeKHR.html) or both
[VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html)

* 
`AType` and `BType` are [VK_COMPONENT_TYPE_UINT8_KHR](VkComponentTypeKHR.html),
`CType` and `ResultType` are either both
[VK_COMPONENT_TYPE_UINT32_KHR](VkComponentTypeKHR.html) or both
[VK_COMPONENT_TYPE_SINT32_KHR](VkComponentTypeKHR.html)

* 
`AType` and `BType` are [VK_COMPONENT_TYPE_SINT8_KHR](VkComponentTypeKHR.html),
`CType` and `ResultType` are [VK_COMPONENT_TYPE_SINT32_KHR](VkComponentTypeKHR.html)

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-cooperativeMatrixProperties2-13371) VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-cooperativeMatrixProperties2-13371

The
[`cooperativeMatrixProperties2`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixProperties2EXT)
feature **must** be supported by `physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-pCooperativeMatrixInfo-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-pCooperativeMatrixInfo-parameter

 `pCooperativeMatrixInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceCooperativeMatrixInfo2EXT](VkPhysicalDeviceCooperativeMatrixInfo2EXT.html) structure

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixProperties2EXT-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeMatrixProperties2EXT](VkCooperativeMatrixProperties2EXT.html) structures

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

[VK_EXT_cooperative_matrix_maintenance1](VK_EXT_cooperative_matrix_maintenance1.html), [VkCooperativeMatrixProperties2EXT](VkCooperativeMatrixProperties2EXT.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceCooperativeMatrixInfo2EXT](VkPhysicalDeviceCooperativeMatrixInfo2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeMatrixProperties2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
