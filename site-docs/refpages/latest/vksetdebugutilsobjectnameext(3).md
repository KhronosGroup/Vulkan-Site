# vkSetDebugUtilsObjectNameEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetDebugUtilsObjectNameEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetDebugUtilsObjectNameEXT - Give an application-defined name to an object

An object can be given an application-defined name by calling:

// Provided by VK_EXT_debug_utils
VkResult vkSetDebugUtilsObjectNameEXT(
    VkDevice                                    device,
    const VkDebugUtilsObjectNameInfoEXT*        pNameInfo);

* 
`device` is the device that is associated with the named object
passed in via `objectHandle`.

* 
`pNameInfo` is a pointer to a [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html)
structure specifying parameters of the name to set on the object.

Valid Usage

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02587) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02587

`pNameInfo->objectType` **must** not be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02588) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02588

`pNameInfo->objectHandle` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07872) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07872

If `pNameInfo->objectHandle` is the valid handle of an
instance-level object, the [VkDevice](VkDevice.html) identified by `device`
**must** be a descendent of the same [VkInstance](VkInstance.html) as the object
identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07873) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07873

If `pNameInfo->objectHandle` is the valid handle of a
physical-device-level object, the [VkDevice](VkDevice.html) identified by
`device` **must** be a descendant of the same [VkPhysicalDevice](VkPhysicalDevice.html) as
the object identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07874) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07874

If `pNameInfo->objectHandle` is the valid handle of a device-level
object, that object **must** be a descendent of the [VkDevice](VkDevice.html)
identified by `device`

Valid Usage (Implicit)

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-device-parameter) VUID-vkSetDebugUtilsObjectNameEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-parameter) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-parameter

 `pNameInfo` **must** be a valid pointer to a valid [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure

Host Synchronization

* 
Host access to `pNameInfo->objectHandle` **must** be externally synchronized

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

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkSetDebugUtilsObjectNameEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
