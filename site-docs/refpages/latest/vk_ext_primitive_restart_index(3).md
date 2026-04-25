# VK_EXT_primitive_restart_index(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_primitive_restart_index.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_primitive_restart_index](#VK_EXT_primitive_restart_index)
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

VK_EXT_primitive_restart_index - device extension

**Name String**

`VK_EXT_primitive_restart_index`

**Extension Type**

Device extension

**Registered Extension Number**

679

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_primitive_restart_index] @zmike%0A*Here describe the issue or question you have about the VK_EXT_primitive_restart_index extension*)

**Extension Proposal**

[VK_EXT_primitive_restart_index](../../../../features/latest/features/proposals/VK_EXT_primitive_restart_index.html)

**Last Modified Date**

2026-03-10

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Spencer Fricke, LunarG

* 
Ricardo Garcia, Igalia

* 
Piers Daniell, NVIDIA

This extension allows setting a custom primitive restart index.
It is primarily intended to support GL emulation.

* 
[vkCmdSetPrimitiveRestartIndexEXT](vkCmdSetPrimitiveRestartIndexEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT](VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT.html)

* 
`VK_EXT_PRIMITIVE_RESTART_INDEX_EXTENSION_NAME`

* 
`VK_EXT_PRIMITIVE_RESTART_INDEX_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVE_RESTART_INDEX_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2026-03-10 (Mike Blumenkrantz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_primitive_restart_index).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
