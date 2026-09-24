# VkRenderPassSubpassFeedbackCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassSubpassFeedbackCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassSubpassFeedbackCreateInfoEXT - Request for feedback about the creation of subpass

Feedback about the creation of a subpass **can** be obtained by including a
`VkRenderPassSubpassFeedbackCreateInfoEXT` structure in the `pNext`
chain of [VkSubpassDescription2](VkSubpassDescription2.html).
`VkRenderPassSubpassFeedbackCreateInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassSubpassFeedbackCreateInfoEXT {
    VkStructureType                        sType;
    const void*                            pNext;
    VkRenderPassSubpassFeedbackInfoEXT*    pSubpassFeedback;
} VkRenderPassSubpassFeedbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pSubpassFeedback` is a pointer to a
[VkRenderPassSubpassFeedbackInfoEXT](VkRenderPassSubpassFeedbackInfoEXT.html) structure in which feedback is
returned.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-sType-sType) VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_SUBPASS_FEEDBACK_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-pSubpassFeedback-parameter) VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-pSubpassFeedback-parameter

 `pSubpassFeedback` **must** be a valid pointer to a [VkRenderPassSubpassFeedbackInfoEXT](VkRenderPassSubpassFeedbackInfoEXT.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDescription2](VkSubpassDescription2.html)

[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkRenderPassCreationControlEXT](VkRenderPassCreationControlEXT.html), [VkRenderPassSubpassFeedbackInfoEXT](VkRenderPassSubpassFeedbackInfoEXT.html), [VkStructureType](VkStructureType.html), [VkSubpassDescription2](VkSubpassDescription2.html), [vkCreateRenderPass2](vkCreateRenderPass2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassSubpassFeedbackCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
