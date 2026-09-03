# VkPipelineColorWriteCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineColorWriteCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineColorWriteCreateInfoEXT - Structure specifying color write state of a newly created pipeline

The `VkPipelineColorWriteCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_color_write_enable
typedef struct VkPipelineColorWriteCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           attachmentCount;
    const VkBool32*    pColorWriteEnables;
} VkPipelineColorWriteCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentCount` is the number of `VkBool32` elements in
`pColorWriteEnables`.

* 
`pColorWriteEnables` is a pointer to an array of per target
attachment boolean values specifying whether color writes are enabled
for the given attachment.

When this structure is included in the `pNext` chain of
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html), it defines per-attachment color
write state.
If this structure is not included in the `pNext` chain, it is equivalent
to specifying this structure with `attachmentCount` equal to the
`attachmentCount` member of [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html),
and `pColorWriteEnables` pointing to an array of as many [VK_TRUE](VK_TRUE.html)
values.

If the [`colorWriteEnable`](../../../../spec/latest/chapters/features.html#features-colorWriteEnable) feature is not
enabled, all `VkBool32` elements in the `pColorWriteEnables`
array **must** be [VK_TRUE](VK_TRUE.html).

Color Write Enable interacts with the [Color Write Mask](../../../../spec/latest/chapters/framebuffer.html#framebuffer-color-write-mask) as follows:

* 
If `colorWriteEnable` is [VK_TRUE](VK_TRUE.html), writes to the attachment are
determined by the `colorWriteMask`.

* 
If `colorWriteEnable` is [VK_FALSE](VK_FALSE.html), the `colorWriteMask` is
ignored and writes to all components of the attachment are disabled.
This is equivalent to specifying a `colorWriteMask` of 0.

Valid Usage

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-pAttachments-04801) VUID-VkPipelineColorWriteCreateInfoEXT-pAttachments-04801

If the [`colorWriteEnable`](../../../../spec/latest/chapters/features.html#features-colorWriteEnable) feature is
not enabled, all elements of `pColorWriteEnables` **must** be
[VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-07608) VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-07608

If the pipeline is being created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html), or
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html) dynamic states not set,
`attachmentCount` **must** be equal to the `attachmentCount` member
of the `VkPipelineColorBlendStateCreateInfo` structure specified
during pipeline creation

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-06655) VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-06655

`attachmentCount` **must** be less than or equal to the
`maxColorAttachments` member of `VkPhysicalDeviceLimits`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-sType-sType) VUID-VkPipelineColorWriteCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COLOR_WRITE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-pColorWriteEnables-parameter) VUID-VkPipelineColorWriteCreateInfoEXT-pColorWriteEnables-parameter

 If `attachmentCount` is not `0`, `pColorWriteEnables` **must** be a valid pointer to an array of `attachmentCount` `VkBool32` values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)

[VK_EXT_color_write_enable](VK_EXT_color_write_enable.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkPipelineColorWriteCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
