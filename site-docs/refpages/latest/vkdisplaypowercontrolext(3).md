# vkDisplayPowerControlEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDisplayPowerControlEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDisplayPowerControlEXT - Set the power state of a display

To set the power state of a display, call:

// Provided by VK_EXT_display_control
VkResult vkDisplayPowerControlEXT(
    VkDevice                                    device,
    VkDisplayKHR                                display,
    const VkDisplayPowerInfoEXT*                pDisplayPowerInfo);

* 
`device` is a logical device associated with `display`.

* 
`display` is the display whose power state is modified.

* 
`pDisplayPowerInfo` is a pointer to a [VkDisplayPowerInfoEXT](VkDisplayPowerInfoEXT.html)
structure specifying the new power state of `display`.

Valid Usage (Implicit)

* 
[](#VUID-vkDisplayPowerControlEXT-device-parameter) VUID-vkDisplayPowerControlEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDisplayPowerControlEXT-display-parameter) VUID-vkDisplayPowerControlEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkDisplayPowerControlEXT-pDisplayPowerInfo-parameter) VUID-vkDisplayPowerControlEXT-pDisplayPowerInfo-parameter

 `pDisplayPowerInfo` **must** be a valid pointer to a valid [VkDisplayPowerInfoEXT](VkDisplayPowerInfoEXT.html) structure

* 
[](#VUID-vkDisplayPowerControlEXT-commonparent) VUID-vkDisplayPowerControlEXT-commonparent

 Both of `device`, and `display` **must** have been created, allocated, or retrieved from the same [VkPhysicalDevice](VkPhysicalDevice.html)

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDevice](VkDevice.html), [VkDisplayKHR](VkDisplayKHR.html), [VkDisplayPowerInfoEXT](VkDisplayPowerInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkDisplayPowerControlEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
