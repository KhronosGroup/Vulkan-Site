# VkRenderPassSubpassFeedbackInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassSubpassFeedbackInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassSubpassFeedbackInfoEXT - Feedback about the creation of subpass

The `VkRenderPassSubpassFeedbackInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassSubpassFeedbackInfoEXT {
    VkSubpassMergeStatusEXT    subpassMergeStatus;
    char                       description[VK_MAX_DESCRIPTION_SIZE];
    uint32_t                   postMergeIndex;
} VkRenderPassSubpassFeedbackInfoEXT;

* 
`subpassMergeStatus` is a [VkSubpassMergeStatusEXT](VkSubpassMergeStatusEXT.html) value
specifying information about whether the subpass is merged with the
previous subpass and the reason why it is not merged.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which provides additional
details.

* 
`postMergeIndex` is the subpass index after the subpass merging.

[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html), [VkRenderPassSubpassFeedbackCreateInfoEXT](VkRenderPassSubpassFeedbackCreateInfoEXT.html), [VkSubpassMergeStatusEXT](VkSubpassMergeStatusEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassSubpassFeedbackInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
