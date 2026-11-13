# vkDebugMarkerSetObjectNameEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDebugMarkerSetObjectNameEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDebugMarkerSetObjectNameEXT - Give an application-defined name to an object

An object can be given an application-defined name by calling:

// Provided by VK_EXT_debug_marker
VkResult vkDebugMarkerSetObjectNameEXT(
    VkDevice                                    device,
    const VkDebugMarkerObjectNameInfoEXT*       pNameInfo);

* 
`device` is the device that created the object.

* 
`pNameInfo` is a pointer to a [VkDebugMarkerObjectNameInfoEXT](VkDebugMarkerObjectNameInfoEXT.html)
structure specifying the parameters of the name to set on the object.

Valid Usage (Implicit)

* 
[](#VUID-vkDebugMarkerSetObjectNameEXT-device-parameter) VUID-vkDebugMarkerSetObjectNameEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDebugMarkerSetObjectNameEXT-pNameInfo-parameter) VUID-vkDebugMarkerSetObjectNameEXT-pNameInfo-parameter

 `pNameInfo` **must** be a valid pointer to a valid [VkDebugMarkerObjectNameInfoEXT](VkDebugMarkerObjectNameInfoEXT.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

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

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkDebugMarkerObjectNameInfoEXT](VkDebugMarkerObjectNameInfoEXT.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkDebugMarkerSetObjectNameEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
