# vkSetHdrMetadataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetHdrMetadataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetHdrMetadataEXT - Set HDR metadata

To provide HDR metadata to an implementation, call:

// Provided by VK_EXT_hdr_metadata
void vkSetHdrMetadataEXT(
    VkDevice                                    device,
    uint32_t                                    swapchainCount,
    const VkSwapchainKHR*                       pSwapchains,
    const VkHdrMetadataEXT*                     pMetadata);

* 
`device` is the logical device where the swapchain(s) were created.

* 
`swapchainCount` is the number of swapchains included in
`pSwapchains`.

* 
`pSwapchains` is a pointer to an array of `swapchainCount`
[VkSwapchainKHR](VkSwapchainKHR.html) handles.

* 
`pMetadata` is a pointer to an array of `swapchainCount`
[VkHdrMetadataEXT](VkHdrMetadataEXT.html) structures.

The metadata will be applied to the specified [VkSwapchainKHR](VkSwapchainKHR.html) objects
at the next [vkQueuePresentKHR](vkQueuePresentKHR.html) call using that [VkSwapchainKHR](VkSwapchainKHR.html)
object.
The metadata will persist until a subsequent `vkSetHdrMetadataEXT`
changes it.

Valid Usage (Implicit)

* 
[](#VUID-vkSetHdrMetadataEXT-device-parameter) VUID-vkSetHdrMetadataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetHdrMetadataEXT-pSwapchains-parameter) VUID-vkSetHdrMetadataEXT-pSwapchains-parameter

 `pSwapchains` **must** be a valid pointer to an array of `swapchainCount` valid [VkSwapchainKHR](VkSwapchainKHR.html) handles

* 
[](#VUID-vkSetHdrMetadataEXT-pMetadata-parameter) VUID-vkSetHdrMetadataEXT-pMetadata-parameter

 `pMetadata` **must** be a valid pointer to an array of `swapchainCount` valid [VkHdrMetadataEXT](VkHdrMetadataEXT.html) structures

* 
[](#VUID-vkSetHdrMetadataEXT-swapchainCount-arraylength) VUID-vkSetHdrMetadataEXT-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

* 
[](#VUID-vkSetHdrMetadataEXT-pSwapchains-parent) VUID-vkSetHdrMetadataEXT-pSwapchains-parent

 Each element of `pSwapchains` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_hdr_metadata](VK_EXT_hdr_metadata.html), [VkDevice](VkDevice.html), [VkHdrMetadataEXT](VkHdrMetadataEXT.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkSetHdrMetadataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
