# VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV - Structure describing push descriptor limits that can be supported by an implementation

The `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV` structure is
defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxGraphicsShaderGroupCount;
    uint32_t           maxIndirectSequenceCount;
    uint32_t           maxIndirectCommandsTokenCount;
    uint32_t           maxIndirectCommandsStreamCount;
    uint32_t           maxIndirectCommandsTokenOffset;
    uint32_t           maxIndirectCommandsStreamStride;
    uint32_t           minSequencesCountBufferOffsetAlignment;
    uint32_t           minSequencesIndexBufferOffsetAlignment;
    uint32_t           minIndirectCommandsBufferOffsetAlignment;
} VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxGraphicsShaderGroupCount` is the maximum number of shader groups
in [VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html).

* 
`maxIndirectSequenceCount` is the maximum number of sequences in
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html) and in
[VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html).

* 
`maxIndirectCommandsTokenCount` is the maximum number of tokens in
[VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html).

* 
`maxIndirectCommandsStreamCount` is the maximum number of streams in
[VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html).

* 
`maxIndirectCommandsTokenOffset` is the maximum offset in
[VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html).

* 
`maxIndirectCommandsStreamStride` is the maximum stream stride in
[VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html).

* 
`minSequencesCountBufferOffsetAlignment` is the minimum alignment
for memory addresses which **can** be used in
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html).

* 
`minSequencesIndexBufferOffsetAlignment` is the minimum alignment
for memory addresses which **can** be used in
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html).

* 
`minIndirectCommandsBufferOffsetAlignment` is the minimum alignment
for memory addresses used in [VkIndirectCommandsStreamNV](VkIndirectCommandsStreamNV.html), and as
preprocess buffer in [VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html).

If the `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
