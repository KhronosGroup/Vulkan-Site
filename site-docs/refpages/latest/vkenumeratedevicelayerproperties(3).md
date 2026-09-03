# vkEnumerateDeviceLayerProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumerateDeviceLayerProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumerateDeviceLayerProperties - Returns properties of available physical device layers

To enumerate device layers, call:

|  | This functionality is superseded by [Vulkan Version 1.0](../../../../spec/latest/appendices/versions.html#versions-1.0). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-devicelayers) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkEnumerateDeviceLayerProperties(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkLayerProperties*                          pProperties);

* 
`physicalDevice` is the physical device that will be queried.

* 
`pPropertyCount` is a pointer to an integer related to the number of
layer properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkLayerProperties](VkLayerProperties.html) structures.

If `pProperties` is `NULL`, then the number of layer properties
available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of layer properties
available, at most `pPropertyCount` structures will be written, and
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the available properties were returned.

The list of layers enumerated by `vkEnumerateDeviceLayerProperties`
**must** be exactly the sequence of layers enabled for the instance.
The members of `VkLayerProperties` for each enumerated layer **must** be
the same as the properties when the layer was enumerated by
`vkEnumerateInstanceLayerProperties`.

|  | Due to platform details on Android, `vkEnumerateDeviceLayerProperties`
| --- | --- |
may be called with `physicalDevice` equal to `NULL` during layer
discovery.
This behavior will only be observed by layer implementations, and not the
underlying Vulkan driver. |

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateDeviceLayerProperties-physicalDevice-parameter) VUID-vkEnumerateDeviceLayerProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkEnumerateDeviceLayerProperties-pPropertyCount-parameter) VUID-vkEnumerateDeviceLayerProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateDeviceLayerProperties-pProperties-parameter) VUID-vkEnumerateDeviceLayerProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkLayerProperties](VkLayerProperties.html) structures

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkLayerProperties](VkLayerProperties.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#vkEnumerateDeviceLayerProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
