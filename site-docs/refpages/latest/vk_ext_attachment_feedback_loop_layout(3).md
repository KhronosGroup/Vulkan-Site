# VK_EXT_attachment_feedback_loop_layout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_attachment_feedback_loop_layout.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_attachment_feedback_loop_layout](#VK_EXT_attachment_feedback_loop_layout)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_attachment_feedback_loop_layout - device extension

**Name String**

`VK_EXT_attachment_feedback_loop_layout`

**Extension Type**

Device extension

**Registered Extension Number**

340

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Uses**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Joshua Ashton [Joshua-Ashton](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_attachment_feedback_loop_layout] @Joshua-Ashton%0A*Here describe the issue or question you have about the VK_EXT_attachment_feedback_loop_layout extension*)

**Extension Proposal**

[VK_EXT_attachment_feedback_loop_layout](../../../../features/latest/features/proposals/VK_EXT_attachment_feedback_loop_layout.html)

**Last Modified Date**

2022-04-04

**IP Status**

No known IP claims.

**Contributors**

* 
Joshua Ashton, Valve

* 
Faith Ekstrand, Collabora

* 
Bas Nieuwenhuizen, Google

* 
Samuel Iglesias Gonsálvez, Igalia

* 
Ralph Potter, Samsung

* 
Jan-Harald Fredriksen, Arm

* 
Ricardo Garcia, Igalia

This extension adds a new image layout,
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html), which allows
applications to have an image layout in which they are able to both render
to and sample/fetch from the same subresource of an image in a given render
pass.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT](VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT.html)

* 
`VK_EXT_ATTACHMENT_FEEDBACK_LOOP_LAYOUT_EXTENSION_NAME`

* 
`VK_EXT_ATTACHMENT_FEEDBACK_LOOP_LAYOUT_SPEC_VERSION`

* 
Extending [VkDependencyFlagBits](VkDependencyFlagBits.html):

[VK_DEPENDENCY_FEEDBACK_LOOP_BIT_EXT](VkDependencyFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkImageUsageFlagBits.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ATTACHMENT_FEEDBACK_LOOP_LAYOUT_FEATURES_EXT](VkStructureType.html)

* 
Revision 2, 2022-04-04 (Joshua Ashton)

Renamed from VALVE to EXT.

Revision 1, 2021-03-09 (Joshua Ashton)

* 
Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_attachment_feedback_loop_layout).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
