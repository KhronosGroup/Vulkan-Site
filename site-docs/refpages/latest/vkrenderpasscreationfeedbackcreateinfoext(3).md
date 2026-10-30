# VkRenderPassCreationFeedbackCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassCreationFeedbackCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassCreationFeedbackCreateInfoEXT - Request feedback about the creation of render pass

To obtain feedback about the creation of a render pass, include a
`VkRenderPassCreationFeedbackCreateInfoEXT` structure in the `pNext`
chain of [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html).
The `VkRenderPassCreationFeedbackCreateInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassCreationFeedbackCreateInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkRenderPassCreationFeedbackInfoEXT*    pRenderPassFeedback;
} VkRenderPassCreationFeedbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pRenderPassFeedback` is a pointer to a
[VkRenderPassCreationFeedbackInfoEXT](VkRenderPassCreationFeedbackInfoEXT.html) structure in which feedback is
returned.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreationFeedbackCreateInfoEXT-sType-sType) VUID-VkRenderPassCreationFeedbackCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_FEEDBACK_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkRenderPassCreationFeedbackCreateInfoEXT-pRenderPassFeedback-parameter) VUID-VkRenderPassCreationFeedbackCreateInfoEXT-pRenderPassFeedback-parameter

 `pRenderPassFeedback` **must** be a valid pointer to a [VkRenderPassCreationFeedbackInfoEXT](VkRenderPassCreationFeedbackInfoEXT.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)

[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkRenderPassCreationControlEXT](VkRenderPassCreationControlEXT.html), [VkRenderPassCreationFeedbackInfoEXT](VkRenderPassCreationFeedbackInfoEXT.html), [VkStructureType](VkStructureType.html), [vkCreateRenderPass2](vkCreateRenderPass2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassCreationFeedbackCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
