# vkDebugMarkerSetObjectTagEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDebugMarkerSetObjectTagEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDebugMarkerSetObjectTagEXT - Attach arbitrary data to an object

In addition to setting a name for an object, debugging and validation layers
may have uses for additional binary data on a per-object basis that has no
other place in the Vulkan API.
For example, a `VkShaderModule` could have additional debugging data
attached to it to aid in offline shader tracing.
To attach data to an object, call:

// Provided by VK_EXT_debug_marker
VkResult vkDebugMarkerSetObjectTagEXT(
    VkDevice                                    device,
    const VkDebugMarkerObjectTagInfoEXT*        pTagInfo);

* 
`device` is the device that created the object.

* 
`pTagInfo` is a pointer to a [VkDebugMarkerObjectTagInfoEXT](VkDebugMarkerObjectTagInfoEXT.html)
structure specifying the parameters of the tag to attach to the object.

Valid Usage (Implicit)

* 
[](#VUID-vkDebugMarkerSetObjectTagEXT-device-parameter) VUID-vkDebugMarkerSetObjectTagEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDebugMarkerSetObjectTagEXT-pTagInfo-parameter) VUID-vkDebugMarkerSetObjectTagEXT-pTagInfo-parameter

 `pTagInfo` **must** be a valid pointer to a valid [VkDebugMarkerObjectTagInfoEXT](VkDebugMarkerObjectTagInfoEXT.html) structure

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

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkDebugMarkerObjectTagInfoEXT](VkDebugMarkerObjectTagInfoEXT.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkDebugMarkerSetObjectTagEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
