# VkPhysicalDeviceGpaPropertiesAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceGpaPropertiesAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceGpaPropertiesAMD - Structure describing GPU performance API properties for a physical device

The `VkPhysicalDeviceGpaPropertiesAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkPhysicalDeviceGpaPropertiesAMD {
    VkStructureType                          sType;
    void*                                    pNext;
    VkPhysicalDeviceGpaPropertiesFlagsAMD    flags;
    VkDeviceSize                             maxSqttSeBufferSize;
    uint32_t                                 shaderEngineCount;
    uint32_t                                 perfBlockCount;
    VkGpaPerfBlockPropertiesAMD*             pPerfBlocks;
} VkPhysicalDeviceGpaPropertiesAMD;

The members of the `VkPhysicalDeviceGpaPropertiesAMD` structure describe
the following:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`maxSqttSeBufferSize` is the SQTT buffer size per engine.

* 
`shaderEngineCount` is the number of shader engines.

* 
`perfBlockCount` is the number of entries in `pPerfBlocks`.

* 
`pPerfBlocks` is a pointer to an array of
[VkGpaPerfBlockPropertiesAMD](VkGpaPerfBlockPropertiesAMD.html) structures containing the available
performance blocks.

If the `VkPhysicalDeviceGpaPropertiesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Note that, as opposed to other physical device property structures,
`VkPhysicalDeviceGpaPropertiesAMD` needs
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html) to be called twice to obtain the
`pPerfBlocks` array, similar to an enumeration function.
If `pPerfBlocks` is `NULL`, then the number of performance blocks is
returned in `perfBlockCount`.
Otherwise, `perfBlockCount` **must** be set by the application to the
number of elements in the `pPerfBlocks` array, and on return the
variable is overwritten with the number of elements actually written to
`pPerfBlocks`.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGpaPropertiesAMD-sType-sType) VUID-VkPhysicalDeviceGpaPropertiesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GPA_PROPERTIES_AMD](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), `VkDeviceSize`, [VkGpaPerfBlockPropertiesAMD](VkGpaPerfBlockPropertiesAMD.html), [VkPhysicalDeviceGpaPropertiesFlagsAMD](VkPhysicalDeviceGpaPropertiesFlagsAMD.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceGpaPropertiesAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
