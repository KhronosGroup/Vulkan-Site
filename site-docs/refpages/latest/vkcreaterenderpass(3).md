# vkCreateRenderPass(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateRenderPass.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateRenderPass - Create a new render pass object

To create a render pass, call:

|  | This functionality is superseded by [vkCreateRenderPass2](../../../../spec/latest/chapters/renderpass.html#vkCreateRenderPass2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkCreateRenderPass(
    VkDevice                                    device,
    const VkRenderPassCreateInfo*               pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkRenderPass*                               pRenderPass);

* 
`device` is the logical device that creates the render pass.

* 
`pCreateInfo` is a pointer to a [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)
structure describing the parameters of the render pass.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pRenderPass` is a pointer to a [VkRenderPass](VkRenderPass.html) handle in which
the resulting render pass object is returned.

Valid Usage

* 
[](#VUID-vkCreateRenderPass-device-10000) VUID-vkCreateRenderPass-device-10000

`device` **must** support at least one queue family with the
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capability

* 
[](#VUID-vkCreateRenderPass-flags-10646) VUID-vkCreateRenderPass-flags-10646

[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags` **must** not
include [VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateRenderPass-device-parameter) VUID-vkCreateRenderPass-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateRenderPass-pCreateInfo-parameter) VUID-vkCreateRenderPass-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) structure

* 
[](#VUID-vkCreateRenderPass-pAllocator-parameter) VUID-vkCreateRenderPass-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateRenderPass-pRenderPass-parameter) VUID-vkCreateRenderPass-pRenderPass-parameter

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkRenderPass](VkRenderPass.html), [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCreateRenderPass).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
