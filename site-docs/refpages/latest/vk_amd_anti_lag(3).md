# VK_AMD_anti_lag(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_anti_lag.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_anti_lag](#VK_AMD_anti_lag)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_anti_lag - device extension

**Name String**

`VK_AMD_anti_lag`

**Extension Type**

Device extension

**Registered Extension Number**

477

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
Stu Smith

**Extension Proposal**

[VK_AMD_anti_lag](../../../../features/latest/features/proposals/VK_AMD_anti_lag.html)

**Last Modified Date**

2024-06-06

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Stuart Smith, AMD

* 
Arkadiusz Sarwa, AMD

This extension automatically paces the CPU to make sure it does not get too
far ahead of the GPU, reducing the latency between inputs received and
updates on the screen.
Additionally, Anti-Lag+ offers applications the ability to inform the driver
when input processing begins, in order to align the timing of display
updates, enabling even lower latency between receiving input and displaying
on the screen.

* 
[vkAntiLagUpdateAMD](vkAntiLagUpdateAMD.html)

* 
[VkAntiLagDataAMD](VkAntiLagDataAMD.html)

* 
[VkAntiLagPresentationInfoAMD](VkAntiLagPresentationInfoAMD.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceAntiLagFeaturesAMD](VkPhysicalDeviceAntiLagFeaturesAMD.html)

* 
[VkAntiLagModeAMD](VkAntiLagModeAMD.html)

* 
[VkAntiLagStageAMD](VkAntiLagStageAMD.html)

* 
`VK_AMD_ANTI_LAG_EXTENSION_NAME`

* 
`VK_AMD_ANTI_LAG_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ANTI_LAG_DATA_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ANTI_LAG_PRESENTATION_INFO_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ANTI_LAG_FEATURES_AMD](VkStructureType.html)

* 
Revision 1, 2024-06-06 (Arkadiusz Sarw)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_anti_lag).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
