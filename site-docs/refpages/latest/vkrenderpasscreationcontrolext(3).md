# VkRenderPassCreationControlEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassCreationControlEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassCreationControlEXT - Control about the creation of render pass or subpass

A `VkRenderPassCreationControlEXT` structure **can** be included in the
`pNext` chain of `VkRenderPassCreateInfo2` or `pNext` chain of
[VkSubpassDescription2](VkSubpassDescription2.html).
The `VkRenderPassCreationControlEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassCreationControlEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           disallowMerging;
} VkRenderPassCreationControlEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`disallowMerging` is a boolean value indicating whether subpass
merging will be disabled.

If a `VkRenderPassCreationControlEXT` structure is included in the
`pNext` chain of [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html) and its value of
`disallowMerging` is [VK_TRUE](VK_TRUE.html), the implementation will disable
subpass merging for the entire render pass.
If a `VkRenderPassCreationControlEXT` structure is included in the
`pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html) and its value of
`disallowMerging` is [VK_TRUE](VK_TRUE.html), the implementation will disable
merging the described subpass with previous subpasses in the render pass.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreationControlEXT-sType-sType) VUID-VkRenderPassCreationControlEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_CONTROL_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)

* 
[VkSubpassDescription2](VkSubpassDescription2.html)

[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html), `VkBool32`, [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkStructureType](VkStructureType.html), [VkSubpassDescription2](VkSubpassDescription2.html), [vkCreateRenderPass2](vkCreateRenderPass2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassCreationControlEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
