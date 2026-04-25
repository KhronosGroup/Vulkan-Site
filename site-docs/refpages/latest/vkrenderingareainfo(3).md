# VkRenderingAreaInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingAreaInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingAreaInfo - Structure describing rendering area granularity query info

The `VkRenderingAreaInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkRenderingAreaInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           viewMask;
    uint32_t           colorAttachmentCount;
    const VkFormat*    pColorAttachmentFormats;
    VkFormat           depthAttachmentFormat;
    VkFormat           stencilAttachmentFormat;
} VkRenderingAreaInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkRenderingAreaInfo
typedef VkRenderingAreaInfo VkRenderingAreaInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewMask` is the viewMask used for rendering.

* 
`colorAttachmentCount` is the number of entries in
`pColorAttachmentFormats`

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](VkFormat.html)
values defining the format of color attachments used in the render pass
instance.

* 
`depthAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the depth attachment used in the render pass instance.

* 
`stencilAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the stencil attachment used in the render pass instance.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAreaInfo-sType-sType) VUID-VkRenderingAreaInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_AREA_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderingAreaInfo-pNext-pNext) VUID-VkRenderingAreaInfo-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html), [vkGetRenderingAreaGranularity](vkGetRenderingAreaGranularity.html), [vkGetRenderingAreaGranularity](vkGetRenderingAreaGranularity.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingAreaInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
