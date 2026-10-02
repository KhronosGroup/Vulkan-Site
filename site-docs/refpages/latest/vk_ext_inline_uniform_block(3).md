# VK_EXT_inline_uniform_block(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_inline_uniform_block.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_inline_uniform_block](#VK_EXT_inline_uniform_block)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_inline_uniform_block - device extension

**Name String**

`VK_EXT_inline_uniform_block`

**Extension Type**

Device extension

**Registered Extension Number**

139

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     and

     [VK_KHR_maintenance1](VK_KHR_maintenance1.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_EXT_descriptor_indexing

* 
Interacts with VkPhysicalDeviceVulkan12Features::descriptorIndexing

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Daniel Rakos [aqnuep](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_inline_uniform_block] @aqnuep%0A*Here describe the issue or question you have about the VK_EXT_inline_uniform_block extension*)

**Last Modified Date**

2018-08-01

**IP Status**

No known IP claims.

**Contributors**

* 
Daniel Rakos, AMD

* 
Jeff Bolz, NVIDIA

* 
Slawomir Grajewski, Intel

* 
Neil Henning, Codeplay

This extension introduces the ability to back uniform blocks directly with
descriptor sets by storing inline uniform data within descriptor pool
storage.
Compared to push constants this new construct allows uniform data to be
reused across multiple disjoint sets of drawing or dispatching commands and
**may** enable uniform data to be accessed with fewer indirections compared to
uniforms backed by buffer memory.

* 
Extending [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html):

[VkDescriptorPoolInlineUniformBlockCreateInfoEXT](VkDescriptorPoolInlineUniformBlockCreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceInlineUniformBlockFeaturesEXT](VkPhysicalDeviceInlineUniformBlockFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceInlineUniformBlockPropertiesEXT](VkPhysicalDeviceInlineUniformBlockProperties.html)

Extending [VkWriteDescriptorSet](VkWriteDescriptorSet.html):

* 
[VkWriteDescriptorSetInlineUniformBlockEXT](VkWriteDescriptorSetInlineUniformBlock.html)

* 
`VK_EXT_INLINE_UNIFORM_BLOCK_EXTENSION_NAME`

* 
`VK_EXT_INLINE_UNIFORM_BLOCK_SPEC_VERSION`

* 
Extending [VkDescriptorType](VkDescriptorType.html):

[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK_EXT](VkDescriptorType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

Vulkan 1.3 adds [additional functionality related to this extension](../../../../spec/latest/appendices/versions.html#versions-1.3-new-features) in the form of the
[`maxInlineUniformTotalSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxInlineUniformTotalSize) limit.

1) Do we need a new storage class for inline uniform blocks vs. uniform
blocks?

**RESOLVED**: No.
The `Uniform` storage class is used to allow the same syntax used for
both uniform buffers and inline uniform blocks.

2) Is the descriptor array index and array size expressed in terms of bytes
or dwords for inline uniform block descriptors?

**RESOLVED**: In bytes, but both **must** be a multiple of 4, similar to how push
constant ranges are specified.
The `descriptorCount` of `VkDescriptorSetLayoutBinding` thus
provides the total number of bytes a particular binding with an inline
uniform block descriptor type can hold, while the `srcArrayElement`,
`dstArrayElement`, and `descriptorCount` members of
`VkWriteDescriptorSet`, `VkCopyDescriptorSet`, and
`VkDescriptorUpdateTemplateEntry` (where applicable) specify the byte
offset and number of bytes to write/copy to the binding’s backing store.
Additionally, the `stride` member of
`VkDescriptorUpdateTemplateEntry` is ignored for inline uniform blocks
and a default value of one is used, meaning that the data to update inline
uniform block bindings with must be contiguous in memory.

3) What layout rules apply for uniform blocks corresponding to inline
constants?

**RESOLVED**: They use the same layout rules as uniform buffers.

4) Do we need to add non-uniform indexing features/properties as introduced
by `VK_EXT_descriptor_indexing` for inline uniform blocks?

**RESOLVED**: No, because inline uniform blocks are not allowed to be
“arrayed”.
A single binding with an inline uniform block descriptor type corresponds to
a single uniform block instance and the array indices inside that binding
refer to individual offsets within the uniform block (see issue #2).
However, this extension does introduce new features/properties about the
level of support for update-after-bind inline uniform blocks.

5) Is the [`descriptorBindingVariableDescriptorCount`](../../../../spec/latest/chapters/features.html#features-descriptorBindingVariableDescriptorCount) feature introduced by
`VK_EXT_descriptor_indexing` supported for inline uniform blocks?

**RESOLVED**: Yes, as long as other inline uniform block specific limits are
respected.

6) Do the robustness guarantees of `robustBufferAccess` apply to inline
uniform block accesses?

**RESOLVED**: No, similarly to push constants, as they are not backed by
buffer memory like uniform buffers.

* 
Revision 1, 2018-08-01 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_inline_uniform_block).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
