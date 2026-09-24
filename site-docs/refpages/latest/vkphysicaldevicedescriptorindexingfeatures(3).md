# VkPhysicalDeviceDescriptorIndexingFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorIndexingFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorIndexingFeatures - Structure describing descriptor indexing features that can be supported by an implementation

The `VkPhysicalDeviceDescriptorIndexingFeatures` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDescriptorIndexingFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderInputAttachmentArrayDynamicIndexing;
    VkBool32           shaderUniformTexelBufferArrayDynamicIndexing;
    VkBool32           shaderStorageTexelBufferArrayDynamicIndexing;
    VkBool32           shaderUniformBufferArrayNonUniformIndexing;
    VkBool32           shaderSampledImageArrayNonUniformIndexing;
    VkBool32           shaderStorageBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageImageArrayNonUniformIndexing;
    VkBool32           shaderInputAttachmentArrayNonUniformIndexing;
    VkBool32           shaderUniformTexelBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageTexelBufferArrayNonUniformIndexing;
    VkBool32           descriptorBindingUniformBufferUpdateAfterBind;
    VkBool32           descriptorBindingSampledImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageBufferUpdateAfterBind;
    VkBool32           descriptorBindingUniformTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingStorageTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingUpdateUnusedWhilePending;
    VkBool32           descriptorBindingPartiallyBound;
    VkBool32           descriptorBindingVariableDescriptorCount;
    VkBool32           runtimeDescriptorArray;
} VkPhysicalDeviceDescriptorIndexingFeatures;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkPhysicalDeviceDescriptorIndexingFeatures
typedef VkPhysicalDeviceDescriptorIndexingFeatures VkPhysicalDeviceDescriptorIndexingFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderInputAttachmentArrayDynamicIndexing` indicates whether arrays
of input attachments **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayDynamicIndexing` capability.

* 

`shaderUniformTexelBufferArrayDynamicIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayDynamicIndexing` capability.

* 

`shaderStorageTexelBufferArrayDynamicIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayDynamicIndexing` capability.

* 

`shaderUniformBufferArrayNonUniformIndexing` indicates whether
arrays of uniform buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformBufferArrayNonUniformIndexing` capability.

* 

`shaderSampledImageArrayNonUniformIndexing` indicates whether arrays
of samplers or sampled images **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`SampledImageArrayNonUniformIndexing` capability.

* 

`shaderStorageBufferArrayNonUniformIndexing` indicates whether
arrays of storage buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageImageArrayNonUniformIndexing` indicates whether arrays
of storage images **can** be indexed by non-uniform integer expressions in
shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageImageArrayNonUniformIndexing` capability.

* 

`shaderInputAttachmentArrayNonUniformIndexing` indicates whether
arrays of input attachments **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayNonUniformIndexing` capability.

* 

`shaderUniformTexelBufferArrayNonUniformIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageTexelBufferArrayNonUniformIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayNonUniformIndexing` capability.

* 

`descriptorBindingUniformBufferUpdateAfterBind` indicates whether
the implementation supports updating uniform buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingSampledImageUpdateAfterBind` indicates whether the
implementation supports updating sampled image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html).

* 

`descriptorBindingStorageImageUpdateAfterBind` indicates whether the
implementation supports updating storage image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html).

* 

`descriptorBindingStorageBufferUpdateAfterBind` indicates whether
the implementation supports updating storage buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingUniformTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating uniform texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingStorageTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating storage texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingUpdateUnusedWhilePending` indicates whether the
implementation supports updating descriptors while the set is in use.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](VkDescriptorBindingFlagBits.html) **must** not be
used.

* 

`descriptorBindingPartiallyBound` indicates whether the
implementation supports statically using a descriptor set binding in
which some descriptors are not valid.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used.

* 

`descriptorBindingVariableDescriptorCount` indicates whether the
implementation supports descriptor sets with a variable-sized last
binding.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html) **must** not be
used.

* 

`runtimeDescriptorArray` indicates whether the implementation
supports the SPIR-V `RuntimeDescriptorArray` capability.
If this feature is not enabled, descriptors **must** not be declared in
runtime arrays.

If the `VkPhysicalDeviceDescriptorIndexingFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDescriptorIndexingFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorIndexingFeatures-sType-sType) VUID-VkPhysicalDeviceDescriptorIndexingFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDescriptorIndexingFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
