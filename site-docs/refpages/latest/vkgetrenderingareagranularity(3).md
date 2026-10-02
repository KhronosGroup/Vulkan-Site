# vkGetRenderingAreaGranularity(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetRenderingAreaGranularity.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetRenderingAreaGranularity - Returns the granularity for dynamic rendering optimal render area

To query the render area granularity for a render pass instance, call:

// Provided by VK_VERSION_1_4
void vkGetRenderingAreaGranularity(
    VkDevice                                    device,
    const VkRenderingAreaInfo*                  pRenderingAreaInfo,
    VkExtent2D*                                 pGranularity);

// Provided by VK_KHR_maintenance5
// Equivalent to vkGetRenderingAreaGranularity
void vkGetRenderingAreaGranularityKHR(
    VkDevice                                    device,
    const VkRenderingAreaInfo*                  pRenderingAreaInfo,
    VkExtent2D*                                 pGranularity);

* 
`device` is the logical device that owns the render pass instance.

* 
`pRenderingAreaInfo` is a pointer to a [VkRenderingAreaInfo](VkRenderingAreaInfo.html)
structure specifying details of the render pass instance to query the
render area granularity for.

* 
`pGranularity` is a pointer to a [VkExtent2D](VkExtent2D.html) structure in which
the granularity is returned.

The conditions leading to an optimal `renderArea` are:

* 
the `offset.x` member in `renderArea` is a multiple of the
`width` member of the returned [VkExtent2D](VkExtent2D.html) (the horizontal
granularity).

* 
the `offset.y` member in `renderArea` is a multiple of the
`height` member of the returned [VkExtent2D](VkExtent2D.html) (the vertical
granularity).

* 
either the `extent.width` member in `renderArea` is a multiple
of the horizontal granularity or `offset.x`+`extent.width` is
equal to the `width` of each attachment used in the render pass
instance.

* 
either the `extent.height` member in `renderArea` is a multiple
of the vertical granularity or `offset.y`+`extent.height` is
equal to the `height` of each attachment used in the render pass
instance.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRenderingAreaGranularity-device-parameter) VUID-vkGetRenderingAreaGranularity-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetRenderingAreaGranularity-pRenderingAreaInfo-parameter) VUID-vkGetRenderingAreaGranularity-pRenderingAreaInfo-parameter

 `pRenderingAreaInfo` **must** be a valid pointer to a valid [VkRenderingAreaInfo](VkRenderingAreaInfo.html) structure

* 
[](#VUID-vkGetRenderingAreaGranularity-pGranularity-parameter) VUID-vkGetRenderingAreaGranularity-pGranularity-parameter

 `pGranularity` **must** be a valid pointer to a [VkExtent2D](VkExtent2D.html) structure

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDevice](VkDevice.html), [VkExtent2D](VkExtent2D.html), [VkRenderingAreaInfo](VkRenderingAreaInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkGetRenderingAreaGranularity).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
