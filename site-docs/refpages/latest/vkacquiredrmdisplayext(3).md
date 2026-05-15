# vkAcquireDrmDisplayEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquireDrmDisplayEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquireDrmDisplayEXT - Acquire access to a VkDisplayKHR using DRM

To acquire permission to directly a display in Vulkan from the Direct
Rendering Manager (DRM) interface, call:

// Provided by VK_EXT_acquire_drm_display
VkResult vkAcquireDrmDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    int32_t                                     drmFd,
    VkDisplayKHR                                display);

* 
`physicalDevice` The physical device the display is on.

* 
`drmFd` DRM primary file descriptor.

* 
`display` The display the caller wishes Vulkan to control.

All permissions necessary to control the display are granted to the Vulkan
instance associated with the provided `physicalDevice` until the display
is either released or the connector is unplugged.
The provided `drmFd` **must** correspond to the one owned by the
`physicalDevice`.
If not, the error code [VK_ERROR_UNKNOWN](VkResult.html) **must** be returned.
The DRM FD must have DRM mast⁠er permissions.
If any error is encountered during the acquisition of the display, the call
**must** return the error code [VK_ERROR_INITIALIZATION_FAILED](VkResult.html).

The provided DRM fd should not be closed before the display is released,
attempting to do it may result in **undefined** behavior.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireDrmDisplayEXT-physicalDevice-parameter) VUID-vkAcquireDrmDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkAcquireDrmDisplayEXT-display-parameter) VUID-vkAcquireDrmDisplayEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkAcquireDrmDisplayEXT-display-parent) VUID-vkAcquireDrmDisplayEXT-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_acquire_drm_display](VK_EXT_acquire_drm_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkAcquireDrmDisplayEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
