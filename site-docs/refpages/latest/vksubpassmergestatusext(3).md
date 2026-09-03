# VkSubpassMergeStatusEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassMergeStatusEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassMergeStatusEXT - Specify a subpass merging status

Possible values of
`VkRenderPassSubpassFeedbackInfoEXT`:subpassMergeStatus are:

// Provided by VK_EXT_subpass_merge_feedback
typedef enum VkSubpassMergeStatusEXT {
    VK_SUBPASS_MERGE_STATUS_MERGED_EXT = 0,
    VK_SUBPASS_MERGE_STATUS_DISALLOWED_EXT = 1,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SIDE_EFFECTS_EXT = 2,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SAMPLES_MISMATCH_EXT = 3,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_VIEWS_MISMATCH_EXT = 4,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_ALIASING_EXT = 5,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPENDENCIES_EXT = 6,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INCOMPATIBLE_INPUT_ATTACHMENT_EXT = 7,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_TOO_MANY_ATTACHMENTS_EXT = 8,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INSUFFICIENT_STORAGE_EXT = 9,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPTH_STENCIL_COUNT_EXT = 10,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_RESOLVE_ATTACHMENT_REUSE_EXT = 11,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SINGLE_SUBPASS_EXT = 12,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_UNSPECIFIED_EXT = 13,
} VkSubpassMergeStatusEXT;

* 
[VK_SUBPASS_MERGE_STATUS_MERGED_EXT](#) specifies that the subpass is
merged with a previous subpass.

* 
[VK_SUBPASS_MERGE_STATUS_DISALLOWED_EXT](#) specifies that the subpass
is not merged because merging was disabled using
[VkRenderPassCreationControlEXT](VkRenderPassCreationControlEXT.html).
If the render pass does not allow subpass merging, then all subpass
statuses are set to this value.
If a subpass description does not allow subpass merging, then only that
subpass’s status is set to this value.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SIDE_EFFECTS_EXT](#) specifies that
the subpass is not merged because it contains side effects.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SAMPLES_MISMATCH_EXT](#) specifies
that the subpass is not merged because sample count is not compatible
with the previous subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_VIEWS_MISMATCH_EXT](#) specifies
that the subpass is not merged because view masks do not match with
previous subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_ALIASING_EXT](#) specifies that the
subpass is not merged because of attachments aliasing between them.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPENDENCIES_EXT](#) specifies that
the subpass is not merged because subpass dependencies do not allow
merging.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INCOMPATIBLE_INPUT_ATTACHMENT_EXT](#)
specifies that the subpass is not merged because input attachment is not
a color attachment from previous subpass or the formats are
incompatible.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_TOO_MANY_ATTACHMENTS_EXT](#)
specifies that the subpass is not merged because of too many
attachments.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INSUFFICIENT_STORAGE_EXT](#)
specifies that the subpass is not merged because of insufficient memory.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPTH_STENCIL_COUNT_EXT](#)
specifies that the subpass is not merged because of too many
depth/stencil attachments.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_RESOLVE_ATTACHMENT_REUSE_EXT](#)
specifies that the subpass is not merged because a resolve attachment is
reused as an input attachment in a subsequent subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SINGLE_SUBPASS_EXT](#) specifies
that the subpass is not merged because the render pass has only one
subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_UNSPECIFIED_EXT](#) specifies that
the subpass is not merged for unspecified reasons.
Implementations **should** return this value when no other
[VkSubpassMergeStatusEXT](#) value is appropriate.

[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html), [VkRenderPassSubpassFeedbackInfoEXT](VkRenderPassSubpassFeedbackInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassMergeStatusEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
