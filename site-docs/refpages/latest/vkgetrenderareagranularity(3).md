# vkGetRenderAreaGranularity(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetRenderAreaGranularity.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetRenderAreaGranularity - Returns the granularity for optimal render area

To query the render area granularity, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetRenderAreaGranularity(
    VkDevice                                    device,
    VkRenderPass                                renderPass,
    VkExtent2D*                                 pGranularity);

* 
`device` is the logical device that owns the render pass.

* 
`renderPass` is a handle to a render pass.

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
equal to the `width` of the `framebuffer` in the
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html).

* 
either the `extent.height` member in `renderArea` is a multiple
of the vertical granularity or `offset.y`+`extent.height` is
equal to the `height` of the `framebuffer` in the
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html).

Subpass dependencies are not affected by the render area, and apply to the
entire image subresources attached to the framebuffer as specified in the
description of [automatic layout transitions](../../../../spec/latest/chapters/renderpass.html#renderpass-layout-transitions).
Similarly, pipeline barriers are valid even if their effect extends outside
the render area.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRenderAreaGranularity-device-parameter) VUID-vkGetRenderAreaGranularity-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetRenderAreaGranularity-renderPass-parameter) VUID-vkGetRenderAreaGranularity-renderPass-parameter

 `renderPass` **must** be a valid [VkRenderPass](VkRenderPass.html) handle

* 
[](#VUID-vkGetRenderAreaGranularity-pGranularity-parameter) VUID-vkGetRenderAreaGranularity-pGranularity-parameter

 `pGranularity` **must** be a valid pointer to a [VkExtent2D](VkExtent2D.html) structure

* 
[](#VUID-vkGetRenderAreaGranularity-renderPass-parent) VUID-vkGetRenderAreaGranularity-renderPass-parent

 `renderPass` **must** have been created, allocated, or retrieved from `device`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkExtent2D](VkExtent2D.html), [VkRenderPass](VkRenderPass.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkGetRenderAreaGranularity).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
