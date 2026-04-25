# vkSetDebugUtilsObjectTagEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetDebugUtilsObjectTagEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetDebugUtilsObjectTagEXT - Attach arbitrary data to an object

// Provided by VK_EXT_debug_utils
VkResult vkSetDebugUtilsObjectTagEXT(
    VkDevice                                    device,
    const VkDebugUtilsObjectTagInfoEXT*         pTagInfo);

* 
`device` is the device that created the object.

* 
`pTagInfo` is a pointer to a [VkDebugUtilsObjectTagInfoEXT](VkDebugUtilsObjectTagInfoEXT.html)
structure specifying parameters of the tag to attach to the object.

Valid Usage

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07875) VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07875

If `pNameInfo->objectHandle` is the valid handle of an
instance-level object, the [VkDevice](VkDevice.html) identified by `device`
**must** be a descendent of the same [VkInstance](VkInstance.html) as the object
identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07876) VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07876

If `pNameInfo->objectHandle` is the valid handle of a
physical-device-level object, the [VkDevice](VkDevice.html) identified by
`device` **must** be a descendant of the same [VkPhysicalDevice](VkPhysicalDevice.html) as
the object identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07877) VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07877

If `pNameInfo->objectHandle` is the valid handle of a device-level
object, that object **must** be a descendent of the [VkDevice](VkDevice.html)
identified by `device`

Valid Usage (Implicit)

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-device-parameter) VUID-vkSetDebugUtilsObjectTagEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pTagInfo-parameter) VUID-vkSetDebugUtilsObjectTagEXT-pTagInfo-parameter

 `pTagInfo` **must** be a valid pointer to a valid [VkDebugUtilsObjectTagInfoEXT](VkDebugUtilsObjectTagInfoEXT.html) structure

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

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsObjectTagInfoEXT](VkDebugUtilsObjectTagInfoEXT.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkSetDebugUtilsObjectTagEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
