# VkGpaPerfBlockPropertiesAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaPerfBlockPropertiesAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaPerfBlockPropertiesAMD - Structure describing GPU performance API block properties for a physical device

The `VkGpaPerfBlockPropertiesAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaPerfBlockPropertiesAMD {
    VkGpaPerfBlockAMD                   blockType;
    VkGpaPerfBlockPropertiesFlagsAMD    flags;
    uint32_t                            instanceCount;
    uint32_t                            maxEventID;
    uint32_t                            maxGlobalOnlyCounters;
    uint32_t                            maxGlobalSharedCounters;
    uint32_t                            maxStreamingCounters;
} VkGpaPerfBlockPropertiesAMD;

The members of the `VkGpaPerfBlockPropertiesAMD` structure describe the
following:

* 
`blockType` is a [VkGpaPerfBlockAMD](VkGpaPerfBlockAMD.html) specifying the performance
block type.

* 
`flags` is reserved for future use.

* 
`instanceCount` is the number of instances of this block that are
available in the device.

* 
`maxEventID` is the maximum event ID for this block.

* 
`maxGlobalOnlyCounters` is the number of counters available only for
global counters.

* 
`maxGlobalSharedCounters` is the total counters available including
state shared between global and streaming performance monitor counters.

* 
`maxStreamingCounters` is the maximum number of counters available
for streaming only.

If the `VkGpaPerfBlockPropertiesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkGpaPerfBlockPropertiesAMD-blockType-parameter) VUID-VkGpaPerfBlockPropertiesAMD-blockType-parameter

 `blockType` **must** be a valid [VkGpaPerfBlockAMD](VkGpaPerfBlockAMD.html) value

* 
[](#VUID-VkGpaPerfBlockPropertiesAMD-flags-zerobitmask) VUID-VkGpaPerfBlockPropertiesAMD-flags-zerobitmask

 `flags` **must** be `0`

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaPerfBlockAMD](VkGpaPerfBlockAMD.html), [VkGpaPerfBlockPropertiesFlagsAMD](VkGpaPerfBlockPropertiesFlagsAMD.html), [VkPhysicalDeviceGpaPropertiesAMD](VkPhysicalDeviceGpaPropertiesAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkGpaPerfBlockPropertiesAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
