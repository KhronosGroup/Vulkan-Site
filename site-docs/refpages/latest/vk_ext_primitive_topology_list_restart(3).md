# VK_EXT_primitive_topology_list_restart(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_primitive_topology_list_restart.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_primitive_topology_list_restart](#VK_EXT_primitive_topology_list_restart)
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

VK_EXT_primitive_topology_list_restart - device extension

**Name String**

`VK_EXT_primitive_topology_list_restart`

**Extension Type**

Device extension

**Registered Extension Number**

357

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_primitive_topology_list_restart] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_primitive_topology_list_restart extension*)

**Last Modified Date**

2021-01-11

**IP Status**

No known IP claims.

**Contributors**

* 
Courtney Goeltzenleuchter, Google

* 
Shahbaz Youssefi, Google

This extension allows list primitives to use the primitive restart index
value.
This provides a more efficient implementation when layering OpenGL
functionality on Vulkan by avoiding emulation which incurs data copies.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT](VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT.html)

* 
`VK_EXT_PRIMITIVE_TOPOLOGY_LIST_RESTART_EXTENSION_NAME`

* 
`VK_EXT_PRIMITIVE_TOPOLOGY_LIST_RESTART_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVE_TOPOLOGY_LIST_RESTART_FEATURES_EXT](VkStructureType.html)

* 
Revision 0, 2020-09-14 (Courtney Goeltzenleuchter)

Internal revisions

Revision 1, 2021-01-11 (Shahbaz Youssefi)

* 
Add the `primitiveTopologyPatchListRestart` feature

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_primitive_topology_list_restart).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
