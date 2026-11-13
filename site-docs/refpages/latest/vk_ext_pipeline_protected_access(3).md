# VK_EXT_pipeline_protected_access(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pipeline_protected_access.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pipeline_protected_access](#VK_EXT_pipeline_protected_access)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pipeline_protected_access - device extension

**Name String**

`VK_EXT_pipeline_protected_access`

**Extension Type**

Device extension

**Registered Extension Number**

467

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_pipeline_protected_access] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_pipeline_protected_access extension*)

**Extension Proposal**

[VK_EXT_pipeline_protected_access](../../../../features/latest/features/proposals/VK_EXT_pipeline_protected_access.html)

**Last Modified Date**

2022-07-28

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Jörg Wagner, Arm

* 
Ralph Potter, Samsung

* 
Daniel Koch, NVIDIA

This extension allows protected memory access to be specified per pipeline
as opposed to per device.
Through the usage of this extension, any performance penalty paid due to
access to protected memory will be limited to the specific pipelines that
make such accesses.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePipelineProtectedAccessFeaturesEXT](VkPhysicalDevicePipelineProtectedAccessFeatures.html)

* 
`VK_EXT_PIPELINE_PROTECTED_ACCESS_EXTENSION_NAME`

* 
`VK_EXT_PIPELINE_PROTECTED_ACCESS_SPEC_VERSION`

* 
Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT_EXT](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROTECTED_ACCESS_FEATURES_EXT](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the EXT
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2022-07-28 (Shahbaz Youssefi)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pipeline_protected_access).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
