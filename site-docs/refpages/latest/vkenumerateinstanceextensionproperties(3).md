# vkEnumerateInstanceExtensionProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumerateInstanceExtensionProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumerateInstanceExtensionProperties - Returns up to requested number of global extension properties

To query the available instance extensions, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumerateInstanceExtensionProperties(
    const char*                                 pLayerName,
    uint32_t*                                   pPropertyCount,
    VkExtensionProperties*                      pProperties);

* 
`pLayerName` is either `NULL` or a pointer to a null-terminated
UTF-8 string naming the layer to retrieve extensions from.

* 
`pPropertyCount` is a pointer to an integer related to the number of
extension properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkExtensionProperties](VkExtensionProperties.html) structures.

When `pLayerName` parameter is `NULL`, only extensions provided by the
Vulkan implementation or by implicitly enabled layers are returned.
When `pLayerName` is the name of a layer, the instance extensions
provided by that layer are returned.

If `pProperties` is `NULL`, then the number of extensions properties
available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of extension properties
available, at most `pPropertyCount` structures will be written, and
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the available properties were returned.

Because the list of available layers may change externally between calls to
[vkEnumerateInstanceExtensionProperties](#), two calls may retrieve
different results if a `pLayerName` is available in one call but not in
another.
The extensions supported by a layer may also change between two calls, e.g.
if the layer implementation is replaced by a different version between those
calls.

Implementations **must** not advertise any pair of extensions that cannot be
enabled together due to behavioral differences, or any extension that cannot
be enabled against the advertised version.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateInstanceExtensionProperties-pLayerName-parameter) VUID-vkEnumerateInstanceExtensionProperties-pLayerName-parameter

 If `pLayerName` is not `NULL`, `pLayerName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-vkEnumerateInstanceExtensionProperties-pPropertyCount-parameter) VUID-vkEnumerateInstanceExtensionProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateInstanceExtensionProperties-pProperties-parameter) VUID-vkEnumerateInstanceExtensionProperties-pProperties-parameter

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExtensionProperties](VkExtensionProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#vkEnumerateInstanceExtensionProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
