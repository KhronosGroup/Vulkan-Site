# VK_ARM_performance_counters_by_region(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_performance_counters_by_region.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_performance_counters_by_region](#VK_ARM_performance_counters_by_region)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [What is the security model of this extension?](#appendix-performance-counters-by-region-security)
- [What_is_the_security_model_of_this_extension?](#appendix-performance-counters-by-region-security)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_performance_counters_by_region - device extension

**Name String**

`VK_ARM_performance_counters_by_region`

**Extension Type**

Device extension

**Registered Extension Number**

606

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
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_performance_counters_by_region] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_ARM_performance_counters_by_region extension*)

**Extension Proposal**

[VK_ARM_performance_counters_by_region](../../../../features/latest/features/proposals/VK_ARM_performance_counters_by_region.html)

**Last Modified Date**

2025-09-09

**IP Status**

No known IP claims.

**Contributors**

* 
Jan-Harald Fredriksen, Arm Ltd.

* 
Lisa Wu, Arm Ltd.

* 
Ting Wei, Arm Ltd.

* 
Nikunj Patel, Arm Ltd.

* 
Peter Harris, Arm Ltd.

* 
Camden Mannett, Arm Ltd.

This extension provides the ability to capture performance counters per
region ('tile').

It exposes an enumeration of the available counters, and a way to request
counters to be captured per render pass instance.

* 
[vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM](vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM.html)

* 
[VkPerformanceCounterARM](VkPerformanceCounterARM.html)

* 
[VkPerformanceCounterDescriptionARM](VkPerformanceCounterDescriptionARM.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePerformanceCountersByRegionFeaturesARM](VkPhysicalDevicePerformanceCountersByRegionFeaturesARM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html)

Extending [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkRenderingInfo](VkRenderingInfo.html):

* 
[VkRenderPassPerformanceCountersByRegionBeginInfoARM](VkRenderPassPerformanceCountersByRegionBeginInfoARM.html)

* 
[VkPerformanceCounterDescriptionFlagsARM](VkPerformanceCounterDescriptionFlagsARM.html)

* 
`VK_ARM_PERFORMANCE_COUNTERS_BY_REGION_EXTENSION_NAME`

* 
`VK_ARM_PERFORMANCE_COUNTERS_BY_REGION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_COUNTERS_BY_REGION_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_COUNTERS_BY_REGION_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_PERFORMANCE_COUNTERS_BY_REGION_BEGIN_INFO_ARM](VkStructureType.html)

**RESOLVED**

The GPU hardware is able to run workloads from multiple applications
concurrently.
This introduces the possibility of side-channel leaks where one process can
observe the side effects (e.g., memory pressure) of work done in another
process.

To prevent such leaks when using this extension, the following is
guaranteed:

Command buffers that capture performance counters are automatically
executed in an “exclusive mode”, meaning that they do not run
concurrently with workloads from any other process.

The physical device, at the level of hardware and firmware, guarantees
that performance counters are only captured in “exclusive mode”, and
otherwise returns zero for all counters.

Additionally, this performance counter mechanism only exposes shader core
counters.
Counters related to the external memory system or interactions between
external memory and L2 caches are not available.

* 
Revision 1, 2025-09-09 (Jan-Harald Fredriksen)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_performance_counters_by_region).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
