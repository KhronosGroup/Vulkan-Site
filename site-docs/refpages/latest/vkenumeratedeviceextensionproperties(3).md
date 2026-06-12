# vkEnumerateDeviceExtensionProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumerateDeviceExtensionProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumerateDeviceExtensionProperties - Returns properties of available physical device extensions

To query the extensions available to a given physical device, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumerateDeviceExtensionProperties(
    VkPhysicalDevice                            physicalDevice,
    const char*                                 pLayerName,
    uint32_t*                                   pPropertyCount,
    VkExtensionProperties*                      pProperties);

* 
`physicalDevice` is the physical device that will be queried.

* 
`pLayerName` is either `NULL` or a pointer to a null-terminated
UTF-8 string naming the layer to retrieve extensions from.

* 
`pPropertyCount` is a pointer to an integer related to the number of
extension properties available or queried, and is treated in the same
fashion as the
[vkEnumerateInstanceExtensionProperties](vkEnumerateInstanceExtensionProperties.html)::`pPropertyCount`
parameter.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkExtensionProperties](VkExtensionProperties.html) structures.

When `pLayerName` parameter is `NULL`, only extensions provided by the
Vulkan implementation or by implicitly enabled layers are returned.
When `pLayerName` is the name of a layer, the device extensions provided
by that layer are returned.

Implementations **must** not advertise any pair of extensions that cannot be
enabled together due to behavioral differences, or any extension that cannot
be enabled against the advertised version.

If the `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` extension is advertised as
supported by this query, the `[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)` extension
**must** also be supported.

If the `[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html)` extension is advertised as supported
by this query, the `[VK_KHR_shader_untyped_pointers](VK_KHR_shader_untyped_pointers.html)` extension **must**
also be supported.

|  | Due to platform details on Android,
| --- | --- |
`vkEnumerateDeviceExtensionProperties` may be called with
`physicalDevice` equal to `NULL` during layer discovery.
This behavior will only be observed by layer implementations, and not the
underlying Vulkan driver. |

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-physicalDevice-parameter) VUID-vkEnumerateDeviceExtensionProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-pLayerName-parameter) VUID-vkEnumerateDeviceExtensionProperties-pLayerName-parameter

 If `pLayerName` is not `NULL`, `pLayerName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-pPropertyCount-parameter) VUID-vkEnumerateDeviceExtensionProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-pProperties-parameter) VUID-vkEnumerateDeviceExtensionProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkExtensionProperties](VkExtensionProperties.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_LAYER_NOT_PRESENT](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExtensionProperties](VkExtensionProperties.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#vkEnumerateDeviceExtensionProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
