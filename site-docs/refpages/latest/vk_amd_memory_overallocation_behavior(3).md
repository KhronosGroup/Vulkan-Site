# VK_AMD_memory_overallocation_behavior(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_memory_overallocation_behavior.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_memory_overallocation_behavior](#VK_AMD_memory_overallocation_behavior)
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

VK_AMD_memory_overallocation_behavior - device extension

**Name String**

`VK_AMD_memory_overallocation_behavior`

**Extension Type**

Device extension

**Registered Extension Number**

190

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Martin Dinkov [mdinkov](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_memory_overallocation_behavior] @mdinkov%0A*Here describe the issue or question you have about the VK_AMD_memory_overallocation_behavior extension*)

**Last Modified Date**

2018-09-19

**IP Status**

No known IP claims.

**Contributors**

* 
Martin Dinkov, AMD

* 
Matthaeus Chajdas, AMD

* 
Daniel Rakos, AMD

* 
Jon Campbell, AMD

This extension allows controlling whether explicit overallocation beyond the
device memory heap sizes (reported by
[VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)) is allowed or not.
Overallocation may lead to performance loss and is not supported for all
platforms.

* 
Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkDeviceMemoryOverallocationCreateInfoAMD](VkDeviceMemoryOverallocationCreateInfoAMD.html)

* 
[VkMemoryOverallocationBehaviorAMD](VkMemoryOverallocationBehaviorAMD.html)

* 
`VK_AMD_MEMORY_OVERALLOCATION_BEHAVIOR_EXTENSION_NAME`

* 
`VK_AMD_MEMORY_OVERALLOCATION_BEHAVIOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEVICE_MEMORY_OVERALLOCATION_CREATE_INFO_AMD](VkStructureType.html)

* 
Revision 1, 2018-09-19 (Martin Dinkov)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_memory_overallocation_behavior).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
