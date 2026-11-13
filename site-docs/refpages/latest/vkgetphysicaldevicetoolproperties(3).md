# vkGetPhysicalDeviceToolProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceToolProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceToolProperties - Reports properties of tools active on the specified physical device

Information about tools providing debugging, profiling, or similar services,
active for a given physical device, can be obtained by calling:

// Provided by VK_VERSION_1_3
VkResult vkGetPhysicalDeviceToolProperties(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pToolCount,
    VkPhysicalDeviceToolProperties*             pToolProperties);

// Provided by VK_EXT_tooling_info
// Equivalent to vkGetPhysicalDeviceToolProperties
VkResult vkGetPhysicalDeviceToolPropertiesEXT(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pToolCount,
    VkPhysicalDeviceToolProperties*             pToolProperties);

* 
`physicalDevice` is the handle to the physical device to query for
active tools.

* 
`pToolCount` is a pointer to an integer describing the number of
tools active on `physicalDevice`.

* 
`pToolProperties` is either `NULL` or a pointer to an array of
[VkPhysicalDeviceToolProperties](VkPhysicalDeviceToolProperties.html) structures.

If `pToolProperties` is `NULL`, then the number of tools currently
active on `physicalDevice` is returned in `pToolCount`.
Otherwise, `pToolCount` **must** point to a variable set by the application
to the number of elements in the `pToolProperties` array, and on return
the variable is overwritten with the number of structures actually written
to `pToolProperties`.
If `pToolCount` is less than the number of currently active tools, at
most `pToolCount` structures will be written.

The count and properties of active tools **may** change in response to events
outside the scope of the specification.
An application **should** assume these properties might change at any given
time.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceToolProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceToolProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceToolProperties-pToolCount-parameter) VUID-vkGetPhysicalDeviceToolProperties-pToolCount-parameter

 `pToolCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceToolProperties-pToolProperties-parameter) VUID-vkGetPhysicalDeviceToolProperties-pToolProperties-parameter

 If the value referenced by `pToolCount` is not `0`, and `pToolProperties` is not `NULL`, `pToolProperties` **must** be a valid pointer to an array of `pToolCount` [VkPhysicalDeviceToolProperties](VkPhysicalDeviceToolProperties.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_tooling_info](VK_EXT_tooling_info.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceToolProperties](VkPhysicalDeviceToolProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkGetPhysicalDeviceToolProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
