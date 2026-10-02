# VK_EXT_subpass_merge_feedback(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_subpass_merge_feedback.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_subpass_merge_feedback](#VK_EXT_subpass_merge_feedback)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_subpass_merge_feedback - device extension

**Name String**

`VK_EXT_subpass_merge_feedback`

**Extension Type**

Device extension

**Registered Extension Number**

459

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Ting Wei [catweiting](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_subpass_merge_feedback] @catweiting%0A*Here describe the issue or question you have about the VK_EXT_subpass_merge_feedback extension*)

**Extension Proposal**

[VK_EXT_subpass_merge_feedback](../../../../features/latest/features/proposals/VK_EXT_subpass_merge_feedback.html)

**Last Modified Date**

2022-05-24

**IP Status**

No known IP claims.

**Contributors**

* 
Jan-Harald Fredriksen, Arm

* 
Jorg Wagner, Arm

* 
Ting Wei, Arm

This extension adds a mechanism to provide feedback to an application about
whether the subpasses specified on render pass creation are merged by the
implementation.
Additionally, it provides a control to enable or disable subpass merging in
the render pass.

* 
[VkRenderPassCreationFeedbackInfoEXT](VkRenderPassCreationFeedbackInfoEXT.html)

* 
[VkRenderPassSubpassFeedbackInfoEXT](VkRenderPassSubpassFeedbackInfoEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT](VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT.html)

Extending [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html):

* 
[VkRenderPassCreationFeedbackCreateInfoEXT](VkRenderPassCreationFeedbackCreateInfoEXT.html)

Extending [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkSubpassDescription2](VkSubpassDescription2.html):

* 
[VkRenderPassCreationControlEXT](VkRenderPassCreationControlEXT.html)

Extending [VkSubpassDescription2](VkSubpassDescription2.html):

* 
[VkRenderPassSubpassFeedbackCreateInfoEXT](VkRenderPassSubpassFeedbackCreateInfoEXT.html)

* 
[VkSubpassMergeStatusEXT](VkSubpassMergeStatusEXT.html)

* 
`VK_EXT_SUBPASS_MERGE_FEEDBACK_EXTENSION_NAME`

* 
`VK_EXT_SUBPASS_MERGE_FEEDBACK_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_MERGE_FEEDBACK_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_CONTROL_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_FEEDBACK_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_SUBPASS_FEEDBACK_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2022-03-10

Initial draft.

Revision 2, 2022-05-24

* 
Fix structextends and constness issues.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_subpass_merge_feedback).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
