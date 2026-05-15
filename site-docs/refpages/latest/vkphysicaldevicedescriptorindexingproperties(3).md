# VkPhysicalDeviceDescriptorIndexingProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorIndexingProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorIndexingProperties - Structure describing descriptor indexing properties that can be supported by an implementation

The `VkPhysicalDeviceDescriptorIndexingProperties` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDescriptorIndexingProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxUpdateAfterBindDescriptorsInAllPools;
    VkBool32           shaderUniformBufferArrayNonUniformIndexingNative;
    VkBool32           shaderSampledImageArrayNonUniformIndexingNative;
    VkBool32           shaderStorageBufferArrayNonUniformIndexingNative;
    VkBool32           shaderStorageImageArrayNonUniformIndexingNative;
    VkBool32           shaderInputAttachmentArrayNonUniformIndexingNative;
    VkBool32           robustBufferAccessUpdateAfterBind;
    VkBool32           quadDivergentImplicitLod;
    uint32_t           maxPerStageDescriptorUpdateAfterBindSamplers;
    uint32_t           maxPerStageDescriptorUpdateAfterBindUniformBuffers;
    uint32_t           maxPerStageDescriptorUpdateAfterBindStorageBuffers;
    uint32_t           maxPerStageDescriptorUpdateAfterBindSampledImages;
    uint32_t           maxPerStageDescriptorUpdateAfterBindStorageImages;
    uint32_t           maxPerStageDescriptorUpdateAfterBindInputAttachments;
    uint32_t           maxPerStageUpdateAfterBindResources;
    uint32_t           maxDescriptorSetUpdateAfterBindSamplers;
    uint32_t           maxDescriptorSetUpdateAfterBindUniformBuffers;
    uint32_t           maxDescriptorSetUpdateAfterBindUniformBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindStorageBuffers;
    uint32_t           maxDescriptorSetUpdateAfterBindStorageBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindSampledImages;
    uint32_t           maxDescriptorSetUpdateAfterBindStorageImages;
    uint32_t           maxDescriptorSetUpdateAfterBindInputAttachments;
} VkPhysicalDeviceDescriptorIndexingProperties;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkPhysicalDeviceDescriptorIndexingProperties
typedef VkPhysicalDeviceDescriptorIndexingProperties VkPhysicalDeviceDescriptorIndexingPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxUpdateAfterBindDescriptorsInAllPools` is the maximum number of
descriptors (summed over all descriptor types) that **can** be created
across all pools that are created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html) bit set.
Pool creation **may** fail when this limit is exceeded, or when the space
this limit represents is unable to satisfy a pool creation due to
fragmentation.

* 

`shaderUniformBufferArrayNonUniformIndexingNative` is a boolean
value indicating whether uniform buffer descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](VK_FALSE.html), then a single dynamic instance of an
instruction that non-uniformly indexes an array of uniform buffers **may**
execute multiple times in order to access all the descriptors.

* 

`shaderSampledImageArrayNonUniformIndexingNative` is a boolean value
indicating whether sampler and image descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](VK_FALSE.html), then a single dynamic instance of an
instruction that non-uniformly indexes an array of samplers or images
**may** execute multiple times in order to access all the descriptors.

* 

`shaderStorageBufferArrayNonUniformIndexingNative` is a boolean
value indicating whether storage buffer descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](VK_FALSE.html), then a single dynamic instance of an
instruction that non-uniformly indexes an array of storage buffers **may**
execute multiple times in order to access all the descriptors.

* 

`shaderStorageImageArrayNonUniformIndexingNative` is a boolean value
indicating whether storage image descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](VK_FALSE.html), then a single dynamic instance of an
instruction that non-uniformly indexes an array of storage images **may**
execute multiple times in order to access all the descriptors.

* 

`shaderInputAttachmentArrayNonUniformIndexingNative` is a boolean
value indicating whether input attachment descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](VK_FALSE.html), then a single dynamic instance of an
instruction that non-uniformly indexes an array of input attachments
**may** execute multiple times in order to access all the descriptors.

* 

`robustBufferAccessUpdateAfterBind` is a boolean value indicating
whether [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) **can**
be enabled on a device simultaneously with
`descriptorBindingUniformBufferUpdateAfterBind`,
`descriptorBindingStorageBufferUpdateAfterBind`,
`descriptorBindingUniformTexelBufferUpdateAfterBind`, and/or
`descriptorBindingStorageTexelBufferUpdateAfterBind`.
If this is [VK_FALSE](VK_FALSE.html), then either `robustBufferAccess` **must** be
disabled or all of these update-after-bind features **must** be disabled.
Similarly, if this property is [VK_FALSE](VK_FALSE.html), robustness **must** not be
enabled through the [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html) mechanism.

* 

`quadDivergentImplicitLod` is a boolean value indicating whether
implicit LOD calculations for image operations have well-defined results
when the image and/or sampler objects used for the instruction are not
uniform within a quad.
See [Derivative Image    Operations](../../../../spec/latest/chapters/textures.html#textures-derivative-image-operations).

* 

`maxPerStageDescriptorUpdateAfterBindSamplers` is similar to
`maxPerStageDescriptorSamplers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindUniformBuffers` is similar to
`maxPerStageDescriptorUniformBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindStorageBuffers` is similar to
`maxPerStageDescriptorStorageBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindSampledImages` is similar to
`maxPerStageDescriptorSampledImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindStorageImages` is similar to
`maxPerStageDescriptorStorageImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindInputAttachments` is similar to
`maxPerStageDescriptorInputAttachments` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxPerStageUpdateAfterBindResources` is similar to
`maxPerStageResources` but counts descriptors from descriptor sets
created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindSamplers` is similar to
`maxDescriptorSetSamplers` but counts descriptors from descriptor
sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindUniformBuffers` is similar to
`maxDescriptorSetUniformBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` is similar to
`maxDescriptorSetUniformBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.
While an application **can** allocate dynamic uniform buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html).

* 

`maxDescriptorSetUpdateAfterBindStorageBuffers` is similar to
`maxDescriptorSetStorageBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` is similar to
`maxDescriptorSetStorageBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.
While an application **can** allocate dynamic storage buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html).

* 

`maxDescriptorSetUpdateAfterBindSampledImages` is similar to
`maxDescriptorSetSampledImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindStorageImages` is similar to
`maxDescriptorSetStorageImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindInputAttachments` is similar to
`maxDescriptorSetInputAttachments` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

If the `VkPhysicalDeviceDescriptorIndexingProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorIndexingProperties-sType-sType) VUID-VkPhysicalDeviceDescriptorIndexingProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDescriptorIndexingProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
