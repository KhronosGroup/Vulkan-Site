# vkEnumerateInstanceLayerProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumerateInstanceLayerProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumerateInstanceLayerProperties - Returns up to requested number of global layer properties

To query the available layers, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumerateInstanceLayerProperties(
    uint32_t*                                   pPropertyCount,
    VkLayerProperties*                          pProperties);

* 
`pPropertyCount` is a pointer to an integer related to the number of
layer properties available or queried, as described below.

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

The list of available layers may change at any time due to actions outside
of the Vulkan implementation, so two calls to
`vkEnumerateInstanceLayerProperties` with the same parameters **may**
return different results, or retrieve different `pPropertyCount` values
or `pProperties` contents.
Once an instance has been created, the layers enabled for that instance will
continue to be enabled and valid for the lifetime of that instance, even if
some of them become unavailable for future instances.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateInstanceLayerProperties-pPropertyCount-parameter) VUID-vkEnumerateInstanceLayerProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateInstanceLayerProperties-pProperties-parameter) VUID-vkEnumerateInstanceLayerProperties-pProperties-parameter

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkLayerProperties](VkLayerProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#vkEnumerateInstanceLayerProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
