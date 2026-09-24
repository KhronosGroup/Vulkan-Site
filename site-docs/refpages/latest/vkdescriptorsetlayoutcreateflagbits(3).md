# VkDescriptorSetLayoutCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetLayoutCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetLayoutCreateFlagBits - Bitmask specifying descriptor set layout properties

Bits which **can** be set in
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)::`flags`, specifying options for
descriptor set layout, are:

// Provided by VK_VERSION_1_0
typedef enum VkDescriptorSetLayoutCreateFlagBits {
  // Provided by VK_VERSION_1_2
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT = 0x00000002,
  // Provided by VK_VERSION_1_4
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT = 0x00000001,
  // Provided by VK_EXT_descriptor_buffer
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT = 0x00000010,
  // Provided by VK_EXT_descriptor_buffer
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT = 0x00000020,
  // Provided by VK_NV_device_generated_commands_compute
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_INDIRECT_BINDABLE_BIT_NV = 0x00000080,
  // Provided by VK_EXT_mutable_descriptor_type
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT = 0x00000004,
  // Provided by VK_NV_per_stage_descriptor_set
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV = 0x00000040,
  // Provided by VK_KHR_push_descriptor
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR = VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT_EXT = VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT,
  // Provided by VK_VALVE_mutable_descriptor_type
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_VALVE = VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT,
} VkDescriptorSetLayoutCreateFlagBits;

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#) specifies that
descriptor sets **must** not be allocated using this layout, and
descriptors are instead pushed by [vkCmdPushDescriptorSet](vkCmdPushDescriptorSet.html).

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#)
specifies that descriptor sets using this layout **must** be allocated from
a descriptor pool created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html) bit set.
Descriptor set layouts created with this bit set have alternate limits
for the maximum number of descriptors per-stage and per-pipeline layout.
The non-UpdateAfterBind limits only count descriptors in sets created
without this flag.
The UpdateAfterBind limits count all descriptors, but the limits **may** be
higher than the non-UpdateAfterBind limits.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_INDIRECT_BINDABLE_BIT_NV](#) specifies
that descriptor sets using this layout allows them to be bound with
compute pipelines that are created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html) flag set to be used in
[Device-Generated Commands](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#)
specifies that this layout **must** only be used with descriptor buffers.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#)
specifies that this is a layout only containing immutable samplers that
**can** be bound by [vkCmdBindDescriptorBufferEmbeddedSamplersEXT](vkCmdBindDescriptorBufferEmbeddedSamplersEXT.html).
Unlike normal immutable samplers, embedded immutable samplers do not
require the application to provide them in a descriptor buffer.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#) specifies
that descriptor sets using this layout **must** be allocated from a
descriptor pool created with the
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](VkDescriptorPoolCreateFlagBits.html) bit set.
Descriptor set layouts created with this bit have no expressible limit
for maximum number of descriptors per-stage.
Host descriptor sets are limited only by available host memory, but **may**
be limited for implementation specific reasons.
Implementations **may** limit the number of supported descriptors to
UpdateAfterBind limits or non-UpdateAfterBind limits, whichever is
larger.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](#) specifies that
binding numbers in descriptor sets using this layout **may** represent
different resources and/or types of resources in each stage.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorSetLayoutCreateFlags](VkDescriptorSetLayoutCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
