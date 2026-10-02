# vkCreateRenderPass2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateRenderPass2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateRenderPass2 - Create a new render pass object

To create a render pass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
VkResult vkCreateRenderPass2(
    VkDevice                                    device,
    const VkRenderPassCreateInfo2*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkRenderPass*                               pRenderPass);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCreateRenderPass2
VkResult vkCreateRenderPass2KHR(
    VkDevice                                    device,
    const VkRenderPassCreateInfo2*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkRenderPass*                               pRenderPass);

* 
`device` is the logical device that creates the render pass.

* 
`pCreateInfo` is a pointer to a [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)
structure describing the parameters of the render pass.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pRenderPass` is a pointer to a [VkRenderPass](VkRenderPass.html) handle in which
the resulting render pass object is returned.

This command is functionally identical to [vkCreateRenderPass](vkCreateRenderPass.html), but
includes extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage

* 
[](#VUID-vkCreateRenderPass2-device-10001) VUID-vkCreateRenderPass2-device-10001

`device` **must** support at least one queue family with the
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capability

* 
[](#VUID-vkCreateRenderPass2-flags-10649) VUID-vkCreateRenderPass2-flags-10649

[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags` **must** not
include [VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateRenderPass2-device-parameter) VUID-vkCreateRenderPass2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateRenderPass2-pCreateInfo-parameter) VUID-vkCreateRenderPass2-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html) structure

* 
[](#VUID-vkCreateRenderPass2-pAllocator-parameter) VUID-vkCreateRenderPass2-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateRenderPass2-pRenderPass-parameter) VUID-vkCreateRenderPass2-pRenderPass-parameter

 `pRenderPass` **must** be a valid pointer to a [VkRenderPass](VkRenderPass.html) handle

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

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkRenderPass](VkRenderPass.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCreateRenderPass2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
