# VkIndirectCommandsLayoutUsageFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsLayoutUsageFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsLayoutUsageFlagBitsNV - Bitmask specifying allowed usage of an indirect commands layout

Bits which **can** be set in
[VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html)::`flags`, specifying usage
hints of an indirect command layout, are:

// Provided by VK_NV_device_generated_commands
typedef enum VkIndirectCommandsLayoutUsageFlagBitsNV {
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_NV = 0x00000001,
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_INDEXED_SEQUENCES_BIT_NV = 0x00000002,
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_NV = 0x00000004,
} VkIndirectCommandsLayoutUsageFlagBitsNV;

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_NV](#)
specifies that the layout is always used with the manual preprocessing
step through calling [vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html) and
executed by [vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html) with
`isPreprocessed` set to [VK_TRUE](VK_TRUE.html).

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_INDEXED_SEQUENCES_BIT_NV](#)
specifies that the input data for the sequences is not implicitly
indexed from 0..sequencesUsed, but an application-provided
`VkBuffer` encoding the index is provided.

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_NV](#)
specifies that the processing of sequences **can** happen at an
implementation-dependent order, which is not guaranteed to be coherent
using the same input data.
This flag is ignored when the `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html) as it is implied that the dispatch
sequence is always unordered.

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkIndirectCommandsLayoutUsageFlagsNV](VkIndirectCommandsLayoutUsageFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutUsageFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
