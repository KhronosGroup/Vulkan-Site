# VK_AMD_gpa_interface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_gpa_interface.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_gpa_interface](#VK_AMD_gpa_interface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_gpa_interface - device extension

**Name String**

`VK_AMD_gpa_interface`

**Extension Type**

Device extension

**Registered Extension Number**

134

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Stu Smith [stu-s](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_gpa_interface] @stu-s%0A*Here describe the issue or question you have about the VK_AMD_gpa_interface extension*)

**Extension Proposal**

[VK_AMD_gpa_interface](../../../../features/latest/features/proposals/VK_AMD_gpa_interface.html)

**Last Modified Date**

2026-05-01

**IP Status**

No known IP claims.

**Contributors**

* 
Stu Smith, AMD

* 
Tobias Hector, AMD

* 
Noah Fredriks, AMD

* 
Peter Lohrmann, AMD

* 
Maciej Dziuban, AMD

This extension adds GPU Performance API (GPA) interface support for
accessing GPU global performance counters, streaming performance monitors
(SPM), and thread traces (SQTT), on AMD Radeon™ GPUs.

* 
[VkGpaSessionAMD](VkGpaSessionAMD.html)

* 
[vkCmdBeginGpaSampleAMD](vkCmdBeginGpaSampleAMD.html)

* 
[vkCmdBeginGpaSessionAMD](vkCmdBeginGpaSessionAMD.html)

* 
[vkCmdCopyGpaSessionResultsAMD](vkCmdCopyGpaSessionResultsAMD.html)

* 
[vkCmdEndGpaSampleAMD](vkCmdEndGpaSampleAMD.html)

* 
[vkCmdEndGpaSessionAMD](vkCmdEndGpaSessionAMD.html)

* 
[vkCreateGpaSessionAMD](vkCreateGpaSessionAMD.html)

* 
[vkDestroyGpaSessionAMD](vkDestroyGpaSessionAMD.html)

* 
[vkGetGpaDeviceClockInfoAMD](vkGetGpaDeviceClockInfoAMD.html)

* 
[vkGetGpaSessionResultsAMD](vkGetGpaSessionResultsAMD.html)

* 
[vkGetGpaSessionStatusAMD](vkGetGpaSessionStatusAMD.html)

* 
[vkResetGpaSessionAMD](vkResetGpaSessionAMD.html)

* 
[vkSetGpaDeviceClockModeAMD](vkSetGpaDeviceClockModeAMD.html)

* 
[VkGpaDeviceClockModeInfoAMD](VkGpaDeviceClockModeInfoAMD.html)

* 
[VkGpaDeviceGetClockInfoAMD](VkGpaDeviceGetClockInfoAMD.html)

* 
[VkGpaPerfBlockPropertiesAMD](VkGpaPerfBlockPropertiesAMD.html)

* 
[VkGpaPerfCounterAMD](VkGpaPerfCounterAMD.html)

* 
[VkGpaSampleBeginInfoAMD](VkGpaSampleBeginInfoAMD.html)

* 
[VkGpaSessionCreateInfoAMD](VkGpaSessionCreateInfoAMD.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceGpaFeaturesAMD](VkPhysicalDeviceGpaFeaturesAMD.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceGpaProperties2AMD](VkPhysicalDeviceGpaProperties2AMD.html)

* 
[VkPhysicalDeviceGpaPropertiesAMD](VkPhysicalDeviceGpaPropertiesAMD.html)

* 
[VkGpaDeviceClockModeAMD](VkGpaDeviceClockModeAMD.html)

* 
[VkGpaPerfBlockAMD](VkGpaPerfBlockAMD.html)

* 
[VkGpaSampleTypeAMD](VkGpaSampleTypeAMD.html)

* 
[VkGpaSqShaderStageFlagBitsAMD](VkGpaSqShaderStageFlagBitsAMD.html)

* 
[VkGpaPerfBlockPropertiesFlagsAMD](VkGpaPerfBlockPropertiesFlagsAMD.html)

* 
[VkGpaSqShaderStageFlagsAMD](VkGpaSqShaderStageFlagsAMD.html)

* 
[VkPhysicalDeviceGpaPropertiesFlagsAMD](VkPhysicalDeviceGpaPropertiesFlagsAMD.html)

* 
`VK_AMD_GPA_INTERFACE_EXTENSION_NAME`

* 
`VK_AMD_GPA_INTERFACE_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_GPA_SESSION_AMD](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_GPA_DEVICE_CLOCK_MODE_INFO_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GPA_DEVICE_GET_CLOCK_INFO_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GPA_SAMPLE_BEGIN_INFO_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GPA_SESSION_CREATE_INFO_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GPA_FEATURES_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GPA_PROPERTIES_2_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GPA_PROPERTIES_AMD](VkStructureType.html)

* 
Revision 1, 2026-05-01 (Stu Smith)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_gpa_interface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
