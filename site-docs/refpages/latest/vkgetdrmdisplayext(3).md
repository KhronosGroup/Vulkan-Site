# vkGetDrmDisplayEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDrmDisplayEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDrmDisplayEXT - Query the VkDisplayKHR corresponding to a DRM connector ID

Before acquiring a display from the DRM interface, the caller may want to
select a specific `VkDisplayKHR` handle by identifying it using a
`connectorId`.
To do so, call:

// Provided by VK_EXT_acquire_drm_display
VkResult vkGetDrmDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    int32_t                                     drmFd,
    uint32_t                                    connectorId,
    VkDisplayKHR*                               display);

* 
`physicalDevice` The physical device to query the display from.

* 
`drmFd` DRM primary file descriptor.

* 
`connectorId` Identifier of the specified DRM connector.

* 
`display` The corresponding [VkDisplayKHR](VkDisplayKHR.html) handle will be
returned here.

If there is no [VkDisplayKHR](VkDisplayKHR.html) corresponding to the `connectorId` on
the `physicalDevice`, the returning `display` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).
The provided `drmFd` **must** correspond to the one owned by the
`physicalDevice`.
If not, the error code [VK_ERROR_UNKNOWN](VkResult.html) **must** be returned.
Mast⁠er permissions are not required, because the file descriptor is just
used for information gathering purposes.
The given `connectorId` **must** be a resource owned by the provided
`drmFd`.
If not, the error code [VK_ERROR_UNKNOWN](VkResult.html) **must** be returned.
If any error is encountered during the identification of the display, the
call **must** return the error code [VK_ERROR_INITIALIZATION_FAILED](VkResult.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetDrmDisplayEXT-physicalDevice-parameter) VUID-vkGetDrmDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetDrmDisplayEXT-display-parameter) VUID-vkGetDrmDisplayEXT-display-parameter

 `display` **must** be a valid pointer to a [VkDisplayKHR](VkDisplayKHR.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_acquire_drm_display](VK_EXT_acquire_drm_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDrmDisplayEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
