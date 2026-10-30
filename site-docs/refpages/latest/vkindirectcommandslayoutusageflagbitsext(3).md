# VkIndirectCommandsLayoutUsageFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsLayoutUsageFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsLayoutUsageFlagBitsEXT - Bitmask specifying allowed usage of an indirect commands layout

Bits which **can** be set in
[VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html)::`flags`, specifying usage
hints of an indirect command layout, are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectCommandsLayoutUsageFlagBitsEXT {
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT = 0x00000001,
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_EXT = 0x00000002,
} VkIndirectCommandsLayoutUsageFlagBitsEXT;

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT](#)
specifies that the layout is always used with the manual preprocessing
step through calling [vkCmdPreprocessGeneratedCommandsEXT](vkCmdPreprocessGeneratedCommandsEXT.html) and
executed by [vkCmdExecuteGeneratedCommandsEXT](vkCmdExecuteGeneratedCommandsEXT.html) with
`isPreprocessed` set to [VK_TRUE](VK_TRUE.html).

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_EXT](#)
specifies that the processing of sequences will happen at an
implementation-dependent order, which is not guaranteed to be
deterministic using the same input data.
This flag is ignored when the `shaderStages` is
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) as it is implied that the dispatch
sequence is always unordered.

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsLayoutUsageFlagsEXT](VkIndirectCommandsLayoutUsageFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutUsageFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
