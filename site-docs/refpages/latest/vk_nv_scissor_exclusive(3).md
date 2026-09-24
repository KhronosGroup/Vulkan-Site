# VK_NV_scissor_exclusive(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_scissor_exclusive.html

## Table of Contents

- [Name](#_name)
- [VK_NV_scissor_exclusive](#VK_NV_scissor_exclusive)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_scissor_exclusive - device extension

**Name String**

`VK_NV_scissor_exclusive`

**Extension Type**

Device extension

**Registered Extension Number**

206

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Pat Brown [nvpbrown](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_scissor_exclusive] @nvpbrown%0A*Here describe the issue or question you have about the VK_NV_scissor_exclusive extension*)

**Last Modified Date**

2023-01-18

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

None

**Contributors**

* 
Pat Brown, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Daniel Koch, NVIDIA

This extension adds support for an exclusive scissor test to Vulkan.
The exclusive scissor test behaves like the scissor test, except that the
exclusive scissor test fails for pixels inside the corresponding rectangle
and passes for pixels outside the rectangle.
If the same rectangle is used for both the scissor and exclusive scissor
tests, the exclusive scissor test will pass if and only if the scissor test
fails.

Version 2 of this extension introduces
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](VkDynamicState.html) and
[vkCmdSetExclusiveScissorEnableNV](vkCmdSetExclusiveScissorEnableNV.html).
Applications that use this dynamic state must ensure the implementation
advertises at least `specVersion` `2` of this extension.

* 
[vkCmdSetExclusiveScissorEnableNV](vkCmdSetExclusiveScissorEnableNV.html)

* 
[vkCmdSetExclusiveScissorNV](vkCmdSetExclusiveScissorNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceExclusiveScissorFeaturesNV](VkPhysicalDeviceExclusiveScissorFeaturesNV.html)

Extending [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html):

* 
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html)

* 
`VK_NV_SCISSOR_EXCLUSIVE_EXTENSION_NAME`

* 
`VK_NV_SCISSOR_EXCLUSIVE_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXCLUSIVE_SCISSOR_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_EXCLUSIVE_SCISSOR_STATE_CREATE_INFO_NV](VkStructureType.html)

1) For the scissor test, the viewport state must be created with a matching
number of scissor and viewport rectangles.
Should we have the same requirement for exclusive scissors?

**RESOLVED**: For exclusive scissors, we relax this requirement and allow an
exclusive scissor rectangle count that is either zero or equal to the number
of viewport rectangles.
If you pass in an exclusive scissor count of zero, the exclusive scissor
test is treated as disabled.

* 
Revision 2, 2023-01-18 (Piers Daniell)

Add dynamic state for explicit exclusive scissor enables

Revision 1, 2018-07-31 (Pat Brown)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_scissor_exclusive).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
