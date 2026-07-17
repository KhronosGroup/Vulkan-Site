# VK_KHR_maintenance8(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance8.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance8](#VK_KHR_maintenance8)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance8 - device extension

**Name String**

`VK_KHR_maintenance8`

**Extension Type**

Device extension

**Registered Extension Number**

575

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance8] @zmike%0A*Here describe the issue or question you have about the VK_KHR_maintenance8 extension*)

**Extension Proposal**

[VK_KHR_maintenance8](../../../../features/latest/features/proposals/VK_KHR_maintenance8.html)

**Last Modified Date**

2025-01-07

**Interactions and External Dependencies**
**Contributors**

* 
Jon Leech, Khronos

* 
Mike Blumenkrantz, Valve

* 
Spencer Fricke, LunarG

* 
Jan-Harald Fredriksen, ARM

* 
Piers Daniell, NVIDIA

* 
Matthew Netsch, Qualcomm

* 
Ricardo Garcia, Igalia

* 
Lionel Landwerlin, Intel

* 
Rick Hammerstone, Qualcomm

* 
Daniel Story, Nintendo

* 
Hans-Kristian Arntzen, Valve

* 
Caterina Shablia, Collabora

* 
Georg Lehmann, Valve

* 
Shahbaz Youssefi, Google

* 
Tobias Hector, AMD

[VK_KHR_maintenance8](#) adds a collection of minor features, none of
which would warrant an entire extension of their own.

The new features are as follows:

* 
Allow copies between depth/stencil and “matching” color attachments

* 
Allow `dstCache` in `vkMergePipelineCaches` to be implicitly
synchronized.

* 
Require src/dst sync scopes to work when doing queue family ownership
transfers

* 
Support `Offset` (as an alternative to `ConstOffset`) image operand in
texture sampling and fetch operations

* 
Use the SPIR-V definition of `OpSRem` and `OpSMod`, making these
operations produce well-defined results for negative operands

* 
Loosen layer restrictions when blitting from 3D images to other image
types

* 
Add space for an additional 64 access flags for use with
VkMemoryBarrier2, VkBufferMemoryBarrier2, and VkImageMemoryBarrier2

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMaintenance8FeaturesKHR](VkPhysicalDeviceMaintenance8FeaturesKHR.html)

Extending [VkSubpassDependency2](VkSubpassDependency2.html), [VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html), [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html), [VkMemoryRangeBarriersInfoKHR](VkMemoryRangeBarriersInfoKHR.html):

* 
[VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html)

* 
[VkAccessFlagBits3KHR](VkAccessFlagBits3KHR.html)

* 
[VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html)

* 
[VkAccessFlags3KHR](VkAccessFlags3KHR.html)

* 
`VK_KHR_MAINTENANCE_8_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_8_SPEC_VERSION`

* 
Extending [VkDependencyFlagBits](VkDependencyFlagBits.html):

[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html)

Extending [VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html):

* 
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](VkPipelineCacheCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_MEMORY_BARRIER_ACCESS_FLAGS_3_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_8_FEATURES_KHR](VkStructureType.html)

None.

* 
Revision 1, 2024-06-20 (Jon Leech)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance8).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
