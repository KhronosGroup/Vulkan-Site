# VK_EXT_attachment_feedback_loop_dynamic_state(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_attachment_feedback_loop_dynamic_state.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_attachment_feedback_loop_dynamic_state](#VK_EXT_attachment_feedback_loop_dynamic_state)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_attachment_feedback_loop_dynamic_state - device extension

**Name String**

`VK_EXT_attachment_feedback_loop_dynamic_state`

**Extension Type**

Device extension

**Registered Extension Number**

525

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html)

**Special Uses**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_attachment_feedback_loop_dynamic_state] @zmike%0A*Here describe the issue or question you have about the VK_EXT_attachment_feedback_loop_dynamic_state extension*)

**Extension Proposal**

[VK_EXT_attachment_feedback_loop_dynamic_state](../../../../features/latest/features/proposals/VK_EXT_attachment_feedback_loop_dynamic_state.html)

**Last Modified Date**

2023-04-28

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Daniel Story, Nintendo

* 
Stu Smith, AMD

* 
Samuel Pitoiset, Valve

* 
Ricardo Garcia, Igalia

This extension adds support for setting attachment feedback loops
dynamically on command buffers.

* 
[vkCmdSetAttachmentFeedbackLoopEnableEXT](vkCmdSetAttachmentFeedbackLoopEnableEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT](VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT.html)

* 
`VK_EXT_ATTACHMENT_FEEDBACK_LOOP_DYNAMIC_STATE_EXTENSION_NAME`

* 
`VK_EXT_ATTACHMENT_FEEDBACK_LOOP_DYNAMIC_STATE_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ATTACHMENT_FEEDBACK_LOOP_DYNAMIC_STATE_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2023-04-28 (Mike Blumenkrantz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_attachment_feedback_loop_dynamic_state).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
