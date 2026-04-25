# VkRenderPassTransformBeginInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassTransformBeginInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassTransformBeginInfoQCOM - Structure describing transform parameters of a render pass instance

To begin a render pass instance with [render pass transform](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-renderpass-transform) enabled, add the
[VkRenderPassTransformBeginInfoQCOM](#) to the `pNext` chain of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html) structure passed to the
[vkCmdBeginRenderPass](vkCmdBeginRenderPass.html) command specifying the render pass transform.

The `VkRenderPassTransformBeginInfoQCOM` structure is defined as:

// Provided by VK_QCOM_render_pass_transform
typedef struct VkRenderPassTransformBeginInfoQCOM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSurfaceTransformFlagBitsKHR    transform;
} VkRenderPassTransformBeginInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`transform` is a [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value
describing the transform to be applied to rasterization.

Valid Usage

* 
[](#VUID-VkRenderPassTransformBeginInfoQCOM-transform-02871) VUID-VkRenderPassTransformBeginInfoQCOM-transform-02871

`transform` **must** be [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html)

* 
[](#VUID-VkRenderPassTransformBeginInfoQCOM-flags-02872) VUID-VkRenderPassTransformBeginInfoQCOM-flags-02872

The `renderpass` **must** have been created with
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)::`flags` containing
[VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM](VkRenderPassCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassTransformBeginInfoQCOM-sType-sType) VUID-VkRenderPassTransformBeginInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_TRANSFORM_BEGIN_INFO_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)

[VK_QCOM_render_pass_transform](VK_QCOM_render_pass_transform.html), [VkStructureType](VkStructureType.html), [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassTransformBeginInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
