# VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT - Structure describing push descriptor limits that can be supported by an implementation

The `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT {
    VkStructureType                        sType;
    void*                                  pNext;
    uint32_t                               maxIndirectPipelineCount;
    uint32_t                               maxIndirectShaderObjectCount;
    uint32_t                               maxIndirectSequenceCount;
    uint32_t                               maxIndirectCommandsTokenCount;
    uint32_t                               maxIndirectCommandsTokenOffset;
    uint32_t                               maxIndirectCommandsIndirectStride;
    VkIndirectCommandsInputModeFlagsEXT    supportedIndirectCommandsInputModes;
    VkShaderStageFlags                     supportedIndirectCommandsShaderStages;
    VkShaderStageFlags                     supportedIndirectCommandsShaderStagesPipelineBinding;
    VkShaderStageFlags                     supportedIndirectCommandsShaderStagesShaderBinding;
    VkBool32                               deviceGeneratedCommandsTransformFeedback;
    VkBool32                               deviceGeneratedCommandsMultiDrawIndirectCount;
} VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxIndirectPipelineCount` is
the maximum number of pipelines passed to
[vkCreateIndirectExecutionSetEXT](vkCreateIndirectExecutionSetEXT.html).

* 

`maxIndirectShaderObjectCount` is the maximum number of shader
objects passed to [vkCreateIndirectExecutionSetEXT](vkCreateIndirectExecutionSetEXT.html).
If this value is zero, binding shader objects indirectly is not
supported.

* 
 `maxIndirectSequenceCount` is
the maximum number of sequences in [VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html) and
in [VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html).

* 

`maxIndirectCommandsTokenCount` is the maximum number of tokens in
[VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html).

* 

`maxIndirectCommandsTokenOffset` is the maximum offset in
[VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html).

* 

`maxIndirectCommandsIndirectStride` is the maximum stream stride in
[VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html).

* 

`supportedIndirectCommandsInputModes` indicates the supported input
modes.

* 

`supportedIndirectCommandsShaderStages` indicates the stages which
**can** be used to generate indirect commands.
Implementations are required to support, at minimum:
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html), [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html).

* 

`supportedIndirectCommandsShaderStagesPipelineBinding` indicates the
stages which **can** be used within indirect execution sets for indirectly
binding shader stages using pipelines.

* 

`supportedIndirectCommandsShaderStagesShaderBinding` indicates the
stages which **can** be used within indirect execution sets for indirectly
binding shader stages using shader objects.

* 

`deviceGeneratedCommandsTransformFeedback` indicates whether the
implementation supports interactions with
`[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` for pipelines not created with
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html).

* 

`deviceGeneratedCommandsMultiDrawIndirectCount` indicates whether
the implementation supports COUNT variants of multi-draw indirect
tokens.

If the `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), `VkBool32`, [VkIndirectCommandsInputModeFlagsEXT](VkIndirectCommandsInputModeFlagsEXT.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
