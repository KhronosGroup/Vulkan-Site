# VkPipelineLayoutCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineLayoutCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineLayoutCreateInfo - Structure specifying the parameters of a newly created pipeline layout object

The [VkPipelineLayoutCreateInfo](#) structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineLayoutCreateInfo {
    VkStructureType                 sType;
    const void*                     pNext;
    VkPipelineLayoutCreateFlags     flags;
    uint32_t                        setLayoutCount;
    const VkDescriptorSetLayout*    pSetLayouts;
    uint32_t                        pushConstantRangeCount;
    const VkPushConstantRange*      pPushConstantRanges;
} VkPipelineLayoutCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineLayoutCreateFlagBits](VkPipelineLayoutCreateFlagBits.html)
specifying options for pipeline layout creation.

* 
`setLayoutCount` is the number of descriptor sets included in the
pipeline layout.

* 
`pSetLayouts` is a pointer to an array of
`VkDescriptorSetLayout` objects.
The implementation **must** not access these objects outside of the
duration of the command this structure is passed to.

* 
`pushConstantRangeCount` is the number of push constant ranges
included in the pipeline layout.

* 
`pPushConstantRanges` is a pointer to an array of
[VkPushConstantRange](VkPushConstantRange.html) structures defining a set of push constant
ranges for use in a single pipeline layout.
In addition to descriptor set layouts, a pipeline layout also describes
how many push constants **can** be accessed by each stage of the pipeline.

|  | Push constants represent a high speed path to modify constant data in
| --- | --- |
pipelines that is expected to outperform memory-backed resource updates. |

Valid Usage

* 
[](#VUID-VkPipelineLayoutCreateInfo-setLayoutCount-00286) VUID-VkPipelineLayoutCreateInfo-setLayoutCount-00286

`setLayoutCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxBoundDescriptorSets`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03016) VUID-VkPipelineLayoutCreateInfo-descriptorType-03016

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03017) VUID-VkPipelineLayoutCreateInfo-descriptorType-03017

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html)
and [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03018) VUID-VkPipelineLayoutCreateInfo-descriptorType-03018

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html)
and [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-06939) VUID-VkPipelineLayoutCreateInfo-descriptorType-06939

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html),
and [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html), accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03020) VUID-VkPipelineLayoutCreateInfo-descriptorType-03020

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
and [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03021) VUID-VkPipelineLayoutCreateInfo-descriptorType-03021

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html)
accessible to any given shader stage across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02214) VUID-VkPipelineLayoutCreateInfo-descriptorType-02214

The total number of bindings in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
and
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) accessible to any given
shader stage across all elements of `pSetLayouts`, **must** be less
than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxPerStageDescriptorInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03022) VUID-VkPipelineLayoutCreateInfo-descriptorType-03022

If the
[`descriptorBindingSampledImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03023) VUID-VkPipelineLayoutCreateInfo-descriptorType-03023

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03024) VUID-VkPipelineLayoutCreateInfo-descriptorType-03024

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03025) VUID-VkPipelineLayoutCreateInfo-descriptorType-03025

If the
[`descriptorBindingSampledImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), and
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03026) VUID-VkPipelineLayoutCreateInfo-descriptorType-03026

If the
[`descriptorBindingStorageImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), and
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03027) VUID-VkPipelineLayoutCreateInfo-descriptorType-03027

If any element of `pSetLayouts` is created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set, the total number of descriptors with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) accessible to any given shader
stage across all elements of `pSetLayouts` **must** be less than or
equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02215) VUID-VkPipelineLayoutCreateInfo-descriptorType-02215

If the
[`descriptorBindingInlineUniformBlockUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingInlineUniformBlockUpdateAfterBind)
feature is supported on the device, the total number of bindings with a
`descriptorType` of [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)
accessible to any given shader stage across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03028) VUID-VkPipelineLayoutCreateInfo-descriptorType-03028

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03029) VUID-VkPipelineLayoutCreateInfo-descriptorType-03029

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03030) VUID-VkPipelineLayoutCreateInfo-descriptorType-03030

If the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not
enabled, the
total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUniformBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10003) VUID-VkPipelineLayoutCreateInfo-maintenance7-10003

If the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is enabled,
the total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to [    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetTotalUniformBuffersDynamic`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetTotalUniformBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03031) VUID-VkPipelineLayoutCreateInfo-descriptorType-03031

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03032) VUID-VkPipelineLayoutCreateInfo-descriptorType-03032

If the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not
enabled, the
total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetStorageBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10004) VUID-VkPipelineLayoutCreateInfo-maintenance7-10004

If the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is enabled,
the total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to [    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetTotalStorageBuffersDynamic`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetTotalStorageBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-None-10005) VUID-VkPipelineLayoutCreateInfo-None-10005

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to [    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetTotalBuffersDynamic`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetTotalBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-10006) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-10006

If either the
[`descriptorBindingStorageBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
or
[`descriptorBindingUniformBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
[    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetUpdateAfterBindTotalBuffersDynamic`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetUpdateAfterBindTotalBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03033) VUID-VkPipelineLayoutCreateInfo-descriptorType-03033

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), and
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03034) VUID-VkPipelineLayoutCreateInfo-descriptorType-03034

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
and [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03035) VUID-VkPipelineLayoutCreateInfo-descriptorType-03035

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02216) VUID-VkPipelineLayoutCreateInfo-descriptorType-02216

The total number of bindings in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxDescriptorSetInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03036) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03036

If the
[`descriptorBindingSampledImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03037) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03037

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03038) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03038

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device,
and if the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not
enabled,
the total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUpdateAfterBindUniformBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10007) VUID-VkPipelineLayoutCreateInfo-maintenance7-10007

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, and the [    `maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is enabled, the total number of descriptors
of the type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) accessible
across all shader stages and across all elements of `pSetLayouts`
**must** be less than or equal to
[    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03039) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03039

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03040) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03040

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device,
and if the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not
enabled,
the total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUpdateAfterBindStorageBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10008) VUID-VkPipelineLayoutCreateInfo-maintenance7-10008

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device, and if the [    `maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is enabled, the total number of descriptors
of the type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) accessible
across all shader stages and across all elements of `pSetLayouts`
**must** be less than or equal to
[    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03041) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03041

If the
[`descriptorBindingSampledImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), and
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03042) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03042

If the
[`descriptorBindingStorageImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), and
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03043) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03043

If any element of `pSetLayouts` is created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set, the total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) accessible across all shader
stages and across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02217) VUID-VkPipelineLayoutCreateInfo-descriptorType-02217

If the
[`descriptorBindingInlineUniformBlockUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingInlineUniformBlockUpdateAfterBind)
feature is supported on the device, the total number of bindings with a
`descriptorType` of [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxDescriptorSetUpdateAfterBindInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-06531) VUID-VkPipelineLayoutCreateInfo-descriptorType-06531

The total number of descriptors with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceVulkan13Properties`::`maxInlineUniformTotalSize`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-00292) VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-00292

Any two elements of `pPushConstantRanges` **must** not include the same
stage in `stageFlags`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-00293) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-00293

`pSetLayouts` **must** not contain more than one descriptor set layout
that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html) set

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03571) VUID-VkPipelineLayoutCreateInfo-descriptorType-03571

The total number of bindings in descriptor set layouts created without
the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxPerStageDescriptorAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03572) VUID-VkPipelineLayoutCreateInfo-descriptorType-03572

The total number of bindings with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxPerStageDescriptorUpdateAfterBindAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03573) VUID-VkPipelineLayoutCreateInfo-descriptorType-03573

The total number of bindings in descriptor set layouts created without
the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) accessible across
all shader stages and across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxDescriptorSetAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03574) VUID-VkPipelineLayoutCreateInfo-descriptorType-03574

The total number of bindings with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) accessible across
all shader stages and across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxDescriptorSetUpdateAfterBindAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02381) VUID-VkPipelineLayoutCreateInfo-descriptorType-02381

The total number of bindings with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`maxDescriptorSetAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pImmutableSamplers-03566) VUID-VkPipelineLayoutCreateInfo-pImmutableSamplers-03566

The total number of `pImmutableSamplers` created with `flags`
containing [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html) or
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](VkSamplerCreateFlagBits.html) across
all shader stages and across all elements of `pSetLayouts` **must** be
less than or equal to [    `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`maxDescriptorSetSubsampledSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetSubsampledSamplers)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-04606) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-04606

Any element of `pSetLayouts` **must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) bit set

* 
[](#VUID-VkPipelineLayoutCreateInfo-graphicsPipelineLibrary-06753) VUID-VkPipelineLayoutCreateInfo-graphicsPipelineLibrary-06753

If the [    `graphicsPipelineLibrary`](../../../../spec/latest/chapters/features.html#features-graphicsPipelineLibrary) feature is not enabled, elements
of `pSetLayouts` **must** be valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) objects

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-08008) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-08008

If any element of `pSetLayouts` was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) bit set,
all elements of `pSetLayouts` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) bit set

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09698) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09698

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html)
accessible to any given shader stage across all elements of
`pSetLayouts` **must** be less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](VkPhysicalDeviceTensorPropertiesARM.html)::`maxPerStageDescriptorSetStorageTensors`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09699) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09699

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](VkPhysicalDeviceTensorPropertiesARM.html)::`maxDescriptorSetStorageTensors`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09878) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09878

The total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) accessible across all shader stages
and across all elements of `pSetLayouts` **must** be less than or equal
to
[VkPhysicalDeviceTensorPropertiesARM](VkPhysicalDeviceTensorPropertiesARM.html)::`maxDescriptorSetUpdateAfterBindStorageTensors`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-09879) VUID-VkPipelineLayoutCreateInfo-descriptorType-09879

The total number of descriptors with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) accessible to any given shader stage
across all elements of `pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceTensorPropertiesARM`::`maxPerStageDescriptorUpdateAfterBindStorageTensors`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineLayoutCreateInfo-sType-sType) VUID-VkPipelineLayoutCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_LAYOUT_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineLayoutCreateInfo-flags-parameter) VUID-VkPipelineLayoutCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineLayoutCreateFlagBits](VkPipelineLayoutCreateFlagBits.html) values

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-parameter) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-parameter

 If `setLayoutCount` is not `0`, `pSetLayouts` **must** be a valid pointer to an array of `setLayoutCount` valid or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handles

* 
[](#VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-parameter) VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-parameter

 If `pushConstantRangeCount` is not `0`, `pPushConstantRanges` **must** be a valid pointer to an array of `pushConstantRangeCount` valid [VkPushConstantRange](VkPushConstantRange.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindDescriptorBufferEmbeddedSamplersInfoEXT](VkBindDescriptorBufferEmbeddedSamplersInfoEXT.html)

* 
[VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html)

* 
[VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html)

* 
[VkPushConstantsInfo](VkPushConstantsInfo.html)

* 
[VkPushDescriptorSetInfo](VkPushDescriptorSetInfo.html)

* 
[VkPushDescriptorSetWithTemplateInfo](VkPushDescriptorSetWithTemplateInfo.html)

* 
[VkSetDescriptorBufferOffsetsInfoEXT](VkSetDescriptorBufferOffsetsInfoEXT.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkPipelineLayoutCreateFlags](VkPipelineLayoutCreateFlags.html), [VkPushConstantRange](VkPushConstantRange.html), [VkStructureType](VkStructureType.html), [vkCreatePipelineLayout](vkCreatePipelineLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkPipelineLayoutCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
